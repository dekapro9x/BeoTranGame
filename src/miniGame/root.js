var MenuSelectGameLayer = cc.Layer.extend({
  ctor: function () {
    this._super();
    this.init();
    renderAnimationsZoomImg(this);
    this.renderMenu();
  },
  renderMenu: function () {
    const arrMenu = ListMenuGame;
    const size = cc.winSize;
    for (let index = 0; index < arrMenu.length; index++) {
      const menuLable = new cc.LabelTTF(
        index + 1 + "." + arrMenu[index].name,
        "Arial",
        45
      );
      menuLable.x = size.width / 2;
      menuLable.y = 0;
      menuLable.runAction(
        cc.spawn(
          cc.moveBy(2.5, cc.p(0, size.height - 80 * (index + 1))),
          cc.tintTo(2.5, 255, 125, 0)
        )
      );
      console.log(menuLable.getFontSize());
      this.addChild(menuLable, 5);
    }
  },
});

function renderAnimationsZoomImg(that) {
  const size = cc.winSize;
  const sprite = new cc.Sprite(res.TraiDat_png);
  sprite.attr({
    x: size.width / 2,
    y: size.height / 2,
    scale: 0.5,
    rotation: 180,
  });
  sprite.runAction(cc.sequence(cc.rotateTo(2, 0), cc.scaleTo(2, 0.7, 0.7)));
  that.addChild(sprite, 0);
}

var BeoTranMiniGameInitControlRoot = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
    //Run:
    const MenuGameSelect = new MenuSelectGameLayer();
    this.addChild(MenuGameSelect, 0);
    //Demo Game:
    // const DemoRun = new DemoTest();
    // this.addChild(DemoRun);
  },
});
