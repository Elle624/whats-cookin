const Pantry = require('../src/Pantry');

class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = new Pantry(pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  addRecipe(category, recipe) {
    this[category].push(recipe);
  }

  filterRecipesByTag(recipeArrayName, tag) {
    return this[recipeArrayName].filter((recipe) => recipe.tags.includes(tag));
  }

  searchFavoriteByName(name) {
    let searchingByName = this.favoriteRecipes.find(recipe => recipe.name === name);
    return searchingByName;
  }

  searchFavoriteByIngredient(id) {
    let searchingByIngredient = 
    this.favoriteRecipes.filter(recipe => {
      return recipe.ingredients.find(ingred => ingred.id === id);
    })
    return searchingByIngredient;
  }

}
module.exports = User;