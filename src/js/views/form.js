import {getSelectInstance, getAutocompleteInstance, getDatePickerInstance} from "../libs/materialize";

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this._form = document.forms['locationControl'];
    this.origin = document.getElementById('autocomplete-origin');
    this.destination = document.getElementById('autocomplete-destination');
    this.departDate = document.getElementById('datepicker-depart');
    this.returnDate = document.getElementById('datepicker-return');
    this.oroginAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departDatePicker = datePickerInstance(this.departDate);
    this.returnDatePicker = datePickerInstance(this.returnDate);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDatePicker.toString();
  }

  get returnDateValue() {
    return this.returnDatePicker.toString();
  }

  setAutoCompleteData (data) {
    this.oroginAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }

}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);
export default formUI;