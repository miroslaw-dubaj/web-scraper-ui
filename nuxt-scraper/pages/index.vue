<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">gun-scrapper v. 0.1</h1>
      <h2 class="subtitle">Najnowsze ogłoszenia z Podkarpacia</h2>
      <div class="links">
        <a href="https://www.buymeacoffee.com/miroslaw.dubaj"
          ><img
            src="https://img.buymeacoffee.com/button-api/?text=Postaw browara za fatygę&emoji=🍻&slug=miroslaw.dubaj&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff"
        /></a>
      </div>
      <Jobs />
      <div class="links mb-5">
        <a
          href="https://github.com/Kaperskyguru/nuxt-web-scraping-puppeteer"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey mr-3"
        >
          Fork Projektu GitHub
        </a>
        <a href="https://www.buymeacoffee.com/miroslaw.dubaj" class="margin-left"
          ><img
            src="https://img.buymeacoffee.com/button-api/?text=Postaw browara za fatygę&emoji=🍻&slug=miroslaw.dubaj&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff"
        /></a>
        <a
          href="https://copilot.github.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          Projekt współtworzony z GitHub Copilot
        </a>
      </div>
      <div class="links mb-5">Created with ❤️ by <a href="https://dubaj.dev/">dubaj.dev</a></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.margin-left {
  margin-left: 15px;
}
</style>
