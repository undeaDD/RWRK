import { ElementHandle, Page } from 'puppeteer';
import { sleep, setupBrowser, gStore } from './generic';

const login = async (page: Page) => {
  await page.goto('https://www.instagram.com/accounts/login/');
  await (await page.waitForSelector('text/Decline optional cookies'))?.click();

  await page.waitForSelector('[name="username"]');
  await page.type('[name="username"]', 'dominic.drees@rwrkstudio.com');
  await page.type('[name="password"]', 'Tlqx\\W(~!EzApQAQs5xgx)tcBlvk^IA^');
  await page.keyboard.press('Enter');
  await sleep(2);

  await (await page.waitForSelector('text/Not Now'))?.click();
  await sleep(2);

  await (await page.waitForSelector('text/Not Now'))?.click();
  await sleep(2);
}

const showFollowers = async (page: Page) => {
  await page.goto('https://www.instagram.com/rwrkstudio/followers/');
  await page.waitForSelector('._aano');
  await sleep(2);
}

const scrapeProfile = async (index: number, page: Page, username: string = "-") => {  
  await sleep(3);

  // fix !!!
  const avatar: ElementHandle<Element> = (await page.$$("img[alt$='profile picture']"))[1];
  const avatarUrl: string = await page.evaluate(anchor => anchor?.getAttribute('src') ?? "-", avatar);

  // fix !!!
  const name: ElementHandle<Element> = (await page.$$("div > span[dir='auto']"))[0];
  const nameText: string = await page.evaluate(anchor => anchor?.textContent ?? "-", name);

  var bioText = "-";
  try {
    const bio: ElementHandle<Element> = (await page.$$("div > h1[dir='auto']"))[0];
    bioText = await page.evaluate(anchor => anchor?.textContent ?? "-", bio);
  } catch (error) {}

  const numbers: ElementHandle<Element>[] = await page.$$(".html-span");
  const posts: string = await page.evaluate(anchor => anchor.textContent ?? "0", numbers[0]);
  const followers: string = await page.evaluate(anchor => anchor.textContent ?? "0", numbers[1]);
  const following: string = await page.evaluate(anchor => anchor.textContent ?? "0", numbers[2]);

  const noContent: ElementHandle<Element> = (await page.$$("div > span[dir='auto']"))[1];
  const isBot: boolean = (await page.evaluate(anchor => anchor.textContent ?? "", noContent) === "No Posts Yet");

  const notVisible: ElementHandle<Element>[] = (await page.$$("div > h2"));
  const isPrivate = notVisible.length === 1;

  await gStore({
    index: index,

    avatar: avatarUrl,
    username: username,
    realName: nameText,
    bio: bioText,

    posts: posts,
    followers: followers,
    following: following,

    isPrivate: isPrivate,
    isBot: isBot
  });

  await sleep(2);
}

const run = async () => {
  const {browser, page} = await setupBrowser("https://www.instagram.com");
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
      await scrapeProfile(index, tempPage, link?.replace("\/\g", ""));
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