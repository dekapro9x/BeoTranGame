var Objs = {
  Square: null,
};
var GameClassLayerDemoEventHandle = cc.Layer.extend({
  ctor: function (parent) {
    this._super();
    this.init();
    const that = this;
    this.renderImgSaoChoi();
    this.renderButtonStartGame(parent);
    // renderImgTraiDatQuayTron(this);
    const listenerEvent = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        const { _point } = touch;
        const { x, y } = _point;
        that.addFlagWhenClickMouse(x, y);
      },
      onTouchMoved: function (touch, event) {},
      onTouchEnded: function (touch, event) {},
    });
    cc.eventManager.addListener(listenerEvent, this.startGameBtn);
  },
  //Đặt cờ tại mỗi vị trí bắt được sự kiện click chuột:
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
  onTouchBegan: function (touch, event) {},
  onTouchMoved: function (touch, event) {},
  renderImgSaoChoi: function () {
    this.startGameBtn = cc.Sprite.create(res.SaoChoi_png);
    this.startGameBtn.x = 873;
    this.startGameBtn.y = 535;
    this.startGameBtn.setScale(0.75, 0.7);
    this.startGameBtn.setAnchorPoint(cc.p(0.5, 0.5));
    this.addChild(this.startGameBtn, 0);
  },
  renderButtonStartGame: function (parent) {
    const startBtn = new ButtonStart(parent);
    this.addChild(startBtn, 0);
  },
});

// Nút ấn bắt đầu game:
var ButtonStart = cc.Layer.extend({
  ctor: function (parent) {
    this._super();
    this.init();
    const that = this;
    this.renderImgButtonStart();
    const listenerEvent = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        const { _point } = touch;
        const { x, y } = _point;
        that.handleClickMouse(x, y, parent);
      },
      onTouchMoved: function (touch, event) {},
      onTouchEnded: function (touch, event) {},
    });
    cc.eventManager.addListener(listenerEvent, this.button);
  },
  renderImgButtonStart: function () {
    this.button = cc.Sprite.create(res.Play_png);
    this.button.attr({
      x: 0,
      y: 0,
      scale: 0.1,
      rotation: 0,
    });
    this.button.runAction(cc.spawn(cc.moveBy(1, cc.p(212, 546))));
    this.addChild(this.button, 0);
  },
  handleClickMouse: function (x, y, parent) {
    const base = 10;
    const parsedX = parseInt(x, base);
    const parsedY = parseInt(y, base);
    if (167 < parsedX && parsedX < 259 && 507 < parsedY && parsedY < 590) {
      this.parent.removeChild(this, true);
      parent.changeSceneOne();
      this.playMusicStartGame();
      this.removeChild(this, true);
    } else {
      this.stopMusicStartGame();
    }
  },
  playMusicStartGame: function () {
    cc.audioEngine.playMusic(res.backGround_Music);
  },
  stopMusicStartGame: function () {
    cc.audioEngine.stopMusic();
  },
});
