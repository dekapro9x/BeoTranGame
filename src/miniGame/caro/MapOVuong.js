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
  checkWinGame: function (indexOx, indexOy) {
    //Kiểm tra trục Ox:
    this.checkWinGameOx(indexOx, indexOy);
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
    const max_PoX = 23; //Giới hạn trục hoành Ox.
    //Điểm trung tâm Ox:
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
    squareCenterOx.flag = entitySquareCenterOx?.flagX_O;
    // console.log("%c Điểm trung tâm Ox:", "color:blue", squareCenterOx);
    const minOxCheck = indexOx - lengSquareConsecutive; //Vị trí đầu tiên cần kiểm tra.
    const maxOxCheck = indexOx + lengSquareConsecutive; //Vị trí cuối cùng cần kiểm tra.
    //Lấy danh sách ô vuông + cờ cần kiểm tra:
    for (
      let indexArrayFlagSquare = minOxCheck;
      indexArrayFlagSquare <= maxOxCheck;
      indexArrayFlagSquare++
    ) {
      //Vượt quá giới hạn bàn cờ:
      if (indexArrayFlagSquare < 0 || indexArrayFlagSquare > max_PoX) {
        continue;
      }
      const po_X = indexArrayFlagSquare;
      const po_Y = squareCenterOx.po_Y;
      const nameRepresent =
        nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
      const entitySquareOX = this.getChildByName(nameRepresent);
      const entity = { po_X: po_X, po_Y: po_Y, flag: entitySquareOX?.flagX_O };
      arrayFlagOx.push(entity);
    }
    //Danh sách ô vuông liên tiếp cần kiểm tra:
    const arrNeedCheckSame = arrayFlagOx;
    // console.log(
    //   "Mảng cấn kiểm tra cờ trùng nhau trên trục Ox:",
    //   arrNeedCheckSame
    // );
    const arrayFourFlagSame = [null, null, null, null];
    for (
      var indexSameOx = 0;
      indexSameOx < arrNeedCheckSame.length;
      indexSameOx++
    ) {
      const element = arrNeedCheckSame[indexSameOx];
      const isCheckSameX_Flag = (item) => item?.flag == "X_Flag";
      const isCheckSameO_Flag = (item) => item?.flag == "O_Flag";
      //Lấy ra mảng có 4 phần tử liên tiếp => Kiểm tra trung nhau:
      arrayFourFlagSame.push(element);
      arrayFourFlagSame.shift();
      const isSameX_Flag = arrayFourFlagSame.every(isCheckSameX_Flag);
      const isSameO_Flag = arrayFourFlagSame.every(isCheckSameO_Flag);
      if (isSameX_Flag || isSameO_Flag) {
        this.checkBlockHeadFourSquareOx(arrayFourFlagSame);
        break;
      }
    }
  },
  //Kiểm tra chặn đầu 4 ô vuông đã trùng cờ theo phương Ox:
  checkBlockHeadFourSquareOx: function (arrayFourFlagSame) {
    var blockLeftOx = null;
    var blockRightOx = null;
    const squareStart = arrayFourFlagSame[0];
    const squareStartEnd = arrayFourFlagSame[arrayFourFlagSame.length - 1];
    //Xác định khối chặn trái Ox:
    const squareBlockLeftOx = {
      po_X: squareStart.po_X - 1,
      po_Y: squareStart.po_Y,
      flag: null,
    };
    const nameSquareBlockLeft =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockLeftOx.po_X +
      "_" +
      "Oy_" +
      squareBlockLeftOx.po_Y;
    //Khối vật lý chặn trái:
    const entitySquareBlockLeft = this.getChildByName(nameSquareBlockLeft);
    if (entitySquareBlockLeft) {
      squareBlockLeftOx.flag = entitySquareBlockLeft?.flagX_O;
      if (!squareBlockLeftOx.flag) {
        blockLeftOx = false;
      } else {
        blockLeftOx = true;
      }
    }
    //Xác định khối chặn phải Ox:
    const squareBlockRight = {
      po_X: squareStartEnd.po_X + 1,
      po_Y: squareStartEnd.po_Y,
      flag: null,
    };
    const nameSquareBlockRight =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockRight.po_X +
      "_" +
      "Oy_" +
      squareBlockRight.po_Y;
    //Khối vật lý chặn phải Ox:
    const entitySquareBlockRight = this.getChildByName(nameSquareBlockRight);
    if (entitySquareBlockRight) {
      squareBlockRight.flag = entitySquareBlockRight?.flagX_O;
      if (!squareBlockRight.flag) {
        blockRightOx = false;
      } else {
        blockRightOx = true;
      }
    }

    //Trường hợp không có khối chặn 4 ô trên Ox liền nhau trùng 1 cờ:
    if (!blockLeftOx && !blockRightOx) {
      this.youWinScreen(arrayFourFlagSame);
    } else {
      //Trường hợp có khối chặn tạo 5 khối trùng cờ:
      if (blockLeftOx) {
        if (squareBlockLeftOx.flag === squareStart.flag) {
          //Danh sách 5 điểm trùng cờ:
          arrayFourFlagSame.push(squareBlockLeftOx);
          this.youWinScreen(arrayFourFlagSame);
        }
      }
      if (blockRightOx) {
        //Danh sách 5 điểm trùng cờ:
        if (squareBlockRight.flag === squareStartEnd.flag) {
          arrayFourFlagSame.push(squareBlockRight);
          this.youWinScreen(arrayFourFlagSame);
        }
      }
    }
  },
  //Kiểm tra thắng thua trên trục Oy:
  checkWinGameOy: function (indexOx, indexOy) {
    const arrayFlagOy = [];
    const lengSquareConsecutive = 3; //Số ô gần kề ô trung tâm cần kiểm tra.
    const max_PoY = 15; //Giới hạn tung độ Oy.
    //Ô vuông trung tâm:
    const squareCenterOy = {
      po_X: indexOx,
      po_Y: indexOy,
      flag: null,
    };
    //Lấy tên ô vuông trung tâm Oy:
    const nameSquareCenterOy =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareCenterOy.po_X +
      "_" +
      "Oy_" +
      squareCenterOy.po_Y;
    const entityCenter = this.getChildByName(nameSquareCenterOy);
    squareCenterOy.flag = entityCenter?.flagX_O;
    // console.log(
    //   "%c Điểm trung tâm cần kiêm tra trục Ox:",
    //   "color:blue",
    //   squareCenterOy
    // );
    const minOyCheck = indexOy - lengSquareConsecutive; //Vị trí đầu tiên cần kiểm tra.
    const maxOyCheck = indexOy + lengSquareConsecutive; //Vị trí cuối cùng cần kiểm tra.
    //Lấy danh sách ô vuông + cờ cần kiểm tra:
    for (
      let indexArrayFlagSquare = minOyCheck;
      indexArrayFlagSquare <= maxOyCheck;
      indexArrayFlagSquare++
    ) {
      if (indexArrayFlagSquare < 0 || indexArrayFlagSquare > max_PoY) {
        continue;
      }
      const po_X = squareCenterOy.po_X;
      const po_Y = indexArrayFlagSquare;
      const nameRepresent =
        nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
      const entitySquareOY = this.getChildByName(nameRepresent);
      const entity = { po_X: po_X, po_Y: po_Y, flag: entitySquareOY?.flagX_O };
      arrayFlagOy.push(entity);
    }
    //Kiểm tra mảng check trùng trạng thái:
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
      squareBlockOnOy.flag = entitySquareBlockOn?.flagX_O;
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
      squareBlockDownOy.flag = entitySquareBlockDown?.flagX_O;
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
    const arrayFlagLeftDiagonal = [];
    const max_PoX = 23;
    const max_PoY = 15;
    //Xác định ô vuông trung tâm đường tréo trái:
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
    squareCenter.flag = getEntityCenter?.flagX_O;
    // console.log("Điển trung tâm đường chéo trái:", squareCenter);
    const minOxCheck = indexOx - 3; //Vị trí đầu tiên cần kiểm tra.
    const maxOxCheck = indexOx + 3; //Vị trí cuối cùng cần kiểm tra.
    var OyLeftDiagonalRun = indexOy - 3; //Oy sẽ chạy từ indexOy - 3 => indexOy + 3
    //Đường chéo trái trục Ox giảm, trục Oy tăng:
    for (
      let indexArrayFlagSquare = maxOxCheck;
      indexArrayFlagSquare >= minOxCheck;
      indexArrayFlagSquare--
    ) {
      if (
        indexArrayFlagSquare < 0 ||
        indexArrayFlagSquare > max_PoX ||
        OyLeftDiagonalRun < 0 ||
        OyLeftDiagonalRun > max_PoY
      ) {
        //Vượt quá giới hạn bản đồ, tăng Oy lên 1:
        OyLeftDiagonalRun++;
        continue;
      }
      const po_X = indexArrayFlagSquare;
      const po_Y = OyLeftDiagonalRun++;
      const nameRepresent =
        nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
      const entitySquareLeftDiagonal = this.getChildByName(nameRepresent);
      const entity = {
        po_X: po_X,
        po_Y: po_Y,
        flag: entitySquareLeftDiagonal?.flagX_O,
      };
      arrayFlagLeftDiagonal.push(entity);
    }
    //Kiểm tra mảng check trùng trạng thái 4 ô vuông liên tiếp trùng cờ nhau:
    const arrNeedCheckSame = arrayFlagLeftDiagonal;
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
      squareBlockOnLeft.flag = entitySquareBlockLeftDiagonal?.flagX_O;
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
      squareBlockDownLeft.flag = entitySquareBlockRightDiagonal?.flagX_O;
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
  // Kiểm tra thắng - thua trên đường chéo phải:
  checkWinGameRightDiagonal: function (indexOx, indexOy) {
    const arrayFlagLeftDiagonal = [];
    const max_PoX = 23;
    const max_PoY = 15;
    //Xác định ô vuông trung tâm đường tréo phải:
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
    squareCenter.flag = getEntityCenter?.flagX_O;
    // console.log("Điển trung tâm đường chéo phải:", squareCenter);
    const minOxCheck = indexOx - 3; //Vị trí đầu tiên cần kiểm tra.
    const maxOxCheck = indexOx + 3; //Vị trí cuối cùng cần kiểm tra.
    var OyRightDiagonalRun = indexOy - 3; //Oy sẽ chạy từ indexOy - 3 => indexOy + 3
    //Đường chéo trái trục Ox tăng, trục Oy tăng:
    for (
      let indexArrayFlagSquare = minOxCheck;
      indexArrayFlagSquare <= maxOxCheck;
      indexArrayFlagSquare++
    ) {
      if (
        indexArrayFlagSquare < 0 ||
        indexArrayFlagSquare > max_PoX ||
        OyRightDiagonalRun < 0 ||
        OyRightDiagonalRun > max_PoY
      ) {
        OyRightDiagonalRun++;
        continue;
      }
      const po_X = indexArrayFlagSquare;
      const po_Y = OyRightDiagonalRun++;
      const nameRepresent =
        nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
      const entitySquareLeftDiagonal = this.getChildByName(nameRepresent);
      const entity = {
        po_X: po_X,
        po_Y: po_Y,
        flag: entitySquareLeftDiagonal?.flagX_O,
      };
      arrayFlagLeftDiagonal.push(entity);
    }
    //Kiểm tra mảng check trùng trạng thái 4 ô vuông liên tiếp trùng cờ nhau:
    const arrNeedCheckSame = arrayFlagLeftDiagonal;
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
        winFourSquare =
          this.checkBlockHeadFourSquareRightDiagonal(arrayFourFlagSame);
        break;
      }
    }
    if (winFourSquare) {
      this.youWinScreen();
    }
  },
  //Kiểm tra chặn đầu đuôi trên đường chéo phải:
  checkBlockHeadFourSquareRightDiagonal: function (arrayFourFlagSame) {
    //Xác định vị trí ô vuông đầu và cuối trong mảng:
    var blockRightDiagonalUp = null; //Chặn trên đường chéo phải.
    var blockRightDiagonalDown = null; //Chặn dưới đường chéo phải.
    const squareStart = arrayFourFlagSame[0]; //Khối bắt đầu.
    const squareStartEnd = arrayFourFlagSame[arrayFourFlagSame.length - 1]; //Khối kết thúc.
    //Khối chặn tréo phải dưới:
    const squareBlocRightDiagonalDown = {
      po_X: squareStart.po_X - 1,
      po_Y: squareStart.po_Y - 1,
      flag: null,
    };
    //Lấy khối chặn tréo phải dưới:
    const nameSquareBlockDownRightDiagonal =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlocRightDiagonalDown.po_X +
      "_" +
      "Oy_" +
      squareBlocRightDiagonalDown.po_Y;
    //Vật thể chặn dưới phải:
    const entitySquareBlockRightDiagonalDown = this.getChildByName(
      nameSquareBlockDownRightDiagonal
    );
    // console.log("Khối chặn phải dưới:", entitySquareBlockRightDiagonalDown);
    if (entitySquareBlockRightDiagonalDown) {
      squareBlocRightDiagonalDown.flag =
        entitySquareBlockRightDiagonalDown?.flagX_O;
      if (!squareBlocRightDiagonalDown.flag) {
        blockRightDiagonalDown = false;
      } else {
        blockRightDiagonalDown = true;
      }
    }
    //Khối chặn chéo phải trên:
    const squareBlockRightDiagonalUp = {
      po_X: squareStartEnd.po_X + 1,
      po_Y: squareStartEnd.po_Y + 1,
      flag: null,
    };
    //Lấy khối chặn tréo phải trên:
    const nameSquareBlockRightDiagonalUp =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockRightDiagonalUp.po_X +
      "_" +
      "Oy_" +
      squareBlockRightDiagonalUp.po_Y;
    //Khối hộp chặn chéo phải dưới:
    const entitySquareBlockOnRightDiagonal = this.getChildByName(
      nameSquareBlockRightDiagonalUp
    );
    if (entitySquareBlockOnRightDiagonal) {
      squareBlockRightDiagonalUp.flag =
        entitySquareBlockOnRightDiagonal?.flagX_O;
      if (!squareBlockRightDiagonalUp.flag) {
        blockRightDiagonalUp = false;
      } else {
        blockRightDiagonalUp = true;
      }
    }
    //Trường hợp không có khối chặn:
    if (!blockRightDiagonalUp && !blockRightDiagonalDown) {
      return true;
    } else {
      //Trường hợp có khối chặn tạo 5 khối cùng flag liền nhau:
      //Chặn trên chéo phải trên:
      if (blockRightDiagonalUp) {
        if (squareBlockRightDiagonalUp.flag === squareStart.flag) {
          return true;
        }
      }
      //Chặn dưới phải dưới:
      if (blockRightDiagonalDown) {
        if (squareBlocRightDiagonalDown.flag === squareStartEnd.flag) {
          return true;
        }
      }
    }
  },
  youWinScreen: function (arrayFourSame) {
    console.log("%c Bạn thắng cmnr!", "color:red");
    console.log("Danh sách các điểm trùng cờ:", arrayFourSame);
    // for (let index = 0; index < arrayFourSame.length; index++) {

    // }
    // this.removeAllChildren();
  },
});
