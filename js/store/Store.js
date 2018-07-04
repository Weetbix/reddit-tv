import {observable} from 'mobx';
import {getPosts} from '../api';

export default class Store {
  @observable items = [];
  @observable isLoading = true;

  constructor() {
    this.fill();
  }

  async fill() {
    const posts = await getPosts('videos');
    posts.forEach(post => this.addItem(post));
    this.isLoading = false;
  }

  addItem(item) {
    this.items.push({
      ...item,
      id: this.items.length,
    });
  }
}
