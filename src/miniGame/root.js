
var BeoTranMiniGameInitControlRoot = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
    // const GameCaroStart = new GameCaroInit();
    // this.addChild(GameCaroStart, 0);
    demoTestAll(this);
  },
});

function demoTestAll(that) {
  const demo = new DemoTest();
  that.addChild(demo);
}
