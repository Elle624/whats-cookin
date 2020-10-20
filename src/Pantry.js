class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }

  compareIngredients(recipe) {
    let result = recipe.ingredients.filter(recipeIng => {
      const condition1 = this.pantry.find(pantryIng => {
        return pantryIng.ingredient === recipeIng.id && 
          pantryIng.amount < recipeIng.quantity.amount});
      const condition2 = !this.pantry.find(pantryIng => pantryIng.ingredient === recipeIng.id);
      return condition1 || condition2;
    })
    return result;
  }

  reviewMissingIngredients(shortIngredients) {
    let newNum;
    let newArrange = shortIngredients.map(shortIng => {
      let findResult = this.pantry.find(pantryIng => pantryIng.ingredient === shortIng.id);
      if(findResult) {
        newNum =  shortIng.quantity.amount - findResult.amount;
      } else {
        newNum = shortIng.quantity.amount;
      };
      return {amount: newNum, unit: shortIng.quantity.unit, id: shortIng.id};
    });
    return newArrange;
  }

  removeIngredients(recipe) {
    this.pantry.map(pantryIng => {
      recipe.ingredients.forEach(recipeIng => {
        if (recipeIng.id === pantryIng.ingredient) {
          const recipeAmount = recipeIng.quantity.amount;
          pantryIng.amount -= Number.parseFloat(recipeAmount).toFixed(2);
        };
        pantryIng.amount < 0? pantryIng.amount = 0 : pantryIng.amount;
      });
    });
  }

}
//module.exports = Pantry;