var MapFlappyBirth = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    this.addBackGroundImg();
    //Lắng nghe sự kiện di chuyển chuột:
    if ("mouse" in cc.sys.capabilities) {
      cc.eventManager.addListener(
        {
          event: cc.EventListener.MOUSE,
          onMouseMove: function (event) {
            // console.log("Nghe chuột.... ", event);
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
            }
          },
        },
        this
      );
    }
    if (cc.sys.capabilities.hasOwnProperty("keyboard")) {
      cc.eventManager.addListener(
        {
          event: cc.EventListener.KEYBOARD,
          onKeyPressed: function (key, event) {
            console.log("Nghe bàn phím:", key);
            console.log("Nghe sự kiện bàn phím:", key);
          },
          onKeyReleased: function (key, event) {},
        },
        this
      );
    }
    // Lắng nghe sự kiện click chuột:
    const that = this;
    const listenerEventClickMouse = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        const { _point } = touch;
        const { x, y } = _point;
        const base = 10;
        const parsedX = parseInt(x, base);
        const parsedY = parseInt(y, base);
        that.addListenerTouchMousePO(parsedX, parsedY);
      },
      onTouchMoved: function (touch, event) {},
      onTouchEnded: function (touch, event) {},
    });
    cc.eventManager.addListener(
      listenerEventClickMouse,
      this.backgroundIntroFlappy
    );
  },
  //Khởi tạo ảnh nền:
  addBackGroundImg: function () {
    const winSize = cc.winSize;
    this.backgroundIntroFlappy = cc.Sprite.create(res.BackGroundFlappy_png);
    this.backgroundIntroFlappy.attr({
      x: winSize.width / 2,
      y: winSize.height / 2,
      scaleX: 1,
      scaleY: 1,
    });
    this.addChild(this.backgroundIntroFlappy, 0);
    //Ảnh nền chạy từ trái sang phải:
    const runBackGround = cc.moveBy(15, cc.p(-winSize.width / 2, 0));
    this.backgroundIntroFlappy.runAction(
      cc.repeatForever(
        cc.sequence(
          runBackGround,
          cc.CallFunc.create(function () {
            this.backgroundIntroFlappy.setPosition(
              cc.p(winSize.width / 2, winSize.height / 2)
            );
          }.bind(this),this)
        )
      )
    );
    //Ảnh nền vũ trụ:
    const backgroundIntroGalaxyImg = cc.Sprite.create(res.Galaxy_Img);
    backgroundIntroGalaxyImg.attr({
      x: 100,
      y: 500,
      scaleX: 0.15,
      scaleY: 0.15,
    });
    this.addChild(backgroundIntroGalaxyImg, 1);
    const rotateGalaxy = cc.spawn(cc.rotateBy(5, 360));
    backgroundIntroGalaxyImg.runAction(
      cc.repeatForever(cc.sequence(rotateGalaxy))
    );
  },
  //Lắng nghe sự kiện chuột:
  addListenerTouchMousePO: function (parsedX, parsedY) {
    console.log("Lắng nghe sự kiên click chuột", parsedX, parsedY);
  },
  //Thêm nhạc nền:
  addMusicBackground: function () {},
  //Thêm nút bắt đầu:
  addBtnStartGame: function () {},
});
