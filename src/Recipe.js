const Ingredient = require('../src/Ingredient');
ingredient = new Ingredient(
  [
    {id: 320, name: 'apple', estimatedCostInCents: 200},
    {id: 302, name: 'beef', estimatedCostInCents: 610},
    {id: 410, name: 'sugar', estimatedCostInCents: 300}
  ]);

class Recipe {
  constructor(recipes = []) {
    this.recipesArray = recipes;
    this.currentRecipe;
  }

  returnCurrentRecipe(chosenRecipe) {
    this.currentRecipe = chosenRecipe;
  }

  searchByName(name) {
    let searchingByName = this.recipesArray.find( recipe => {
      return recipe.name === name;
    })
    return searchingByName;
  }

  searchByIngredient(ingred) {
    let ingredInfo = ingredient.ingredientsArray.find( ingre => ingre.name === ingred);
    if(ingredInfo) {
      let searchingByIngredient = 
      this.recipesArray.filter( (recipe) => {
        return recipe.ingredients.find(element => {
          return element.id === ingredInfo.id
        })
      })
      return searchingByIngredient;
    } else {
      return [];
    }
  }
}
module.exports = Recipe;
