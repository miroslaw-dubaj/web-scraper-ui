<template>
  <div class="container pt-3">
    <div class="row">
      <div
        v-for="(job, i) in jobs"
        :key="i"
        class="col-sm-6 col-md-4 col-lg-3 pb-3 d-flex flex-column justify-content-between"
      >
        <div
          v-if="i % 16 === 0"
          class="d-flex justify-content-center align-items-center pb-3"
        >
          <a href="https://www.buymeacoffee.com/miroslaw.dubaj"
            ><img
              src="https://img.buymeacoffee.com/button-api/?text=Postaw browara za fatygę&emoji=🍻&slug=miroslaw.dubaj&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff"
          /></a>
        </div>
        <div class="d-flex flex-grow-1">
          <Job :job="job" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store, params, query }) {
    const getJobs = store.getters['job/getJobs']
    let jobs = getJobs()
    if (!jobs.length) {
      jobs = await store.dispatch('job/getJobs', {
        url:
          'https://www.optykamysliwska.pl/wyszukiwanie.html?query=7%2Cdffff%2C100%2C%2C%2C%2C%2C%2C',
        structure: {
          titleText: '.AnnouncementName',
          titleDesc: '.Description',
          titlePrice: '.Price',
          titleURL: '.Name',
          titleDate: '.PublicationDate span[title]',
        },
        type: 'optykamysliwska',
      })
    }
    return { jobs }
  },
}
</script>
