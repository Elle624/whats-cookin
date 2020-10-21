const Pantry = require('../src/Pantry');

class User {
  constructor(userInfo) {
    this.name = userInfo.name;
    this.id = userInfo.id;
    this.pantry = new Pantry(userInfo.pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  addRecipe(category, recipe) {
    if (!this[category].includes(recipe)) {
      this[category].push(recipe);
    }
  }

  filterRecipesByTag(recipeArrayName, tag) {
    return this[recipeArrayName].filter((recipe) => recipe.tags.includes(tag));
  }

  searchFavoriteByName(name) {
    name = name.toLowerCase();
    let searchingByName = this.favoriteRecipes.filter(recipe => recipe.name.includes(name));
    return searchingByName;
  }

  searchFavoriteByIngredients(ids) {
    let searchingByIngredient = 
    this.favoriteRecipes.filter(recipe => {
      return recipe.ingredients.find(ingred => ids.includes(ingred.id));
    });
    return searchingByIngredient;
  }

}
module.exports = User;