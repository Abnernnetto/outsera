Feature: Login BugBank

  Scenario: Registro e login válidos
    Given que estou na página de login
    When acesso a tela de registro
    And eu realizo o registro de um novo usuário
    And faço login com a conta criada
    Then devo ser redirecionado para o Dashboard
  
  Scenario: Login com usuário inválido
    Given que estou na página de login
    When insiro usuário inválido
    Then devo ver uma mensagem de erro

  Scenario: Login com senha inválida
    Given que estou na página de login
    When insiro senha inválida
    Then devo ver uma mensagem de erro

  Scenario: Login preenchendo somente usuário
    Given que estou na página de login
    When insiro apenas o usuário e não preencho a senha
    Then devo ver uma mensagem de campo requerido

   Scenario: Login preenchendo somente senha
    Given que estou na página de login
    When insiro apenas a senha e não preencho o usuário
    Then devo ver uma mensagem de campo requerido