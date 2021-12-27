const nameChirldGameCaro = {
  Img_MiniOn: "Img_Minion",
  Text_Caro: "Text_Caro",
  Loa_Left_Img: "Loa_Img_Left",
  Loa_Ringt_Img: "Loa_Img_Right",
  Start_Game_Btn: "Button_Start",
  OVuong_Img: "O_Vuong_",
};
var GameCaroInit = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    this.isZoomBtnStart = false;
    const that = this;
    const size = cc.winSize;
    //Tạo ảnh nền Minion:
    const imgMinion = cc.Sprite.create(res.MiniOn_png);
    imgMinion.setName(nameChirldGameCaro.Img_MiniOn);
    imgMinion.setPosition(480, 323);
    imgMinion.setScale(0.3, 0.3);
    this.addChild(imgMinion, 0);
    //Tạo 2 loa:
    const imgLoaLeft = cc.Sprite.create(res.Loa_png);
    imgLoaLeft.setName(nameChirldGameCaro.Loa_Left_Img);
    imgLoaLeft.setPosition(343, 412);
    imgLoaLeft.setScale(0.15, 0.15);
    this.addChild(imgLoaLeft, 1);
    const imgLoaRight = cc.Sprite.create(res.Loa_png);
    imgLoaRight.setName(nameChirldGameCaro.Loa_Ringt_Img);
    imgLoaRight.setPosition(618, 418);
    imgLoaRight.setScale(0.15, 0.15);
    this.addChild(imgLoaRight, 1);
    //Nút bắt đầu Game:
    const startBtn = cc.Sprite.create(res.Play_png);
    startBtn.setName(nameChirldGameCaro.Start_Game_Btn);
    startBtn.setPosition(476, 131);
    startBtn.setScale(0.25, 0.25);
    this.addChild(startBtn, 1);
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
        that.zoomAnimationsAllChirld(parsedX, parsedY);
      },
      onTouchMoved: function (touch, event) {},
      onTouchEnded: function (touch, event) {},
    });
    const entityImgMinion = this.getChildByName(nameChirldGameCaro.Img_MiniOn);
    cc.eventManager.addListener(listenerEvent, entityImgMinion);
    //Lắng nghe sự kiện trỏ chuột vào nút Start:
    if ("mouse" in cc.sys.capabilities) {
      cc.eventManager.addListener(
        {
          event: cc.EventListener.MOUSE,
          onMouseMove: function (event) {
            const { _x, _y } = event;
            const base = 10;
            const parsedX = parseInt(_x, base);
            const parsedY = parseInt(_y, base);
            that.handleZoomBtnStart(parsedX, parsedY);
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
              console.log("Giữ và kéo lê chuột trái:");
            }
          },
        },
        this
      );
    }
  },
  handleZoomBtnStart: function (parsedX, parsedY) {
    const entityBtnStart = this.getChildByName(
      nameChirldGameCaro.Start_Game_Btn
    );
    const checkMouseBtnStart = {
      inX: false,
      inY: false,
    };
    const po = entityBtnStart._position;
    const size = entityBtnStart._contentSize;
    const minX = po.x - (size.width * 0.25) / 2;
    const maxX = po.x + (size.width * 0.25) / 2;
    const minY = po.y - (size.height * 0.25) / 2;
    const maxY = po.y + (size.height * 0.25) / 2;
    if (parsedX > minX && parsedX < maxX) {
      checkMouseBtnStart.inX = true;
    }
    if (parsedY > minY && parsedY < maxY) {
      checkMouseBtnStart.inY = true;
    }
    if (checkMouseBtnStart.inX && checkMouseBtnStart.inY) {
      if (!this.isZoomBtnStart) {
        this.isZoomBtnStart = true;
        entityBtnStart.setScale(0.5, 0.5);
      }
    } else {
      if (this.isZoomBtnStart) {
        this.isZoomBtnStart = false;
        entityBtnStart.setScale(0.25, 0.25);
      }
    }
  },
  zoomAnimationsAllChirld: function (parsedX, parsedY) {
    console.log("Vị trí click chuột:", parsedX, parsedY);
    this.clickStartGame(parsedX, parsedY);
    //Lấy vị trí thực thể ảnh Mini on:
    const entityImgMinionPo = this.getChildByName(
      nameChirldGameCaro.Img_MiniOn
    );
    const entityTextCaro = this.getChildByName(nameChirldGameCaro.Text_Caro);
    const loaTrai = this.getChildByName(nameChirldGameCaro.Loa_Left_Img);
    const loaPhai = this.getChildByName(nameChirldGameCaro.Loa_Ringt_Img);
    const checkMouse = {
      inX: false,
      inY: false,
    };
    const po = entityImgMinionPo._position;
    const size = entityImgMinionPo._contentSize;
    const xMin = po.x - (size.width * 0.3) / 2;
    const xMax = po.x + (size.width * 0.3) / 2;
    const yMin = po.y - (size.height * 0.3) / 2;
    const yMax = po.y + (size.height * 0.3) / 2;
    const mouseClick = cc.p(parsedX, parsedY);
    if (mouseClick.x > xMin && mouseClick.x < xMax) {
      checkMouse.inX = true;
    }
    if (mouseClick.y > yMin && mouseClick.y < yMax) {
      checkMouse.inY = true;
    }
    if (checkMouse.inX && checkMouse.inY) {
      const actions1 = entityImgMinionPo.setScale(0.5, 0.5);
      const actions2 = entityTextCaro.runAction(
        cc.spawn(cc.moveBy(2.5, cc.p(size.width / 2, size.height - 120)))
      );
      const actions3 = loaTrai.setScale(0.25, 0.25);
      const actions4 = loaPhai.setScale(0.25, 0.25);
      cc.runAction(cc.sequence(actions1, actions2, actions3, actions4));
    } else {
      const actions1 = entityImgMinionPo.setScale(0.3, 0.3);
      const actions2 = loaTrai.setScale(0.15, 0.15);
      const actions3 = loaPhai.setScale(0.15, 0.15);
      cc.repeatForever(cc.runAction(cc.sequence(actions1, actions2, actions3)));
    }
  },
  clickStartGame: function (parsedX, parsedY) {
    const entityButtonStartGame = this.getChildByName(
      nameChirldGameCaro.Start_Game_Btn
    );
    const checkInClick = checkSpaceClickMouseEntity(
      entityButtonStartGame,
      0.25,
      parsedX,
      parsedY
    );
    if (checkInClick) {
      cc.director.runScene(new TableCaroInit());
    }
  },
});

function checkSpaceClickMouseEntity(thisClass, scaleInput, xPoClick, yPoClick) {
  const scale = scaleInput;
  const checkEntityClick = {
    inX: false,
    inY: false,
  };
  const po = thisClass._position;
  const size = thisClass._contentSize;
  const minX = po.x - (size.width * scale) / 2;
  const maxX = po.x + (size.width * scale) / 2;
  const minY = po.y - (size.height * scale) / 2;
  const maxY = po.y + (size.height * scale) / 2;
  if (xPoClick > minX && xPoClick < maxX) {
    checkEntityClick.inX = true;
  }
  if (yPoClick > minY && yPoClick < maxY) {
    checkEntityClick.inY = true;
  }
  if (checkEntityClick.inX && checkEntityClick.inY) {
    return true;
  } else {
    return false;
  }
}

var TableCaroInit = cc.Scene.extend({
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    const startRun = true; // X đi trước.
    const sizeWin = cc.winSize; //{ width: 960, height: 640 };
    const arr2D = new Array();
    arr2D[0] = new Array(80, 160, 240, 300);
    arr2D[1] = new Array(80, 160, 240, 300);
    console.log("Mảng 2 chiều arr2D[Ox][Oy]:", arr2D);
    console.log("Ziazeeeee>");
    for (var indexOVuong = 0; indexOVuong < arr2D; indexOVuong++) {
      //Tạo ảnh nền Minion:
      const imgMinion = cc.Sprite.create(res.OVuong_png);
      imgMinion.setName(nameChirldGameCaro.OVuong_Img);
      imgMinion.setPosition(0, 0);
      imgMinion.setScale(1, 1);
      this.addChild(imgMinion, 0);
      console.log("This", this);
    }
  },
});
