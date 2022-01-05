var MapFlappyBirth = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    if ("mouse" in cc.sys.capabilities) {
      cc.eventManager.addListener(
        {
          event: cc.EventListener.MOUSE,
          onMouseMove: function (event) {
            // console.log("Nghe chuột.... ", event);
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT)
              event.getCurrentTarget().processEvent(event);
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
    this.addBackGroundImg();
  },
  //Khởi tạo ảnh nền:
  addBackGroundImg: function () {
    const winSize = cc.winSize;
    //Tạo ra 1 ảnh bằng cc.Sprite
    const backgroundIntroFlappy = cc.Sprite.create(
      res.BackGroundFlappy_png,
      (0, 0, 200, 200)
    );
    backgroundIntroFlappy.attr({
      x: winSize.width / 2,
      y: winSize.height / 2,
    });
    this.addChild(backgroundIntroFlappy);
  },
  //Thêm nhạc nền:
});
