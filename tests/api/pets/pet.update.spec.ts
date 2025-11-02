import { test, expect } from '@playwright/test';
import { gerarDadosDePetParaSerAtualizado} from '../data/testData';



test.describe('Petstore API - Update an existing pet - PUT', () => {

  test('[PUT] - Status Code - Deve atualizar o nome de um pet na store retornando status 200', async ({ request }) => {

    const payloadPet = gerarDadosDePetParaSerAtualizado();
    
    const response = await request.post('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPet
    });

    expect(response.status()).toBe(200);

    const payloadPetUpdate = {
      id: `${payloadPet.id}`,
      category: {
        id: 1010,
        name: "outseraCategoria"
      },
      name: "biscoitoAtualizado",
      photoUrls: ["string"],
      tags: [
        {
          id: 2020,
          name: "outseratag"
        }
      ],
      status: "available"
    };

    const responsePut = await request.put('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPetUpdate
    });
    
    const body = await responsePut.json();

    expect(responsePut.status()).toBe(200);
    expect(body.name).toBe(payloadPetUpdate.name);    

  });

  test.skip('[PUT] - BUG DOC - Status Code - Deve informar um ID inexistente na hora de tentar atualizar e retornar status 404', async ({ request }) => {

    const payloadPet = gerarDadosDePetParaSerAtualizado();
    
    const response = await request.post('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPet
    });

    expect(response.status()).toBe(200);

    const payloadPetUpdate = {
      id: `${payloadPet.id + 'x'}`,
      category: {
        id: 1010,
        name: "outseraCategoria"
      },
      name: "biscoitoAtualizado",
      photoUrls: ["string"],
      tags: [
        {
          id: 2020,
          name: "outseratag"
        }
      ],
      status: "available"
    };

    const responsePut = await request.put('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPetUpdate
    });
    
    const body = await responsePut.json();

    expect(responsePut.status()).toBe(404);

  });

  test.skip('[PUT] - BUG DOC - Status Code - Deve informar um ID inválido na hora de tentar atualizar e retornar status 400', async ({ request }) => {

    const payloadPet = gerarDadosDePetParaSerAtualizado();
    
    const response = await request.post('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPet
    });

    expect(response.status()).toBe(200);

    const payloadPetUpdate = {
        id: `${payloadPet.id + payloadPet.id}`,
        category: {
          id: 1010,
          name: "outseraCategoria"
        },
        name: "biscoitoAtualizado",
        photoUrls: ["string"],
        tags: [
          {
            id: 2020,
            name: "outseratag"
          }
        ],
        status: "available"
    };

    const responsePut = await request.put('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPetUpdate
    });
    
    expect(responsePut.status()).toBe(400);

  });

  test.skip('[PUT] - BUG DOC - Status Code - Deve informar um payload inválido na hora de tentar atualizar e retornar status 405', async ({ request }) => {

    const payloadPet = gerarDadosDePetParaSerAtualizado();
    
    const response = await request.post('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPet
    });

    expect(response.status()).toBe(200);

    const payloadPetUpdatePayloadInvalido = {
        id: `${payloadPet.id}`,
        category: {
          id: 1010,
          name: "outseraCategoria"
        },
        status: "available"
    };

    const responsePut = await request.put('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPetUpdatePayloadInvalido
    });
    
    const body = await responsePut.json();

    expect(responsePut.status()).toBe(405);

  });

  test('[PUT] - Headers - Deve retornar Content-Type application/json no response', async ({ request }) => {

    const payloadPet = gerarDadosDePetParaSerAtualizado();
    
    const response = await request.post('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPet
    });

    expect(response.status()).toBe(200);

    const payloadPetUpdate = {
        id: `${payloadPet.id}`,
        category: {
          id: 1010,
          name: "outseraCategoria"
        },
        name: "biscoitoAtualizado",
        photoUrls: ["string"],
        tags: [
          {
            id: 2020,
            name: "outseratag"
          }
        ],
        status: "available"
    };

    const responsePut = await request.put('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPetUpdate
    });
    
    const body = await responsePut.json();
       
    const contentType = responsePut.headers()['content-type'];
    expect(contentType).toContain('application/json');    

  });

  test.skip('[PUT] - BUG DOC - Headers - Deve retornar header com Content-Type como inválido', async ({ request }) => {

    const payloadPet = gerarDadosDePetParaSerAtualizado();
    
    const response = await request.post('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPet
    });

    expect(response.status()).toBe(200);

    const payloadPetUpdate = {
        id: `${payloadPet.id}`,
        category: {
          id: 1010,
          name: "outseraCategoria"
        },
        name: "biscoitoAtualizado",
        photoUrls: ["string"],
        tags: [
          {
            id: 2020,
            name: "outseratag"
          }
        ],
        status: "available"
    };

    const responsePut = await request.put('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'content-invalido'
      },
      data: payloadPetUpdate
    });  
       
    const contentType = responsePut.headers()['content-invalido'];
    expect(contentType).toBeUndefined();    
    expect(response.status()).toBe(415); 
    
  });

  test('[PUT] - Body - Deve validar o campo ID corretamente', async ({ request }) => {

    const payloadPet = gerarDadosDePetParaSerAtualizado();
    
    const response = await request.post('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPet
    });

    expect(response.status()).toBe(200);

    const payloadPetUpdate = {
        id: `${payloadPet.id}`,
        category: {
          id: 1010,
          name: "outseraCategoria"
        },
        name: "biscoitoAtualizado",
        photoUrls: ["string"],
        tags: [
          {
            id: 2020,
            name: "outseratag"
          }
        ],
        status: "available"
    };
  
    const responsePut = await request.put('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPetUpdate
    });  
    
    const body = await responsePut.json();

    expect(body).toHaveProperty('id', payloadPet.id);
    
  });

  test('[PUT] - Body - Deve validar a alteração do campo name corretamente', async ({ request }) => {

    const payloadPet = gerarDadosDePetParaSerAtualizado();
    
    const response = await request.post('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPet
    });

    expect(response.status()).toBe(200);

    const payloadPetUpdate = {
        id: `${payloadPet.id}`,
        category: {
          id: 1010,
          name: "outseraCategoria"
        },
        name: "biscoitoAtualizado",
        photoUrls: ["string"],
        tags: [
          {
            id: 2020,
            name: "outseratag"
          }
        ],
        status: "available"
    };
  
    const responsePut = await request.put('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPetUpdate
    });  
    
    const body = await responsePut.json();
    expect(body.id).toBe(payloadPet.id);
    expect(body.name).toBe(payloadPetUpdate.name);
    
  });

  test('[PUT] - Body - Deve validar a alteração do campo name da categoria corretamente', async ({ request }) => {

    const payloadPet = gerarDadosDePetParaSerAtualizado();
    
    const response = await request.post('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPet
    });

    expect(response.status()).toBe(200);

    const payloadPetUpdate = {
        id: `${payloadPet.id}`,
        category: {
          id: 1010,
          name: "outseraCategoriaAtualizado"
        },
        name: "biscoitoAtualizado",
        photoUrls: ["string"],
        tags: [
          {
            id: 2020,
            name: "outseratag"
          }
        ],
        status: "available"
    };
  
    const responsePut = await request.put('pet', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: payloadPetUpdate
    });  
    
    const body = await responsePut.json();
    expect(body.id).toBe(payloadPet.id);
    expect(body.category.name).toBe(payloadPetUpdate.category.name);
    
  });

});
