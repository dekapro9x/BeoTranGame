const nameChirldGameCaro = {
  Img_MiniOn: "Img_Minion",
  Text_Caro: "Text_Caro",
  Loa_Left_Img: "Loa_Img_Left",
  Loa_Ringt_Img: "Loa_Img_Right",
  Start_Game_Btn: "Button_Start",
  OVuong_Img: "O_Vuong_",
  BacDa_Img: "BacDa_Img",
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
    this.flagX_O = true; // X đi trước.
  },
  init: function () {
    //Ảnh nền Bác Đa:
    const that = this;
    const getSizeWin = cc.winSize;
    const bacDaBackground = cc.Sprite.create(res.BacDa_png);
    bacDaBackground.setName(nameChirldGameCaro.BacDa_Img);
    bacDaBackground.setPosition(getSizeWin.width / 2, getSizeWin.height / 2);
    bacDaBackground.setScale(1.1, 1.2);
    this.addChild(bacDaBackground, 0);
    this.mapArrayOVuong();
    //Lắng nghe sự kiện click chuột đặt sự kiện vào ảnh nền bác Đa:"
    const listenerEvent = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        const { _point } = touch;
        const { x, y } = _point;
        const base = 10;
        const parsedX = parseInt(x, base);
        const parsedY = parseInt(y, base);
        console.log("Lắng nghe chuột", touch);
        that.addListenerTouchMousePushX_O(parsedX, parsedY);
      },
      onTouchMoved: function (touch, event) {},
      onTouchEnded: function (touch, event) {},
    });
    const entityImgBacDa = this.getChildByName(nameChirldGameCaro.BacDa_Img);
    cc.eventManager.addListener(listenerEvent, entityImgBacDa);
    //Lắng nghe sự kiện di chuyển chuột trỏ vào từng thằng con nào thì sáng lên":
    if ("mouse" in cc.sys.capabilities) {
      cc.eventManager.addListener(
        {
          event: cc.EventListener.MOUSE,
          onMouseMove: function (event) {
            const { _x, _y } = event;
            const base = 10;
            const parsedX = parseInt(_x, base);
            const parsedY = parseInt(_y, base);
            // that.handleZoomBtnStart(parsedX, parsedY);
            // console.log("Lắng nghe sự kiện di chuyển chuột:", parsedX, parsedY);
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
              // console.log("Giữ và kéo lê chuột trái:");
            }
          },
        },
        this
      );
    }
  },
  mapArrayOVuong: function () {
    //Tạo mảng ô vuông cạnh: 80px*80px.
    //Tâm ô vuông xác định = (40;40);
    const poCenter = { pOx_center: 40, pOy_center: 40 };
    const arr2D = new Array();
    const getSizeWin = cc.winSize;
    const arrayPOx_center = [];
    const arrayPOy_center = [];
    //Mảng tọa độ vị trí tâm ô vuông trên Ox:
    for (
      var tamOx_Ovuong = 1;
      tamOx_Ovuong <= getSizeWin.width / poCenter.pOx_center;
      tamOx_Ovuong++
    ) {
      arrayPOx_center.push(tamOx_Ovuong * poCenter.pOx_center);
    }
    //Mảng tọa độ vị trí tâm ô vuông trên Oy:
    for (
      var tamOy_Ovuong = 1;
      tamOy_Ovuong <= getSizeWin.height / poCenter.pOy_center;
      tamOy_Ovuong++
    ) {
      arrayPOy_center.push(tamOy_Ovuong * poCenter.pOy_center);
    }
    arr2D[0] = arrayPOx_center;
    arr2D[1] = arrayPOy_center;
    const arrayOVuong = [];
    // console.log("Mảng 2 chiều arr2D[Ox][Oy]:", arr2D);
    for (var indexOx = 0; indexOx < arr2D[0].length; indexOx++) {
      for (let indexOy = 0; indexOy < arr2D[1].length; indexOy++) {
        // console.log("indexOx", arr2D[0][indexOx]);
        // console.log("indexOy", arr2D[1][indexOy]);
        const ojbPoOVuong = {
          _pOx: arr2D[0][indexOx],
          _pOy: arr2D[1][indexOy],
        };
        arrayOVuong.push(ojbPoOVuong);
        const oVuongChirld = new OVuongHandleEventGame(indexOx, indexOy, this);
        const setNameEntityOVuong =
          nameChirldGameCaro.OVuong_Img +
          "Ox_" +
          indexOx +
          "_" +
          "Oy_" +
          indexOy;
        console.log("setNameEntityOVuong", setNameEntityOVuong);
        oVuongChirld.setName(setNameEntityOVuong);
        this.addChild(oVuongChirld, 0);
      }
    }
    console.log("arrayPoOVuong + Po", arrayOVuong);
  },
  //Nghe sự kiện đặt X - O  tại vị trí ô cờ nào:
  //Xác định vị trí thằng con theo tên + chỉ số index Ox và Oy đã định nghĩa.
  addListenerTouchMousePushX_O: function (parsedX, parsedY) {
    console.log("Chọn vị trí:", parsedX, parsedY);
    //Tâm ô vuông đầu tiên xác định = (40;40);
    const poCenter = { pOx_center: 40, pOy_center: 40 };
    const base = 10;
    //Lấy vị trí IndexOx để lấy this ô vuông nhỏ:
    const getIndex_Ox_SetToNameChirld = parseInt(
      parsedX / poCenter.pOx_center,
      base
    );
    const getIndex_Oy_SetToNameChirld = parseInt(
      parsedY / poCenter.pOy_center,
      base
    );
    console.log(
      "Lấy tên thằng nhỏ để xác định this thằng nhỏ:",
      getIndex_Ox_SetToNameChirld,
      getIndex_Oy_SetToNameChirld
    );
    this.getChirldOVuongHandleClickMouse(
      getIndex_Ox_SetToNameChirld,
      getIndex_Oy_SetToNameChirld
    );
  },
  //Lấy ô vuông nhỏ ra để thực thi 1 hành động khi ấn chuột vào tọa độ nó quản lý:
  getChirldOVuongHandleClickMouse: function (indexOx, indexOy) {
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    //Lấy thực thể Ô vuông:
    const getEntityOVuong = this.getChildByName(nameRepresentChirldOVuong);
    //Thực hiện actions:
    getEntityOVuong.checkClickHere(indexOx, indexOy, this.flagX_O, this);
  },
  //Thay đổi cờ hiệu:
  onChangeFlag: function () {
    this.flagX_O = !this.flagX_O;
  },
  checkWinGame: function (nameEntityNeedCheckWin) {
    console.log("Winnn", nameEntityNeedCheckWin);
  },
});

var OVuongHandleEventGame = cc.Scene.extend({
  ctor: function (indexOx, indexOy, father) {
    this._super();
    this.init(indexOx, indexOy);
    this.clickHere = false;
  },
  init: function (indexOx, indexOy) {
    //Khởi tạo hình vuông:
    //Hình vuông xác định kích thước  = 80 *80;
    const poCenter = { pOx_center: 40, pOy_center: 40 };
    const oVuong = cc.Sprite.create(res.OVuongTrang_png);
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    oVuong.x = poCenter.pOx_center * (indexOx + 1);
    oVuong.y = poCenter.pOy_center * (indexOy + 1);
    oVuong.setName(nameRepresentChirldOVuong);
    this.addChild(oVuong, 0);
  },
  //Kiểm tra ấn chuột vào ô nào:
  checkClickHere: function (indexOx, indexOy, flagX_O, father) {
    this.changImgCreate(indexOx, indexOy, flagX_O, father);
  },
  //Thay đổi ảnh khởi tạo:
  changImgCreate: function (indexOx, indexOy, flagX_O, father) {
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    const oVuongRemove = this.getChildByName(nameRepresentChirldOVuong);
    if (!this.clickHere) {
      if (flagX_O) {
        this.removeChild(oVuongRemove, true);
        this.addImgRed(indexOx, indexOy, flagX_O, father);
      } else {
        this.removeChild(oVuongRemove, true);
        this.addImgOrage(indexOx, indexOy, flagX_O, father);
      }
    }
  },
  addImgRed: function (indexOx, indexOy, flagX_O, father) {
    const poCenter = { pOx_center: 40, pOy_center: 40 };
    const oVuong = cc.Sprite.create(res.OVuongDo_png);
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    oVuong.x = poCenter.pOx_center * (indexOx + 1);
    oVuong.y = poCenter.pOy_center * (indexOy + 1);
    oVuong.setName(nameRepresentChirldOVuong);
    this.addChild(oVuong, 0);
    this.clickHere = true;
    father.onChangeFlag();
  },
  addImgOrage: function (indexOx, indexOy, flagX_O, father) {
    const poCenter = { pOx_center: 40, pOy_center: 40 };
    const oVuong = cc.Sprite.create(res.OVuongCam_png);
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    oVuong.x = poCenter.pOx_center * (indexOx + 1);
    oVuong.y = poCenter.pOy_center * (indexOy + 1);
    oVuong.setName(nameRepresentChirldOVuong);
    this.addChild(oVuong, 0);
    this.clickHere = true;
    father.onChangeFlag();
  },
});
