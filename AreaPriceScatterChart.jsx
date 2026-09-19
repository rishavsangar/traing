import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function AreaPriceScatterChart({ data }) {
  if (!data || data.length === 0) return <div>No sample data available</div>;

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <ScatterChart
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            dataKey="area_sqft"
            name="Area"
            unit=" sqft"
            tick={{ fill: '#64748b', fontSize: 11 }}
            domain={['dataMin - 100', 'dataMax + 200']}
          />
          <YAxis
            type="number"
            dataKey="price_lakhs"
            name="Price"
            unit=" L"
            tick={{ fill: '#64748b', fontSize: 11 }}
            label={{ value: 'Price (₹ Lakhs)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div style={{
                    backgroundColor: '#ffffff',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '0.8125rem'
                  }}>
                    <strong>{d.location} ({d.bedrooms} BHK {d.property_type})</strong>
                    <div>Area: {d.area_sqft} sq.ft</div>
                    <div>Price: ₹{d.price_lakhs} Lakhs</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter name="Properties" data={data} fill="#2563eb" opacity={0.65} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
