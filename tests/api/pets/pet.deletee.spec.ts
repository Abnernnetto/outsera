import { test, expect } from '@playwright/test';
import { gerarDadosDePetParaSerDeletado } from '../data/testData';


test.describe.serial('Petstore API - Delete a pet por ID - POST', () => {

    test('[DELETE] - Status Code - Deve remover um pet na store retornando status 200', async ({ request }) => {

        const payloadPet = gerarDadosDePetParaSerDeletado();
        
        const response = await request.post('pet', {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json'
            },
            data: payloadPet
        });
    
        expect(response.status()).toBe(200);
    
        const body = await response.json();          
            
        const deleteRes = await request.delete(`pet/${body.id}`, {
            headers: {
                  accept: 'application/json',
                  'api_key': 'special-key'
            }
        });
        await new Promise(r => setTimeout(r, 5000));               
        await expect(deleteRes).toBeOK();  
        
        });
    
        
    test.skip('[DELETE] - Status Code - Não deve remover um pet na store inexistente retornando status 404', async ({ request }) => {

            const payloadPet = gerarDadosDePetParaSerDeletado();
            
            const response = await request.post('pet', {
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                data: payloadPet
            });
        
            expect(response.status()).toBe(200);
        
            const body = await response.json();          

            const deleteRes = await request.delete(`pet/${body.id}`, {
                headers: {
                      accept: 'application/json',
                      'api_key': 'special-key'
                }
            });

            await new Promise(r => setTimeout(r, 5000));               
            await expect(deleteRes.status()).toBe(200);
            
            await new Promise(r => setTimeout(r, 2000));               

            const deleteResNovamente = await request.delete(`pet/${body.id}`, {
                headers: {
                      accept: 'application/json',
                      'api_key': 'special-key'
                },
            });    
            await new Promise(r => setTimeout(r, 5000));   
            await expect(deleteResNovamente.status()).toBe(404);            
        
     });
                
});