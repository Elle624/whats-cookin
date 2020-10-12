const chai = require("chai");
const expect = chai.expect;
const Ingredient = require('../src/Ingredient');

describe('Ingredient class', () => {
  let ingredient, creamer, coffee;
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

    it('should calculate a cost', () => {
      ingredient = new Ingredient([creamer]);
      const recipe1 = [{id: 624, quantity: {amount: 4}}];

      let totalCost = ingredient.calculateCost(recipe1);

      expect(totalCost).to.equal(960);
    })
  
    it('should calculate more cost', () => {
      ingredient = new Ingredient([creamer, coffeeBeans]);
      const recipe2 = [{id: 624, quantity: {amount: 2}},{id: 642, quantity: {amount: 8}}];

      let totalCost = ingredient.calculateCost(recipe2);

      expect(totalCost).to.equal(5360);
    })
  })

})