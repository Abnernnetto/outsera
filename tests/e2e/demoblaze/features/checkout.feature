Feature: Checkout no Demo Blaze

Scenario: Validação de compra concluída com sucesso
    Given que estou na página Home de produtos do DemoBlaze
    When eu seleciono o produto "Samsung galaxy s6"
    When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
    When eu abro o carrinho para visualizar meus produtos
    When eu inicio a ordem do pedido
    When eu preencho os meus dados pessoais do formulario para realização da compra  
    Then devo ver a mensagem de sucesso "Thank you for your purchase!" com os dados da compra

@negative
Scenario: Validação do campo Name obrigatório no Checkout
    Given que estou na página Home de produtos do DemoBlaze
    When eu seleciono o produto "Samsung galaxy s6"
    When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
    When eu abro o carrinho para visualizar meus produtos
    When eu inicio a ordem do pedido
    When eu tento finalizar a compra deixando o campo Nome vazio
    Then o pedido não deve ser finalizado

@negative
Scenario: Validação do campo Credit card obrigatório no Checkout
    Given que estou na página Home de produtos do DemoBlaze
    When eu seleciono o produto "Samsung galaxy s6"
    When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
    When eu abro o carrinho para visualizar meus produtos
    When eu inicio a ordem do pedido
    When eu tento finalizar a compra deixando o campo Credit Card vazio
    Then o pedido não deve ser finalizado

@negative @bug
Scenario: Validação do campo Year com ano inferior ao atual no Checkout
    Given que estou na página Home de produtos do DemoBlaze
    When eu seleciono o produto "Samsung galaxy s6"
    When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
    When eu abro o carrinho para visualizar meus produtos
    When eu inicio a ordem do pedido
    When eu informo um ano inferior ao atual
    Then o pedido não deve ser finalizado

@only @negative 
Scenario: Validação da remoção do produto no carrinho
    Given que estou na página Home de produtos do DemoBlaze
    When eu seleciono o produto "Samsung galaxy s6"
    When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
    When eu abro o carrinho para visualizar meus produtos
    When removo o produto do carrinho    
    Then o carrinho deve ficar vazio sem nenhum produto