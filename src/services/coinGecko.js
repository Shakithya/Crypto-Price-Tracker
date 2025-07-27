import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Fetch top 10 market data
export const fetchMarketData = async (currency = 'usd') => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    return [];
  }
};

// Fetch historical chart data
export const fetchHistoricalData = async (coinId, days = 1, currency = 'usd') => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
      },
    });
    return response.data.prices;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
};
