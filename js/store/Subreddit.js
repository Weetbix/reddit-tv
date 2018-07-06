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
    this.addItems(posts);
    this.isLoading = false;
  }

  addItems(items) {
    // Add the items and give each one a unique ID based
    // on its new index
    const itemsWithIds = items.map((item, index) => ({
      ...item,
      id: this.items.length + index,
    }));

    this.items.push(...itemsWithIds);
  }

  @computed get uniqueId() {
    return this.subreddit;
  }
}
