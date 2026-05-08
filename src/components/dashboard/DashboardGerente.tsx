import { useState } from "react";
import ReactECharts from "echarts-for-react";
import KpiGerente from "./kpis/KpiGerente";
import CardTabs from "./orders/CardTabs";
import orders from "../../data/orders.json";
import type { Order, DashboardViewProps } from "../../types/OrderTypes";

const data = orders as Order[];

function DashboardGerente({ activeTab, onTabChange }: DashboardViewProps) {
  const [showDrillDown, setShowDrillDown] = useState(false);

  const failedCount = data.filter((o) => o.status === "failed").length;

  const completed = data.filter((o) => o.status === "completed").length;
  const pending = data.filter((o) => o.status === "pending").length;
  const failed = data.filter((o) => o.status === "failed").length;

  const chartOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "#18181b",
      borderColor: "#3f3f46",
      textStyle: { color: "#e4e4e7" },
    },
    legend: {
      bottom: "0",
      textStyle: { color: "#71717a", fontFamily: "monospace" },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: { borderRadius: 6, borderColor: "#18181b", borderWidth: 2 },
        label: { show: false },
        data: [
          {
            value: completed,
            name: "Completadas",
            itemStyle: { color: "#34d399" },
          },
          {
            value: pending,
            name: "Pendientes",
            itemStyle: { color: "#fbbf24" },
          },
          { value: failed, name: "Fallidas", itemStyle: { color: "#f87171" } },
        ],
      },
    ],
  };

  return (
    <>
      <KpiGerente />

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
        <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
          Distribución de órdenes
        </span>
        <ReactECharts option={chartOption} style={{ height: "300px" }} />
      </div>

      {failedCount > 0 && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              setShowDrillDown((prev) => !prev);
              onTabChange("failed");
            }}
            className="w-full sm:w-auto self-start bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-lg transition-colors cursor-pointer text-center"
          >
            {showDrillDown
              ? "✕ Ocultar errores"
              : `⚠ Ver detalle de errores (${failedCount})`}
          </button>

          {showDrillDown && (
            <CardTabs activeTab={activeTab} onTabChange={onTabChange} />
          )}
        </div>
      )}
    </>
  );
}

export default DashboardGerente;
