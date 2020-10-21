//const Ingredient = require("./Ingredient");

class IngredientsRepo {
  constructor(ingredientDetail = []) {
    this.ingredientsArray = ingredientDetail.map(detail => new Ingredient(detail.id, detail.name, detail.cost));
  }

  calculateRecipeCostByDollar(chosenRecipe) {
    let cost = chosenRecipe.ingredients.reduce((totalCost, ingredient) => {
      let ing = this.ingredientsArray.find(ingred => ingred.id === ingredient.id);
      totalCost += ing.estimatedCostInCents * ingredient.quantity.amount;
      return totalCost;
    }, 0)
    return Number.parseFloat(cost / 100).toFixed(2);
  }

  calculateIngCostByDollar(missIngredient) {
    let singleCost = this.ingredientsArray.filter(ingredient => ingredient.id === missIngredient.id);
    let totalCost = singleCost[0].estimatedCostInCents * missIngredient.amount / 100;
    return Number.parseFloat(totalCost).toFixed(2);
  }

  returnIds(ingredientName) {
    ingredientName = ingredientName.toLowerCase();
    let ingredients = this.ingredientsArray.filter(ingre => ingre.name.includes(ingredientName));
    return ingredients.map(ing => ing.id);
  } 

  returnName(recipeIngredient) {
    const ingredient = this.ingredientsArray.find(ing => ing.id === recipeIngredient.id);
    return ingredient.name;
  }

}

//module.exports = IngredientsRepo;
