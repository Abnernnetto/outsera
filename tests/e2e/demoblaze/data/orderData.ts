// tests/e2e/demoblaze/data/orderData.ts
export type OrderData = {
    name: string;
    country: string;
    city: string;
    card: string;
    month: string;
    year: string;
  };
  
  const TEST_CARDS = [
    '4111111111111111', // Visa
    '5555555555554444', // Mastercard
    '6011111111111117', // Discover
  ];
  
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  export function generateOrderData(): OrderData {
    const firstNames = ['Lucas', 'Lucas', 'Marina', 'Paula', 'Rafael', 'Fernanda'];
    const lastNames  = ['Souza', 'Nunes', 'Silva', 'Oliveira', 'Costa', 'Almeida'];
    const cities     = ['Porto Alegre', 'São Paulo', 'Curitiba', 'Florianópolis', 'Fortaleza'];
    const countries  = ['Brazil', 'Argentina', 'Chile', 'Uruguay'];
  
    const name = `${firstNames[randomInt(0, firstNames.length - 1)]} ${lastNames[randomInt(0, lastNames.length - 1)]}`;
    const country = countries[randomInt(0, countries.length - 1)];
    const city = cities[randomInt(0, cities.length - 1)];
    const card = TEST_CARDS[randomInt(0, TEST_CARDS.length - 1)];
    const month = String(randomInt(1, 12)).padStart(2, '0');
    const year = String(randomInt(2025, 2032));
  
    return { name, country, city, card, month, year };
  }

 
  