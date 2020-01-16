import {formatDate} from "../helpers/date";

class Favorites {
  constructor() {
    this.store = [];
  }

    addTicketToStore(ticket) {
    let isContain = false;
      this.store.forEach(element => {
        if(JSON.stringify(element) === JSON.stringify(ticket)) {
          isContain = true;
        }
      });
      if (isContain) {
        M.toast({html: 'Ticket had already added to favorite list', classes: 'pink darken-2'});
      } else {
        M.toast({html: 'Ticket has added to favorite list', classes: 'green lighten-1'});
        this.store.push(ticket);
      }
    // if(!this.store.length) {
    //   this.store.push(ticket);
    // } else {
    //   this.store = this.store.filter(item => {
    //     return JSON.stringify(item) !== JSON.stringify(ticket);
    //   });
    //   this.store.push(ticket);
    // }
  }

  removeTicketFromStore(ticket) {
    this.store = this.store.filter(item => {
      return JSON.stringify(item) !== JSON.stringify(ticket);
    });
  }
}


const favorites = new Favorites();
export default favorites;