class Ingredient {
  constructor(ingredientDetail = []) {
    this.ingredientsArray = ingredientDetail;
  }

  calculateCost(chosenRecipe) {
    if(chosenRecipe && chosenRecipe.ingredients) {
      let cost = chosenRecipe.ingredients.reduce( (totalCost, ingredient) => {
        this.ingredientsArray.forEach(ingred => {
          if(ingred.id === ingredient.id) {
            totalCost += ingred.estimatedCostInCents * ingredient.quantity.amount;
            };
          })
          return totalCost;
        },0)
      return cost;
    } else {
      return 0
    }
  }

}
module.exports = Ingredient;