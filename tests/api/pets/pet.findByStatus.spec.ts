import { test, expect } from '@playwright/test';
import { gerarDadosDePetValidoStatusAvailableComId } from '../data/testData';



test.describe.serial('Petstore API - Find by Status - GET ', () => {

  test('[GET-PORSTATUS] - Body - Deve validar o campo ID corretamente', async ({ request }) => {

    const payload = gerarDadosDePetValidoStatusAvailableComId();

    const createResponse = await request.post('pet', {
      headers: 
        { accept: 'application/json', 
          'Content-Type': 'application/json' 
        }, 
        data: payload 
    }); 
      
      const createdPet = await createResponse.json(); 
      expect(createdPet).toHaveProperty('id');    
      
      const getResponse = await request.get('pet/findByStatus?status=available'); 
      expect(getResponse.status()).toBe(200); 
        
      const pets = await getResponse.json(); 

      await new Promise(r => setTimeout(r, 17000));

      const foundPet = pets.find(pet => Number(pet.id) === Number(createdPet.id));
      
      expect(Number(foundPet.id)).toBe(Number(createdPet.id));

  });

  test('[GET-PORSTATUS] - Status Code - Deve buscar um pet por status available retornando status 200', async ({ request }) => {

    const response = await request.get('pet/findByStatus?status=available');

    expect(response.status()).toBe(200);
  });

  test('[GET-PORSTATUS] - Status Code - Deve buscar um pet por status pending retornando status 200', async ({ request }) => {

    const response = await request.get('pet/findByStatus?status=pending');

    expect(response.status()).toBe(200);

  });

  test('[GET-PORSTATUS] - Status Code - Deve buscar um pet por status sold retornando status 200', async ({ request }) => {

    const response = await request.get('pet/findByStatus?status=sold');

    expect(response.status()).toBe(200);

  });

  test.skip('[GET-PORSTATUS] - BUG DOC - Status Code - Não deve buscar um pet por status inválido retornando status 400', async ({ request }) => {

    const response = await request.get('pet/findByStatus?status=invalid');

    expect(response.status()).toBe(200);

  });

  test('[GET-PORSTATUS] - Headers - Deve retornar Content-Type application/json no response', async ({ request }) => {

    const response = await request.get("pet/findByStatus?status=available");

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

  });

  test('[GET-PORSTATUS] - Headers - Deve retornar header com Content-Type como inválido', async ({ request }) => {

    const response = await request.get("pet/findByStatus?status=available");

    const contentType = response.headers()['content-invalido'];
    expect(contentType).toBeUndefined();

  });
  
});
