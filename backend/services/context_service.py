VILLAGE_DICTIONARY = {
    "melma": {"canonical": "Melma", "lat": 12.516, "lng": 79.158},
    "athur": {"canonical": "Athur", "lat": 12.55, "lng": 79.2},
    "sevoor": {"canonical": "Sevoor", "lat": 12.49, "lng": 79.25},
}

CROP_ALIASES = {
    "thakkali": "Tomato",
    "tomato": "Tomato",
    "brinjal": "Brinjal",
    "kathirikai": "Brinjal",
    "onion": "Onion",
    "vengayam": "Onion",
}


def normalize_village(text: str) -> str:
    lowered = text.lower()
    for key, value in VILLAGE_DICTIONARY.items():
        if key in lowered:
            return str(value["canonical"])
    return "Unknown Village"


def normalize_crop(text: str) -> str:
    lowered = text.lower()
    for alias, crop in CROP_ALIASES.items():
        if alias in lowered:
            return crop
    return "Unknown Crop"

