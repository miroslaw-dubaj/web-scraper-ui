<template>
  <section>
    <select v-model="selectedSortOption" class="form-select mt-3">
      <option value="nameAsc">Po nazwie ogłoszenia (A-Z)</option>
      <option value="nameDesc">Po nazwie ogłoszenia  (Z-A)</option>
      <option value="priceAsc">Od najtańszych (Min do Max)</option>
      <option value="priceDesc">Od najdroższych (Max do Min)</option>
      <option value="dateDesc">Od najnowszych (New to Old)</option>
      <option value="dateAsc">Od najstarszych (Old to New)</option>
    </select>
    <div class="row mt-5">
      <div class="card-group">
        <div class="row">
          <!-- <div
            v-for="(job, i) in jobs"
            :key="i"
            class="col-sm-6 col-md-4 col-lg-3 pb-3 d-flex flex-column justify-content-between"
          >
            <Job :job="job" />
          </div> -->
                <div
        v-for="(job, i) in sortedJobs"
        :key="i"
        class="col-sm-6 col-md-4 col-lg-3 pb-3 d-flex flex-column justify-content-between"
      >
        <div
          v-if="i !== 0 && i % 11 === 0"
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
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      selectedSortOption: 'nameAsc', // Default sort option
    };
  },
  computed: {
    // ...mapState({
    //   jobs: (state) => {
    //     return [...state.job.jobs].map((job) => {
    //       return {
    //         ...job,
    //         price: String(job.price).replace('zł', '').trim(),
    //         imgUrl: job.imgUrl || '/no-image.jpg',
    //       }
    //     })
    //   },
    //   sortedJobs: state => state.job.sortedJobs,
    // }),
        ...mapGetters('job', ['sortedJobs']),
  },
  watch: {
    selectedSortOption(newSortOption) {
      this.setSortOption(newSortOption);
    },
  },
  methods: {
    ...mapActions('job', ['setSortOption']),
  },
  created() {
    this.setSortOption(this.selectedSortOption);
  },
}
</script>
<style></style>
