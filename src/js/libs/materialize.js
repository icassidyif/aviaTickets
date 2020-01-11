import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

// initialization SELECT
const select = document.querySelectorAll('select');
let selectInst = M.FormSelect.init(select);

export function getSelectInstance(elem){
  return  M.FormSelect.getInstance(elem);
}

// initialization AUTOCOMPLETE
const autocomplete = document.querySelectorAll('.autocomplete');
let autocompleteInst = M.Autocomplete.init(autocomplete,{
  data: {
    Apple: null,
    Microsoft: null,
    Google: null,
    Intel: null
  }
});

export function getAutocompleteInstance(elem){
   return  M.Autocomplete.getInstance(elem);
}

// initialization DAtePicker
const datePicker = document.querySelectorAll('.datepicker');
const datePickerInst = M.Datepicker.init(datePicker,{
  showClearBtn: true,
  format: 'yyyy-mm'
});

export function getDatePickerInstance(elem){
  return  M.Datepicker.getInstance(elem);
}

// Initialization drop down
const dropDown = document.querySelectorAll('.dropdown-trigger');
const dropDownInst = M.Dropdown.init(dropDown);

export function getDropDownInstance(elem) {
  return M.Dropdown.getInstance(elem);
}
