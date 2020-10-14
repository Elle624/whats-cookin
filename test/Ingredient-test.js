const chai = require("chai");
const expect = chai.expect;
const Ingredient = require('../src/Ingredient');

describe('Ingredient class', () => {
  let ingredient, creamer, coffeeBeans;
  beforeEach( () => {
    ingredient = new Ingredient();
    creamer = new Ingredient(624, 'creamer', 240);
    coffeeBeans = new Ingredient(642, 'coffee beans', 610);
  })

  describe('initialize', () => {
  
    it('should be a function', () => {
      expect(Ingredient).to.be.a('function');
    })

    it('should be an instance of Ingredient class', () => { 
      expect(ingredient).to.be.an.instanceof(Ingredient);
    })

    it('should have an id', () => {
      expect(creamer.id).to.equal(624);
    })

    it('should have a name', () => {
      expect(coffeeBeans.name).to.equal('coffee beans');
    })

  }) 

})