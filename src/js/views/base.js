// Helper File

// Selectors Elements
export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results__list'),
  searchResPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list')
};

// Selector Strings
export const elementStrings = {
  loader: 'loader'
};

// Show Loading Spinner
export const renderLoader = parent => {
  const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

// Remove Loading Spinner
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`)
  if (loader) loader.parentElement.removeChild(loader);
};
