const puppeteer = require('puppeteer')
// const jobUrl = `https://www.optykamysliwska.pl/wyszukiwanie.html?query=7%2Cdffff%2C100%2C%2C%2C%2C%2C%2C` // SITE URL HERE
let page
let browser
let cardArr = []
let postData = ''

class Jobs {
  // We will add 3 methods here

  // Initializes and create puppeteer instance
  static async init(payload) {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        // '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu',
      ],
    })

    // page = await browser.newPage()
    const pages = await browser.pages()
    page = pages[0]
    const postData =
      'search_slovo=Wyszukiwanie&search_kategoria[]=1&search_lokalita[]=9&search_typ=0&search_cena_od=0&search_cena_do=&search_obdobie=4&search=Szukaj'

    page.on('request', (interceptedRequest) => {
      if (payload.type === 'armybazar') {
      interceptedRequest.continue({
        method: 'POST',
        postData: postData,
        headers: {
          ...interceptedRequest.headers(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })}
      else {
        interceptedRequest.continue()
      }
    })

    await page.setRequestInterception(true)

    switch (payload.type) {
      case 'optykamysliwska':
        await this.optykamysliwska(payload)
        break
      case 'netgun':
        await this.netgun(payload)
        break
      case 'armybazar':
        await this.armybazar(payload)
        break
      default:
        break
    }
  }

  static async optykamysliwska(payload) {
    await Promise.race([
      await page
        .goto(payload.url, { waitUntil: 'networkidle2' })
        .catch(() => {}),
      await page.waitForSelector('#lbClose').catch(() => {}),
      await page.click('#lbClose').catch(() => {}),
      await page
        .waitForSelector(payload.structure.waitForSelector)
        .catch(() => {}),
    ])
  }

  static async netgun(payload) {
    await Promise.race([
      await page
        .goto(payload.url, { waitUntil: 'networkidle2' })
        .catch(() => {}),
      await page
        .waitForSelector(
          '#cookiesModal > div > div > div.modal-footer > button'
        )
        .catch(() => {}),
      await page
        .click('#cookiesModal > div > div > div.modal-footer > button')
        .catch(() => {}),
      await page
        .waitForSelector(payload.structure.waitForSelector)
        .catch(() => {}),
    ])
  }

  static async armybazar(payload) {

    await Promise.race([
      await page
        .goto(payload.url, { waitUntil: 'networkidle2' })
        .catch(() => {}),
      await page.waitForSelector('#close-warning').catch(() => {}),
      await page.click('#close-warning').catch(() => {}),
      await page
        .waitForSelector(payload.structure.waitForSelector)
        .catch(() => {}),
      // await page.waitForTimeout(3000).catch(() => {}), // wait for 3 seconds
    ])
  }

  // Visits the page, retrieves the job
  static async resolver(payload) {
    await this.init(payload)
    const jobURLs = await page.evaluate(
      (args) => {
        const cards = document.querySelectorAll(args[0].structure.listSelector)
        const parser = new DOMParser()
        cardArr = Array.from(cards)
        const cardLinks = []
        // cardLinks.push({
        //   titleText: JSON.stringify(cardArr.map(element => element.innerHTML)[2]),
        // })
        if (args[0].type === 'armybazar') {
          cardArr = cardArr.map((element) => element.innerHTML)
          cardArr = cardArr.map((element, i) => {
            let el = parser.parseFromString(element.trim(), 'text/html')
            if (el.documentElement.childNodes.length > 0) {
              return el
            } else {
              return element
            }
          })
          // cardArr = cardArr.slice(1, 1);
          cardArr.forEach((el, i) => {
            if (el.querySelector(args[0].structure.titleText) !== null) {
              cardLinks.push({
                titleText: el.querySelector(args[0].structure.titleText)?.textContent,
                titleURL: el.querySelector(args[0].structure.titleURL)?.href,
                titleDesc: el.querySelector(args[0].structure.titleDesc)?.textContent,
                titlePrice: el.querySelector(args[0].structure.titlePrice)?.textContent,
                titleDate: el.querySelector(args[0].structure.titleDate)?.textContent,
                advertImage: el.querySelector(args[0].structure.advertImage)?.src,
                origin: args[0].type,
              })
            }
          })
          // // cardLinks.push({
          // //   titleText: cardArr[1].querySelector('h2').textContent,
          // // })
        } else {
          cardArr.map((card) => {
            const titleText = card.querySelector(args[0].structure.titleText)?.textContent
            const cardDesc = card.querySelector(args[0].structure.titleDesc)?.textContent
            const cardPrice = card.querySelector(args[0].structure.titlePrice)?.textContent
            const cardDate = card
              .querySelector(args[0].structure.titleDate)?.getAttribute('title')
            const titleURL = card.querySelector(args[0].structure.titleURL)?.href
            const advertImage = card.querySelector(args[0].structure.advertImage)?.src
            cardLinks.push({
              // titleText: JSON.stringify(args),
              titleText: titleText,
              titleURL: titleURL,
              titleDesc: cardDesc,
              titlePrice: cardPrice,
              titleDate: cardDate,
              advertImage: advertImage,
              origin: args[0].type,
            })
          })
        }
        return cardLinks
      },
      [payload]
    )
    return jobURLs
  }

  // Converts the job to array
  static async getJobs(payload) {
    const jobs = await this.resolver(payload)
    let pages = await browser.pages()
    await Promise.all(pages.map((page) => page.close()))
    await browser.close()
    const data = {}
    data.jobs = this.resolveJob(jobs)
    data.total_jobs = jobs.length
    return data
  }

  static resolveJob(jobs) {
    const resolvedJob = jobs.map((job) => {
      const resolvedJob = {}
      resolvedJob.title = job.titleText
      resolvedJob.website = job.titleURLHost
      resolvedJob.description = job.titleDesc
      resolvedJob.url = job.titleURL
      resolvedJob.price = job.titlePrice
      resolvedJob.imgUrl = job.advertImage
      resolvedJob.origin = job.origin
      resolvedJob.date = job.titleDate
      return resolvedJob
    })
    return resolvedJob
  }
}
export default Jobs
