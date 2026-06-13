from database.seed_data import BOOKINGS


def generate_recommendation() -> dict:
    total_weight = sum(int(booking["weight_kg"]) for booking in BOOKINGS)
    individual_cost = sum(int(booking["individual_cost"]) for booking in BOOKINGS)
    shared_cost = sum(int(booking["shared_cost"]) for booking in BOOKINGS)
    return {
        "farmers": len(BOOKINGS),
        "total_weight_kg": total_weight,
        "truck_utilization": min(96, round((total_weight / 1100) * 100)),
        "estimated_savings": individual_cost - shared_cost,
        "spoilage_risk": "Medium",
        "departure_time": "Today, 5:30 PM",
    }

