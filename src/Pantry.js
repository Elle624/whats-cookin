class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }

  checkPantry(recipe) {
    let result = recipe.ingredients.every((ingred) => {
      return this.pantry.find((eachIngred) => {
        return eachIngred.ingredient === ingred.id;
      })
    })
    return result;
  }

  checkMissingIngredient(recipe) {
    let result = recipe.ingredients.filter((ingred) => {
      return this.pantry.find((eachIngred) => eachIngred.ingredient === ingred.id && eachIngred.acount < ingred.quantity.amount) ||

      !this.pantry.find((eachIngred) => eachIngred.ingredient === ingred.id);
    })
    return result
  }
  // checkMissingIngredient(recipe) {
  //   let result = recipe.ingredients.filter((ingred) => {
  //     return !this.pantry.find((eachIngred) => {
  //       // console.log('recipe', ingred)
  //         // console.log('pantry', eachIngred)
  //         // console.log('is true', eachIngred.ingredient !== ingred.id)
  //         return eachIngred.ingredient === ingred.id


  //       // if(eachIngred.ingredient === ingred.id) {
  //       //   return eachIngred.acount < ingred.quantity.amount;
  //       // } else if(eachIngred.ingredient !== ingred.id) {
  //       //   return true;
  //       // }
  //     })
  //   })
  //   return result;
  // }

}
module.exports = Pantry;