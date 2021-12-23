var DemoTest = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
    const LayerEventHandleDemo = new GameClassLayerDemoEventHandle();
    renderImgBacDaChe(this);
    this.addChild(LayerEventHandleDemo, 0);
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
  renderImgBaDaChe : function () {

  },
});

//Hiển thị ảnh bác Đa chế:
function renderImgBacDaChe(that) {
  const imagetest = cc.Sprite.create(res.BacDa_png);
  imagetest.setPosition(0, 0); //=>Set vị trí tương đối của vật thể trong trục tọa độ x0y
  imagetest.setContentSize(cc.size(0, 0)); //=>Set kích thước
  imagetest.setScale(1, 1); //Set tỷ lệ so với vật thể gốc và có thể kéo vật thể méo theo trục x0y
  imagetest.setAnchorPoint(cc.p(0.5, 0.5)); //Set tâm vật thể theo thằng cha của nó (0,0) góc dưới trái, (1,1) góc trên phải.
  that.addChild(imagetest, 0);
}
