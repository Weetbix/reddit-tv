import {observable} from 'mobx';
import Subreddit from './Subreddit';

const DEFAULT_SUBS = [
  {subreddit: 'videos', name: 'Videos'},
  {subreddit: 'cringe', name: 'Cringe'},
  {subreddit: 'Documentaries', name: 'Documentaries'},
  {subreddit: 'fullmoviesonyoutube', name: 'Full movies on YouTube'},
];

export default class Store {
  @observable subreddits = [];

  constructor() {
    this.createSubreddits();
  }

  createSubreddits() {
    this.subreddits = DEFAULT_SUBS.map(
      sub => new Subreddit(sub.subreddit, sub.name),
    );
  }
}
