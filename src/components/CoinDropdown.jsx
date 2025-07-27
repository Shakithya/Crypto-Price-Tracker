import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTopCoins } from '../services/coingecko';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material';

const CoinDropdown = ({ selectedCoin, setSelectedCoin }) => {
  const { data, isLoading, error } = useQuery(['topCoins'], getTopCoins);

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error fetching coins.</p>;

  return (
    <FormControl fullWidth>
      <InputLabel id="coin-select-label">Select Coin</InputLabel>
      <Select
        labelId="coin-select-label"
        value={selectedCoin}
        label="Select Coin"
        onChange={(e) => setSelectedCoin(e.target.value)}
      >
        {data.map((coin) => (
          <MenuItem key={coin.id} value={coin.id}>
            {coin.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CoinDropdown;
