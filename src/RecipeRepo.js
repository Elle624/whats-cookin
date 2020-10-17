const Recipe = require('../src/Recipe');

class RecipeRepo {
  constructor(recipes = []) {
    this.recipesArray = recipes.map(recipe => new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags));
    this.currentRecipe;
  }

  returnCurrentRecipe(chosenRecipe) {
    this.currentRecipe = chosenRecipe;
  }

  searchByTag(tag) {
    let searchingByTag = this.recipesArray.find(recipe => recipe.tags.includes(tag));
   
    return searchingByTag;
  }

  searchByIngredient(id) {
    let searchingByIngredient = 
    this.recipesArray.filter(recipe => {
      return recipe.ingredients.find(ingred => ingred.id === id);
    })
    return searchingByIngredient;
  }
}
module.exports = RecipeRepo;
