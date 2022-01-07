var MapFlappyBirth = cc.Scene.extend({
  ctor: function () {
    this.poX_Mouse = 0;
    this.poY_Mouse = 0;
    this._super();
    this.init();
  },
  init: function () {
    const that = this;
    this.addBackGroundImg();
    this.addFigure();
    //Lắng nghe sự kiện di chuyển chuột:
    if ("mouse" in cc.sys.capabilities) {
      cc.eventManager.addListener(
        {
          event: cc.EventListener.MOUSE,
          onMouseMove: function (event) {
            const { _x, _y } = event;
            const base = 10;
            const parsedX = parseInt(_x, base);
            const parsedY = parseInt(_y, base);
            that.changePoFigure(parsedX, parsedY);
            that.poX_Mouse = parsedX;
            that.poY_Mouse = parsedY;
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
            if (key == 32) {
              that.attactbyFigure(key);
            }
          },
          onKeyReleased: function (key, event) {},
        },
        this
      );
    }
    // Lắng nghe sự kiện click chuột:
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
      scaleY: 1.5,
    });
    this.addChild(this.backgroundIntroFlappy, 0);
    //Ảnh nền chạy từ trái sang phải:
    const runBackGround = cc.moveBy(10, cc.p(-winSize.width / 2, 0));
    this.backgroundIntroFlappy.runAction(
      cc.repeatForever(
        cc.sequence(
          runBackGround,
          cc.CallFunc.create(
            function () {
              this.backgroundIntroFlappy.setPosition(
                cc.p(80, winSize.height / 2)
              );
            }.bind(this),
            this
          )
        )
      )
    );
    //Ảnh nền vũ trụ mặt trời:
    const backgroundIntroGalaxyImg = cc.Sprite.create(res.Galaxy_Img);
    backgroundIntroGalaxyImg.attr({
      x: 65,
      y: 570,
      scaleX: 0.25,
      scaleY: 0.25,
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
  //Tạo hình nhân vật:
  addFigure: function () {
    this.Figure = cc.Sprite.create(res.Figure_Flappy_Bird_Img);
    this.Figure.attr({
      x: 80,
      y: 325,
      scaleX: 0.06,
      scaleY: 0.06,
    });
    this.addChild(this.Figure, 3);
  },
  //Thay đổi vị trí máy bay theo chuột:
  changePoFigure: function (parsedX, parsedY) {
    this.Figure.setPosition(cc.p(parsedX, parsedY));
  },
  //Bắn đạn từ đầu máy bay:
  attactbyFigure: function () {
    console.log("this...", this.poX_Mouse, this.poY_Mouse);
    const bullet = cc.Sprite.create(res.Bullet_Img);
    bullet.attr({
      x: this.poX_Mouse + 30,
      y: this.poY_Mouse + 30,
      scaleX: 0.06,
      scaleY: 0.06,
    });
    this.addChild(bullet, 3);
  },
});
