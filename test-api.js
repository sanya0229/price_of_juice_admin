const fetch = require('node-fetch');

async function testAPI() {
  try {
    // Тест получения всех продуктов
    console.log('Testing GET /api/products...');
    const response = await fetch('http://localhost:1337/api/products');
    console.log('Status:', response.status);
    console.log('Response:', await response.text());
    
    // Тест создания продукта
    console.log('\nTesting POST /api/products...');
    const createResponse = await fetch('http://localhost:1337/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          product: 'Test Product',
          activeSubstance: 'Test Substance',
          volume: '10ml \\ 300mg',
          stock: 'In Stock',
          price: '100',
          tableType: 'first',
          isActive: true
        }
      })
    });
    console.log('Create Status:', createResponse.status);
    console.log('Create Response:', await createResponse.text());
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
