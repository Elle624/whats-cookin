class Ingredient {
  constructor(ingredientDetail = []) {
    // this.ingredientId = id;
    // this.ingredientName = name;
    // this.ingredientCost = cost;
    this.ingredientsArray = ingredientDetail;
  }

  calculateCost(chosenRecipe) {
    let cost = chosenRecipe.reduce( (totalCost, ingredient) => {
      this.ingredientsArray.forEach(ingred => {
        if(ingred.id === ingredient.id) {
          totalCost += ingred.estimatedCostInCents * ingredient.quantity.amount;
        };
      })
      return totalCost;
    },0)
    return cost;
  }

}
module.exports = Ingredient;