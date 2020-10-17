const Ingredient = require("./Ingredient");

class IngredientRepo {
  constructor(ingredientDetail = []) {
    this.ingredientsArray = ingredientDetail.map(detail => new Ingredient(detail.id, detail.name, detail.cost));
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

  returnId(ingredientName) {
    let ingredient = this.ingredientsArray.find(ingre => ingre.name === ingredientName);
    return ingredient ? ingredient.id : undefined;
  } 

}
module.exports = IngredientRepo;
