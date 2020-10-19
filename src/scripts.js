//const User = require('../src/User');

const recipesSectionTitle = document.querySelector('.all-cards h1');

const recipesSection = document.querySelector('.recipe-page-view');
const tagsSection = document.querySelector('.tags');
const favRecipesBtn = document.querySelector('.fav-recipes-btn');
//const favRecipesPage = document.querySelector('.favorites-page-view');
const mainPage = document.querySelector('.main-page');
const mainPageWithoutFilter = document.querySelector('.main-page-without-filter');
const homeBtn = document.querySelector('.home-btn');
const toCookBtn = document.querySelector('.to-cook-btn');
//const toCookPage = document.querySelector('.to-cook-page-view');
const filterSection = document.querySelector('.filter');
const myPantryBtn = document.querySelector('.pantry-btn');
const myPantryPage = document.querySelector('.pantry-page-view');
const userName = document.querySelector('.user-name');
const userIngredients = document.querySelector('.user-ingredients');
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const recipesToCookDisplay = document.querySelector('.view-recipes-to-cook');
const favRecipesDisplay = document.querySelector('.view-fav-recipes');
const chosenRecipeDisplay = document.querySelector('.chosen-recipe');
let pageChecking = 'all';

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
      <button id=${recipeDetail.id} class="fav select-btns">favorite</button>
      <button id=${recipeDetail.id} class="cook select-btns">to cook</button>
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

function generateRecipeCardsHTML(recipes, title = '') {
  recipesSectionTitle.innerText = title;
  recipesSection.innerHTML = '';
  recipes.forEach(recipe => {
  recipesSection.innerHTML += 
    `
    <article class="recipe-card">
      <img src=${recipe.image}>
      <h1 class="recipe-name">${recipe.name}</h1>
      <button class="select-btns">remove</button>
    </article>
    `
  })  
}

function showRecipeCards() {
  let homeSection = [{name: mainPage}, {name: recipesSection}, {name: myPantryPage, add: true} , {name: chosenRecipeDisplay, add: true}];
  changeClassProperty(homeSection);
}

function returnHome() {
  showRecipeCards()
  displayRecipes(recipesRepo);
  recipesSectionTitle.innerText = 'Wecome to what\'s cookin!';
  pageChecking = 'all';
}

function viewFavoriteRecipes() { 
  showRecipeCards();
  generateRecipeCardsHTML(user1.favoriteRecipes, 'My Favorites');
  pageChecking = 'fav';
}

function viewRecipesToCook() {
  showRecipeCards();
  generateRecipeCardsHTML(user1.recipesToCook, 'Recipes to Cook');
  pageChecking = 'cook';
}

function viewMyPantry() {
  changeClassProperty([{name: mainPage, add: true}, {name: mainPageWithoutFilter}, {name: myPantryPage}, {name: chosenRecipeDisplay, add: true}]);
  displayPantry();
}

function displayPantry() {
  userIngredients.innerHTML = '';
  userName.innerHTML = 
  `<h1>${user1.name}'s Pantry</h1>`;
  user1.pantry.pantry.forEach(ingred => {
    let result = ingredientsRepo.ingredientsArray.find(ing => ing.id === ingred.ingredient);
    userIngredients.innerHTML += 
    `<article class="pantry-item"> ${result.name} : ${ingred.amount}</article>`
  });
}

function filterByTags(event) {
  if(pageChecking === 'all') {
    let allRecipesFiltered = recipesRepo.searchByTag(event.target.innerText);
    displayRecipes({recipesArray: allRecipesFiltered});
  } else if(pageChecking === 'fav') {
    let favRecipesFiltered = user1.filterRecipesByTag('favoriteRecipes', event.target.innerText);
    generateRecipeCardsHTML(favRecipesFiltered);
  } else if(pageChecking === 'cook') {
    let toCookRecipesFiltered = user1.filterRecipesByTag('recipesToCook', event.target.innerText);
    generateRecipeCardsHTML(toCookRecipesFiltered);
  }
}

function searchByIngredient() {
  const ingredientIds = ingredientsRepo.returnIds(searchInput.value);
  const searchResult = recipesRepo.searchByIngredient(ingredientIds);
  displayRecipes({recipesArray: searchResult});
  searchInput.value = '';
}


function updateRecipesSection() {
  if (event.target.className.includes('recipe-name')) {
    displayChosenRecipe();
  } else if (event.target.className.includes('cook')) {
    const recipe = recipesRepo.returnRecipeById(parseInt(event.target.id));
    user1.addRecipe('recipesToCook', recipe); 
    user1.pantry.removeIngredients(recipe);
  } else if(event.target.className.includes('fav')) {
    const recipe = recipesRepo.returnRecipeById(parseInt(event.target.id));
    user1.addRecipe('favoriteRecipes', recipe); 
  }
}

function hideRecipeCards() {
  let elements = [{name: mainPage, add: true}, {name: mainPageWithoutFilter}];
  changeClassProperty(elements);
}

function displayChosenRecipe() {
  hideRecipeCards();
  changeClassProperty([{name: myPantryPage, add: true}]);
  const chosenRecipe = recipesRepo.returnCurrentRecipe(event.target.innerText);
  chosenRecipeDisplay.innerHTML = ''
  changeClassProperty([{name: chosenRecipeDisplay}]);
  const recipeIngredients = recipesRepo.returnIngredients(chosenRecipe);
  const steps = recipesRepo.returnInstructions(chosenRecipe);
  const totalCost = ingredientsRepo.calculateRecipeCostByDollar(chosenRecipe);
  const shortList = user1.pantry.compareIngredients(chosenRecipe);
  const displayMissingIng = user1.pantry.reviewMissingIngredients(shortList);
  
  chosenRecipeDisplay.innerHTML += 
    `<section class="chosen-recipe">
    <img src="${chosenRecipe.image}">
    <h1 class="chosen-recipe-name">${chosenRecipe.name}</h1>
    <section> You are missing: ${listMissingIngredients(displayMissingIng)} </section>
    <h2>Total cost: ${totalCost} dollar</h2>
    <h2>${chosenRecipe.tags}</h2>
    <section>Ingredients: ${listRecipeIngredients(recipeIngredients)}</section>
    <section>Instructions: ${listInstructions(steps)}</section>
  </section>`
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

function listMissingIngredients(shortList) {
  let missingIngredientsElement = '';
  shortList.forEach(ing => {
    missingIngredientsElement += 
    `
    <h2>${ing.amount} ${ing.unit} of ${ingredientsRepo.returnName(ing)}</h2>
    `
  })
  return missingIngredientsElement;
}

displayMainPage ();

