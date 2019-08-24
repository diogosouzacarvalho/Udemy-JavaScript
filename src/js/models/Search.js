import axios from 'axios';
import { API_KEY, PROXY } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() { 
    try {
      const res = await axios(`${PROXY}https://www.food2fork.com/api/search?key=${API_KEY}&q=${this.query}`);
      this.result = res.data.recipes;
    } catch(error) {
      console.log(error);
    }
  }
}
