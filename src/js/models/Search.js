import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    // const PROXY = 'https://crossorigin.me/';
    const PROXY = 'https://cors-anywhere.herokuapp.com/';
    const API_KEY = '8cf13185b54ef1f05a56a1c2b0658a43';
  
    try {
      const res = await axios(`${PROXY}https://www.food2fork.com/api/search?key=${API_KEY}&q=${this.query}`);
      this.result = res.data.recipes;
    } catch(error) {
      console.log(error);
    }
  }
}
