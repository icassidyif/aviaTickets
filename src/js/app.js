import locations from "./store/locations";
import favorites from "./store/favorites";
import './libs';
import '../css/style.sass';
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import favoriteDropDownUI from "./views/favoriteDropDown";

document.addEventListener('DOMContentLoaded', (e) => {
  initApp();
  const form = formUI.form;

  //Events
  form.addEventListener('submit',(e) => {
    e.preventDefault();
    onFormSubmit();
  });
  //add favorite
  ticketsUI.container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('add-favorite')){
      // let ticket = JSON.parse(e.target.dataset.userFavotite);
      // favoriteTickets.setFavorite(ticket);
      console.log(ticket);
    }
  });

  //handlers
  async function initApp() {
    await locations.init();
    formUI.setAutoCompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
  //  Getting data from inputs
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
  //  CODE, CODE, 2020-12, 2020-15
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
});

// Show WEBPACK mode into console
if(process.env.NODE_ENV === 'production') {
  console.log('Production mode');
} else if(process.env.NODE_ENV === 'development') {
  console.log('Development mode');
}