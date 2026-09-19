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

export default function BedroomPriceChart({ data }) {
  if (!data || data.length === 0) return <div>No bedroom data available</div>;

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="bhk"
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            label={{ value: 'Avg Price (₹ Lakhs)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(val, name, props) => [
              `₹${val} Lakhs (${props.payload.count} units in dataset)`,
              'Average Price'
            ]}
          />
          <Bar dataKey="avg_price_lakhs" fill="#0f766e" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0f766e' : '#14b8a6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
