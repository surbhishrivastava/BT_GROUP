const { Given, When, Then } = require('@wdio/cucumber-framework');
const assert = require('assert');

// Utility function to wait for an element to be visible
async function waitForVisible(selector, timeout = 5000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
}

Given('I am on the Gmail login page', async () => {
    await browser.url('https://mail.google.com/');
});

When('I log in with valid credentials', async () => {
    const emailField = await $('email_css');
    await emailField.setValue('your-email@gmail.com');
    const Button = await $('button_css"]');
    await Button.click();

    
    await waitForVisible('input[name="password"]');
    const passwordField = await $('input[name="password"]');
    await passwordField.setValue('your-password');
    const loginButton = await $('login_css');
    await loginButton.click();
});

When('I log in with invalid credentials', async () => {
    const emailField = await $('#email_css');
    await emailField.setValue('invalid-email@gmail.com');
    const Button = await $('button_css');
    await Button.click();

    await waitForVisible('input[name="password"]');
    const passwordField = await $('input[name="password"]');
    await passwordField.setValue('invalid-password');
    const loginButton = await $('button_css');
    await loginButton.click();
});

Then('I should see my inbox', async () => {
    await waitForVisible('inbox_css');
    const inboxTitle = await $('title');
    assert.strictEqual(await inboxTitle.getText(), 'Inbox');
});



Given('I am logged in to Gmail', async () => {
    
    await browser.url('https://mail.google.com/');
});

When('I search for the latest email', async () => {
    await waitForVisible('search_css');
    const searchField = await $('input[label="Search mail"]');
    await searchField.setValue('label:inbox is:unread');
    const searchButton = await $('button[label="Search Mail"]');
    await searchButton.click();
});

Then('I should see the email content', async () => {
    await waitForVisible('div[role="main"]');
    const latestEmail = await $('div[role="main"]');
    await latestEmail.click();
    
    const emailContent = await $('div[role="document"]');
    assert(emailContent.getText().length > 0);
});

Given('I have an email to delete', async () => {

    await waitForVisible('div[role="listitem"]');
});

When('I delete the email', async () => {
    const latestEmail = await $('div[role="main"] ');
    await latestEmail.click();
    await waitForVisible('div[label="Delete"]');
    const deleteButton = await $('div[label="Delete"]');
    await deleteButton.click();
});

Then('I should see it in the trash', async () => {
    await browser.url('https://mail.google.com/mail/u/0/#trash');
    const trashedEmail = await $('div[role="main"] div[role="listitem"]:first-child');
    assert(trashedEmail.getText().includes('Trashed Email Subject'));
});

When('I log out', async () => {
    const accountButton = await $('Logout_css');
    await accountButton.click();
    const signOutButton = await $('div[label="Logout"]');
    await signOutButton.click();
});

Then('I should be on the login page', async () => {
    await waitForVisible('Login_css');
    const emailField = await $('#Login_css');
    assert(emailField.isDisplayed());
});
