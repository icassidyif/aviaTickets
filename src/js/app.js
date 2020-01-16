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
  ticketsUI.container.addEventListener('click', (e)=> {
    if(e.target.classList.contains('add-favorite')){
      let ticket = JSON.parse(e.target.dataset.currentTicket);
      favorites.addTicketToStore(ticket);
      favoriteDropDownUI.renderFavoriteTickets(favorites.store);
      e.target.innerText = 'Added to favorite';
      e.target.classList.add('darken-4');
    }
  });
  //delete favorite
  favoriteDropDownUI.container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-favorite')){
      let ticket = JSON.parse(e.target.dataset.currentTicket);
      favorites.removeTicketFromStore(ticket);
      favoriteDropDownUI.renderFavoriteTickets(favorites.store);
      ticketsUI.renderedItems.forEach(el => {
        if (el.dataset.currentTicket === JSON.stringify(ticket)) {
          el.innerText = 'Add to favorite';
          el.classList.remove('darken-4');
        }
      });
      M.toast({html: 'Ticket has removed from favorite list', classes: 'green lighten-1'});
    }
  });

  //handlers
  async function initApp() {
    await locations.init();
    formUI.setAutoCompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    const isValid = formUI.isValidInput();
    if (!isValid) {
      if(!formUI.origin.classList.contains('invalid')) {
        formUI.origin.classList.add('invalid');
      }
      if(!formUI.destination.classList.contains('invalid')) {
        formUI.destination.classList.add('invalid');
      }
      M.toast({html: 'Please input values', classes: 'pink darken-2'});
      return;
    }
    formUI.origin.classList.remove('invalid');
    formUI.destination.classList.remove('invalid');

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