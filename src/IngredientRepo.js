class IngredientRepo {
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

  returnId(ingredientName) {
    let ingredient = this.ingredientsArray.find(ingre => ingre.name === ingredientName);
    return ingredient ? ingredient.id : undefined;
  } 

}
module.exports = IngredientRepo;