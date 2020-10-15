class RecipeRepo {
  constructor(recipes = []) {
    this.recipesArray = recipes;
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
