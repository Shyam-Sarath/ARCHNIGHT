"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { FarmerOrder, SavingsPoint } from "@/types";

export function SavingsPanel({ orders, trend }: { orders: FarmerOrder[]; trend: SavingsPoint[] }) {
  const individual = orders.reduce((sum, order) => sum + order.individualCost, 0);
  const shared = orders.reduce((sum, order) => sum + order.sharedCost, 0);
  const savings = individual - shared;

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-panel">
      <h2 className="text-lg font-bold text-soil">Savings Dashboard</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <p className="text-sm text-stone-500">Individual Cost</p>
          <p className="text-2xl font-bold text-soil">Rs {individual.toLocaleString("en-IN")}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500">Shared Cost</p>
          <p className="text-2xl font-bold text-field">Rs {shared.toLocaleString("en-IN")}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500">Total Savings</p>
          <p className="text-2xl font-bold text-chilli">Rs {savings.toLocaleString("en-IN")}</p>
        </div>
      </div>
      <div className="mt-5 h-52">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={trend}>
            <XAxis dataKey="label" tickLine={false} />
            <YAxis tickLine={false} width={44} />
            <Tooltip formatter={(value) => [`Rs ${Number(value).toLocaleString("en-IN")}`, "Savings"]} />
            <Area dataKey="value" fill="#4f7d5a33" stroke="#4f7d5a" strokeWidth={2} type="monotone" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

