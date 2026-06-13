import { bids, drivers, extraction, farmerOrders, recommendation, savingsTrend } from "@/services/demoData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function request<T>(path: string, fallback: T, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export const api = {
  getOrders: async () => {
    const raw = await request<any[]>("/api/bookings", []);
    return raw.map(o => ({
      id: o.id,
      farmerName: o.farmer_name,
      phone: o.phone,
      village: o.village,
      crop: o.crop,
      weightKg: o.weight_kg,
      status: o.status,
      destination: o.destination,
      individualCost: o.individual_cost,
      sharedCost: o.shared_cost,
      pickupTime: o.pickup_time || "Awaiting cluster",
      source: o.source || "Web Dashboard",
      language: o.language || "en",
      confidence: o.confidence || null,
      reviewRequired: o.review_required || false
    }));
  },
  getDrivers: async () => {
    const raw = await request<any[]>("/api/drivers", []);
    return raw.map(d => ({
      id: d.id,
      name: d.name,
      phone: d.phone,
      vehicleNumber: d.vehicle_number,
      vehicleType: d.vehicle_type,
      licenseNumber: d.license_number,
      reliabilityScore: d.reliability_score
    }));
  },
  getBids: async () => {
    const raw = await request<any[]>("/api/auction/bids", []);
    return raw.map(b => ({
      id: b.id,
      driverName: b.driver_name,
      vehicle: b.vehicle,
      amount: b.amount,
      reliabilityScore: b.reliability_score,
      status: b.status
    }));
  },
  getAdminSnapshot: async () => {
    const raw = await request<any>("/api/admin/snapshot", {
      extraction,
      recommendation,
      savingsTrend,
      orders: [],
      bids: []
    });
    return {
      extraction: raw.extraction,
      recommendation: {
        farmers: raw.recommendation.farmers,
        totalWeightKg: raw.recommendation.total_weight_kg,
        truckUtilization: raw.recommendation.truck_utilization,
        estimatedSavings: raw.recommendation.estimated_savings,
        spoilageRisk: raw.recommendation.spoilage_risk,
        departureTime: raw.recommendation.departure_time
      },
      savingsTrend: raw.savingsTrend,
      orders: (raw.orders || []).map((o: any) => ({
        id: o.id,
        farmerName: o.farmer_name,
        phone: o.phone,
        village: o.village,
        crop: o.crop,
        weightKg: o.weight_kg,
        status: o.status,
        destination: o.destination,
        individualCost: o.individual_cost,
        sharedCost: o.shared_cost,
        pickupTime: o.pickup_time || "Awaiting cluster",
        source: o.source || "Web Dashboard",
        language: o.language || "en",
        confidence: o.confidence || null,
        reviewRequired: o.review_required || false
      })),
      bids: (raw.bids || []).map((b: any) => ({
        id: b.id,
        driverName: b.driver_name,
        vehicle: b.vehicle,
        amount: b.amount,
        reliabilityScore: b.reliability_score,
        status: b.status
      }))
    };
  },
  createBooking: async (payload: any) => {
    const o = await request<any>("/api/bookings", null, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    if (!o) return null;
    return {
      id: o.id,
      farmerName: o.farmer_name,
      phone: o.phone,
      village: o.village,
      crop: o.crop,
      weightKg: o.weight_kg,
      status: o.status,
      destination: o.destination,
      individualCost: o.individual_cost,
      sharedCost: o.shared_cost,
      pickupTime: o.pickup_time || "Awaiting cluster",
      source: o.source || "Web Dashboard",
      language: o.language || "en",
      confidence: o.confidence || null,
      reviewRequired: o.review_required || false
    };
  },
  submitBid: async (payload: any) => {
    const b = await request<any>("/api/auction/bids", null, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    if (!b) return null;
    return {
      id: b.id,
      driverName: b.driver_name,
      vehicle: b.vehicle,
      amount: b.amount,
      reliabilityScore: b.reliability_score,
      status: b.status
    };
  },
  updateBooking: async (id: string, payload: any) => {
    const body = {
      farmer_name: payload.farmerName,
      phone: payload.phone,
      village: payload.village,
      crop: payload.crop,
      weight_kg: Number(payload.weightKg),
      destination: payload.destination || "Koyambedu Mandi"
    };
    const o = await request<any>(`/api/bookings/${id}`, null, {
      method: "PUT",
      body: JSON.stringify(body)
    });
    if (!o) return null;
    return {
      id: o.id,
      farmerName: o.farmer_name,
      phone: o.phone,
      village: o.village,
      crop: o.crop,
      weightKg: o.weight_kg,
      status: o.status,
      destination: o.destination,
      individualCost: o.individual_cost,
      sharedCost: o.shared_cost,
      pickupTime: o.pickup_time || "Awaiting cluster",
      source: o.source || "Web Dashboard",
      language: o.language || "en",
      confidence: o.confidence || null,
      reviewRequired: o.review_required || false
    };
  },
  uploadVoice: async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/voice/upload`, {
        method: "POST",
        body: formData
      });
      if (!response.ok) return null;
      const data = await response.json();
      return {
        id: data.id,
        transcript: data.transcript,
        extracted: data.extracted,
        confidence: data.confidence,
        reviewRequired: data.review_required,
        booking: data.booking ? {
          id: data.booking.id,
          farmerName: data.booking.farmer_name,
          phone: data.booking.phone,
          village: data.booking.village,
          crop: data.booking.crop,
          weightKg: data.booking.weight_kg,
          status: data.booking.status,
          destination: data.booking.destination,
          individualCost: data.booking.individual_cost,
          sharedCost: data.booking.shared_cost,
          pickupTime: data.booking.pickup_time || "Awaiting cluster",
          source: data.booking.source || "Voice Call",
          language: data.booking.language || "en",
          confidence: data.booking.confidence || null,
          reviewRequired: data.booking.review_required || false
        } : null
      };
    } catch (err) {
      console.error("Voice upload error:", err);
      return null;
    }
  }
};

