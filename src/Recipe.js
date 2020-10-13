class Recipe {
  constructor(recipes = []) {
    this.recipesArray = recipes;
    this.currentRecipe;
  }

  returnCurrentRecipe(chosenRecipe) {
    this.currentRecipe = chosenRecipe;
  }

  searchByName(name) {
    let searchingByName = this.recipesArray.find(recipe =>  recipe.name === name);
    return searchingByName;
  }

  searchByIngredient(id) {
    let searchingByIngredient = 
    this.recipesArray.filter(recipe => {
      return recipe.ingredients.find(ingred => ingred.id === id);
    })
    return searchingByIngredient;

  }
}
module.exports = Recipe;
