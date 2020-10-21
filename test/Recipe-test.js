const chai = require("chai");
const expect = chai.expect;
const Recipe = require('../src/Recipe');

describe('Recipe class', () => {
  let recipe, applePie, beefNoodle;
  beforeEach( () => {
    recipe = new Recipe();
    applePie = new Recipe(
      1, 
      'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
      [{
        id: 320, 
        quantity: {
          amount: 6, 
          unit: 'unit'
        }
      },
      {
        id: 410,
        quantity: {
          amount: 7,
          unit: 'tbs'
        }
      }],
      [
        {instruction: 'step 1'}, 
        {instruction: 'step 2'},
        {instruction: 'step 3'}
      ],
      'apple pie',
      ['sweet', 'desert']
    );
    beefNoodle = new Recipe(
      2, 
      'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
      [{
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
      }],
      [
        {instruction: 'step 1'}, 
        {instruction: 'step 2'},
        {instruction: 'step 3'}
      ],
      'beef noodle',
      ['flour made', 'main dish', 'hot dish']
    );
  })

  describe('Initialize', () => {

    it('should be a function', () => {
      expect(Recipe).to.be.a('function');
    })

    it('should be an instance of Recipe class', () => {
      expect(recipe).to.be. an.instanceof(Recipe);
    })

    it('should have an id', () => {
      expect(applePie.id).to.equal(1);
    })

    it('should have array of ingredients', () => {
      expect(applePie.ingredients).to.deep.equal([
        {id: 320, quantity: {
          amount: 6, unit: 'unit'}
        },
        {id: 410, quantity: {
          amount: 7, unit: 'tbs'}
        }
      ]);
    })

    it('should have an array of instructions', () => {
      expect(beefNoodle.instructions.length).to.equal(3);
    })

    it('should have a name', () => {
      expect(beefNoodle.name).to.equal('beef noodle');
    })

    it('should have an array of tags', () => {
      expect(applePie.tags).to.deep.equal(['sweet', 'desert']);
    })

  })

})