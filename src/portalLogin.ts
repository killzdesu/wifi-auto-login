const puppeteer = require('puppeteer');
require('dotenv').config()

const login = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // const url = 'http://localhost:5000'
  const url = 'http://192.168.8.254/portal/user-authen.php'
  try {
    await page.goto(url);

    const USER = process.env.PORTAL_USER
    const PASSWD = process.env.PORTAL_PASSWORD

    await page.type('#txtLogin', USER, { delay: 100 })
    await page.type('#txtPasswd', PASSWD, { delay: 100 })
    await page.screenshot({ path: 'pre-login.png' });
    await page.click('#btnLogin')
    await page.waitForNavigation()
    await page.screenshot({ path: 'post-login.png' });

    await browser.close();
    return true
  } catch(err) {
    await browser.close();
    return false
  }
}

export default login;
