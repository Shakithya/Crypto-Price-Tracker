import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchHistoricalData } from '../services/coingecko';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const rangeOptions = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
];

const PriceChart = ({ coinId = 'bitcoin', selectedCurrency = 'usd' }) => {
  const [chartData, setChartData] = useState(null);
  const [range, setRange] = useState(7); // default 7 days

  useEffect(() => {
    const loadChart = async () => {
      try {
        const prices = await fetchHistoricalData(coinId, range, selectedCurrency);
        setChartData({
          labels: prices.map((p) =>
            range === 1
              ? new Date(p[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : new Date(p[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price`,
              data: prices.map((p) => p[1]),
              borderColor: '#1976d2',
              backgroundColor: 'rgba(25, 118, 210, 0.2)',
              fill: true,
              tension: 0.3,
              pointRadius: 0,
            },
          ],
        });
      } catch (err) {
        console.error('Error loading chart data:', err);
      }
    };

    loadChart();
  }, [coinId, selectedCurrency, range]);

  if (!chartData) return null;

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Typography variant="h6" gutterBottom>
        {coinId.toUpperCase()} Price Chart
      </Typography>

      <ButtonGroup sx={{ mb: 2 }}>
        {rangeOptions.map((option) => (
          <Button
            key={option.label}
            variant={range === option.days ? 'contained' : 'outlined'}
            onClick={() => setRange(option.days)}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>

      <Box sx={{ width: '100%', height: 300 }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              x: { display: true },
              y: { display: true },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PriceChart;
