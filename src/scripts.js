const mainPage = document.querySelector('.main-page');
const filterSection = document.querySelector('.filter');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('input');
const tagsSection = document.querySelector('.tags');
const recipesSection = document.querySelector('.recipe-page-view');
const recipesSectionTitle = document.querySelector('.all-cards h1');
const chosenRecipeDisplay = document.querySelector('.chosen-recipe');
const mainPageWithoutFilter = document.querySelector('.main-page-without-filter');
const myPantryPage = document.querySelector('.pantry-page-view');
const userName = document.querySelector('.user-name');
const userIngredients = document.querySelector('.user-ingredients');
let pageChecking = 'all';

//eventlisteners
window.addEventListener('click', displayAPage);
searchBtn.addEventListener('click', searchByIngredient);
filterSection.addEventListener('click', filterByTags);
recipesSection.addEventListener('click', updateRecipesSection);

const ingredientsRepo = new IngredientsRepo(ingredientsData);
const recipesRepo = new RecipesRepo(recipeData);
let user1 = new User(usersData[0]);

function createRecipeCardsHTML(recipes) {
  recipesSection.innerHTML = ''
  recipes.recipesArray.forEach(recipeDetail => {
    recipesSection.innerHTML +=
  `<article class="recipe-card">
    <img src="${recipeDetail.image}">
    <h1 class="recipe-name" style="cursor: pointer">${recipeDetail.name}</h1>
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
        tagsList.push(tag);
      };
    });
    return tagsList;
  }, []);
}

function displayTagsOption() {
  let tagsList = createTagsOption();
  tagsList.forEach(tag => {
    tagsSection.innerHTML += 
    `<button class="btn">${tag}</button>`
  })
}

function displayMainPage() {
  displayTagsOption();
  createRecipeCardsHTML(recipesRepo);
  recipesSectionTitle.innerText = `Wecome to What's Cookin ${user1.name}!`;
}

function displayAPage() {
  if (event.target.className.includes('home')) {
    returnHome();
  } else if (event.target.className.includes('user')) {
    changeUser();
  } else if (event.target.className.includes('fav-recipes')) {
    viewFavoriteRecipes();
  } else if (event.target.className.includes('to-cook')) {
    viewRecipesToCook();
  } else if (event.target.className.includes('pantry')) {
    viewMyPantry();
  }
}

function generateRondomNum(list) {
  return Math.floor(Math.random() * list.length);
}

function changeUser() {
  const num = generateRondomNum(usersData);
  user1 = new User(usersData[num]);
  returnHome();
}

function changeHiddenProperty(elements) {
  elements.forEach(element => {
    if (element.addHidden) {
      (element.name).classList.add('hidden');
    } else {
      (element.name).classList.remove('hidden');
    }
  })
}

function showRecipeCardsSection() {
  let homeSection = [{name: mainPage}, {name: recipesSection}, {name: myPantryPage, addHidden: true}, {name: chosenRecipeDisplay, addHidden: true}];
  changeHiddenProperty(homeSection);
}

function returnHome() {
  pageChecking = 'all';
  showRecipeCardsSection();
  createRecipeCardsHTML(recipesRepo);
  recipesSectionTitle.innerText = `Wecome to What's Cookin ${user1.name}!`;
}

function generateUserRecipeCardsHTML(recipes, title = '') {
  recipesSectionTitle.innerText = title;
  recipesSection.innerHTML = '';
  recipes.forEach(recipe => {
    recipesSection.innerHTML += 
    `
    <article class="recipe-card">
      <img src=${recipe.image}>
      <h1 class="recipe-name" style="cursor: pointer">${recipe.name}</h1>
    </article>
    `
  })  
}

function viewFavoriteRecipes() { 
  pageChecking = 'fav';
  showRecipeCardsSection();
  generateUserRecipeCardsHTML(user1.favoriteRecipes, 'My Favorites');
}

function viewRecipesToCook() {
  pageChecking = 'cook';
  showRecipeCardsSection();
  generateUserRecipeCardsHTML(user1.recipesToCook, 'Recipes to Cook');
}

function hideRecipeCardsSection(moreSections = null) {
  let elements = [{name: mainPage, addHidden: true}, {name: mainPageWithoutFilter}];
  moreSections.forEach(section => elements.push(section));
  changeHiddenProperty(elements);
}

function viewMyPantry() {
  hideRecipeCardsSection([{name: myPantryPage}, {name: chosenRecipeDisplay, addHidden: true}]);
  displayPantry();
}

function displayPantry() {
  userIngredients.innerHTML = '';
  userName.innerHTML = `<h1>${user1.name}'s Pantry</h1>`;
  user1.pantry.pantry.forEach(ingred => {
    let result = ingredientsRepo.ingredientsArray.find(ing => ing.id === ingred.ingredient);
    userIngredients.innerHTML += 
    `<article class="pantry-item"> ${result.name} : ${ingred.amount}</article>`
  });
}

function filterByTags(event) {
  if (pageChecking === 'all') {
    let allRecipesFiltered = recipesRepo.searchByTag(event.target.innerText);
    createRecipeCardsHTML({recipesArray: allRecipesFiltered});
  } else if (pageChecking === 'fav') {
    let favRecipesFiltered = user1.filterRecipesByTag('favoriteRecipes', event.target.innerText);
    generateUserRecipeCardsHTML(favRecipesFiltered);
  } else if (pageChecking === 'cook') {
    let toCookRecipesFiltered = user1.filterRecipesByTag('recipesToCook', event.target.innerText);
    generateUserRecipeCardsHTML(toCookRecipesFiltered);
  }
}

function searchByIngredient() {
  const ingredientIds = ingredientsRepo.returnIds(searchInput.value);
  if (pageChecking === 'all') {
    const searchResult = recipesRepo.searchByIngredient(ingredientIds);
    createRecipeCardsHTML({recipesArray: searchResult});
  } else if (pageChecking === 'fav') {
    const searchByIng = user1.searchFavoriteByIngredient(ingredientIds);
    const searchByName = user1.searchFavoriteByName(searchInput.value)
    ingredientIds.length > 0 ? 
      generateUserRecipeCardsHTML(searchByIng) : generatUsereRecipeCardsHTML(searchByName)
  }
  searchInput.value = '';
}

function updateRecipesSection() {
  if (event.target.className.includes('recipe-name')) {
    displayChosenRecipe();
  } else if (event.target.className.includes('cook')) {
    const recipe = recipesRepo.returnRecipeById(parseInt(event.target.id));
    user1.addRecipe('recipesToCook', recipe); 
    user1.pantry.removeIngredients(recipe);
  } else if (event.target.className.includes('fav')) {
    const recipe = recipesRepo.returnRecipeById(parseInt(event.target.id));
    user1.addRecipe('favoriteRecipes', recipe); 
  }
}

function displayChosenRecipe() {
  hideRecipeCardsSection([{name: chosenRecipeDisplay}, {name: myPantryPage, addHidden: true}]);
  const chosenRecipe = recipesRepo.returnCurrentRecipe(event.target.innerText);
  const recipeIngredients = recipesRepo.returnIngredients(chosenRecipe);
  const steps = recipesRepo.returnInstructions(chosenRecipe);
  const totalCost = ingredientsRepo.calculateRecipeCostByDollar(chosenRecipe);
  const shortList = user1.pantry.compareIngredients(chosenRecipe);
  const displayMissingIng = user1.pantry.reviewMissingIngredients(shortList);
  chosenRecipeDisplay.innerHTML = ''
  chosenRecipeDisplay.innerHTML +=
    `<section class="chosen-recipe">
      <div class="expanded-recipe">
        <img src="${chosenRecipe.image}">
        <section class="expanded-title-cost">
          <h1 style="cursor: pointer">${chosenRecipe.name}</h1>
          <h2>Total cost: $${totalCost}</h2>
          <h2>${chosenRecipe.tags}</h2>
        </section>
      </div>
      <section class="recipe-missing-ingredient"> 
        <h1> You are missing: </h1>
        <h3>${listMissingIngredients(displayMissingIng)}</h3>
      </section>
      <section class="ingredients-needed">
        <h1>Ingredients: </h1>
        <ul>${listRecipeIngredients(recipeIngredients)}</ul>
      </section>
      <section class="expanded-recipe-instructions">
        <h1>Instructions: </h1>
        ${listInstructions(steps)}</section>
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
    <h2>${ing.amount} ${ing.unit} of ${ingredientsRepo.returnName(ing)} cost: $${ingredientsRepo.calculateIngCostByDollar(ing)}</h2>
    `
  })
  return missingIngredientsElement;
}

displayMainPage ();

