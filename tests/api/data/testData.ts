import { faker } from '@faker-js/faker';


export const geradorHeader = () => {
    return {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };
};

export function gerarDadosDePetValido() {
    return {
      id: faker.number.int({ min: 90000000, max: 99999999 }), 
      category: {
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.animal.type() 
      },
      name: faker.animal.dog(), 
      photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
      tags: [
        {
          id: faker.number.int({ min: 2000, max: 9999 }),
          name: faker.word.adjective() 
        }
      ],
      status: faker.helpers.arrayElement(['available', 'pending', 'sold'])
    };
}

export function gerarDadosDePetParaSerAtualizado() {
    return {
      id: faker.number.int({ min: 333, max: 333 }), 
      category: {
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.animal.type() 
      },
      name: faker.animal.dog(), 
      photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
      tags: [
        {
          id: faker.number.int({ min: 2000, max: 9999 }),
          name: faker.word.adjective() 
        }
      ],
      status: faker.helpers.arrayElement(['available', 'pending', 'sold'])
    };
}

export function gerarDadosDePetValidoAtualizado() {
    return {
      id: faker.number.int({ min: 80000000, max: 80000000 }), 
      category: {
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.animal.type() 
      },
      name: faker.animal.dog(), 
      photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
      tags: [
        {
          id: faker.number.int({ min: 2000, max: 9999 }),
          name: faker.word.adjective() 
        }
      ],
      status: faker.helpers.arrayElement(['available', 'pending', 'sold'])
    };
}

export function gerarDadosDePetValidoStatusAvailable() {
    return {
      id: faker.number.int({ min: 90000000, max: 99999999 }), 
      category: {
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.animal.type() 
      },
      name: faker.animal.dog(), 
      photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
      tags: [
        {
          id: faker.number.int({ min: 2000, max: 9999 }),
          name: faker.word.adjective() 
        }
      ],
      status: faker.helpers.arrayElement(['available'])
    };
}

export function gerarDadosDePetValidoStatusAvailableComId() {
    return {
      id: faker.number.int({ min: 99999998, max: 99999998 }), 
      category: {
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.animal.type() 
      },
      name: faker.animal.dog(), 
      photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
      tags: [
        {
          id: faker.number.int({ min: 2000, max: 9999 }),
          name: faker.word.adjective() 
        }
      ],
      status: faker.helpers.arrayElement(['available'])
    };
}

export function gerarDadosDePetInvalido() {
    return {
      id: faker.number.int({ min: 90000000, max: 99999999 }), 
      category: {        
      },      
      tags: [        
      ],
      status: faker.helpers.arrayElement(['invalido', 'invalido2', 'invalido3'])
    };
}

export function gerarDadosDePetSemCamposObrigatorios() {
    return {
      id: faker.number.int({ min: 90000000, max: 99999999 }), 
      category: {        
      }
    };
}

export function gerarDadosDePetParaSerDeletado() {
    return {
      id: faker.number.int({ min: 444, max: 444 }), 
      category: {
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.animal.type() 
      },
      name: faker.animal.dog(), 
      photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
      tags: [
        {
          id: faker.number.int({ min: 2000, max: 9999 }),
          name: faker.word.adjective() 
        }
      ],
      status: faker.helpers.arrayElement(['available', 'pending', 'sold'])
    };
}

