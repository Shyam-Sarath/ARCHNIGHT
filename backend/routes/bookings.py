from fastapi import APIRouter

from database.seed_data import BOOKINGS
from models.schemas import Booking, BookingCreate
from services.notification_service import booking_confirmation

router = APIRouter()


@router.get("", response_model=list[Booking])
def list_bookings():
    return BOOKINGS


@router.post("", response_model=Booking)
def create_booking(payload: BookingCreate):
    booking_id = f"KB{1024 + len(BOOKINGS)}"
    booking = {
        **payload.model_dump(),
        "id": booking_id,
        "status": "Pending",
        "individual_cost": round(payload.weight_kg * 8),
        "shared_cost": round(payload.weight_kg * 3.5),
        "pickup_time": "Awaiting cluster",
    }
    BOOKINGS.insert(0, booking)
    booking_confirmation(payload, booking_id)
    return booking

