function deserializeListing(response) {
  const items = response.data.children;

  return items.map(deserializePost);
}

function deserializePost(response) {
  const {data: {title, thumbnail, url, author, created_utc}} = response;
  return {title, thumbnail, url, author, created_unix: created_utc};
}

export async function getPosts(subreddit) {
  const url = `https://reddit.com/r/${subreddit}.json`;

  const response = await fetch(url);
  const json = await response.json();

  return deserializeListing(json);
}