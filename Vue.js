const app = Vue.createApp({
  data() {
    return {
      title: '',
      platform: '',
      status: '',
      score: null,
      error: '',
      games: [],
      selectedGame: null,
      filters: {
        title: '',
        platform: '',
        status: ''
      }
    };
  },
  computed: {
    filteredGames() {
      return this.games.filter(game => {
        return (!this.filters.title || game.title.toLowerCase().includes(this.filters.title.toLowerCase())) &&
          (!this.filters.platform || game.platform === this.filters.platform) &&
          (!this.filters.status || game.status === this.filters.status);
      });
    }
  },
  methods: {
    submitForm() {
      this.error = '';
      if (!this.title || !this.platform || !this.status) {
        this.error = 'Todos los campos excepto puntaje son requeridos';
        return;
      }
      if (this.score !== null && (this.score < 1 || this.score > 10)) {
        this.error = 'El puntaje debe estar entre 1 y 10';
        return;
      }
      const newGame = {
        title: this.title,
        platform: this.platform,
        status: this.status,
        score: this.score
      };
      this.games.push(newGame);
      this.title = '';
      this.platform = '';
      this.status = '';
      this.score = null;
    },
    viewDetails(game) {
      this.selectedGame = game;
    },
    closeDetails() {
      this.selectedGame = null;
    },
  },
});

const mountedApp = app.mount('#app');