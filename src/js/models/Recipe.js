import axios from 'axios';
import { API_KEY, PROXY } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`${PROXY}https://www.food2fork.com/api/get?key=${API_KEY}&rId=${this.id}`)
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url= res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch(error) {
      console.log(error)
    }
  }

  calcTime() {
    // Assuming we need 15 minutesfor every 3 ingredients
    const numIngredients = this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);
    this.time = periods * 15
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = this.ingredients.map(el => {
      // Uniform Units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i])
      });

      // Remove parentesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // Parse ingredients into: count, unit, ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        const arrCount = arrIng.slice(0, unitIndex); //Ex.1: 4 1/2 cups => arrCount = ['4', '1/2'] Ex.2: 5 cups => arrCount = ['5']
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-','+'));
        } else {
          count = eval(arrCount.join('+'))
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is no explict unit (first element is a number)
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // There is NO unit
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }
      return objIng;
    });
    this.ingredients = newIngredients;
  }

  updateServings(type) {
    // Servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // Ingredients
    this.ingredients.forEach(ing => {
      ing.count *= (newServings / this.servings);
    })

    this.servings = newServings;
  }
}
