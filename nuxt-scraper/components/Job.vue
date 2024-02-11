<template>
  <a :href="job.url" target="_blank" class="flex-grow-1 d-flex">
    <div class="card flex-grow-1 d-flex flex-column">
      <img :src="job.imgUrl" class="card-img-top" alt="Card image" />
      <div class="card-body d-flex flex-column flex-grow-1">
        <div class="card-header m-n1" :style="titleStyle">
          {{ job.price.includes('Do uzgodnienia') ? 'Brak ceny' : (job.price + ' zł') }}
        </div>
        <div class="card-title h1">
          {{ job.title }}
        </div>
        <p class="card-text flex-grow-1">
          {{
            job.description.replace('szczegóły', '').trim().substring(0, 100)
          }}...
        </p>
        <div class="card-footer">
          <small>{{ mapOrigin }} </small>
          <small style="float: right">{{ job.date === "01.01.1970" ? 'Brak daty' : job.date}} </small>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'Job',
  props: {
    job: {
      type: [Array, Object],
      default: () => {},
    },
  },
  computed: {
    titleStyle() {
      const trimPrice = this.job.price.replace('zł', '').trim();
      let color;
      if (trimPrice < 1000) {
        color = '#008000'; // Green
      } else if (trimPrice < 2000) {
        color = '#339900'; // Lime Green
      } else if (trimPrice < 3000) {
        color = '#66B200'; // Yellow Green
      } else if (trimPrice < 4000) {
        color = '#99CC00'; // Lawn Green
      } else if (trimPrice < 5000) {
        color = '#CCDD00'; // Chartreuse
      } else if (trimPrice < 6000) {
        color = '#FFEE00'; // Yellow
      } else if (trimPrice < 7000) {
        color = '#FFCC00'; // Orange Yellow
      } else if (trimPrice < 8000) {
        color = '#FFAA00'; // Dark Orange
      } else if (trimPrice < 9000) {
        color = '#FF8800'; // Orange Red
      } else {
        color = '#FF0000'; // Red
      }
      return {
        background: `linear-gradient(45deg, green, ${color} 25%, ${color} 75%, red)`,
        color: 'black',
        fontSize: '2em',
        fontWeight: 'bold',
      };
    },
    mapOrigin() {
      switch (this.job.origin) {
        case 'optykamysliwska':
          return 'Optyka Myśliwska';
        case 'netgun':
          return 'NetGun';
        case 'armybazar':
          return 'ArmyBazar';
        default:
          return 'Nieznane';
      }
    },
  },
}
</script>

<style>
.m-n1 {
  margin-top: -1rem !important;
  margin-left: -1rem !important;
  margin-right: -1rem !important;
}

.card-img-top {
  width: 100%; /* This will make the image take the full width of the card */
  height: 12vw; /* Adjust this value to fit your design */
  object-fit: cover; /* This will scale the image to cover the set height and width */
}
</style>
