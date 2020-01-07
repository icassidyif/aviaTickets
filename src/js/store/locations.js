import api from "../services/apiService";

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
  }

  async init(){
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities()
    ]);
    const [countries, cities] = response;
    this.countries = countries;
    this.cities = cities;
    return response;
  //  response = Array from two arrays
  }

  getCitiesByCountryCode(code){
    const result = this.cities.filter(city => city.country_code === code);
    return result;
  }
}


const locations = new Locations(api);
export default locations;