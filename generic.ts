import PuppeteerExtra from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export const sleep = async (sec = 5) => {
    await new Promise(r => setTimeout(r, sec * 1000));
}

export const setupBrowser = async (url: string) => {
    PuppeteerExtra.use(StealthPlugin());
    const browser = await PuppeteerExtra.launch({headless: false, args: ["--app=" + url, "--window-size=900,900", "--disable-extensions", "--password_manager_enabled=false"]});
    const page = (await browser.pages())[0];
    await page.setViewport({width: 900, height: 900});
    return {browser, page};
}

export const gStore = async (json: Object) => {
    await fetch("https://deltasiege.de/api/instasheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json)
    })
}