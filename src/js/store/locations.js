import api from "../services/apiService";

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = {};
    this.airlines = {};
  }

  async init(){
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines()
    ]);
    const [countries, cities, airlines] = response;
    this.countries = this.convertCounties(countries);
    this.cities = this.convertCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.convertAirLines(airlines);

    return response;
  //  response = Array from two arrays
  }

  createShortCitiesList(cities){
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  convertCounties(countries) {
    // {'Country code': {...}
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    },{});
  }

  convertCities(cities){
  //  {'City name, Country name': {...}}
  //  {'city code': {...}}
    return cities.reduce((acc, city) => {
      const country_name = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;
      const full_name = `${city.name}, ${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        full_name
      };
      return acc;
    },{});
  }

  convertAirLines(airlines){
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {})
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find((item) => item.full_name === key);
    return city.code;
  }

  getCountryNameByCode (code){
    return this.countries[code].name;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    console.log(response);
  }
}


const locations = new Locations(api);
export default locations;

// data for autocomplete = {'city, country': null}
// need = {'city': {...}} => city[code]