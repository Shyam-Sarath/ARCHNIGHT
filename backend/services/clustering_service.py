from database.seed_data import BOOKINGS
from services.compatibility_service import crops_are_compatible


def build_clusters() -> list[dict]:
    crops = [booking["crop"] for booking in BOOKINGS]
    return [
        {
            "id": "CL-77",
            "villages": [booking["village"] for booking in BOOKINGS],
            "destination": "Koyambedu Mandi",
            "total_weight_kg": sum(int(booking["weight_kg"]) for booking in BOOKINGS),
            "compatible": crops_are_compatible(crops),
            "farmers": len(BOOKINGS),
        }
    ]

