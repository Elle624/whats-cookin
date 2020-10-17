const recipesSection = document.querySelector('.all-cards')
const tagsSection = document.querySelector('.tags')
const favRecipesBtn = document.querySelector('.fav-recipes-btn')
const favRecipesPage = document.querySelector('.favorites-page-view')
const mainPage = document.querySelector('.main-page')
const homeBtn = document.querySelector('.home-btn')
const toCookBtn = document.querySelector('.to-cook-btn')
const toCookPage = document.querySelector('.to-cook-page-view')
const filterSection = document.querySelector('.filter');
const myPantryBtn = document.querySelector('.pantry-btn')
const myPantryPage = document.querySelector('.pantry-page-view')

//eventlisteners
favRecipesBtn.addEventListener('click', viewFavoriteRecipes)
homeBtn.addEventListener('click', returnHome)
toCookBtn.addEventListener('click', viewRecipesToCook)
filterSection.addEventListener('click', filterByTags);
myPantryBtn.addEventListener('click', viewMyPantry)

function filterByTags() {
  let newList =  recipeData.filter(recipe => recipe.tags.includes(event.target.innerText));
  displayRecipes(newList);
}

function displayRecipes(recipes) {
  recipesSection.innerHTML = ''
  recipes.forEach(recipeDetail => {
    recipesSection.innerHTML +=
  `<article class="recipe-card">
    <img src="${recipeDetail.image}">
    <h1>${recipeDetail.name}</h1>
    <article class="recipe-btns">
      <button class="cook-and-favorite-btn"><svg width="36" height="20" viewBox="0 0 24 24" role="img" aria-hidden="true" tabindex="-1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></button>
      <button class="cook-and-favorite-btn">to cook</button>
    </article>
  </article>`
  }) 
}

displayRecipes(recipeData);

function displayIngredients() {
  const user = document.getElementById('user-name');
  user.innerHTML = 
  `<h1>${usersData[0].name}'s Pantry</h1>`

  const ingredients = document.getElementById('user-ingredients');

  usersData[0].pantry.forEach(ingred => {
    ingredients.innerHTML += 
    `
    <article>ingredient: ${ingred.ingredient}</article>
    <article>amount: ${ingred.amount}</article>
    `
  })
 
   
   
    
    // myPantryPage.innerHTML += 
    // `<section class="pantry-page-view">
    //   <h1>${test.name}'s Pantry</h1>
    //   <article>ingredientName</article>
    //   <article>${test.pantry[0].amount}</article>
    //  </section>`
  //})
}

displayIngredients();

function createTagsOption() {
  return recipeData.reduce((tagsList, recipe) => {
    recipe.tags.forEach((tag) => {
      if(!tagsList.includes(tag)) {
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

displayTagsOption();


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
  let favSection = [{name: favRecipesPage}, {name: mainPage, add: true},{name: toCookPage, add: true}];
  changeClassProperty(favSection);
}

function returnHome() {
  let homeSection = [{name: mainPage}, {name: favRecipesPage, add: true}, {name: toCookPage, add: true}];
  changeClassProperty(homeSection)
}

function viewRecipesToCook() {
  let toCookSection = [{name: toCookPage},{name: mainPage, add: true}, {name: favRecipesPage, add: true}];
  changeClassProperty(toCookSection)
}

function viewMyPantry() {
  let myPantrySection = [{name: myPantryPage},{name: mainPage, add: true}, {name: favRecipesPage, add: true},{name: toCookPage, add: true}];
  changeClassProperty(myPantrySection)
}

