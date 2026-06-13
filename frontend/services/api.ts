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
  getOrders: () => request("/api/bookings", farmerOrders),
  getDrivers: () => request("/api/drivers", drivers),
  getBids: () => request("/api/auction/bids", bids),
  getAdminSnapshot: () =>
    request("/api/admin/snapshot", {
      extraction,
      recommendation,
      savingsTrend,
      orders: farmerOrders,
      bids
    }),
  createBooking: (payload: unknown) =>
    request("/api/bookings", farmerOrders[0], {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  submitBid: (payload: unknown) =>
    request("/api/auction/bids", bids[0], {
      method: "POST",
      body: JSON.stringify(payload)
    })
};

