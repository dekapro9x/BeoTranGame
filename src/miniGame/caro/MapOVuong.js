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
        // console.log("Lắng nghe chuột", touch);
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
        // console.log("setNameEntityOVuong", setNameEntityOVuong);
        oVuongChirld.setName(setNameEntityOVuong);
        this.addChild(oVuongChirld, 0);
      }
    }
  },
  //Nghe sự kiện đặt X - O  tại vị trí ô cờ nào:
  //Xác định vị trí thằng con theo tên + chỉ số index Ox và Oy đã định nghĩa.
  addListenerTouchMousePushX_O: function (parsedX, parsedY) {
    // console.log("Chọn vị trí:", parsedX, parsedY);
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
  //Kiểm tra thắng - thua:
  //Định nghĩa vùng tự do:
  //Là vùng có thể kiểm tra được đủ 8 hướng với 3 điểm gần nhất với điểm trung tâm.
  //Định nghĩa vùng giới hạn:
  //Là vùng bị chặn lại khi không đủ 3 điểm trên 1 phương tính từ điểm trung tâm:
  checkWinGame: function (indexOx, indexOy) {
    //Kiểm tra trục Ox:
    this.checkWinGameOx(indexOx, indexOy);
    // this.checkWinGameOx(indexOx, indexOy);
    //Kiểm tra trên trục Oy:
    // this.checkWinGameOy(indexOx, indexOy);
    //Kiểm tra trên đường chéo trái đi qua tâm:
    // this.checkWinGameLeftDiagonal(indexOx, indexOy);
    //Kiểm tra trên đường chéo phải đi qua tâm:
    // this.checkWinGameRightDiagonal(indexOx, indexOy);
  },
  checkWinGameOx: function (indexOx, indexOy) {
    const arrayFlagOx = []; //Mảng cần kiểm tra cờ trùng nhau trục Ox.
    const lengSquareConsecutive = 3; //Số ô kề trung tâm về 2 hướng trái + phải.
    //Điểm trung tâm:
    const squareCenterOx = {
      po_X: indexOx,
      po_Y: indexOy,
      flag: null,
    };
    //Định danh cho điểm trung tâm:
    const nameSquareCenterOx =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareCenterOx.po_X +
      "_" +
      "Oy_" +
      squareCenterOx.po_Y;
    //This của điểm trung tâm:
    const entitySquareCenterOx = this.getChildByName(nameSquareCenterOx);
    //Cờ hiệu điểm trung tâm:
    squareCenterOx.flag = entitySquareCenterOx.flagX_O;
    console.log(
      "%c Điểm trung tâm cần kiêm tra trục Ox:",
      "color:blue",
      squareCenterOx
    );
    const minOxCheck = indexOx - lengSquareConsecutive; //Vị trí đầu tiên cần kiểm tra.
    const maxOxCheck = indexOx + lengSquareConsecutive; //Vị trí cuối cùng cần kiểm tra.
    //Lấy danh sách ô vuông + cờ cần kiểm tra:
    for (
      let indexArrayFlagSquare = minOxCheck;
      indexArrayFlagSquare <= maxOxCheck;
      indexArrayFlagSquare++
    ) {
      if (indexArrayFlagSquare < 0) {
        continue;
      }
      const po_X = indexArrayFlagSquare;
      const po_Y = squareCenterOx.po_Y;
      const nameRepresent =
        nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
      const entitySquareOX = this.getChildByName(nameRepresent);
      const entity = { po_X: po_X, po_Y: po_Y, flag: entitySquareOX.flagX_O };
      arrayFlagOx.push(entity);
    }
    //Kiểm tra danh sách các ô vuông trùng trạng thái 4 ô liên tiếp trên trục Ox:
    const arrNeedCheckSame = arrayFlagOx;
    console.log(
      "Mảng cấn kiểm tra cờ trùng nhau trên trục Ox:",
      arrNeedCheckSame
    );
    const arrayFourFlagSame = [null, null, null, null];
    var winFourSquare = false;
    for (var indexSameOx = 0; indexSameOx < arrNeedCheckSame.length; indexSameOx++) {
      const element = arrNeedCheckSame[indexSameOx];
      const isCheckSameX_Flag = (item) => item?.flag == "X_Flag";
      const isCheckSameO_Flag = (item) => item?.flag == "O_Flag";
      //Đẩy 1 phần tử vào cuối rồi bỏ 1 phần tử đầu đi sẽ giữ lại mảng chỉ có 4 phần tử.
      arrayFourFlagSame.push(element);
      arrayFourFlagSame.shift();
      const isSameX_Flag = arrayFourFlagSame.every(isCheckSameX_Flag);
      const isSameO_Flag = arrayFourFlagSame.every(isCheckSameO_Flag);
      if (isSameX_Flag || isSameO_Flag) {
        winFourSquare = this.checkBlockHeadFourSquareOx(arrayFourFlagSame);
        break;
      }
    }
    if (winFourSquare) {
      this.youWinScreen();
    }
  },
  //Kiểm tra chặn đầu 4 ô vuông đã trùng cờ theo phương Ox:
  checkBlockHeadFourSquareOx: function (arrayFourFlagSame) {
    var blockLeftOx = null; //Chặn đầu Ox.
    var blockRightOx = null; //Chặn cuối.
    const squareStart = arrayFourFlagSame[0];
    const squareStartEnd = arrayFourFlagSame[arrayFourFlagSame.length - 1];
    //Khối chặn đầu 4 ô trùng cờ phương Ox:
    const squareBlockLeftOx = {
      po_X: squareStart.po_X - 1,
      po_Y: squareStart.po_Y,
      flag: null,
    };
    //Tên khối chặn trái Ox:
    const nameSquareBlockLeft =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockLeftOx.po_X +
      "_" +
      "Oy_" +
      squareBlockLeftOx.po_Y;
    //Khối hộp chặn trái Ox:
    const entitySquareBlockLeft = this.getChildByName(nameSquareBlockLeft);
    if (entitySquareBlockLeft) {
      squareBlockLeftOx.flag = entitySquareBlockLeft.flagX_O;
      if (!squareBlockLeftOx.flag) {
        blockLeftOx = false;
      } else {
        blockLeftOx = true;
      }
    }
    //Khối chặn phải theo Ox:
    const squareBlockRight = {
      po_X: squareStartEnd.po_X + 1,
      po_Y: squareStartEnd.po_Y,
      flag: null,
    };
    //Tên khối chặn phải Ox:
    const nameSquareBlockRight =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockRight.po_X +
      "_" +
      "Oy_" +
      squareBlockRight.po_Y;
    //Khối hộp chặn phải Ox:
    const entitySquareBlockRight = this.getChildByName(nameSquareBlockRight);
    if (entitySquareBlockRight) {
      squareBlockRight.flag = entitySquareBlockRight.flagX_O;
      if (!squareBlockRight.flag) {
        blockRightOx = false;
      } else {
        blockRightOx = true;
      }
    }
    //Trường hợp không có khối chặn 4 ô trên Ox liền nhau:
    if (!blockLeftOx && !blockRightOx) {
      return true;
    }
    //Trường hợp có khối chặn tạo 5 khối:
    else {
      //Chặn trái Ox trùng cờ với 4 ô còn lại:
      if (blockLeftOx) {
        if (squareBlockLeftOx.flag === squareStart.flag) {
          return true;
        }
      }
      //Chặn phải Ox trùng cờ với 4 ô còn lại:
      if (blockRightOx) {
        if (squareBlockRight.flag === squareStartEnd.flag) {
          return true;
        }
      }
    }
  },
  //Kiểm tra thắng thua trên trục Oy:
  checkWinGameOy: function (indexOx, indexOy) {
    // console.log("%c Tọa độ điểm trên Oy:", "color:red", indexOx, indexOy);
    const arrayFlagOy = [];
    const sizeWin = 4;
    const maxPoY = 15;
    const lengSquareConsecutive = 3; //Số ô gần kề ô trung tâm cần kiểm tra.
    //Ô vuông trung tâm:
    const poSquareCenterOy = {
      po_X: indexOx,
      po_Y: indexOy,
      flag: null,
    };
    //Lấy tên ô vuông trung tâm Oy:
    const nameSquareCenterOy =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      poSquareCenterOy.po_X +
      "_" +
      "Oy_" +
      poSquareCenterOy.po_Y;
    //Lấy this ô vuông trung tâm Oy:
    const entityCenter = this.getChildByName(nameSquareCenterOy);
    //Cờ điểm trung tâm:
    poSquareCenterOy.flag = entityCenter.flagX_O;
    //Vùng tự do từ Oy chạy 4 => 11;
    if (indexOy >= 4 && indexOy < maxPoY - sizeWin) {
      // console.log("%c Trong vùng tự do Oy từ ô số 5 => 11:", "color:blue");
      for (
        var indexArrayFlagOy = -lengSquareConsecutive;
        indexArrayFlagOy <= lengSquareConsecutive;
        indexArrayFlagOy++
      ) {
        const po_X = poSquareCenterOy.po_X;
        const po_Y = poSquareCenterOy.po_Y + indexArrayFlagOy;
        const nameRepresent =
          nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        const entitySquareOy = this.getChildByName(nameRepresent);
        const entity = { po_X: po_X, po_Y: po_Y, flag: entitySquareOy.flagX_O };
        arrayFlagOy.push(entity);
      }
    } else {
      // console.log("%c Vùng giới hạn:", "color:green");
      if (indexOy < 4) {
        // console.log("%c Giới hạn dưới Oy từ ô số 0 => 4:", "color:blue");
        for (
          var indexArrayFlagOy = -indexOy;
          indexArrayFlagOy <= indexOy + sizeWin;
          indexArrayFlagOy++
        ) {
          const po_X = poSquareCenterOy.po_X;
          const po_Y = poSquareCenterOy.po_Y + indexArrayFlagOy;
          const nameRepresent =
            nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
          const entitySquareOy = this.getChildByName(nameRepresent);
          const entity = {
            po_X: po_X,
            po_Y: po_Y,
            flag: entitySquareOy.flagX_O,
          };
          arrayFlagOy.push(entity);
        }
      } else {
        // console.log("%c Giới hạn trên Oy từ ô số 11 => 15:", "color:blue");
        for (
          var indexArrayFlagOy = indexOy - sizeWin;
          indexArrayFlagOy <= maxPoY;
          indexArrayFlagOy++
        ) {
          const po_X = poSquareCenterOy.po_X;
          const po_Y = indexArrayFlagOy;
          const nameRepresent =
            nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
          const entitySquareOy = this.getChildByName(nameRepresent);
          const entity = {
            po_X: po_X,
            po_Y: po_Y,
            flag: entitySquareOy.flagX_O,
          };
          arrayFlagOy.push(entity);
        }
      }
    }
    //Kiểm tra mảng check trùng trạng thái:
    //Trường hợp 1: 4 phần tử liên tiếp trùng nhau và không có chặn đầu theo trục Ox:
    const arrNeedCheckSame = arrayFlagOy;
    // console.log(
    //   "Mảng cấn kiểm tra cờ trùng nhau trên trục Oy:",
    //   arrNeedCheckSame
    // );
    const arrayFourFlagSame = [null, null, null, null];
    var winFourSquare = false;
    for (var indexSame = 0; indexSame < arrNeedCheckSame.length; indexSame++) {
      const element = arrNeedCheckSame[indexSame];
      const isCheckSameX_Flag = (item) => item?.flag == "X_Flag";
      const isCheckSameO_Flag = (item) => item?.flag == "O_Flag";
      arrayFourFlagSame.push(element);
      arrayFourFlagSame.shift();
      const isSameX_Flag = arrayFourFlagSame.every(isCheckSameX_Flag);
      const isSameO_Flag = arrayFourFlagSame.every(isCheckSameO_Flag);
      if (isSameX_Flag || isSameO_Flag) {
        //Kiểm tra cờ hiệu liên tiếp của 4 phần tử có giống nhau không.
        winFourSquare = this.checkBlockHeadFourSquareOy(arrayFourFlagSame);
        break;
      }
    }
    if (winFourSquare) {
      this.youWinScreen();
    }
  },
  //Kiểm tra chặn đầu trên dưới của 4 ô giống nhau trục Oy:
  checkBlockHeadFourSquareOy: function (arrayFourFlagSame) {
    // console.log("arrayFourFlagSameOy", arrayFourFlagSame);
    //Xác định vị trí ô vuông đầu và cuối trong mảng:
    var blockOnOy = null; //Chặn trên phương Oy.
    var blockDownOy = null; //Chặn dưới phương Oy.
    const squareStart = arrayFourFlagSame[0];
    const squareStartEnd = arrayFourFlagSame[arrayFourFlagSame.length - 1];
    //Khối chặn trên Oy:
    const squareBlockOnOy = {
      po_X: squareStart.po_X,
      po_Y: squareStart.po_Y - 1,
      flag: null,
    };
    //Lấy tên ô vuông chặn trên Oy:
    const nameSquareBlockOn =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockOnOy.po_X +
      "_" +
      "Oy_" +
      squareBlockOnOy.po_Y;
    //Khối hộp chặn trên Oy:
    const entitySquareBlockOn = this.getChildByName(nameSquareBlockOn);
    if (entitySquareBlockOn) {
      squareBlockOnOy.flag = entitySquareBlockOn.flagX_O;
      if (!squareBlockOnOy.flag) {
        blockOnOy = false;
      } else {
        blockOnOy = true;
      }
    }
    //Khối vuông chặn dưới Oy:
    const squareBlockDownOy = {
      po_X: squareStartEnd.po_X,
      po_Y: squareStartEnd.po_Y + 1,
      flag: null,
    };
    //Tên ô vuông chặn dưới Oy:
    const nameSquareBlockDown =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockDownOy.po_X +
      "_" +
      "Oy_" +
      squareBlockDownOy.po_Y;
    //This khối vuông chặn dưới Oy:
    const entitySquareBlockDown = this.getChildByName(nameSquareBlockDown);
    if (entitySquareBlockDown) {
      squareBlockDownOy.flag = entitySquareBlockDown.flagX_O;
      if (!squareBlockDownOy.flag) {
        blockDownOy = false;
      } else {
        blockDownOy = true;
      }
    }
    //Trường hợp không có khối chặn:
    if (!blockOnOy && !blockDownOy) {
      return true;
    } else {
      //Trường hợp có khối chặn tạo 5 khối cùng flag liền nhau:
      //Chặn trái:
      if (blockOnOy) {
        if (squareBlockOnOy.flag === squareStart.flag) {
          return true;
        }
      }
      //Chặn phải:
      if (blockDownOy) {
        if (squareBlockDownOy.flag === squareStartEnd.flag) {
          return true;
        }
      }
    }
  },
  //Kiểm tra thắng thua trên đường chéo trái:
  checkWinGameLeftDiagonal: function (indexOx, indexOy) {
    console.log("Đường chéo trái", indexOx, indexOy);
    // console.log("%c Tạo độ điểm trên Ox:", "color:red", indexOx, indexOy);
    const arrayFlagLeftDiagonal = [];
    const sizeWin = 4;
    const maxPoX = 23;
    const maxPoY = 15;
    //Xác định ô vuông trung tâm:
    const squareCenter = {
      po_X: indexOx,
      po_Y: indexOy,
      flag: null,
    };
    //Lấy tên điểm trung tâm:
    const nameSquareCenter =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareCenter.po_X +
      "_" +
      "Oy_" +
      squareCenter.po_Y;
    const getEntityCenter = this.getChildByName(nameSquareCenter);
    squareCenter.flag = getEntityCenter.flagX_O;
    console.log("Điển trung tâm LeftDiagonal:", squareCenter);
    //Vùng tự do:
    if (
      indexOx >= 4 &&
      indexOx < maxPoX - sizeWin &&
      indexOy >= 4 &&
      indexOy < maxPoY - sizeWin
    ) {
      console.log("%c Vùng tự do đường chéo trái:", "color:green");
      //Tréo trái nửa dưới chéo trái tính từ trung tâm:
      //Ox tăng => Oy giảm.
      for (
        var indexArrayFlagLeftDiagonalFreeSquareDown = -3;
        indexArrayFlagLeftDiagonalFreeSquareDown <= 0;
        indexArrayFlagLeftDiagonalFreeSquareDown++
      ) {
        const po_X =
          squareCenter.po_X - indexArrayFlagLeftDiagonalFreeSquareDown;
        const po_Y =
          squareCenter.po_Y + indexArrayFlagLeftDiagonalFreeSquareDown;
        const nameRepresent =
          nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        const getEntity = this.getChildByName(nameRepresent);
        const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
        arrayFlagLeftDiagonal.push(entity);
      }
      //Tréo trái nửa trên chéo trái tính từ trung tâm :
      //Ox giảm Oy tăng:
      for (
        var indexArrayFlagLeftDiagonalFreeSquareUp = 1;
        indexArrayFlagLeftDiagonalFreeSquareUp <= 3;
        indexArrayFlagLeftDiagonalFreeSquareUp++
      ) {
        const po_X = squareCenter.po_X - indexArrayFlagLeftDiagonalFreeSquareUp;
        const po_Y = squareCenter.po_Y + indexArrayFlagLeftDiagonalFreeSquareUp;
        const nameRepresent =
          nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        const getEntityLeftOn = this.getChildByName(nameRepresent);
        const entity = {
          po_X: po_X,
          po_Y: po_Y,
          flag: getEntityLeftOn.flagX_O,
        };
        arrayFlagLeftDiagonal.push(entity);
      }
    }
    //Vùng giới hạn:
    else {
      console.log("%c Vùng giới hạn đường chéo trái", "color:blue");
      //Trường hợp sát mép lề trái (0;Oy)=>(4;Oy):
      if (indexOx <= 4 && indexOy <= 4) {
        console.log("Sát mép lề trái:");
        if (indexOx && indexOy) {
          //Điểm trên đường chéo trái trên:
          for (let index = 1; index <= 4; index++) {
            const po_X = squareCenter.po_X - index;
            const po_Y = squareCenter.po_Y + index;
            if (po_X < 0) {
              break;
            }
            const nameRepresent =
              nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
            const getEntity = this.getChildByName(nameRepresent);
            const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
            arrayFlagLeftDiagonal.push(entity);
          }
          //Điểm trung tâm:
          arrayFlagLeftDiagonal.push(squareCenter);
          //Điểm trên đường chéo trái dưới:
          for (let index = 1; index <= 4; index++) {
            const po_X = squareCenter.po_X + index;
            const po_Y = squareCenter.po_Y - index;
            if (po_Y < 0) {
              break;
            }
            const nameRepresent =
              nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
            const getEntity = this.getChildByName(nameRepresent);
            const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
            arrayFlagLeftDiagonal.push(entity);
          }
        } else {
          if (!indexOy) {
            console.log("Sát lề Ox");
          } else {
            console.log("Sát lề Oy");
          }
        }
      } else {
        console.log("Sát mép lề phải");
        if (indexOx > 4 && indexOx < 23 && indexOy > 4 && indexOy < 15) {
          console.log("Lở lửng");
        } else {
          if (indexOx == 23 && indexOy < 15) {
            console.log("Sát lề Ox");
          } else {
            console.log("Sát lề Oy");
          }
        }
      }
    }
    //Kiểm tra mảng check trùng trạng thái:
    //Trường hợp 1: 4 phần tử liên tiếp trùng nhau và không có chặn đầu theo trục Ox:
    const arrNeedCheckSame = arrayFlagLeftDiagonal;
    console.log(
      "Mảng cấn kiểm tra cờ trùng nhau trên trục Ox:",
      arrNeedCheckSame
    );
    const arrayFourFlagSame = [null, null, null, null];
    var winFourSquare = false;
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
        winFourSquare = this.checkBlockHeadFourSquareLeftDiagonal(
          arrayFourFlagSame,
          squareCenter
        );
        break;
      }
    }
    if (winFourSquare) {
      this.youWinScreen();
    }
  },
  //Kiểm tra khối chặn đường chéo trái:
  checkBlockHeadFourSquareLeftDiagonal: function (arrayFourFlagSame) {
    console.log(
      "Mảng 4 phần tử đường chéo trái giống nhau:",
      arrayFourFlagSame
    );
    //Xác định vị trí ô vuông đầu và cuối trong mảng:
    var blockLeftOn = null; //Chặn đầu.
    var blockLeftDown = null; //Chặn cuối.
    const squareStart = arrayFourFlagSame[0];
    const squareStartEnd = arrayFourFlagSame[arrayFourFlagSame.length - 1];
    //Khối chặn tréo trái trên:
    const squareBlockOnLeft = {
      po_X: squareStart.po_X + 1,
      po_Y: squareStart.po_Y - 1,
      flag: null,
    };
    //Lấy khối chặn tréo trái:
    const nameSquareBlockOnLeftDiagonal =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockOnLeft.po_X +
      "_" +
      "Oy_" +
      squareBlockOnLeft.po_Y;
    //Khối hộp chặn trái:
    const entitySquareBlockLeftDiagonal = this.getChildByName(
      nameSquareBlockOnLeftDiagonal
    );
    if (entitySquareBlockLeftDiagonal) {
      squareBlockOnLeft.flag = entitySquareBlockLeftDiagonal.flagX_O;
      if (!squareBlockOnLeft.flag) {
        blockLeftOn = false;
      } else {
        blockLeftOn = true;
      }
    }
    //Lấy khối chặn dưới tréo trái dưới:
    const squareBlockDownLeft = {
      po_X: squareStartEnd.po_X - 1,
      po_Y: squareStartEnd.po_Y + 1,
      flag: null,
    };
    //Lấy tên khối chặn trái dưới:
    const nameSquareBlockDownLeftDiagonal =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockDownLeft.po_X +
      "_" +
      "Oy_" +
      squareBlockDownLeft.po_Y;
    //Khối hộp chặn dưới trái:
    const entitySquareBlockRightDiagonal = this.getChildByName(
      nameSquareBlockDownLeftDiagonal
    );
    if (entitySquareBlockRightDiagonal) {
      squareBlockDownLeft.flag = entitySquareBlockRightDiagonal.flagX_O;
      if (!squareBlockDownLeft.flag) {
        blockLeftDown = false;
      } else {
        blockLeftDown = true;
      }
    }
    //Trường hợp không có khối chặn:
    if (!blockLeftOn && !blockLeftDown) {
      return true;
    } else {
      //Trường hợp có khối chặn tạo 5 khối cùng flag liền nhau:
      //Chặn trên trái:
      if (blockLeftOn) {
        if (squareBlockOnLeft.flag === squareStart.flag) {
          return true;
        }
      }
      //Chặn dưới trái:
      if (blockLeftDown) {
        if (squareBlockDownLeft.flag === squareStartEnd.flag) {
          return true;
        }
      }
    }
  },
  checkWinGameRightDiagonal: function (indexOx, indexOy) {
    // console.log("Đường chéo phải", indexOx, indexOy);
  },

  youWinScreen: function () {
    console.log("%c Bạn thắng cmnr!", "color:red");
    this.removeAllChildren();
  },
});
