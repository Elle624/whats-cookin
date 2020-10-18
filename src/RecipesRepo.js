//const Recipe = require('../src/Recipe');

class RecipesRepo {
  constructor(recipes = []) {
    this.recipesArray = recipes.map(recipe => new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags));
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
      return {name: ingName, amount: recipeIng.quantity.amount,  unit: recipeIng.quantity.unit};
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
