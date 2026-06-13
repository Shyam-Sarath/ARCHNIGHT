import { Clock, IndianRupee, Scale, Sprout, Truck } from "lucide-react";
import type { Recommendation } from "@/types";

export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const rows = [
    { icon: Sprout, label: "Farmers", value: `${recommendation.farmers}` },
    { icon: Scale, label: "Total Weight", value: `${recommendation.totalWeightKg} kg` },
    { icon: Truck, label: "Truck Utilization", value: `${recommendation.truckUtilization}%` },
    { icon: IndianRupee, label: "Estimated Savings", value: `Rs ${recommendation.estimatedSavings.toLocaleString("en-IN")}` },
    { icon: Clock, label: "Departure", value: recommendation.departureTime }
  ];

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-panel">
      <h2 className="text-lg font-bold text-soil">AI Recommendation</h2>
      <div className="mt-4 grid gap-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <div className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-2" key={label}>
            <span className="inline-flex items-center gap-2 text-sm text-stone-600">
              <Icon size={17} />
              {label}
            </span>
            <strong className="text-sm text-soil">{value}</strong>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-amber-800">
        Spoilage Risk: {recommendation.spoilageRisk}
      </div>
    </section>
  );
}

