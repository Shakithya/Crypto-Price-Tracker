import React, { useEffect, useState } from 'react';
import { fetchMarketData } from '../services/coingecko';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

const CryptoTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('usd');

  const currencySymbols = {
    usd: '$',
    inr: '₹',
    eur: '€',
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const marketData = await fetchMarketData(currency);
        console.log(`Market data for ${currency}:`, marketData);
        setData(marketData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
      setLoading(false);
    };

    getData();
  }, [currency]);

  if (loading) return <CircularProgress sx={{ margin: 4 }} />;

  if (!loading && (!data || data.length === 0)) {
    return (
      <Box sx={{ m: 4 }}>
        <Typography variant="h6">
          No data available for {currency.toUpperCase()}.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ width: '100%', mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            label="Currency"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="usd">USD</MenuItem>
            <MenuItem value="inr">INR</MenuItem>
            <MenuItem value="eur">EUR</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#eee' }}>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Price ({currency.toUpperCase()})</TableCell>
              <TableCell>Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    width="20"
                    style={{ marginRight: 10, verticalAlign: 'middle' }}
                  />
                  {coin.name}
                </TableCell>
                <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                <TableCell>
                  {(currencySymbols[currency] || '')}
                  {coin.current_price.toLocaleString()}
                </TableCell>
                <TableCell>
                  {(currencySymbols[currency] || '')}
                  {coin.market_cap.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CryptoTable;
