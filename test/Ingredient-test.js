const chai = require("chai");
const expect = chai.expect;
const Ingredient = require('../src/Ingredient');

describe('Ingredient class', () => {
  let ingredient, creamer, coffeeBeans;
  beforeEach( () => {
    ingredient = new Ingredient();
    creamer = {id: 624, name: 'creamer', estimatedCostInCents: 240};
    coffeeBeans = {id: 642, name: 'coffee beans', estimatedCostInCents: 610};
  })

  describe('initialize', () => {
  
    it('should be a function', () => {
      expect(Ingredient).to.be.a('function');
    })

    it('should be an instance of Ingredient class', () => { 
      expect(ingredient).to.be.an.instanceof(Ingredient);
    })

    it('should have no ingredients by default', () => {
      expect(ingredient.ingredientsArray).to.deep.equal([]);
    })

    it('should hold an ingredient', () => {
      ingredient = new Ingredient([creamer]);
      
      expect(ingredient.ingredientsArray).to.deep.equal([creamer]);
    })

    it('should hold more than one ingredient', () => {
      ingredient = new Ingredient([creamer,coffeeBeans]);
      
      expect(ingredient.ingredientsArray).to.deep.equal([creamer,coffeeBeans]);
    })
  }) 

  describe('methods', () => {

    it('should return 0 at cost if there\'s no recipe', () => {
      const cost = ingredient.calculateCost();

      expect(cost).to.equal(0);
    })

    it('should calculate a cost', () => {
      ingredient = new Ingredient([creamer]);
      const recipe1 = {
        id: 123, 
        img: 'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
        ingredients: [
          {
            id: 624, 
            quantity: {
            amount: 4, 
            unit: 'tsp'
            }
          }
        ],
        instruction: [
          {instruction: 'step 1'}, 
          {instruction: 'step 2'},
          {instruction: 'step 3'}
        ],
        name: 'creamer',
        tags: ['add on']
      };

      let totalCost = ingredient.calculateCost(recipe1);

      expect(totalCost).to.equal(960);
    })
  
    it('should calculate more cost', () => {
      ingredient = new Ingredient([creamer, coffeeBeans]);
      const recipe2 = {
        id: 456, 
        img: 'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
        ingredients: [
          {id: 624, 
            quantity: {
              amount: 2, 
              unit: 'tsp'
            }
          }, 
          {id: 642, 
            quantity: {
              amount: 8, 
              unit: 'tsp'
            }
          }
        ],
        instruction: [
          {instruction: 'step 1'}, 
          {instruction: 'step 2'},
          {instruction: 'step 3'}
        ],
        name: 'coffee',
        tags: ['beverage', 'drink']
      };

      let totalCost = ingredient.calculateCost(recipe2);

      expect(totalCost).to.equal(5360);
    })

    it('should return id# when search by ingredient\'s name', () => {
      ingredient = new Ingredient([creamer,coffeeBeans]);
      const id = ingredient.returnId('creamer');
      
      expect(id).to.equal(624);
    })

    it('should return undefined when ingredient\'s name is not found', () => {
      ingredient = new Ingredient([creamer,coffeeBeans]);
      const id = ingredient.returnId('milk');

      expect(id).to.equal(undefined);
    })
  })

})