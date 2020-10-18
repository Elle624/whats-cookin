//const Recipe = require('../src/Recipe');

class RecipesRepo {
  constructor(recipes = []) {
    this.recipesArray = recipes.map(recipe => new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags));
  }

  returnCurrentRecipe(recipeName) {
    return this.recipesArray.find(recipe => recipe.name === recipeName);
  }

  searchByTag(tag) {
    let searchingByTag = this.recipesArray.filter(recipe => recipe.tags.includes(tag));
    return searchingByTag;
  }

  searchByIngredient(ids) {
    let searchingByIngredient = 
    this.recipesArray.filter(recipe => {
      return recipe.ingredients.find(ing => {
        return ids.includes(ing.id);
      })
    });
    return searchingByIngredient;
  }
}
//module.exports = RecipeRepo;
