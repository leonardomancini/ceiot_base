const {Builder, By, until, Key} = require('selenium-webdriver');
const {expect} = require('chai');
var firefox = require('selenium-webdriver/firefox');
let TIMEOUT=200000;

describe('web application test with selenium webdriver', function() {
  let driver;
  this.timeout(TIMEOUT)
  const options = new firefox.Options();
  
  before(async function() {
    driver = new Builder().forBrowser('firefox').build();
  });  
  it('check login ask for username', async function() {
    this.timeout(TIMEOUT);
    await driver.get('http://localhost:4200');

    await driver.findElement(By.id('username')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('pwd')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('loginBtn')).then(element=> element.click());	   
    let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-list-user/div/table/tbody/tr[1]/td[3]')),TIMEOUT);
    let value   = await element.getText();
    expect(value).to.equal('admin@samauec.org');	   
  });

  it('login success', async function() {
    this.timeout(TIMEOUT);
    await driver.get('http://localhost:4200');

    await driver.findElement(By.id('username')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('pwd')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('loginBtn')).then(element=> element.click());	   
    let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-list-user')),TIMEOUT);
    let value   = await element.getText();
    expect(element).to.not.equal(null);	   
  });


  it('login with user that not exists', async function() {
    this.timeout(TIMEOUT);
    await driver.get('http://localhost:4200');

    await driver.findElement(By.id('username')).then(element=> element.sendKeys('admin2'));	   
    await driver.findElement(By.id('pwd')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('loginBtn')).then(element=> element.click());	   
    let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-login/div/div/form/div[3]')),TIMEOUT);
    let value   = await element.getText();
    expect(value).to.equal('Invalid credentials.');	   
  });

  it('login with an user that exists and incorrect pass', async function() {
    this.timeout(TIMEOUT);
    await driver.get('http://localhost:4200');

    await driver.findElement(By.id('username')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('pwd')).then(element=> element.sendKeys('admin2'));	   
    await driver.findElement(By.id('loginBtn')).then(element=> element.click());	   
    let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-login/div/div/form/div[3]')),TIMEOUT);
    let value   = await element.getText();
    expect(value).to.equal('Invalid credentials.');	   
  });

  
  it('user can open new user window', async function() {
    this.timeout(TIMEOUT);
    await driver.get('http://localhost:4200');

    await driver.findElement(By.id('username')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('pwd')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('loginBtn')).then(element=> element.click());	  
   
    let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/nav/button')),TIMEOUT);
    let value   = await element.isEnabled();
    expect(value).to.equal(true);	   
  });

  it('create a new user succesfully', async function() {
    this.timeout(TIMEOUT);
    await driver.get('http://localhost:4200');

    await driver.findElement(By.id('username')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('pwd')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('loginBtn')).then(element=> element.click());	  

    await driver.wait(until.elementLocated(By.xpath(' /html/body/app-root/app-list-user/div/button'))).then(element=> element.click());	  
   
    let username = 'test_automation' + Date.now();
    let email = username + '@yopmail.com';

    await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-add-user/div/form/div[1]/input')),TIMEOUT).sendKeys(username)
    await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-add-user/div/form/div[2]/input')),TIMEOUT).sendKeys(email)
    await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-add-user/div/form/div[3]/input')),TIMEOUT).sendKeys("test1234")
    

    await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-add-user/div/form/button')),TIMEOUT).then(element=> element.click());	 

    let usernameCreated = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-list-user/div/table/tbody/tr[last()]/td[2]')),TIMEOUT)
    let value   = await usernameCreated.getText();
    expect(value).to.equal(username);	   
  });

  after( () =>
    driver && driver.quit()
  );
});

