import locations from "./store/locations";
import '../css/style.sass';

locations.init().then(res => {
  console.log(locations.getCitiesByCountryCode(('UA')));
});



// Show WEBPACK mode into console
if(process.env.NODE_ENV === 'production') {
  console.log('Production mode');
} else if(process.env.NODE_ENV === 'development') {
  console.log('Development mode');
}
