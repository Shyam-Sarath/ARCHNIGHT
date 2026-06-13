import type { FarmerOrder } from "@/types";

export function TacticalMap({ orders }: { orders: FarmerOrder[] }) {
  const points = [
    { x: 90, y: 95, label: orders[0]?.village ?? "Melma" },
    { x: 185, y: 80, label: orders[1]?.village ?? "Athur" },
    { x: 145, y: 165, label: orders[2]?.village ?? "Sevoor" },
    { x: 320, y: 130, label: "Mandi" }
  ];

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-panel">
      <h2 className="text-lg font-bold text-soil">Cluster Visualization</h2>
      <svg className="mt-4 h-72 w-full rounded-lg bg-[#eef3e9]" viewBox="0 0 390 240" role="img" aria-label="Cluster map">
        <path d="M90 95 C140 55 190 70 320 130" fill="none" stroke="#2f7f8f" strokeDasharray="7 7" strokeWidth="4" />
        <path d="M185 80 C215 92 250 105 320 130" fill="none" stroke="#2f7f8f" strokeWidth="4" />
        <path d="M145 165 C198 160 250 145 320 130" fill="none" stroke="#2f7f8f" strokeWidth="4" />
        <circle cx="140" cy="110" fill="#4f7d5a22" r="95" stroke="#4f7d5a" strokeWidth="2" />
        {points.map((point, index) => (
          <g key={`${point.label}-${index}`}>
            <circle cx={point.x} cy={point.y} fill={index === 3 ? "#d44d3d" : "#4f7d5a"} r={11} />
            <text fill="#312a24" fontSize="12" fontWeight="700" x={point.x + 14} y={point.y + 5}>
              {point.label}
            </text>
          </g>
        ))}
        <rect fill="#f6b44b" height="18" rx="5" width="36" x="244" y="112" />
        <circle cx="253" cy="133" fill="#312a24" r="5" />
        <circle cx="272" cy="133" fill="#312a24" r="5" />
      </svg>
    </section>
  );
}

