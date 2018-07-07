import {observable, computed, action, runInAction} from 'mobx';
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

  @action async fill() {
    const posts = await getPosts(this.subreddit);

    runInAction(() => {
      this.addItems(posts);
      this.isLoading = false;
    });
  }

  @action addItems(items) {
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
