import JobScrapper from '~/JobScrapper'

export const state = () => ({
  jobs: [],
  total_jobs: 0,
  sortOption: 'nameAsc', // Default sort option
})

export const getters = {
  getJobs: (state) => () => {
    return state.jobs
  },
  sortedJobs: state => {
    const sortOptions = {
      nameAsc: (a, b) => a.title.localeCompare(b.title),
      nameDesc: (a, b) => b.title.localeCompare(a.title),
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      dateAsc: (a, b) => new Date(a.date) - new Date(b.date),
      dateDesc: (a, b) => new Date(b.date) - new Date(a.date),    };

    return [...state.jobs].map((job) => {      
      return {
        ...job,
        title: job.title.toLowerCase().includes('sprzedam') ? job.title.toLowerCase().replace('sprzedam', '').trim() : job.title,
        price: String(job.price).replace('zł', '').trim(),
        imgUrl: job.imgUrl || '/no-image.jpg',
        date: job.date || '01.01.1970',
      }
    }).sort(sortOptions[state.sortOption]);
  },
}

export const mutations = {
  STORE_JOBS(state, payload) {
    state.jobs = [...state.jobs, ...payload.jobs]
    state.total_jobs += payload.total_jobs
  },
  SET_SORT_OPTION(state, sortOption) {
    state.sortOption = sortOption;
  },
}

export const actions = {
  async getJobs({ commit }, payload) {
    const data = await JobScrapper.getJobs(payload)
    if (data.total_jobs) {
      commit('STORE_JOBS', data)
      return data.jobs
    }
  },
  setSortOption({ commit }, sortOption) {
    commit('SET_SORT_OPTION', sortOption);
  },
}
