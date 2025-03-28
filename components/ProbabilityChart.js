import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ProbabilityChart = ({ probabilities }) => {
  if (!probabilities) {
    return <div style={{ border: '2px solid black', padding: '10px', borderRadius: '4px', backgroundColor: '#9ACBD0' }}>No probability data available</div>;
  }

  const data = Object.entries(probabilities).map(([state, probability]) => ({
    state,
    probability: probability * 100, // Convert to percentage
  }));

  return (
    <div style={{ border: '2px solid black', padding: '10px', borderRadius: '4px', backgroundColor: '#9ACBD0' }}>
      <h3>Probabilities</h3>
      <BarChart
        width={400}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        style={{ backgroundColor: '#9ACBD0' }} // Ensure chart background matches
      >
        <CartesianGrid strokeDasharray="3 3" stroke="F2EFE7" />
        <XAxis dataKey="state" stroke="#F2EFE7" label={{ value: 'Computational basis states', position: 'insideBottom', offset: -4, fill: '#F2EFE7' }} />
        <YAxis stroke="#F2EFE7" label={{ value: 'Probability (%)', angle: -90, position: 'inside', fill: '#F2EFE7' }} />
        <Tooltip contentStyle={{ backgroundColor: '#F2EFE7', border: 'none' }} />
        <Legend />
        <Bar dataKey="probability" position='Bottom' fill="#006A71" />
      </BarChart>
    </div>
  );
};

export default ProbabilityChart;