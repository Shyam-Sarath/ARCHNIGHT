from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import admin, auction, bookings, drivers, voice, sms
from settings import settings

app = FastAPI(title="KrishiBundle API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(voice.router, prefix="/api/voice", tags=["voice"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["bookings"])
app.include_router(drivers.router, prefix="/api/drivers", tags=["drivers"])
app.include_router(auction.router, prefix="/api/auction", tags=["auction"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(sms.router, prefix="/api/sms", tags=["sms"])


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "krishibundle"}

