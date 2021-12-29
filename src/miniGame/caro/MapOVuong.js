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
      const arrayFlagOy = [];
    },
    checkWinGameOx: function (indexOx, indexOy) {
      console.log("indexOx, indexOy", indexOx, indexOy);
      const arrayFlagOx = [];
      //Điểm chung tâm cần xét xác ô vuông còn lại:
      const poSquareCenter = {
        po_X: indexOx,
        po_Y: indexOy,
      };
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
          arrayFlagOx.push(getEntity.flagX_O);
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
          arrayFlagOx.push(getEntity.flagX_O);
        }
      }
      //Kiểm tra mảng check trùng trạng thái:
      //Trường hợp 1: 4 phần tử liên tiếp trùng nhau và không có chặn đầu theo trục Ox:
      const arrNeedCheckSame = arrayFlagOx;
      const arrayFour = [null, null, null, null];
      var winFourOVuong = false;
      for (var indexSame = 0; indexSame < arrNeedCheckSame.length; indexSame++) {
        const element = arrNeedCheckSame[indexSame];
        const isCheckSameX_Flag = (value) => value == "X_Flag";
        const isCheckSameO_Flag = (value) => value == "O_Flag";
        //Đẩy 1 phần tử vào cuối rồi bỏ 1 phần tử đầu đi sẽ giữ lại mảng có 4 phần tử.
        arrayFour.push(element);
        arrayFour.shift();
        //Kiểm tra cờ hiệu liên tiếp của 4 phần tử có giống nhau không.
        const isSameX_Flag = arrayFour.every(isCheckSameX_Flag);
        const isSameO_Flag = arrayFour.every(isCheckSameO_Flag);
        if (isSameX_Flag || isSameO_Flag) {
          winFourOVuong = true;
          break;
        }
      }
      if (winFourOVuong) {
        //Kiểm tra chặn đầu đuôi trục Ox: 
        
        // this.youWinScreen();
      }
    },
    youWinScreen: function () {
      console.log("%c Bạn thắng cmnr!", "color:red");
      this.removeAllChildren();
    },
  });