const { createApp } = Vue;

createApp({
  data() {
    return {
      user: {
        name: '',
        age: '',
        picture: ''
      },
      weatherInput: {
        city: 'London',
        province: 'Ontario',
        country: 'Canada'
      },
      weather: {
        temp: '',
        wind: '',
        description: ''
      },
      dictionary: {
        word: '',
        phonetic: '',
        definition: ''
      }
    };
  },
  methods: {
    fetchRandomUser() {
      fetch('http://comp6062.liamstewart.ca/random-user-profile')
        .then(res => res.json())
        .then(data => {
          this.user.name = `${data.first_name} ${data.last_name}`;
          this.user.age = data.age;
          this.user.picture = data.profile_picture;
        })
        .catch(err => console.error('Error fetching random user:', err));
    },

    fetchWeather() {
      const { city, province, country } = this.weatherInput;
      const url = `http://comp6062.liamstewart.ca/weather-information?city=${city}&province=${province}&country=${country}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.weather.temp = data.temperature ?? 'N/A';
          this.weather.wind = data.wind ?? 'N/A';
          this.weather.description = data.description ?? 'N/A';
        })
        .catch(err => console.error('Error fetching weather:', err));
    },

    fetchDefinition() {
      const url = `https://comp6062.liamstewart.ca/define?word=${this.dictionary.word}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.dictionary.phonetic = data.phonetic ?? 'N/A';
          this.dictionary.definition = data.definition ?? 'No definition found.';
        })
        .catch(err => console.error('Error fetching definition:', err));
    }
  },

  mounted() {
    this.fetchRandomUser();
    this.fetchWeather();
  }
}).mount('#app');
