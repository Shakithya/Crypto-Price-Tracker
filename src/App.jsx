import React, { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import CryptoTable from './components/CryptoTable';
import PriceChart from './components/CryptoChart';

const App = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('usd'); 

  return (
    <>
      <CssBaseline />
      <Navbar />
      
        <PriceChart coinId= "bitcoin" selectedCurrency={selectedCurrency} />

     
      <Box sx={{ p: 2, width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
        <CryptoTable selectedCurrency={selectedCurrency} />
      </Box>
    </>
  );
};

export default App;
