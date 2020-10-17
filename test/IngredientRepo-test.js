const chai = require("chai");
const expect = chai.expect;
const IngredientRepo = require('../src/IngredientRepo');
const Ingredient = require('../src/Ingredient');

describe('Ingredient class', () => {
  let ingredients, creamer, coffeeBeans;
  beforeEach( () => {
    ingredients = new IngredientRepo();
    creamer = {id: 624, name: 'creamer', cost: 240};
    coffeeBeans = {id: 642, name: 'coffee beans', cost: 610}; 
  })

  describe('initialize', () => {
  
    it('should be a function', () => {
      expect(Ingredient).to.be.a('function');
    })

    it('should be an instance of IngredientRepo class', () => { 
      expect(ingredients).to.be.an.instanceof(IngredientRepo);
    })

    it('should have no ingredients by default', () => {
      expect(ingredients.ingredientsArray).to.deep.equal([]);
    })

    it('should hold an ingredient', () => {
      ingredients = new IngredientRepo([creamer]);

      expect(ingredients.ingredientsArray).to.deep.equal([creamer]);
    })

    it('should hold more than one ingredient', () => {
      ingredients = new IngredientRepo([creamer,coffeeBeans]);
      
      expect(ingredients.ingredientsArray).to.deep.equal([creamer,coffeeBeans]);
    })
  }) 

  describe('methods', () => {

    it('should calculate a cost', () => {
      ingredients = new IngredientRepo([creamer]);
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

      let totalCost = ingredients.calculateRecipeCostByDollar(recipe1);

      expect(totalCost).to.equal(9.6);
    })
  
    it('should calculate more cost', () => {
      ingredients = new IngredientRepo([creamer, coffeeBeans]);
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

      let totalCost = ingredients.calculateRecipeCostByDollar(recipe2);

      expect(totalCost).to.equal(53.6);
    })

    it('should return id# when search by ingredient\'s name', () => {
      ingredients = new IngredientRepo([creamer,coffeeBeans]);
      const id = ingredients.returnId('creamer');
      
      expect(id).to.equal(624);
    })

    it('should return undefined when ingredient\'s name is not found', () => {
      ingredients = new IngredientRepo([creamer,coffeeBeans]);
      const id = ingredients.returnId('milk');

      expect(id).to.equal(undefined);
    })

    it('should return one ingredient\'s single cost base on the amount', () => {
      ingredients = new IngredientRepo([creamer,coffeeBeans]);

      let cost = ingredients.calculateIngCostByDollar({id: 624, amount: 2})

      expect(cost).to.equal(4.8);
    })

  })

})