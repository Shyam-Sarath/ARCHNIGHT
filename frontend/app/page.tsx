"use client";

import { motion } from "framer-motion";
import { BarChart3, Headphones, Languages, Route, Tractor, Truck } from "lucide-react";
import { useState } from "react";
import { AdminDashboard } from "@/components/AdminDashboard";
import { DriverDashboard } from "@/components/DriverDashboard";
import { FarmerDashboard } from "@/components/FarmerDashboard";

type Tab = "farmer" | "driver" | "admin";

const tabs: Array<{ id: Tab; label: string; icon: typeof Tractor }> = [
  { id: "farmer", label: "Farmer", icon: Tractor },
  { id: "driver", label: "Driver", icon: Truck },
  { id: "admin", label: "Admin", icon: BarChart3 }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("admin");

  return (
    <main className="min-h-screen">
      <section className="border-b border-stone-200 bg-[#fffaf0]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-6">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-field/30 bg-white px-3 py-1 text-sm font-semibold text-field">
                <Languages size={16} />
                Tamil / Hindi / English
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-normal text-soil sm:text-5xl">KrishiBundle</h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-stone-700">
                AI-powered cooperative transport bundling for small farmers, drivers, and operations teams.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-panel">
                <Headphones className="text-chilli" size={22} />
                <p className="mt-3 text-sm font-bold">Voice booking</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-panel">
                <Route className="text-river" size={22} />
                <p className="mt-3 text-sm font-bold">AI clustering</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-panel">
                <Truck className="text-field" size={22} />
                <p className="mt-3 text-sm font-bold">Driver bids</p>
              </div>
            </div>
          </div>
          <div className="min-h-72 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-panel">
            <div className="grid h-full grid-cols-3">
              <div className="bg-field/15 p-5">
                <p className="text-sm font-bold text-field">Melma</p>
                <div className="mt-12 h-24 rounded-lg bg-field/30" />
              </div>
              <div className="bg-harvest/20 p-5">
                <p className="text-sm font-bold text-soil">Athur</p>
                <div className="mt-24 h-20 rounded-lg bg-harvest/50" />
              </div>
              <div className="bg-river/15 p-5">
                <p className="text-sm font-bold text-river">Koyambedu</p>
                <div className="mt-8 h-32 rounded-lg bg-river/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-lg border border-stone-200 bg-white p-1 shadow-panel">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                className={`focus-ring inline-flex min-w-28 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold ${
                  activeTab === id ? "bg-soil text-white" : "text-stone-600"
                }`}
                key={id}
                onClick={() => setActiveTab(id)}
                type="button"
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
          <p className="text-sm font-semibold text-stone-600">Demo hotline: 1800-KRISHI</p>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
          initial={{ opacity: 0, y: 8 }}
          key={activeTab}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "farmer" ? <FarmerDashboard /> : null}
          {activeTab === "driver" ? <DriverDashboard /> : null}
          {activeTab === "admin" ? <AdminDashboard /> : null}
        </motion.div>
      </section>
    </main>
  );
}

