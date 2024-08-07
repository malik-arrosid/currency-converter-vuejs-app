export async function fetchExchangeRate(from, to) {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  if (!response.ok) {
    throw new Error('Failed to fetch exchange rate');
  }
  const data = await response.json();
  return data.rates[to];
}
