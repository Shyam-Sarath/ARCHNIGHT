"use client";

import { CalendarClock, CheckCircle2, IndianRupee, PackagePlus, Truck } from "lucide-react";
import { useState } from "react";
import { farmerOrders, savingsTrend } from "@/services/demoData";
import type { FarmerOrder } from "@/types";
import { StatusPill } from "@/components/StatusPill";
import { VoiceUpload } from "@/components/VoiceUpload";
import { SavingsPanel } from "@/components/SavingsPanel";

export function FarmerDashboard() {
  const [orders, setOrders] = useState<FarmerOrder[]>(farmerOrders);
  const assignedOrder = orders.find((order) => order.status === "Driver Assigned") ?? orders[0];

  function addBooking(formData: FormData) {
    const crop = String(formData.get("crop") || "Tomato");
    const weight = Number(formData.get("weight") || 150);
    const village = String(formData.get("village") || "New Village");
    const nextOrder: FarmerOrder = {
      id: `KB${1024 + orders.length}`,
      farmerName: "Demo Farmer",
      phone: "+91 90000 00000",
      village,
      crop,
      weightKg: weight,
      status: "Pending",
      destination: "Koyambedu Mandi",
      individualCost: Math.round(weight * 8),
      sharedCost: Math.round(weight * 3.5),
      pickupTime: "Awaiting cluster"
    };

    setOrders([nextOrder, ...orders]);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-5">
        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-soil">Create Booking</h2>
              <p className="mt-1 text-sm text-stone-600">Crop, weight, location, and voice note in one companion flow.</p>
            </div>
            <PackagePlus className="text-field" size={24} />
          </div>
          <form action={addBooking} className="mt-4 grid gap-3 sm:grid-cols-4">
            <input className="focus-ring rounded-lg border border-stone-300 px-3 py-2" name="crop" placeholder="Crop Type" />
            <input className="focus-ring rounded-lg border border-stone-300 px-3 py-2" min="1" name="weight" placeholder="Weight kg" type="number" />
            <input className="focus-ring rounded-lg border border-stone-300 px-3 py-2" name="village" placeholder="Location" />
            <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-field px-4 py-2 font-semibold text-white" type="submit">
              <CheckCircle2 size={18} />
              Submit
            </button>
          </form>
        </section>

        <VoiceUpload />

        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-panel">
          <h2 className="text-lg font-bold text-soil">My Orders</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-stone-500">
                <tr>
                  <th className="py-2">Booking</th>
                  <th>Crop</th>
                  <th>Village</th>
                  <th>Weight</th>
                  <th>Status</th>
                  <th>Pickup</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr className="border-t border-stone-200" key={order.id}>
                    <td className="py-3 font-semibold text-soil">{order.id}</td>
                    <td>{order.crop}</td>
                    <td>{order.village}</td>
                    <td>{order.weightKg} kg</td>
                    <td>
                      <StatusPill status={order.status} />
                    </td>
                    <td>{order.pickupTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="space-y-5">
        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-panel">
          <h2 className="text-lg font-bold text-soil">Assigned Driver</h2>
          <div className="mt-4 space-y-3 text-sm">
            <p className="flex items-center justify-between rounded-lg bg-stone-50 p-3">
              <span className="inline-flex items-center gap-2 text-stone-600"><Truck size={17} /> Driver</span>
              <strong>Kannan</strong>
            </p>
            <p className="flex items-center justify-between rounded-lg bg-stone-50 p-3">
              <span className="text-stone-600">Phone</span>
              <strong>+91 98844 77882</strong>
            </p>
            <p className="flex items-center justify-between rounded-lg bg-stone-50 p-3">
              <span className="text-stone-600">Vehicle</span>
              <strong>TN 11 AB 4472</strong>
            </p>
            <p className="flex items-center justify-between rounded-lg bg-stone-50 p-3">
              <span className="inline-flex items-center gap-2 text-stone-600"><CalendarClock size={17} /> Pickup</span>
              <strong>{assignedOrder.pickupTime}</strong>
            </p>
            <p className="flex items-center justify-between rounded-lg bg-stone-50 p-3">
              <span className="inline-flex items-center gap-2 text-stone-600"><IndianRupee size={17} /> Final Cost</span>
              <strong>Rs {assignedOrder.sharedCost.toLocaleString("en-IN")}</strong>
            </p>
          </div>
        </section>
        <SavingsPanel orders={orders} trend={savingsTrend} />
      </div>
    </div>
  );
}

