import { test, expect } from '@playwright/test';
import { gerarDadosDePetValido, gerarDadosDePetInvalido, gerarDadosDePetSemCamposObrigatorios } from '../data/testData';



test.describe('Petstore API - Create a new pet to the store - POST', () => {

  test('[POST] - Status Code - Deve adicionar um pet na store retornando status 200', async ({ request }) => {

    const payloadPet = gerarDadosDePetValido();
    const response = await request.post('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPet
    });
    
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('id', payloadPet.id);
    expect(body).toHaveProperty('name', payloadPet.name);
    expect(body).toHaveProperty('status', payloadPet.status);
    expect(body.category.id).toBe(payloadPet.category.id);
    expect(body.tags[0].name).toBe(payloadPet.tags[0].name);  

  });

  test('[POST] - Status Code - Deve recusar ao adicionar um pet com dados inválidos na store retornando status 415', async ({ request }) => {

    const payloadPetInvalido = gerarDadosDePetInvalido();    

    const response = await request.post('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'text/plain'
      },
      data: payloadPetInvalido
    });    

    expect(response.status()).toBe(415);

  });  

  test.skip('[POST] - BUG DOC - Status Code - Deve recusar o adicionar de um pet com campos ausentes na store retornando status 400', async ({ request }) => {

    const payloadSemCamposObrigatorios = gerarDadosDePetSemCamposObrigatorios();

    const response = await request.post('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadSemCamposObrigatorios
    });
    
    expect(response.status()).toBe(400);

  });

  test('[POST] - Headers - Deve retornar Content-Type application/json no response', async ({ request }) => {

    const payloadPet = {
      id: 98508481,
      category: {
        id: 1010,
        name: "outseraCategoria"
      },
      name: "outsera",
      photoUrls: ["string"],
      tags: [
        {
          id: 2020,
          name: "outseratag"
        }
      ],
      status: "available"
    };

    const response = await request.post('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPet
    });
       
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');    

  });

  test.skip('[POST] - BUG DOC - Headers - Deve retornar header com Content-Type como inválido', async ({ request }) => {

    const payloadPet = gerarDadosDePetValido();

    const response = await request.post('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'content-invalido'
      },
      data: payloadPet
    });
     
    const contentType = response.headers()['content-invalido'];
    expect(contentType).toBeUndefined();
    expect(response.status()).toBe(415);
    
  });

  test('[POST] - Body - Deve validar o campo ID corretamente', async ({ request }) => {

    const payloadPet = gerarDadosDePetValido();

    const response = await request.post('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPet
    });
    const body = await response.json();

    expect(body).toHaveProperty('id', payloadPet.id);
    
  });

  test('[POST] - Body - Deve validar o nome da categoria corretamente', async ({ request }) => {

    const payloadPet = gerarDadosDePetValido();


    const response = await request.post('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPet
    });
    const body = await response.json();

    expect(body.category.name).toBe(payloadPet.category.name);
    
  });

  test('[POST] - Body - Deve validar o nome do animal corretamente', async ({ request }) => {

    const payloadPet = gerarDadosDePetValido();

    const response = await request.post('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPet
    });
    const body = await response.json();
    expect(body.id).toBe(payloadPet.id);
    expect(body.name).toBe(payloadPet.name);
    
  });

  test('[POST] - Body - Deve validar o status do animal corretamente', async ({ request }) => {

    const payloadPet = gerarDadosDePetValido();

    const response = await request.post('pet', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: payloadPet
    });
    const body = await response.json();

    expect(body.status).toBe(payloadPet.status);
    
  });
    
});
