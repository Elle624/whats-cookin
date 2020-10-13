const chai = require("chai");
const expect = chai.expect;
const Recipe = require('../src/Recipe');

describe('Recipe class', () => {
  let recipe, applePie, beefNoodle, ingredient;
  beforeEach( () => {
    recipe = new Recipe();
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
      id: 1, 
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
      expect(Recipe).to.be.a('function');
    })

    it('should be an instance of Recipe class', () => {
      expect(recipe).to.be. an.instanceof(Recipe);
    })

    it('should have no recipe by default', () => {
      expect(recipe.recipesArray).to.deep.equal([]);
    })

    it('should hold recipe that\'s passed in', () => {
      recipe = new Recipe([applePie]);

      expect(recipe.recipesArray).to.deep.equal([applePie]);
    })

    it('should hold more Array if passed in', () => {
      recipe = new Recipe([applePie, beefNoodle]);

      expect(recipe.recipesArray).to.deep.equal([applePie, beefNoodle]);
    })
  })
  describe('methods', () => {

    it('should return a recipe if that recipe is chosen', () => {
      recipe.returnCurrentRecipe(applePie);

      expect(recipe.currentRecipe).to.deep.equal(applePie);
    })

    it('should be able to search by name', () => {
      recipe = new Recipe([applePie, beefNoodle]);
      let result = recipe.searchByName('apple pie');
      
      expect(result).to.deep.equal(applePie);
    })

    it('should return undefined if name is not found', () => {
      recipe = new Recipe([applePie, beefNoodle]);
      let result = recipe.searchByName('coffee');
      
      expect(result).to.deep.equal(undefined);
    })

    it('should be able to search by an ingredient', () => {
      recipe = new Recipe([applePie, beefNoodle]);
      let result = recipe.searchByIngredient('sugar');

      expect(result).to.deep.equal([applePie, beefNoodle]);
    })

    it('should return ampty array if ingredient is not found', () => {
      recipe = new Recipe([applePie, beefNoodle]);
      let result = recipe.searchByIngredient('peach');

      expect(result).to.deep.equal([]);
    })


  })
})