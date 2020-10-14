const chai = require("chai");
const expect = chai.expect;
const Pantry = require('../src/Pantry');

describe('Pantry class', () => {
  let pantry;
  beforeEach(() => {
    pantry = new Pantry();
    ellePantry = new Pantry([
      {ingredient: 11, acount: 6},
      {ingredient: 22, acount: 7},
      {ingredient: 33, acount: 8}
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

    it('should return true if pantry has enough ingredients for the recipe', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 2}},
        {id: 22, quantity: {amount: 4}},
        {id: 33, quantity: {amount: 3}}]}
      let result = ellePantry.checkPantry(recipe);

      expect(result).to.equal(true);
    })

    it('should return false if pantry does not have enough ingredients for the recipe', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 2}},
        {id: 22, quantity: {amount: 4}},
        {id: 44, quantity: {amount: 6}}]}
      let result = ellePantry.checkPantry(recipe);

      expect(result).to.equal(false);
    })

    it('should return missing ingredients in an array', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 2}},
        {id: 22, quantity: {amount: 6}},
        {id: 33, quantity: {amount: 16}}
      ]}
      let result = ellePantry.checkMissingIngredient(recipe);
      

      expect(result).to.deep.equal([{id: 33, quantity: {amount: 16}}])
    })

    it('', () => {
      const recipe = {ingredients: [
        {id: 11, quantity: {amount: 2}},
        {id: 24, quantity: {amount: 10}},
        {id: 25, quantity: {amount: 6}}
      ]}
      let result = ellePantry.checkMissingIngredient(recipe);
      // ellePantry = new Pantry([
      //   {ingredient: 11, acount: 6},
      //   {ingredient: 22, acount: 7},
      //   {ingredient: 33, acount: 8}
      // ])
     
      expect(result).to.deep.equal([
        {id: 24, quantity: {amount: 10}},
        {id: 25, quantity: {amount: 6}}
      ])
      
    })
  })

})