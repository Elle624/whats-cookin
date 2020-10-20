const chai = require("chai");
const expect = chai.expect;
const Pantry = require('../src/Pantry');

describe('Pantry class', () => {
  let pantry;
  beforeEach(() => {
    pantry = new Pantry();
    ellePantry = new Pantry([
      {ingredient: 11, amount: 6},
      {ingredient: 22, amount: 7},
      {ingredient: 33, amount: 8}
    ])
  })

  describe('initialize', () => {

    it('should be a function', () => {
      expect(Pantry).to.be.a('function');
    })

    it('should be an instance of Pantry class', () => {
      expect(ellePantry).to.be.an.instanceof(Pantry);
    })

    it('should have a pantry', () => {
      expect(ellePantry.pantry.length).to.equal(3);
    })
  })

  describe('methods', () => {

    it('should return empty if pantry has enough ingredients for the recipe', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 2, unit: 'tbs'}},
        {id: 22, quantity: {amount: 4, unit: 'lbs'}},
        {id: 33, quantity: {amount: 3, unit: 'mg'}}
      ]}

      let result = ellePantry.compareIngredients(recipe);
      
      expect(result).to.deep.equal([]);
    })

    it('should return ingredients that\'s missing from pantry in an array', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 2, unit: 'tbs'}},
        {id: 24, quantity: {amount: 10, unit: 'lbs'}},
        {id: 45, quantity: {amount: 6, unit: 'mg'}}
      ]}
      let result = ellePantry.compareIngredients(recipe);
      
      expect(result).to.deep.equal([
        {id: 24, quantity: {amount: 10, unit: 'lbs'}},
        {id: 45, quantity: {amount: 6, unit: 'mg'}}
      ])
    })

    it('should also return ingredients that does not have enough amount from pantry in the array', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 2, unit: 'tbs'}},
        {id: 22, quantity: {amount: 10, unit: 'lbs'}},
        {id: 25, quantity: {amount: 6, unit: 'mg'}}
      ]}
      let result = ellePantry.compareIngredients(recipe);

      expect(result).to.deep.equal([
        {id: 22, quantity: {amount: 10, unit: 'lbs'}},
        {id: 25, quantity: {amount: 6, unit: 'mg'}}
      ])
      
    })

    it('should return an empty array if no missing ingredients', () => {
      const result = ellePantry.reviewMissingIngredients();

      expect(result).to.deep.equal([]);
    })

    it('should re-arrange missing ingredients in a new object with missing amount', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 2, unit: 'tbs'}},
        {id: 22, quantity: {amount: 10, unit: 'lbs'}},
        {id: 25, quantity: {amount: 6, unit: 'mg'}}
      ]};
     
      let result = ellePantry.reviewMissingIngredients([
        {id: 22, quantity: {amount: 10, unit: 'lbs'}},
        {id: 25, quantity: {amount: 6, unit: 'mg'}}
      ]);

      expect(result).to.deep.equal([
        {amount: 3, unit: 'lbs', id: 22},
        {amount: 6, unit: 'mg', id: 25}
      ]);
    })

    it('should remove ingredients amount accordingly once a recipe is chosen', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 6, unit: 'tbs'}},
        {id: 22, quantity: {amount: 1, unit: 'lbs'}}
      ]};
    
      ellePantry.removeIngredients(recipe);
    
      expect(ellePantry.pantry[0]).to.deep.equal({ingredient: 11, amount: 0});
    })

    it('should return zero when pantry is running out of that ingredient', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 6, unit: 'tbs'}},
        {id: 22, quantity: {amount: 50, unit: 'lbs'}}
      ]};

      ellePantry.removeIngredients(recipe);
    
      expect(ellePantry.pantry[1]).to.deep.equal({ingredient: 22, amount: 0});
    })
  })

})