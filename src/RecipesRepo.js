// const Recipe = require('../src/Recipe');
// const IngredientsRepo = require('../src/IngredientsRepo');
// const apple = {id: 320, name: 'apple', cost: 40};
// const sugar = {id: 410, name: 'sugar', cost: 20};
// const beef = {id: 302, name: 'beef', cost: 100};
// const ingredientsRepo = new IngredientsRepo([apple, sugar, beef]);

class RecipesRepo {
  constructor(recipes = []) {
    this.recipesArray = recipes.map(recipe => new Recipe(
      recipe.id, 
      recipe.image, 
      recipe.ingredients, 
      recipe.instructions, 
      recipe.name, 
      recipe.tags 
    ));
   
  }

  returnCurrentRecipe(recipeName) {
    return this.recipesArray.find(recipe => recipe.name === recipeName);
  }

  returnRecipeById(id) {
    return this.recipesArray.find(recipe => recipe.id === id);
  }

  returnIngredients(chosenRecipe) {
    const recipeIngredients = chosenRecipe.ingredients.map(recipeIng => {
      const ingName = ingredientsRepo.returnName(recipeIng);
      return {name: ingName, amount: recipeIng.quantity.amount, unit: recipeIng.quantity.unit};
    });
    return recipeIngredients;
  }

  returnInstructions(chosenRecipe) {
    let steps = chosenRecipe.instructions.map(({number, instruction}) => {
      return {number, instruction};
    });
    return steps;
  }

  searchByTag(tag) {
    let searchingByTag = this.recipesArray.filter(recipe => recipe.tags.includes(tag));
    return searchingByTag;
  }

  searchByIngredients(ids) {
    let searchingByIngredient = 
    this.recipesArray.filter(recipe => {
      return recipe.ingredients.find(ing => ids.includes(ing.id));
    });
    return searchingByIngredient;
  }
}
//module.exports = RecipesRepo;
