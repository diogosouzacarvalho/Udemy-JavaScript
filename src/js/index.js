import Search from './models/Search';

/* Global State of the app
 * - Search Object
 * - Current recipe Object
 * - Shopping List Object
 * - Liked Recipes
*/
const state = {};

const controlSearch = async () => {
  // get the query from the view
  const query = 'pizza' //TODO

  if (query) {
    // create new search object and add to state
    state.search = new Search(query);

    // Prepare UI for results

    // Search for recipes
    await state.search.getResults();

    // Render results on UI
    console.log(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
