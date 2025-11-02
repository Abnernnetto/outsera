# 🧠 Known Issues — Swagger Petstore API & Demo Blaze E2E

Este documento tem como objetivo registrar as inconsistências encontradas durante a execução dos testes automatizados de **API (Swagger Petstore)** e **E2E Web (Demo Blaze)**, ambos desenvolvidos com **Playwright + TypeScript**.  
As falhas listadas representam divergências entre o comportamento **esperado** (documentação ou regras de negócio) e o comportamento **real** observado.

---

## 🧩 Parte 1 — Swagger Petstore API

### 1. [POST] /pet — Campos ausentes não validados
**Descrição:** A documentação informa que campos obrigatórios ausentes devem retornar **400 - Invalid input**.  
**Comportamento Obtido:** A API aceita qualquer payload, mesmo com campos vazios ou ausentes, retornando **200 OK**.  
**Reprodução:**
```bash
POST /pet
{
  "id": 12345,
  "name": "",
  "status": "available"
}
```
**Status:** Confirmado — Bug na API pública.

---

### 2. [POST] /pet — Header inválido não tratado
**Descrição:** Ao enviar `Content-Type` inválido, a resposta esperada seria **415 - Unsupported Media Type**.  
**Comportamento Obtido:** A API retorna **200 OK**, ignorando o tipo de header incorreto.  
**Reprodução:**
```bash
POST /pet
Content-Type: text/plain
```
**Status:** Confirmado — Documentação incorreta.

---

### 3. [GET] /pet/findByStatus — Status inválido não tratado
**Descrição:** Ao buscar pets com status inexistente, a resposta deveria ser **400 - Invalid Status Value**.  
**Comportamento Obtido:** A API retorna **200 OK**, listando resultados mesmo com parâmetros inválidos.  
**Reprodução:**
```bash
GET /pet/findByStatus?status=invalid
```
**Status:** Confirmado — Bug de validação.

---

### 4. [PUT] /pet — Atualização com ID inexistente
**Descrição:** A documentação indica que IDs inexistentes devem retornar **404 - Not Found**.  
**Comportamento Obtido:** A API retorna **500 Internal Server Error**.  
**Reprodução:**
```bash
PUT /pet
{
  "id": 99999999,
  "name": "Dog Not Exists",
  "status": "available"
}
```
**Status:** Confirmado — Erro de tratamento de exceção.

---

### 5. [PUT] /pet — Atualização com ID inválido
**Descrição:** IDs em formato incorreto deveriam retornar **400 - Bad Request**.  
**Comportamento Obtido:** A API retorna **200 OK**, ignorando a validação de formato.  
**Reprodução:**
```bash
PUT /pet
{
  "id": "invalid_id",
  "name": "Dog Invalid",
  "status": "available"
}
```
**Status:** Confirmado — Validação ausente.

---

### 6. [PUT] /pet — Payload inválido não tratado
**Descrição:** Quando enviado um payload com estrutura incorreta, o retorno esperado seria **405 - Method Not Allowed**.  
**Comportamento Obtido:** A API responde **200 OK**, aceitando dados fora do padrão esperado.  
**Reprodução:**
```bash
PUT /pet
{
  "invalid_field": "abc"
}
```
**Status:** Confirmado — Bug de validação.

---

### 7. [PUT] /pet — Header inválido não tratado
**Descrição:** A documentação define retorno **415 - Unsupported Media Type** quando o cabeçalho Content-Type é inválido.  
**Comportamento Obtido:** A API retorna **200 OK**.  
**Reprodução:**
```bash
PUT /pet
Content-Type: content/invalido
```
**Status:** Confirmado — Documentação inconsistente.

---

## 🛒 Parte 2 — Demo Blaze (E2E Checkout)

### 1. Checkout com ano inferior ao atual é permitido
**Descrição:** O formulário de compra no site **Demo Blaze** permite concluir a compra mesmo com um **ano anterior ao atual**.  
**Comportamento Esperado:** O sistema deveria impedir a finalização e exibir mensagem de erro de validação.  
**Comportamento Obtido:** A compra é concluída normalmente com a mensagem *"Thank you for your purchase!"*.  
**Reprodução:**
1. Acesse o produto `Samsung galaxy s6`;
2. Adicione ao carrinho e clique em **Place Order**;
3. Preencha o formulário com `Year: 2022` (inferior ao atual);
4. Clique em **Purchase** → Pedido é finalizado com sucesso.  
**Status:** Confirmado — Bug de validação no campo *Year*.

---

## 🔍 Conclusão

As inconsistências documentadas demonstram:
- Falhas de **validação de entrada e tratamento de exceções** na API Swagger Petstore.  
- Falta de **validação lógica de dados** no fluxo de checkout do Demo Blaze.  

> Mesmo com as falhas, os testes automatizados foram mantidos e **marcados com tags** (`@bug`, `@negative`) para evidenciar o comportamento real observado durante a execução.

---

✍️ **Autor:**  
**Abner Nunes Netto** — QA Engineer (API & E2E Automation)
