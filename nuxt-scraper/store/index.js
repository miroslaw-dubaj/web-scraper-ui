export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {

      await dispatch('job/getJobs', {
        url:
          'https://www.netgun.pl/wyszukiwanie?query=&provinces%5B%5D=podkarpackie',
        structure: {
          titleText: '.title h3',
          titleDesc: '.info p',
          titlePrice: '.price span',
          titleURL: 'a',
          titleDate: '.PublicationDate span[title]',
          advertImage: '.thumb img',
          listSelector: '.item',
          waitForSelector: '#app #search-announcements .item'
        },
        type: 'netgun',
      })

      await dispatch('job/getJobs', {
        url:
          'https://www.optykamysliwska.pl/wyszukiwanie.html?query=7%2Cdffff%2C100%2C%2C%2C%2C%2C%2C',
        structure: {
          titleText: '.AnnouncementName',
          titleDesc: '.Description',
          titlePrice: '.Price .Regular',
          titleURL: '.Name',
          titleDate: '.PublicationDate span[title]',
          advertImage: '.Image a img',
          listSelector: '.List',
          waitForSelector: '.List'
        },
        type: 'optykamysliwska',
      })

      await dispatch('job/getJobs', {
        url:
          'http://www.armybazar.eu/pl/wyszukiwanie/',
        structure: {
          titleText: 'h2',
          titleDesc: 'p',
          titlePrice: '.cena',
          titleURL: 'h2 > a',
          titleDate: '.datum',
          advertImage: 'a.img img',
          listSelector: '.inner.inzerat',
          waitForSelector: '#content_center'
        },
        type: 'armybazar',
      })

      // await dispatch('job/getJobs', {
      //   url:
      //     'https://armory-auctions.pl/ogloszenia/bron-i-amunicja?page=1&search=&location=Podkarpackie&price_from=&price_to=&type=&sort=&created=7',
      //   structure: {
      //     titleText: 'h2',
      //     titleDesc: 'p',
      //     titlePrice: '.cena.onerow',
      //     titleURL: 'h2 > a',
      //     titleDate: '.datum',
      //     listSelector: '.inner.inzerat',
      //     waitForSelector: '#content_center'
      //   },
      //   type: 'armory-auctions',
      // })

    } catch (error) {}
  },
}
