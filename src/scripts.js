//const User = require('../src/User');

const recipesSection = document.querySelector('.all-cards');
const tagsSection = document.querySelector('.tags');
const favRecipesBtn = document.querySelector('.fav-recipes-btn');
const favRecipesPage = document.querySelector('.favorites-page-view');
const mainPage = document.querySelector('.main-page');
const homeBtn = document.querySelector('.home-btn');
const toCookBtn = document.querySelector('.to-cook-btn');
const toCookPage = document.querySelector('.to-cook-page-view');
const filterSection = document.querySelector('.filter');
const myPantryBtn = document.querySelector('.pantry-btn');
const myPantryPage = document.querySelector('.pantry-page-view');
const userName = document.querySelector('.user-name');
const userIngredients = document.querySelector('.user-ingredients');
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const recipesToCookDisplay = document.querySelector('.view-recipes-to-cook');

//eventlisteners
favRecipesBtn.addEventListener('click', viewFavoriteRecipes);
homeBtn.addEventListener('click', returnHome);
toCookBtn.addEventListener('click', viewRecipesToCook);
filterSection.addEventListener('click', filterByTags);
searchBtn.addEventListener('click', searchByIngredient);
myPantryBtn.addEventListener('click', viewMyPantry);
recipesSection.addEventListener('click', updateRecipesSection);


//gv
const ingredientsRepo = new IngredientsRepo(ingredientsData);
const recipesRepo = new RecipesRepo(recipeData);
const user1 = new User(usersData[0]);

function displayRecipes(recipes) {
  recipesSection.innerHTML = ''
  recipes.recipesArray.forEach(recipeDetail => {
    recipesSection.innerHTML +=
  `<article class="recipe-card">
    <img src="${recipeDetail.image}">
    <h1 class="recipe-name">${recipeDetail.name}</h1>
     <article class="recipe-btns">
      <button class="cook-and-favorite-btn"><svg width="36" height="20" viewBox="0 0 24 24" role="img" aria-hidden="true" tabindex="-1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></button>
      <button id=${recipeDetail.id} class="cook cook-and-favorite-btn">to cook</button>
     </article>
  </article>`
  }) 
}

function createTagsOption() {
  return recipesRepo.recipesArray.reduce((tagsList, recipe) => {
    recipe.tags.forEach((tag) => {
      if (!tagsList.includes(tag)) {
        tagsList.push(tag)
      }
    })
    return tagsList
  }, [])
}

function displayTagsOption() {
  let tagsList = createTagsOption();
  tagsList.forEach(tag => {
    tagsSection.innerHTML += 
    `<button class="btn">${tag}</button>`
  })
}

function displayMainPage () {
  displayPantry();
  displayTagsOption();
  displayRecipes(recipesRepo);
}

function changeClassProperty(elements) {
  elements.forEach(element => {
    if (element.add) {
      (element.name).classList.add('hidden');
    } else {
      (element.name).classList.remove('hidden')
    }
  })
}

function viewFavoriteRecipes() {
  let favSection = [{name: favRecipesPage}, {name: mainPage, add: true}, {name: toCookPage, add: true}, {name: myPantryPage, add: true}];
  changeClassProperty(favSection);
}

function returnHome() {
  let homeSection = [{name: mainPage}, {name: favRecipesPage, add: true}, {name: toCookPage, add: true}, {name: myPantryPage, add: true}];
  changeClassProperty(homeSection);
  displayRecipes(recipesRepo);
  searchInput.value = '';
}

function viewRecipesToCook() {
  let toCookSection = [{name: toCookPage}, {name: mainPage, add: true}, {name: favRecipesPage, add: true}, {name: myPantryPage, add: true}];
  changeClassProperty(toCookSection);
  recipesToCookDisplay.innerHTML = '';
  user1.recipesToCook.forEach(recipe => {
    recipesToCookDisplay.innerHTML += 
    `
    <article class="recipe-card">
      <img src=${recipe.image}>
      <h1>${recipe.name}</h1>
      <button class="cook-and-favorite-btn">remove</button>
    </article>
    `
  }); 
}

function viewMyPantry() {
  let myPantrySection = [{name: myPantryPage}, {name: mainPage, add: true}, {name: favRecipesPage, add: true}, {name: toCookPage, add: true}];
  changeClassProperty(myPantrySection);
}

function displayPantry() {
  userName.innerHTML = 
  `<h1>${user1.name}'s Pantry</h1>`;
  user1.pantry.pantry.forEach(ingred => {
    let result = ingredientsRepo.ingredientsArray.find(ing => ing.id === ingred.ingredient);
    userIngredients.innerHTML += 
    `<article> ${result.name} : ${ingred.amount}</article>`
  });
}

function filterByTags() {
  let newList = recipesRepo.searchByTag(event.target.innerText);
  displayRecipes({recipesArray: newList});
}

function searchByIngredient() {
  const ingredientIds = ingredientsRepo.returnIds(searchInput.value);
  const searchResult = recipesRepo.searchByIngredient(ingredientIds);
  displayRecipes({recipesArray: searchResult});
}


function updateRecipesSection() {
  if (event.target.className.includes('recipe-name')) {
    displayChosenRecipe();
  } else if (event.target.className.includes('cook')) {
    const recipe = recipesRepo.returnRecipeById(parseInt(event.target.id));
    user1.addRecipe('recipesToCook', recipe); 
  }
}

function displayChosenRecipe() {
  const chosenRecipe = recipesRepo.returnCurrentRecipe(event.target.innerText);
  recipesSection.innerHTML = '';
  const recipeIngredients = recipesRepo.returnIngredients(chosenRecipe);
  const steps = recipesRepo.returnInstructions(chosenRecipe);
  const totalCost = ingredientsRepo.calculateRecipeCostByDollar(chosenRecipe);
  recipesSection.innerHTML +=
  `<article class="recipe-card">
    <img src="${chosenRecipe.image}">
    <h1 class="recipe-name">${chosenRecipe.name}</h1>
    <h2>Total cost: $${totalCost} dollar</h2>
    <h2>${chosenRecipe.tags}</h2>
    <section>${listRecipeIngredients(recipeIngredients)}</section>
    <section>${listInstructions(steps)}</section>
  </article>`
}

function listRecipeIngredients(list) {
  let ingredientElement = '';
  list.forEach(ing => ingredientElement += `<h3>${ing.name}:  ${ing.amount} ${ing.unit}</h3>`);
  return ingredientElement;
}

function listInstructions(steps) {
  let instructionElement = '';
  steps.forEach(ins => instructionElement += `<h3>${ins.number}:  ${ins.instruction}</h3>`);
  return instructionElement;
}

displayMainPage ();

