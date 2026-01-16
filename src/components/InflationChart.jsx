import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function InflationChart({ years, values }) {
  if (!years.length) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center justify-center text-slate-400">
        No data to display
      </div>
    );
  }

  const data = years.map((year, index) => ({
    year,
    value: values[index]
  }));

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Inflation Trend
      </h3>

      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="year"
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
