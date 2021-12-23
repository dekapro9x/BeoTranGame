var Objs = {
  Square: null,
};
var GameClassLayerDemoEventHandle = cc.Layer.extend({
  ctor: function () {
    this._super();
    this.init();
    const that = this;
    this.renderImgStartGameBnt();
    this.renderButtonStartGame();
    renderAnimationsZoomImg(this);
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
  renderButtonStartGame: function () {
    const startBtn = new ButtonStart();
    this.addChild(startBtn, 0);
  },
});

// Nút ấn bắt đầu game:
var ButtonStart = cc.Layer.extend({
  ctor: function () {
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
        that.handleClickMouse(x, y);
      },
      onTouchMoved: function (touch, event) {},
      onTouchEnded: function (touch, event) {},
    });
    cc.eventManager.addListener(listenerEvent, this.button);
  },
  renderImgButtonStart: function () {
    const size = cc.winSize;
    this.button = cc.Sprite.create(res.Play_png);
    this.button.attr({
      x: size.width - 100,
      y: 80,
      scale: 0.1,
      rotation: 180,
    });
    this.addChild(this.button, 0);
  },
  handleClickMouse: function (x, y) {
    const base = 10;
    const parsedX = parseInt(x, base);
    const parsedY = parseInt(y, base);
    console.log("Vị trí ấn chuột:", x, y);
    console.log("Tọa độ xác định:", parsedX, parsedY);
    if (811 < parsedX && parsedX < 905 && 34 < parsedY && parsedY < 105) {
      console.log("Run....????", this);
    }
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

//1.Hiển thị 1 ảnh:
function renderImg(that) {
  const imagetest = cc.Sprite.create(res.TraiDat_png);
  imagetest.setPosition(0, 0); //=>Set vị trí tương đối của vật thể trong trục tọa độ x0y
  imagetest.setContentSize(cc.size(0, 0)); //=>Set kích thước
  imagetest.setScale(0.25, 0.25); //Set tỷ lệ so với vật thể gốc và có thể kéo vật thể méo theo trục x0y
  imagetest.setAnchorPoint(cc.p(0.5, 0.5)); //Set tâm vật thể theo thằng cha của nó (0,0) góc dưới trái, (1,1) góc trên phải.
  that.addChild(imagetest, 0);
}

//2.Chữ hiệu ứng màu:
function renderAnimationsTextColorRun(that) {
  const size = cc.winSize;
  const helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
  helloLabel.x = size.width / 2;
  helloLabel.y = 0;
  helloLabel.runAction(
    cc.spawn(
      cc.moveBy(2.5, cc.p(0, size.height - 40)),
      cc.tintTo(2.5, 255, 125, 0)
    )
  );
  that.addChild(helloLabel, 5);
}

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
    console.log("renderAnimationsZoomImg Delay 1s");
    sprite.runAction(cc.sequence(cc.rotateTo(2, 0), cc.scaleTo(2, 0.7, 0.7)));
  }, timeOut);
  that.addChild(sprite, 0);
}
