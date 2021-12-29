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
    // console.log("arrayPoOVuong + Po", arrayOVuong);
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
  checkWinGame: function (indexOx, indexOy) {
    //Kiểm tra trên trục Ox:
    this.checkWinGameOx(indexOx, indexOy);
  },
  checkWinGameOx: function (indexOx, indexOy) {
    console.log("indexOx, indexOy", indexOx, indexOy);
    const arrayFlagOx = [];
    //Điểm chung tâm cần xét xác ô vuông còn lại:
    const poSquareCenter = {
      po_X: indexOx,
      po_Y: indexOy,
      flag: null,
    };
    //Lấy cờ của ô vuông trung tâm:
    const nameRepresentCenter =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      poSquareCenter.po_X +
      "_" +
      "Oy_" +
      poSquareCenter.po_Y;
    const getEntityCenter = this.getChildByName(nameRepresentCenter);
    poSquareCenter.flag = getEntityCenter.flagX_O;
    //Xét trên trục Ox : từ x -3 đền x + 3 điều kiện từ ô số 5 đổ đi theo trục Ox:
    if (indexOx >= 4) {
      for (
        var indexArrayFlagOx = -4;
        indexArrayFlagOx <= 4;
        indexArrayFlagOx++
      ) {
        const po_X = poSquareCenter.po_X + indexArrayFlagOx;
        const po_Y = poSquareCenter.po_Y;
        const nameRepresent =
          nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        const getEntity = this.getChildByName(nameRepresent);
        const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
        arrayFlagOx.push(entity);
      }
    }
    //Với trường hợp sát mép với 3 ô sát lề:
    else {
      for (
        var indexArrayFlagOx = -indexOx;
        indexArrayFlagOx <= 4;
        indexArrayFlagOx++
      ) {
        const po_X = poSquareCenter.po_X + indexArrayFlagOx;
        const po_Y = poSquareCenter.po_Y;
        const nameRepresent =
          nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        const getEntity = this.getChildByName(nameRepresent);
        const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
        arrayFlagOx.push(entity);
      }
    }
    //Kiểm tra mảng check trùng trạng thái:
    //Trường hợp 1: 4 phần tử liên tiếp trùng nhau và không có chặn đầu theo trục Ox:
    const arrNeedCheckSame = arrayFlagOx;
    // console.log("arrNeedCheckSame", arrNeedCheckSame);
    const arrayFourFlagSame = [null, null, null, null];
    var winFourOVuong = false;
    for (var indexSame = 0; indexSame < arrNeedCheckSame.length; indexSame++) {
      const element = arrNeedCheckSame[indexSame];
      const isCheckSameX_Flag = (item) => item?.flag == "X_Flag";
      const isCheckSameO_Flag = (item) => item?.flag == "O_Flag";
      //Đẩy 1 phần tử vào cuối rồi bỏ 1 phần tử đầu đi sẽ giữ lại mảng có 4 phần tử.
      arrayFourFlagSame.push(element);
      arrayFourFlagSame.shift();
      //Kiểm tra cờ hiệu liên tiếp của 4 phần tử có giống nhau không.
      const isSameX_Flag = arrayFourFlagSame.every(isCheckSameX_Flag);
      const isSameO_Flag = arrayFourFlagSame.every(isCheckSameO_Flag);
      if (isSameX_Flag || isSameO_Flag) {
        console.log(
          "Mảng 4 phần tử liên tiếp trùng cờ Flag:",
          arrayFourFlagSame
        );
        winFourOVuong = this.checkBlockHeadFourSquare(
          arrayFourFlagSame,
          poSquareCenter
        );
        break;
      }
    }
    if (winFourOVuong) {
      this.youWinScreen();
    }
  },
  //Kiểm tra chặn đầu cuối của 4 ô:
  checkBlockHeadFourSquare: function (arrayFourFlagSame, poSquareCenter) {
    console.log("arrayFourFlagSame", arrayFourFlagSame);
    console.log("poSquareCenter", poSquareCenter);
    var directionFourSquare = null;
    //Check điểm chặn bên trái hoặc phải ô vuông trung tâm:
    const getIndexCenterInArr = arrayFourFlagSame.findIndex(
      (item) => item.po_X == poSquareCenter.po_X
    );
    console.log("Index của điểm trung tâm:", getIndexCenterInArr);
    if (getIndexCenterInArr > 1) {
      //Nếu mảng nằm bên trái => thì check ô số -4 và ô phải + 1;
      directionFourSquare = "Left";
      var flagRightPlus1 = false; //Cờ ô phải + 1;
      var flagLeftMinus4 = false; //Cờ ô trái -4;
      //Kiểm tra case 1:
      //Ô phải trung tâm +1:
      const squareRightCenterPlus1 = {
        po_X: poSquareCenter.po_X + 1,
        po_Y: poSquareCenter.po_Y,
        flag: null,
      };
      const nameRepresentRightCenterPlus1 =
        nameChirldGameCaro.OVuong_Img +
        "Ox_" +
        squareRightCenterPlus1.po_X +
        "_" +
        "Oy_" +
        squareRightCenterPlus1.po_Y;
      const getEntityRightPlus1 = this.getChildByName(
        nameRepresentRightCenterPlus1
      );
      squareRightCenterPlus1.flag = getEntityRightPlus1.flagX_O;
      if (!squareRightCenterPlus1.flag) {
        // console.log("Bên phải + 1:", squareRightCenterPlus1);
        flagRightPlus1 = true;
      }
      //Trái trung tâm -4:
      const squareLeftCenterMinus4 = {
        po_X: poSquareCenter.po_X - 4,
        po_Y: poSquareCenter.po_Y,
        flag: null,
      };
      const nameRepresentLeftCenterMinus4 =
        nameChirldGameCaro.OVuong_Img +
        "Ox_" +
        squareLeftCenterMinus4.po_X +
        "_" +
        "Oy_" +
        squareLeftCenterMinus4.po_Y;
      const getEntityLeftMinus4 = this.getChildByName(
        nameRepresentLeftCenterMinus4
      );
      squareLeftCenterMinus4.flag = getEntityLeftMinus4.flagX_O;
      if (!squareLeftCenterMinus4.flag) {
        // console.log("Bên trái - 4:", squareLeftCenterMinus4);
        flagLeftMinus4 = true;
      }
      if (flagRightPlus1 && flagLeftMinus4) {
        return true;
      }
      // Case 2 flag giống ô trung tâm thì win (Case 5 điểm):
    } else {
      directionFourSquare = "Right";
    }
 
    return true;
  },
  youWinScreen: function () {
    console.log("%c Bạn thắng cmnr!", "color:red");
    this.removeAllChildren();
  },
});
