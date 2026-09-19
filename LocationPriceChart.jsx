import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function LocationPriceChart({ data }) {
  if (!data || data.length === 0) return <div>No location data available</div>;

  // Convert avg_price to Lakhs INR for cleaner display
  const chartData = data.map((d) => ({
    location: d.location,
    avgPriceLakhs: parseFloat((d.avg_price / 100000).toFixed(2)),
    avgPriceFull: d.avg_price,
    count: d.count,
    priceSqft: d.avg_price_per_sqft
  }));

  const colors = [
    '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa',
    '#0f766e', '#0d9488', '#14b8a6', '#2dd4bf', '#5eead4',
    '#f59e0b', '#d97706', '#b45309'
  ];

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="location"
            tick={{ fill: '#64748b', fontSize: 11 }}
            interval={0}
            angle={-35}
            textAnchor="end"
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            label={{ value: '₹ Lakhs', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(val, name, props) => [
              `₹${val} Lakhs (₹${Math.round(props.payload.priceSqft)}/sq.ft)`,
              'Avg Price'
            ]}
          />
          <Bar dataKey="avgPriceLakhs" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
