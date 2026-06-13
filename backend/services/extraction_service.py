import re

from models.schemas import ExtractionRequest, ExtractionResult
from services.context_service import normalize_crop, normalize_village
from settings import settings


def extract_from_transcript(payload: ExtractionRequest) -> ExtractionResult:
    if settings.gemini_api_key:
        return _demo_safe_gemini_placeholder(payload)
    return _rule_based_extraction(payload)


def _rule_based_extraction(payload: ExtractionRequest) -> ExtractionResult:
    transcript = payload.transcript
    weight_match = re.search(r"(\d{2,5})\s*(?:kg|kilo|kilogram|kilograms)?", transcript, re.IGNORECASE)
    weight = int(weight_match.group(1)) if weight_match else 0
    village = normalize_village(transcript)
    crop = normalize_crop(transcript)
    farmer_name = "Arumugam" if "arumugam" in transcript.lower() else "Demo Farmer"

    return ExtractionResult(
        transcript=transcript,
        extracted={
            "farmer_name": farmer_name,
            "village": village,
            "crop": crop,
            "weight": weight,
        },
        confidence={
            "farmer_name": 94 if farmer_name != "Demo Farmer" else 72,
            "village": 92 if village != "Unknown Village" else 55,
            "crop": 96 if crop != "Unknown Crop" else 50,
            "weight": 97 if weight else 40,
        },
    )


def _demo_safe_gemini_placeholder(payload: ExtractionRequest) -> ExtractionResult:
    # Keep the same contract; replace this with google-generativeai when keys are added.
    return _rule_based_extraction(payload)

