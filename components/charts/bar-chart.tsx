"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
}

export function ChartBar({ data, color = "#3b82f6" }: BarChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid stroke="#f4f4f5" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#71717a" }} dy={8} />
          <YAxis tickLine={false} axisLine={false} width={40} tick={{ fontSize: 11, fill: "#71717a" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e4e4e7",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              background: "#fff",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
