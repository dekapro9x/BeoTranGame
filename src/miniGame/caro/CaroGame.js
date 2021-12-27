const nameChirldGameCaro = {
  Img_MiniOn: "Img_Minion",
  Text_Caro: "Text_Caro",
};
var GameCaroInit = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    const that = this;
    const size = cc.winSize;
    //Tạo ảnh nền Minion:
    const imgMinion = cc.Sprite.create(res.MiniOn_png);
    imgMinion.setName(nameChirldGameCaro.Img_MiniOn);
    imgMinion.setPosition(480, 323);
    imgMinion.setScale(0.3, 0.3);
    this.addChild(imgMinion, 0);
    //Tạo chữ:
    const textCaroRun = new cc.LabelTTF();
    textCaroRun.setString("Cờ Ca Rô");
    textCaroRun.setName(nameChirldGameCaro.Text_Caro);
    textCaroRun.setFontSize(45);
    textCaroRun.x = 0;
    textCaroRun.y = 0;
    textCaroRun.runAction(
      //Tạo ra hành động ngay lập tức:
      cc.spawn(
        cc.moveBy(2.5, cc.p(size.width / 2, size.height - 170)),
        cc.RotateBy(1, 114, 118),
        cc.tintTo(2.5, 245, 40, 145)
      )
    );
    this.addChild(textCaroRun);
    //Đặt sự kiện lắng nghe click chuột vào _children:
    const listenerEvent = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        const { _point } = touch;
        const { x, y } = _point;
        const base = 10;
        const parsedX = parseInt(x, base);
        const parsedY = parseInt(y, base);
        that.zoomImgMinion(parsedX, parsedY);
      },
      onTouchMoved: function (touch, event) {},
      onTouchEnded: function (touch, event) {},
    });
    const entityImgMinion = this.getChildByName(nameChirldGameCaro.Img_MiniOn);
    cc.eventManager.addListener(listenerEvent, entityImgMinion);
  },
  zoomImgMinion: function (parsedX, parsedY) {
    console.log("Vị trí ấn chuột >>:", parsedX, parsedY);
    //Lấy vị trí thực thể ảnh Mini on:
    const entityImgMinionPo = this.getChildByName(
      nameChirldGameCaro.Img_MiniOn
    );
    const checkMouse = {
      inX: false,
      inY: false,
    };
    const po = entityImgMinionPo._position;
    const size = entityImgMinionPo._contentSize;
    const xMin = po.x - size.width / 2;
    const xMax = po.x + size.width / 2;
    const yMin = po.y - size.height / 2;
    const yMax = po.y + size.height / 2;
    const mouseClick = cc.p(parsedX, parsedY);
    console.log("po", po);
    console.log("size", size);
    console.log("xMin,xMax", xMin, xMax);
    console.log("yMin,yMax", yMin, yMax);
    if (mouseClick.x > xMin && mouseClick.x < xMax) {
      checkMouse.inX = true;
    }
    if (mouseClick.y > yMin && mouseClick.y < yMax) {
      checkMouse.inY = true;
    }
    console.log("checkMouse", checkMouse);
  },
});
