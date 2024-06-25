from appium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time

desired_caps = {
    'platformName': 'Android',
    'platformVersion': 'Your Android Version',
    'deviceName': 'Your Device Name',
    'appPackage': 'com.google.android.gm',
    'appActivity': 'com.google.android.gm.ConversationListActivityGmail',
    'automationName': 'UiAutomator2',
    
}

driver = webdriver.Remote('Appium_remote_url', desired_caps)

try:
    wait = WebDriverWait(driver, 30)
    email_field = wait.until(EC.presence_of_element_located((By.XPATH, "Login_xath")))
    email_field.send_keys('your-email@gmail.com')
    next_button = driver.find_element(By.XPATH, "Click_css")
    next_button.click()

    password_field = wait.until(EC.presence_of_element_located((By.XPATH, "Password_xpath")))
    password_field.send_keys('your-password')
    login_button = driver.find_element(By.XPATH, "Login")
    login_button.click()

    time.sleep(5)  

    latest_email = wait.until(EC.presence_of_element_located((By.XPATH, "Latest[@index='0']")))
    latest_email.click()

    delete_button = wait.until(EC.presence_of_element_located((By.XPATH, "//span[class='Delete']")))
    delete_button.click()

    
    
    trash_option = wait.until(EC.presence_of_element_located((By.XPATH, "//android.widget.TextView[@text='Trash']")))
    trash_option.click()

    time.sleep(5)  
    deleted_email = wait.until(EC.presence_of_element_located((By.XPATH, "//android.view[@index='0']")))

    if deleted_email:
        print("Email successfully moved to Trash.")
    else:
        print("Email not found in Trash.")

    

    logout_account = wait.until(EC.presence_of_element_located((By.XPATH, "//android.widget.TextView[@text='logout']")))
    logout_account.click()
    

finally:
    driver.quit()
