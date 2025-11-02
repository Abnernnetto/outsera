Feature: Login no OrangeHRM

  Scenario: Login válido
    Given que estou na página de login
    When insiro credenciais válidas
    Then devo ser redirecionado para o Dashboard

  Scenario: Login com usuário inválido
    Given que estou na página de login
    When insiro usuário inválido
    Then devo ver uma mensagem de erro

  Scenario: Login com senha inválida
    Given que estou na página de login
    When insiro senha inválida
    Then devo ver uma mensagem de erro

 Scenario: Login com credenciais inválidas
    Given que estou na página de login
    When insiro credenciais inválidas
    Then devo ver uma mensagem de erro

 Scenario: Login preenchendo somente usuário
    Given que estou na página de login
    When insiro apenas o usuário e não preencho a senha
    Then devo ver uma mensagem de campo requirido

 Scenario: Login preenchendo somente senha
    Given que estou na página de login
    When insiro apenas a senha e não preencho o usuário
    Then devo ver uma mensagem de campo requirido