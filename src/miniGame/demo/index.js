var DemoTest = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
    // renderImg(this);
    renderAnimationsTextColorRun(this);
  },
});

// Hiển thị 1 ảnh:
function renderImg(that) {
  const imagetest = cc.Sprite.create(res.TraiDat_png);
  imagetest.setPosition(0, 0); //=>Set vị trí tương đối của vật thể trong trục tọa độ x0y
  imagetest.setContentSize(cc.size(0, 0)); //=>Set kích thước
  imagetest.setScale(0.25, 0.25); //Set tỷ lệ so với vật thể gốc và có thể kéo vật thể méo theo trục x0y
  imagetest.setAnchorPoint(cc.p(0.5, 0.5)); //Set tâm vật thể theo thằng cha của nó (0,0) góc dưới trái, (1,1) góc trên phải.
  that.addChild(imagetest, 0);
}

//Chữ hiệu ứng màu:
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
