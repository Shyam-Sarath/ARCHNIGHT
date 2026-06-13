from database.seed_data import BIDS
from models.schemas import BidCreate


def list_bids() -> list[dict]:
    return sorted(BIDS, key=lambda bid: (int(bid["amount"]), -int(bid["reliability_score"])))


def create_bid(payload: BidCreate) -> dict:
    bid = {
        "id": f"B{804 + len(BIDS)}",
        "driver_name": payload.driver_name,
        "vehicle": payload.vehicle,
        "amount": payload.amount,
        "reliability_score": payload.reliability_score,
        "status": "Open",
    }
    BIDS.insert(0, bid)
    return bid

