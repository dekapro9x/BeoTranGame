var Objs = {
  Square: null,
};
var GameClassLayerDemoEventHandle = cc.Layer.extend({
  ctor: function () {
    this._super();
    this.init();
    const that = this;
    this.renderImgStartGameBnt();
    renderAnimationsZoomImg(this);
    var listenerEvent = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        console.log("Event ấn chuột:", event);
        const { _point } = touch;
        console.log("Đã nghe thấy sự kiện ấn chuột", _point);
        const { x, y } = _point;
        console.log("Vị trí ấn chuột:", x, y);
        that.addFlagWhenClickMouse(x, y);
      },
      onTouchMoved: function (touch, event) {},
      onTouchEnded: function (touch, event) {},
    });
    cc.eventManager.addListener(listenerEvent, this.startGameBtn);
  },
  addFlagWhenClickMouse: function (x, y) {
    const labelNameGame = new cc.LabelTTF();
    labelNameGame.setFontSize(25);
    labelNameGame.setFontName("Arial");
    labelNameGame.setString("*");
    labelNameGame.x = x;
    labelNameGame.y = y;
    labelNameGame.runAction(cc.spawn(cc.tintTo(0.5, 238, 130, 238)));
    labelNameGame.runAction(cc.spawn(cc.tintTo(2.5, 255, 0, 0)));
    this.addChild(labelNameGame, 0);
  },
  update: function (dt) {},
  checkCollision: function () {},
  onTouchBegan: function (touch, event) {},
  onTouchMoved: function (touch, event) {},
  addTexts: function () {},
  SoundClicked: function () {},
  addSquares: function () {},
  generateDirection: function () {},
  renderImgStartGameBnt: function () {
    this.startGameBtn = cc.Sprite.create(res.StartGameBnt_png);
    this.startGameBtn.setPosition(0, 0);
    this.startGameBtn.setContentSize(cc.size(0, 0));
    this.startGameBtn.setScale(0.75, 0.5);
    this.startGameBtn.setAnchorPoint(cc.p(0.5, 0.5));
    this.addChild(this.startGameBtn, 0);
  },
});

//3.Hiển thị ảnh phóng to:
function renderAnimationsZoomImg(that) {
  const timeOut = 1000;
  const size = cc.winSize;
  const sprite = new cc.Sprite(res.TraiDat_png);
  sprite.attr({
    x: size.width / 2,
    y: size.height / 2,
    scale: 0.5,
    rotation: 180,
  });
  setTimeout(() => {
    sprite.runAction(cc.sequence(cc.rotateTo(2, 0), cc.scaleTo(2, 0.7, 0.7)));
  }, timeOut);
  that.addChild(sprite, 0);
}
