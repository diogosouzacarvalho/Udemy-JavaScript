import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, elementStrings, renderLoader, clearLoader } from './views/base';

/* Global State of the app
 * - Search Object
 * - Current recipe Object
 * - Shopping List Object
 * - Liked Recipes
*/
const state = {};

// Search Controler
const controlSearch = async () => {
  // get the query from the view
  const query = searchView.getInput()

  if (query) {
    // create new search object and add to state
    state.search = new Search(query);

    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // Search for recipes
      await state.search.getResults();

      // Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result)
    } catch (err) {
      clearLoader();
      console.log(err)
    }
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
})

// Recipe Controller
const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#','');

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // Create New Recipe Object
    state.recipe = new Recipe(id);
    
    try {
      // Get Recipe Data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
  
      // Calculate Servings and Time
      state.recipe.calcTime();
      state.recipe.calcServings();
  
      // Render the Recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      console.log(err);
    }
  }
};

const events = ['hashchange', 'load'];
events.forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  }
})