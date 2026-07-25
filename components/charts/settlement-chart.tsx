"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", value: 84 },
  { day: "Tue", value: 88 },
  { day: "Wed", value: 81 },
  { day: "Thu", value: 92 },
  { day: "Fri", value: 95 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 97 },
];

export function SettlementChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            stroke="#f4f4f5"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            width={30}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#18181b"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}