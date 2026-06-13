import numpy as np
from sklearn.cluster import DBSCAN
from database.db import supabase_client
from services.compatibility_service import crops_are_compatible

COORDINATE_MAP = {
    "melma": (74.0, 154.0),
    "vallam": (126.0, 116.0),
    "orikkai": (184.0, 214.0),
    "walajabad": (86.0, 228.0),
    "sevoor": (145.0, 165.0),
    "athur": (185.0, 80.0),
}

def get_coordinates(village: str) -> tuple[float, float]:
    return COORDINATE_MAP.get(village.lower(), (100.0, 100.0))

def build_clusters() -> list[dict]:
    if not supabase_client:
        return []
    try:
        response = supabase_client.table("orders").select("*").execute()
        orders = response.data
        if not orders:
            return []
        
        pending_orders = [o for o in orders if o["status"] in ("Pending", "Cluster Forming", "Driver Assigned")]
        if not pending_orders:
            return []
        
        coords = []
        for o in pending_orders:
            x, y = get_coordinates(o["village"])
            coords.append([x, y])
            
        X = np.array(coords)
        
        # Run DBSCAN spatial clustering
        db = DBSCAN(eps=100.0, min_samples=1).fit(X)
        labels = db.labels_
        
        groups = {}
        for idx, label in enumerate(labels):
            if label not in groups:
                groups[label] = []
            groups[label].append(pending_orders[idx])
            
        clusters = []
        for label, group_orders in groups.items():
            crops = [o["crop"] for o in group_orders]
            villages = list(set(o["village"] for o in group_orders))
            total_weight = sum(int(o["weight_kg"]) for o in group_orders)
            
            clusters.append({
                "id": f"CL-{77 + int(label) if label >= 0 else 99}",
                "villages": villages,
                "destination": "Koyambedu Mandi",
                "total_weight_kg": total_weight,
                "compatible": crops_are_compatible(crops),
                "farmers": len(group_orders),
            })
            
        return clusters
    except Exception as e:
        print(f"Error building DBSCAN clusters: {e}")
        return []

