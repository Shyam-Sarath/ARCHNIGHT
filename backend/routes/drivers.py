from fastapi import APIRouter

from database.seed_data import DRIVERS
from models.schemas import Driver

router = APIRouter()


@router.get("", response_model=list[Driver])
def list_drivers():
    return DRIVERS

