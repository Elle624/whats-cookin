const chai = require("chai");
const expect = chai.expect;
const IngredientsRepo = require('../src/IngredientsRepo');

describe('Ingredient class', () => {
  let ingredients, creamer, coffeeBeans;
  beforeEach( () => {
    ingredients = new IngredientsRepo();
    creamer = {id: 624, name: 'creamer', estimatedCostInCents: 240};
    coffeeBeans = {id: 642, name: 'coffee beans', estimatedCostInCents: 610}; 
  })

  describe('initialize', () => {
  
    it('should be a function', () => {
      expect(IngredientsRepo).to.be.a('function');
    })

    it('should be an instance of IngredientsRepo class', () => { 
      expect(ingredients).to.be.an.instanceof(IngredientsRepo);
    })

    it('should have no ingredients by default', () => {
      expect(ingredients.ingredientsArray).to.deep.equal([]);
    })

    it('should hold an ingredient', () => {
      ingredients = new IngredientsRepo([creamer]);

      expect(ingredients.ingredientsArray).to.deep.equal([creamer]);
    })

    it('should hold more than one ingredient', () => {
      ingredients = new IngredientsRepo([creamer, coffeeBeans]);
      
      expect(ingredients.ingredientsArray).to.deep.equal([creamer, coffeeBeans]);
    })
  }) 

  describe('methods', () => {

    it('should calculate a cost for a recipe', () => {
      ingredients = new IngredientsRepo([creamer]);
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

      expect(totalCost).to.equal('9.60');
    })
  
    it('should calculate more cost', () => {
      ingredients = new IngredientsRepo([creamer, coffeeBeans]);
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

      expect(totalCost).to.equal('53.60');
    })

    it('should calculate the cost of one ingredient from a recipe', () => {
      ingredients = new IngredientsRepo([creamer, coffeeBeans]);
      const ingredient = {id: 624, amount: 2};

      const cost = ingredients.calculateIngCostByDollar(ingredient);

      expect(cost).to.equal('4.80');
    })

    it('should return an id # when search by ingredient\'s name', () => {
      ingredients = new IngredientsRepo([creamer, coffeeBeans]);
      const id = ingredients.returnIds('creamer');
      
      expect(id).to.deep.equal([624]);
    })

    it('should return all id numbers that includes the ingredients name', () => {
      const coffeeCreamer = {id: 420, name: 'coffee creamer', cost: 100};
      ingredients = new IngredientsRepo([creamer, coffeeCreamer]);

      const ids = ingredients.returnIds('creamer');

      expect(ids).to.deep.equal([624, 420]);
    })

    it('should return undefined when ingredient\'s name is not found', () => {
      ingredients = new IngredientsRepo([creamer, coffeeBeans]);
      const id = ingredients.returnIds('milk');

      expect(id).to.deep.equal([]);
    })

    it('return the ingredients name matched with the same id', () => {
      ingredients = new IngredientsRepo([creamer, coffeeBeans]);
      const name = ingredients.returnName(coffeeBeans);

      expect(name).to.equal('coffee beans');
    })

  })

})