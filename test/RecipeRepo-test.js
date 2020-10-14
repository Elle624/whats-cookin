const chai = require("chai");
const expect = chai.expect;
const RecipeRepo = require('../src/RecipeRepo');

describe('Recipe class', () => {
  let recipes, applePie, beefNoodle;
  beforeEach( () => {
    recipes = new RecipeRepo();
    applePie = {
      id: 1, 
      img: 'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
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
      instruction: [
        {instruction: 'step 1'}, 
        {instruction: 'step 2'},
        {instruction: 'step 3'}
      ],
      name: 'apple pie',
      tags: ['sweet', 'desert']
    };
    beefNoodle = {
      id: 2, 
      img: 'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
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
      instruction: [
        {instruction: 'step 1'}, 
        {instruction: 'step 2'},
        {instruction: 'step 3'}
      ],
      name: 'beef noodle',
      tags: ['flour made', 'main dish', 'hot dish']
    }
  })

  describe('Initialize', () => {

    it('should be a function', () => {
      expect(RecipeRepo).to.be.a('function');
    })

    it('should be an instance of Recipe class', () => {
      expect(recipes).to.be. an.instanceof(RecipeRepo);
    })

    it('should have no recipe by default', () => {
      expect(recipes.recipesArray).to.deep.equal([]);
    })

    it('should hold recipe that\'s passed in', () => {
      recipes = new RecipeRepo([applePie]);

      expect(recipes.recipesArray).to.deep.equal([applePie]);
    })

    it('should hold more Array if passed in', () => {
      recipes = new RecipeRepo([applePie, beefNoodle]);

      expect(recipes.recipesArray).to.deep.equal([applePie, beefNoodle]);
    })
  })
  describe('methods', () => {

    it('should return a recipe if that recipe is chosen', () => {
      recipes.returnCurrentRecipe(applePie);

      expect(recipes.currentRecipe).to.deep.equal(applePie);
    })

    it('should be able to search by name', () => {
      recipes = new RecipeRepo([applePie, beefNoodle]);
      let result = recipes.searchByName('apple pie');
      
      expect(result).to.deep.equal(applePie);
    })

    it('should return undefined if name is not found', () => {
      recipes = new RecipeRepo([applePie, beefNoodle]);
      let result = recipes.searchByName('coffee');
      
      expect(result).to.deep.equal(undefined);
    })

    it('should be able to search by an ingredient', () => {
      recipes = new RecipeRepo([applePie, beefNoodle]);
      let result = recipes.searchByIngredient(410);

      expect(result).to.deep.equal([applePie, beefNoodle]);
    })
  })

})