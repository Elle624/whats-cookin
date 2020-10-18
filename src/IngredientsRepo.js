//const Ingredient = require("./Ingredient");

class IngredientsRepo {
  constructor(ingredientDetail = []) {
    this.ingredientsArray = ingredientDetail.map(detail => new Ingredient(detail.id, detail.name, detail.estimatedCostInCents));
  }

  calculateRecipeCostByDollar(chosenRecipe) {
    let cost = chosenRecipe.ingredients.reduce( (totalCost, ingredient) => {
      let ing = this.ingredientsArray.find(ingred => ingred.id === ingredient.id);
      totalCost += ing.cost * ingredient.quantity.amount;
      return totalCost;
    },0)
    return cost/100;
  }

  calculateIngCostByDollar(missIngredient) {
    let singleCost = this.ingredientsArray.filter(ingredient => ingredient.id === missIngredient.id);
    return singleCost[0].cost * missIngredient.amount / 100;
  }

  returnIds(ingredientName) {
    ingredientName = ingredientName.toLowerCase();
    let ingredients = this.ingredientsArray.filter(ingre => ingre.name.includes(ingredientName));
    return ingredients ? ingredients.map(ing => ing.id) : undefined;
  } 

  returnName(recipeIngredient) {
    const ingredient = this.ingredientsArray.find(ing => ing.id === recipeIngredient.id);
    return ingredient.name;
  }

}
//module.exports = IngredientRepo;