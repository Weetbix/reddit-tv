import {observable, computed} from 'mobx';
import {getPosts} from '../api';

export default class Subreddit {
  @observable items = [];
  @observable isLoading = true;

  subreddit;
  @observable name = null;

  constructor(subreddit, name) {
    this.subreddit = subreddit;
    this.name = name;
    this.fill();
  }

  async fill() {
    const posts = await getPosts(this.subreddit);
    posts.forEach(post => this.addItem(post));
    this.isLoading = false;
  }

  addItem(item) {
    this.items.push({
      ...item,
      id: this.items.length,
    });
  }

  @computed get uniqueId() {
    return this.subreddit;
  }
}
