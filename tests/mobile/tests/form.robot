***Settings***
Resource    ../resources/base.resource

***Test Cases***

Deve preencher Formulários
    Start session
    Get started
    Navegate to     Formulários
    Go to item      Cadastro    Crie sua conta.

    Input Text      id=com.qaxperience.yodapp:id/etUsername       Outsera
    Input Text      id=com.qaxperience.yodapp:id/etEmail          outsera@gmail.com
    Input Text      id=com.qaxperience.yodapp:id/etPassword       123456
    Select Level    Padawan

    Click Element   id=com.qaxperience.yodapp:id/btnSubmit

    Wait Until Page Contains    Tudo certo, boas vindas ao Yodapp!    5
    Page Should Contain Text    Tudo certo, boas vindas ao Yodapp!



    Close session


***Keywords***
Select Level
    [Arguments]     ${level}
    
    Click Element                    id=com.qaxperience.yodapp:id/spinnerJob
    Wait Until Element Is Visible  	 class=android.widget.ListView
    Click Text                       ${level}