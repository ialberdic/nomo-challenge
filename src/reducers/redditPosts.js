import Store from '../store/redditPosts';

export const initialState = Store;

export default function recipeReducer(state = initialState, action) {

  switch (action.type) {
    
    case 'RECIPES_REPLACE': {
      let redditPosts = [];
      
      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        redditPosts = action.data.data.children.map((item, index) => ({
          id: item.data.author_fullname+index,
          author: item.data.author_fullname,
          title: item.data.title,
          comments: item.data.num_comments,
          thumbnail: item.data.thumbnail,
          created: item.data.created,
          score: item.data.score
        }));
      }

      return {
        ...state,
        redditPosts,
      };
    }
    default:
      return state;
  }
}
