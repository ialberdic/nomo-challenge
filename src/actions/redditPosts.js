
/**
  * Get Reddit Posts
  */
export const getRedditPosts = () => {
  return dispatch => new Promise((resolve, reject) => fetch('https://api.reddit.com/r/pics/new.json')
    .then(response => response.json())
    .then(data => {
      return resolve(dispatch({ type: 'GET_REDDIT_POSTS', data }));
    }).catch(reject)).catch((err) => { throw err.message; });
}
