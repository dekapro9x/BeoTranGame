var DemoTest = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
    const LayerEventHandleDemo = new GameClassLayerDemoEventHandle();
    this.addChild(LayerEventHandleDemo);
    //Demo:
    // demoRun(this);
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
            MW.KEYS[key] = true;
          },
          onKeyReleased: function (key, event) {
            MW.KEYS[key] = false;
          },
        },
        this
      );
    }
    if (cc.sys.capabilities.hasOwnProperty("touches")) {
      cc.eventManager.addListener(
        {
          prevTouchId: -1,
          event: cc.EventListener.TOUCH_ALL_AT_ONCE,
          onTouchesMoved: function (touches, event) {
            console.log("Cái này làm gì méo hiểu?");
            var touch = touches[0];
            if (this.prevTouchId != touch.getID())
              this.prevTouchId = touch.getID();
            else event.getCurrentTarget().processEvent(touches[0]);
          },
        },
        this
      );
    }
  },
});

function demoRun(that) {
  // renderImg(that);
  // renderAnimationsTextColorRun(that);
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
    console.log("renderAnimationsZoomImg Delay 1s")
    sprite.runAction(cc.sequence(cc.rotateTo(2, 0), cc.scaleTo(2, 0.7, 0.7)));
  }, timeOut);
  that.addChild(sprite, 0);
}
