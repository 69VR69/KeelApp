const {calculFrame,calculScoreTotal,calculLastFrame,setFrameScore}=require("../../src/server/models/grid");

const Grid= require("../../src/server/models/grid");
const Frame= require("../../src/server/models/frame");

const assert = require('assert');
const { getEnvironmentData } = require('worker_threads');


describe('Score', function () {
describe('calculFrame', function(){
  it('Calcul the score of a frame with no spare and no strike',function(){
    var g = new Grid();
    var playerName ="player1" 
    g.addPlayer(playerName);
    g.setFrameThrow(playerName,1,1,2);
    g.setFrameThrow(playerName,2,10,0);
    g.setFrameThrow(playerName,3,8,2);
    g.setFrameThrow(playerName,4,0,0);
    g.setFrameThrow(playerName,5,10);
    g.setFrameThrow(playerName,6,10,0);
    g.setFrameThrow(playerName,7,10,0);
    g.setFrameThrow(playerName,8,2,8);
    g.setFrameThrow(playerName,9,10,);
    g.setFrameThrow(playerName,10,10,5,3);
    assert.equal(g.calculFrame(playerName,1),3); // No strike, no spare
  });
  it('Calcul the score of a frame with one strike in a row',function(){
    var g = new Grid();
    var playerName ="player1" 
    g.addPlayer(playerName);
    g.setFrameThrow(playerName,1,1,2);
    g.setFrameThrow(playerName,2,10);
    g.setFrameThrow(playerName,3,8,2);
    g.setFrameThrow(playerName,4,0,0);
    g.setFrameThrow(playerName,5,10);
    g.setFrameThrow(playerName,6,10,0);
    g.setFrameThrow(playerName,7,10,0);
    g.setFrameThrow(playerName,8,2,8);
    g.setFrameThrow(playerName,9,10,);
    g.setFrameThrow(playerName,10,10,5,3);
    assert.equal(g.calculFrame(playerName,7),20); //1 strike in a row
  });
  it('Calcul the score of a frame with spare',function(){
    var g = new Grid();
    var playerName ="player1" 
    g.addPlayer(playerName);
    g.setFrameThrow(playerName,1,1,2);
    g.setFrameThrow(playerName,2,10);
    g.setFrameThrow(playerName,3,8,2);
    g.setFrameThrow(playerName,4,5,3);
    g.setFrameThrow(playerName,5,10);
    g.setFrameThrow(playerName,6,10,0);
    g.setFrameThrow(playerName,7,10,0);
    g.setFrameThrow(playerName,8,2,8);
    g.setFrameThrow(playerName,9,10,);
    g.setFrameThrow(playerName,10,10,5,3);
    assert.equal(g.calculFrame(playerName,3),15); //spare
  });
  it('Calcul the score of a frame with 3 strike in a row',function(){
    var g = new Grid();
    var playerName ="player1" 
    g.addPlayer(playerName);
    g.setFrameThrow(playerName,1,1,2);
    g.setFrameThrow(playerName,2,10);
    g.setFrameThrow(playerName,3,8,2);
    g.setFrameThrow(playerName,4,0,0);
    g.setFrameThrow(playerName,5,10);
    g.setFrameThrow(playerName,6,10,0);
    g.setFrameThrow(playerName,7,10,0);
    g.setFrameThrow(playerName,8,2,8);
    g.setFrameThrow(playerName,9,10,);
    g.setFrameThrow(playerName,10,10,5,3);
    assert.equal(g.calculFrame(playerName,5),30); // 3 strikes in a row
});
it('Calcul the score of a frame with 2 strike in a row',function(){
  var g = new Grid();
  var playerName ="player1" 
  g.addPlayer(playerName);
  g.setFrameThrow(playerName,1,1,2);
  g.setFrameThrow(playerName,2,10);
  g.setFrameThrow(playerName,3,8,2);
  g.setFrameThrow(playerName,4,0,0);
  g.setFrameThrow(playerName,5,10);
  g.setFrameThrow(playerName,6,10,0);
  g.setFrameThrow(playerName,7,10,0);
  g.setFrameThrow(playerName,8,2,8);
  g.setFrameThrow(playerName,9,10,);
  g.setFrameThrow(playerName,10,10,5,3);
    assert.equal(g.calculFrame(playerName,6),22); // 2 strikes in a row
  });
  it('Calcul the score of a frame with strike at the 9th frame',function(){
    var g = new Grid();
    var playerName ="player1" 
    g.addPlayer(playerName);
    g.setFrameThrow(playerName,1,1,2);
    g.setFrameThrow(playerName,2,10);
    g.setFrameThrow(playerName,3,8,2);
    g.setFrameThrow(playerName,4,0,0);
    g.setFrameThrow(playerName,5,10);
    g.setFrameThrow(playerName,6,10,0);
    g.setFrameThrow(playerName,7,10,0);
    g.setFrameThrow(playerName,8,2,8);
    g.setFrameThrow(playerName,9,10,);
    g.setFrameThrow(playerName,10,10,5,3);
    assert.equal(g.calculFrame(playerName,9),25);// strike at the 9th frame with 2 strikes in a row

  });
  it('Calcul the score of the 10th frame',function(){
    var g = new Grid();
    var playerName ="player1" 
    g.addPlayer(playerName);
    g.setFrameThrow(playerName,1,1,2);
    g.setFrameThrow(playerName,2,10);
    g.setFrameThrow(playerName,3,8,2);
    g.setFrameThrow(playerName,4,0,0);
    g.setFrameThrow(playerName,5,10);
    g.setFrameThrow(playerName,6,10,0);
    g.setFrameThrow(playerName,7,10,0);
    g.setFrameThrow(playerName,8,2,8);
    g.setFrameThrow(playerName,9,10,);
    g.setFrameThrow(playerName,10,10,5,3);

    assert.equal(g.calculFrame(playerName,10),18);// case of the 10th frame
  });
    
  });

  describe('calculScoreTotal', function(){
    var t=[3,23,33,33,63,85,105,125,150,168];
    var g = new Grid();
    var playerName ="player1" 
    g.addPlayer(playerName);
    g.setFrameThrow(playerName,1,1,2);
    g.setFrameThrow(playerName,2,10,0);
    g.setFrameThrow(playerName,3,8,2);
    g.setFrameThrow(playerName,4,0,0);
    g.setFrameThrow(playerName,5,10,0);
    g.setFrameThrow(playerName,6,10,0);
    g.setFrameThrow(playerName,7,10,0);
    g.setFrameThrow(playerName,8,2,8);
    g.setFrameThrow(playerName,9,10,0);
    g.setFrameThrow(playerName,10,10,5,3);
    it('Calcul the final score and the score accumulated of all the frames',function(){
      assert.equal(g.calculScoreTotal(playerName),168);
    }

    );

    for(let i=0;i<10;i=i+1){
      it("Check if the accumulated score of the frame "+(i+1)+" is correct",function(){
        assert.equal(g.players.get(playerName).frames[i].getTotalScore(),t[i]);
      });
    }
 }
 );

describe('calculLastFrame', function() {

  var g = new Grid();


  describe('Return the correct result of frame 10 (correct data)', function() {
    it('Maximum score with a third throw (3 strikes)', function () {
      assert.equal(g.calculLastFrame(new Frame(10, 10,10)), 30);
    });
    it('Strike on the first throw', function () {
      assert.equal(g.calculLastFrame(new Frame(10, 5,5)), 20);
    });
    it('Score without third throw', function () {
      assert.equal(g.calculLastFrame(new Frame(4, 4,0)), 8);
    });
    it('Score with third throw (spare)', function () {
      assert.equal(g.calculLastFrame(new Frame(8, 2,7)), 17);
    });
    it('Score with 0 point (0 fallen keel)', function () {
      assert.equal(g.calculLastFrame(new Frame(0, 0,0)), 0);
    });
    it('Second throw score', function () {
      assert.equal(g.calculLastFrame(new Frame(0, 5,0)), 5);
    });
    it('Score with spare on the second throw', function () {
      assert.equal(g.calculLastFrame(new Frame(0, 10,4)), 14);
    });
    it('Score with 2 strikes (2 first throw)', function () {
      assert.equal(g.calculLastFrame(new Frame(10, 10,4)), 24);
    });
    it('score with 2 strikes (2 last throw)', function () {
      assert.equal(g.calculLastFrame(new Frame(0, 10,10)), 20);
    });
    it('Null on third value', function () {
      assert.equal(g.calculLastFrame(new Frame(0, 10,null)), 10);
    });
  });

  describe('Return result of frame 10 (or 0) with illegal number', function() {
    it('Illegal third throw', function () {
      assert.equal(g.calculLastFrame(new Frame(9, 0, 9)), 9);
    });
  });

  describe('Manage strange data', function() {
    it('Undefine frame', function () {
      assert.equal(g.calculLastFrame(undefined), 0);
    });
    it('Null frame', function () {
      assert.equal(g.calculLastFrame(null), 0);
    });
    it('Null frame value', function () {
      assert.equal(g.calculLastFrame(new Frame(null, null, null)), 0);
    });
    it('Not a frame', function () {
      assert.equal(g.calculLastFrame(""), 0);
    });
  });
});
});
