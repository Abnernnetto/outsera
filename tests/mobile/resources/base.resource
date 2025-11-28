***Settings***

Library     AppiumLibrary

***Variables***
${START}        QAX

***Keywords***

Start session
    Open Application	http://localhost:4723
    ...                 platformName=Android		
    ...                 deviceName=Pixel_7_Pro_API_34
    ...                 automationName=UIAutomator2 
    ...                 app=${CURDIR}/../app/yodapp-beta.apk
    ...                 udid=emulator-5554	
    ...                 autoGrantPermissions=true
    ...                 uiautomator2ServerInstallTimeout=120000
    ...                 newCommandTimeout=300
    Sleep               15
    
Get started
    Wait Until Page Contains    ${START}    25
    Click Text                  ${START}    

Navegate to
    [Arguments]         ${item_text}
    ${hamburguer}       Set Variable         xpath=//android.widget.ImageButton[@content-desc="Open navigation drawer"]

    Wait Until Element Is Visible      ${hamburguer}        15
    Click Element                      ${hamburguer}

    ${menu_item}        Set Variable        xpath=//*[@resource-id="com.qaxperience.yodapp:id/navView"]//*[@text="${item_text}"]

    Wait Until Element Is Visible      ${menu_item}         15
    Click Element                      ${menu_item}

Go to item
    [Arguments]                     ${item}     ${checkpoint}
    Wait Until Page Contains        ${item}        15
    Click Text                      ${item}
    Wait Until Page Contains        ${checkpoint}          15
    


Close session
    Close Application
