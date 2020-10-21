const chai = require("chai");
const expect = chai.expect;
const RecipesRepo = require('../src/RecipesRepo');
//const Recipe = require('../src/Recipe');

describe('Recipe class', () => {
  let recipes;
  let applePie;
  let beefNoodle;
  beforeEach( () => {
    recipes = new RecipesRepo();
    applePie = {
      id: 1, 
      image: 'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
      ingredients: [
        {
          id: 320, 
          quantity: {
            amount: 6, 
            unit: 'unit'
            }
        },
        {
          id: 410,
          quantity:{
            amount: 7,
            unit: 'tbs'
          }
        }
      ],
      instructions:[ 
        {instruction: 'step 1', number: 1}, 
        {instruction: 'step 2', number: 2},
        {instruction: 'step 3', number: 3}
      ],
      name: 'apple pie',
      tags: ['sweet', 'desert']
    };
    beefNoodle = {
      id: 2,
      image: 'https://spoonacular.com/recipeImages/595736-556x370.jpg',
      ingredients: [ 
        {
        id: 302, 
        quantity: {
          amount: 10, 
          unit: 'cup'
          }
        },
        {
        id: 410,
        quantity: {
          amount: 3,
          unit: 'tbs'
          }
        }
      ],
      instructions: [
        {instruction: 'step 1'}, 
        {instruction: 'step 2'},
        {instruction: 'step 3'}
      ],
      name: 'beef noodle',
      tags: ['flour made', 'main dish', 'hot dish'],
    };
  })

  describe('Initialize', () => {

    it('should be a function', () => {
      expect (RecipesRepo).to.be.a('function');
    })
  
    it('should be an instance of RecipesRepo class', () => {
      expect(recipes).to.be.an.instanceof(RecipesRepo);
    })
  
    it('should have no recipes by default', () => {
      expect(recipes.recipesArray).to.deep.equal([]);
    })
  
    it('should hold a recipe that\'s passed in', () => {
      recipes = new RecipesRepo([applePie]);
  
      expect(recipes.recipesArray).to.deep.equal([applePie]);
    })
  
    it('should hold more recipes if passed in', () => {
      recipes = new RecipesRepo([applePie, beefNoodle]);
  
      expect(recipes.recipesArray).to.deep.equal([applePie, beefNoodle]);
    })
  })

  describe('methods', () => {

    it('should return a recipe if that recipe is chosen', () => {
      recipes = new RecipesRepo([applePie, beefNoodle]);
      const recipe = recipes.returnCurrentRecipe('apple pie');
  
      expect(recipe).to.deep.equal(applePie);
    })
  
    it('should return undefined if the recipe does not exist', () => {
      recipes = new RecipesRepo([applePie, beefNoodle]);
      const recipe = recipes.returnCurrentRecipe('recipes');
  
      expect(recipe).to.deep.equal(undefined);
    })
  
    it('should return a recipe based on id', () => {
      recipes = new RecipesRepo([applePie, beefNoodle]);
      const recipe = recipes.returnRecipeById(2);
  
      expect(recipe).to.deep.equal(beefNoodle);
    })
  
    it('should return undefined if id doesnt exist', () => {
      recipes = new RecipesRepo([applePie, beefNoodle]);
      const recipe = recipes.returnRecipeById('recipes');
  
      expect(recipe).to.equal(undefined);
    })
  
    it('should return ingredients based on recipe', () => {
      recipes = new RecipesRepo([applePie, beefNoodle]);
      const ingredients = recipes.returnIngredients(applePie);
  
      expect(ingredients).to.deep.equal([
        {name: 'apple', amount: 6, unit: 'unit'},
        {name: 'sugar', amount: 7, unit: 'tbs'}
      ]);
    })
  
    it('should return recipe instructions', () => {
      recipes = new RecipesRepo([applePie]);
      const instructions = recipes.returnInstructions(applePie);

      expect(instructions).to.deep.equal([
        {number: 1, instruction: 'step 1'}, 
        {number: 2, instruction: 'step 2'},
        {number: 3, instruction: 'step 3'}
      ]);
    })

    it('should be able to search by tag', () => {
      recipes = new RecipesRepo([applePie, beefNoodle]);
      let result = recipes.searchByTag('sweet');
      
      expect(result).to.deep.equal([applePie]);
    })
    
    it('should return empty array if tag is not found', () => {
      recipes = new RecipesRepo([applePie, beefNoodle]);
      let result = recipes.searchByTag('beverage');
      
      expect(result).to.deep.equal([]);
    })
    
    it('should be able to search by an ingredient', () => {
      recipes = new RecipesRepo([applePie, beefNoodle]);
      let result = recipes.searchByIngredients([410]);
    
      expect(result).to.deep.equal([applePie, beefNoodle]);
    })
    
    it('should be able to search more than one ingredient', () =>{
      recipes = new RecipesRepo([applePie, beefNoodle]);
      let result = recipes.searchByIngredients([320, 302])
    
      expect(result).to.deep.equal([applePie, beefNoodle]);
    })
  })
  
})