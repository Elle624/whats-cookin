const allCards = document.querySelector('.all-cards')


function displayRecipes() {
  for (let i = 0; i < recipeData.length; i++) {
    allCards.innerHTML +=
  `<article class="recipe-card">
    <img src="${recipeData[i].image}">
    <h1>${recipeData[i].name}</h1>
    <a>${recipeData[i].tags[0]}</a>
    <article class="recipe-btns">
      <button class="cook-and-favorite-btn"><svg width="36" height="20" viewBox="0 0 24 24" role="img" aria-hidden="true" tabindex="-1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></button>
      <button class="cook-and-favorite-btn">to cook</button>
    </article>
  </article>`
  }
}

displayRecipes();
