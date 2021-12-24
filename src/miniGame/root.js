

var BeoTranMiniGameInitControlRoot = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
    //Run:
    const MenuGameSelect = new MenuIntroSelectGameLayer();
    this.addChild(MenuGameSelect, 0);
    //Demo Game:
    // const DemoRun = new DemoTest();
    // this.addChild(DemoRun);
  },
});
