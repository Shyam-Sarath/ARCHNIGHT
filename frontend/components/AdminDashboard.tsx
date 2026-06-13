import { Bot, IndianRupee, Package, UsersRound } from "lucide-react";
import { bids, extraction, farmerOrders, recommendation, savingsTrend } from "@/services/demoData";
import { AuctionPanel } from "@/components/AuctionPanel";
import { MetricCard } from "@/components/MetricCard";
import { RecommendationCard } from "@/components/RecommendationCard";
import { SavingsPanel } from "@/components/SavingsPanel";
import { TacticalMap } from "@/components/TacticalMap";

export function AdminDashboard() {
  const totalWeight = farmerOrders.reduce((sum, order) => sum + order.weightKg, 0);
  const totalSavings = farmerOrders.reduce((sum, order) => sum + order.individualCost - order.sharedCost, 0);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard icon={UsersRound} label="Farmers Served" value={`${farmerOrders.length}`} detail="Active cooperative load for Koyambedu Mandi" />
        <MetricCard icon={IndianRupee} label="Money Saved" value={`Rs ${totalSavings.toLocaleString("en-IN")}`} detail="Savings compared with individual transport" />
        <MetricCard icon={Package} label="Weight Transported" value={`${totalWeight} kg`} detail="Current cluster utilization is 88%" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-panel">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-soil">AI Processing Monitor</h2>
              <p className="mt-1 text-sm text-stone-600">Whisper transcript, Gemini extraction, and confidence scoring.</p>
            </div>
            <Bot className="text-river" size={24} />
          </div>
          <div className="mt-4 rounded-lg bg-stone-50 p-4">
            <p className="text-xs uppercase text-stone-500">Transcript</p>
            <p className="mt-2 text-sm text-stone-700">{extraction.transcript}</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(extraction.extracted).map(([key, value]) => (
              <div className="rounded-lg border border-stone-200 p-3" key={key}>
                <p className="text-xs uppercase text-stone-500">{key.replace("_", " ")}</p>
                <div className="mt-1 flex items-center justify-between">
                  <strong>{value}</strong>
                  <span className="text-sm font-semibold text-field">
                    {extraction.confidence[key as keyof typeof extraction.confidence]}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <RecommendationCard recommendation={recommendation} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <TacticalMap orders={farmerOrders} />
        <AuctionPanel bids={bids} />
      </div>

      <SavingsPanel orders={farmerOrders} trend={savingsTrend} />
    </div>
  );
}

