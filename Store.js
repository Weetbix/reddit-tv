import {observable} from 'mobx';

export default class Store {
  @observable items = [];

  addItem(item) {
    this.items.push({
      ...item,
      id: this.items.length,
    });
  }
}
