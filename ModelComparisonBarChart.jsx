import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';

export default function ModelComparisonBarChart({ models }) {
  if (!models || models.length === 0) return <div>No model metrics available</div>;

  const data = models.map((m) => ({
    name: m.model_name.replace(' Regressor', ''),
    fullName: m.model_name,
    r2: parseFloat((m.r2 * 100).toFixed(2)),
    r2_raw: m.r2,
    rmse: m.rmse,
    mae: m.mae,
    is_best: m.is_best_model
  }));

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 35 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#64748b', fontSize: 11 }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 12 }}
            label={{ value: 'R² Accuracy (%)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(val, name, props) => [
              `${val}% (R² = ${props.payload.r2_raw.toFixed(4)}, RMSE = ₹${Math.round(props.payload.rmse).toLocaleString()})`,
              'Test Accuracy'
            ]}
          />
          <Bar dataKey="r2" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.is_best ? '#16a34a' : '#3b82f6'}
              />
            ))}
            <LabelList dataKey="r2" position="top" formatter={(v) => `${v}%`} style={{ fill: '#334155', fontSize: 11, fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
