"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface SettlementChartProps {
  data?: { label: string; value: number }[];
  color?: string;
}

const defaultData = [
  { label: "Mon", value: 84 },
  { label: "Tue", value: 88 },
  { label: "Wed", value: 81 },
  { label: "Thu", value: 92 },
  { label: "Fri", value: 95 },
  { label: "Sat", value: 90 },
  { label: "Sun", value: 97 },
];

export function ChartLine({ data = defaultData, color = "#18181b" }: SettlementChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#f4f4f5" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#71717a" }} dy={8} />
          <YAxis tickLine={false} axisLine={false} width={40} tick={{ fontSize: 12, fill: "#71717a" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e4e4e7",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              background: "#fff",
              fontSize: "13px",
            }}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
