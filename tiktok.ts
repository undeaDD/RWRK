import { ElementHandle, Page } from 'puppeteer';
import { sleep, setupBrowser, gStore } from './generic';

const login = async (page: Page) => {
  await page.goto('https://www.tiktok.com/foryou?showLogin=1&loginType=/login/phone-or-email/email');
  await (await page.waitForSelector('text/Decline optional cookies'))?.click();

  await page.waitForSelector('[name="username"]');
  await page.type('[name="username"]', 'dominic.drees@rwrkstudio.com');
  await page.type('[type="password"]', 'Tlqx\\W(~!EzApQAQs5x');
  await page.keyboard.press('Enter');

  /*
    const readline = require('readline');
    const rl = readline.createInterface({input: process.stdin, output: process.stdout});
    rl.question('Press enter if the captcha is solved:', ans => {

    });
  */

  await sleep(2);
}

const showFollowers = async (page: Page) => {
  await page.goto('https://www.instagram.com/rwrkstudio');
  await page.waitForSelector('[title="Follower"]');
  await sleep(2);
}

const scrapeProfile = async (index: number, page: Page) => {
  console.log(index, "|", page.url());
  await sleep(5);
}

const run = async () => {
  const {browser, page} = await setupBrowser("https://www.tiktok.com");
  await login(page);
  await showFollowers(page);

  // scrap followers
  var index: number = 0; 
  var followers: ElementHandle<Element>[] = [];

  while (true) {
    try {
      // get follower from list
      followers = await page.$$("._aarf > a");
      const follower: ElementHandle = followers[index];
      follower.scrollIntoView();
      
      // get profile link
      const link = await page.evaluate(anchor => anchor.getAttribute('href'), follower);
      
      // open link in new page ( for more infos )
      const tempPage = await browser.newPage();
      await tempPage.goto("https://www.instagram.com" + link);
      await scrapeProfile(index, tempPage);
      await tempPage.close();
    
      // goto next follower
      index++;
    } catch (error) {
      console.log(error);
      break;
    }
  }

  await browser.close();
}

run();