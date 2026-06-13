from fastapi import APIRouter

from models.schemas import ExtractionRequest, ExtractionResult
from services.extraction_service import extract_from_transcript

router = APIRouter()


@router.post("/extract", response_model=ExtractionResult)
def extract(payload: ExtractionRequest):
    return extract_from_transcript(payload)


@router.post("/ivr-demo")
def ivr_demo():
    return {
        "hotline": "1800-KRISHI",
        "menu": {
            "1": "Tamil",
            "2": "Hindi",
            "3": "English",
        },
        "prompt": "Please tell your village name, crop name, and crop weight.",
    }

