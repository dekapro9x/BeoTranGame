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
  checkWinGame: function (indexOx, indexOy) {
    //Kiểm tra trên trục Ox:
    this.checkWinGameOx(indexOx, indexOy);
    //Kiểm tra trên trục Oy:
    // this.checkWinGameOy(indexOx, indexOy);
    //Kiểm tra trên đường chéo trái đi qua tâm:
    // this.checkWinGameLeftDiagonal(indexOx, indexOy);
    //Kiểm tra trên đường chéo phải đi qua tâm:
    // this.checkWinGameRightDiagonal(indexOx, indexOy);
  },
  //Kiểm tra thắng thua trên trục Ox:
  checkWinGameOx: function (indexOx, indexOy) {
    //B1: Lấy ra mảng gồm 7 ô liên tiếp trên trục Ox có 1 điểm trung tâm:
    //B2: Tìm ra 4 ô giống nhau.
    //B3: Kiểm tra chặn đầu - đuôi.
    //Case 1: 4 ô cùng cờ ko chặn đầu => Win.
    //Case 2: 4 ô cùng cờ + 1 chặn đầu cùng cờ => Win.
    const arrayFlagOx = [];
    const sizeWin = 4; // 4 ô trùng nhau kiểm tra thắng thua:
    const lengSquareConsecutive = 3;
    const maxPoX = 23; // Giới hạn trục Ox 23 ô.
    //Ô vuông trung tâm vừa click đổi flag - kiểm tra phương nằm ngang Ox.
    const squareCenter = {
      po_X: indexOx,
      po_Y: indexOy,
      flag: null,
    };
    //Lấy name(this) định danh cho điểm trung tâm:
    const nameSquareCenter =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareCenter.po_X +
      "_" +
      "Oy_" +
      squareCenter.po_Y;
    //This điểm trung tâm:
    const entitySquareCenter = this.getChildByName(nameSquareCenter);
    //Gắn cờ điểm trung tâm:
    squareCenter.flag = entitySquareCenter.flagX_O;
    //Kiểm tra 3 điểm trái + tâm + 3 điểm phải phương nằm ngang Ox:
    if (indexOx >= 4 && indexOx < maxPoX - sizeWin) {
      //Vùng tự do từ (4;19) nằm mép trong lề trái > 5 ô và < 19 ô lề phải:
      // console.log("%c Vùng tự do trục Ox:", "color:blue");
      //Kiểm tra 3 ô nằm kề 2 phía tâm:
      for (
        var indexArrayFlagOxFreeSquare = -lengSquareConsecutive;
        indexArrayFlagOxFreeSquare <= lengSquareConsecutive;
        indexArrayFlagOxFreeSquare++
      ) {
        const po_X = squareCenter.po_X + indexArrayFlagOxFreeSquare;
        const po_Y = squareCenter.po_Y;
        const nameRepresent =
          nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        const entitySquare = this.getChildByName(nameRepresent);
        const entityPO = { po_X: po_X, po_Y: po_Y, flag: entitySquare.flagX_O };
        arrayFlagOx.push(entityPO);
      }
    }
    //Vùng giới hạn:
    else {
      //Trường hợp sát mép lề trái (0;Oy)=>(4;Oy):
      // console.log("%c Vùng hạn chế trục Ox:", "color:blue");
      if (indexOx < 4) {
        // console.log("%c Vùng hạn chế mép trái:", "color:blue");
        for (
          var indexArrayFlagOxLimitSquareMin = -indexOx;
          indexArrayFlagOxLimitSquareMin <= sizeWin;
          indexArrayFlagOxLimitSquareMin++
        ) {
          const po_X = squareCenter.po_X + indexArrayFlagOxLimitSquareMin;
          const po_Y = squareCenter.po_Y;
          const nameRepresent =
            nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
          const getEntity = this.getChildByName(nameRepresent);
          const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
          arrayFlagOx.push(entity);
        }
      } else {
        // console.log("%c Vùng hạn chế mép phải:", "color:blue");
        //Giới hạn mép lề bên phải trục (19,Oy) => (23,Oy);
        for (
          var indexArrayFlagOxLimitSquareMax = indexOx - sizeWin;
          indexArrayFlagOxLimitSquareMax <= maxPoX;
          indexArrayFlagOxLimitSquareMax++
        ) {
          const po_X = indexArrayFlagOxLimitSquareMax;
          const po_Y = squareCenter.po_Y;
          const nameRepresent =
            nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
          const getEntity = this.getChildByName(nameRepresent);
          const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
          arrayFlagOx.push(entity);
        }
      }
    }
    //Kiểm tra mảng check trùng trạng thái 4 ô liên tiếp trục Ox:
    const arrNeedCheckSame = arrayFlagOx;
    console.log(
      "Mảng cấn kiểm tra cờ trùng nhau trên trục Ox:",
      arrNeedCheckSame
    );
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
        winFourOVuong = this.checkBlockHeadFourSquareOx(arrayFourFlagSame);
        break;
      }
    }
    if (winFourOVuong) {
      this.youWinScreen();
    }
  },
  //Kiểm tra chặn đầu 4 ô trùng cờ phương Ox:
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
    //Tên khối chặn trái:
    const nameSquareBlockLeft =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockLeftOx.po_X +
      "_" +
      "Oy_" +
      squareBlockLeftOx.po_Y;
    //Khối hộp chặn trái:
    const entitySquareBlockLeft = this.getChildByName(nameSquareBlockLeft);
    if (entitySquareBlockLeft) {
      squareBlockLeftOx.flag = entitySquareBlockLeft.flagX_O;
      if (!squareBlockLeftOx.flag) {
        blockLeftOx = false;
      } else {
        blockLeftOx = true;
      }
    }
    //Khối chặn phải theo phương Ox:
    const squareBlockRight = {
      po_X: squareStartEnd.po_X + 1,
      po_Y: squareStartEnd.po_Y,
      flag: null,
    };
    //Tên khối chặn phải:
    const nameSquareBlockRight =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockRight.po_X +
      "_" +
      "Oy_" +
      squareBlockRight.po_Y;
    //Khối hộp chặn phải:
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
      if (blockLeft) {
        if (squareBlockLeftOx.flag === squareStart.flag) {
          return true;
        }
      }
      //Chặn phải Ox trùng cờ với 4 ô còn lại:
      if (blockRight) {
        if (squareBlockRight.flag === squareStartEnd.flag) {
          return true;
        }
      }
    }
  },
  checkWinGameOy: function (indexOx, indexOy) {
    console.log("%c Tọa độ điểm trên Oy:", "color:red", indexOx, indexOy);
    const arrayFlagOy = [];
    const sizeWin = 4;
    const maxPoY = 15;
    //Điểm chung tâm cần xét xác ô vuông còn lại:
    const poSquareCenter = {
      po_X: indexOx,
      po_Y: indexOy,
      flag: null,
    };
    //Lấy flag của ô vuông trung tâm:
    const nameRepresentCenter =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      poSquareCenter.po_X +
      "_" +
      "Oy_" +
      poSquareCenter.po_Y;
    const getEntityCenter = this.getChildByName(nameRepresentCenter);
    poSquareCenter.flag = getEntityCenter.flagX_O;
    // console.log("poSquareCenter Oy", poSquareCenter);
    //Vùng tự do từ (4;11);
    if (indexOy >= 4 && indexOy < maxPoY - sizeWin) {
      // console.log("%c Trong vùng thoải mái:", "color:blue");
      for (
        var indexArrayFlagOy = -sizeWin;
        indexArrayFlagOy <= sizeWin;
        indexArrayFlagOy++
      ) {
        const po_X = poSquareCenter.po_X;
        const po_Y = poSquareCenter.po_Y + indexArrayFlagOy;
        const nameRepresent =
          nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        const getEntity = this.getChildByName(nameRepresent);
        const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
        arrayFlagOy.push(entity);
      }
    }
    //Trường hợp sát mép với 3 ô sát lề trái:
    else {
      // console.log("%c Mép giới hạn:", "color:green");
      //Giới hạn dưới gần về (Ox,0);
      if (indexOy < 4) {
        // console.log("Mép giới hạn dưới:");
        for (
          var indexArrayFlagOy = -indexOy;
          indexArrayFlagOy <= indexOy + sizeWin;
          indexArrayFlagOy++
        ) {
          const po_X = poSquareCenter.po_X;
          const po_Y = poSquareCenter.po_Y + indexArrayFlagOy;
          const nameRepresent =
            nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
          const getEntity = this.getChildByName(nameRepresent);
          const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
          arrayFlagOy.push(entity);
        }
      }
      //Giới hạn trên gần về (Ox,15);
      else {
        // console.log("Mép giới hạn trên:");
        //Giới hạn mép lề bên phải trục Ox là 15 ô - 4 = 11 ô.
        for (
          var indexArrayFlagOy = indexOy - sizeWin;
          indexArrayFlagOy <= maxPoY;
          indexArrayFlagOy++
        ) {
          const po_X = poSquareCenter.po_X;
          const po_Y = indexArrayFlagOy;
          const nameRepresent =
            nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
          const getEntity = this.getChildByName(nameRepresent);
          const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
          arrayFlagOy.push(entity);
        }
      }
    }
    //Kiểm tra mảng check trùng trạng thái:
    //Trường hợp 1: 4 phần tử liên tiếp trùng nhau và không có chặn đầu theo trục Ox:
    const arrNeedCheckSame = arrayFlagOy;
    console.log(
      "Mảng cấn kiểm tra cờ trùng nhau trên trục Oy:",
      arrNeedCheckSame
    );
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
        winFourOVuong = this.checkBlockHeadFourSquareOy(
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
  //Kiểm tra chặn đầu trên dưới của 4 ô giống nhau:
  checkBlockHeadFourSquareOy: function (arrayFourFlagSame, poSquareCenter) {
    console.log("arrayFourFlagSameOy", arrayFourFlagSame);
    //Xác định vị trí ô vuông đầu và cuối trong mảng:
    var blockOn = null; //Chặn trên.
    var blockDown = null; //Chặn dưới.
    const squareStart = arrayFourFlagSame[0];
    const squareStartEnd = arrayFourFlagSame[arrayFourFlagSame.length - 1];
    //Trường hợp 1: Không có chặn đầu và chặn cuối:
    const squareBlockOn = {
      po_X: squareStart.po_X,
      po_Y: squareStart.po_Y - 1,
      flag: null,
    };
    //Lấy khối + cờ hiệu bên trên:
    const nameSquareBlockOn =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockOn.po_X +
      "_" +
      "Oy_" +
      squareBlockOn.po_Y;
    //Khối hộp chặn trên:
    const entitySquareBlockOn = this.getChildByName(nameSquareBlockOn);
    if (entitySquareBlockOn) {
      squareBlockOn.flag = entitySquareBlockOn.flagX_O;
      if (!squareBlockOn.flag) {
        blockOn = false;
      } else {
        blockOn = true;
      }
    }
    //Lấy khối + cờ hiệu bên dưới:
    const squareBlockDown = {
      po_X: squareStartEnd.po_X,
      po_Y: squareStartEnd.po_Y + 1,
      flag: null,
    };
    //Lấy khối + cờ hiệu:
    const nameSquareBlockDown =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockDown.po_X +
      "_" +
      "Oy_" +
      squareBlockDown.po_Y;
    //Khối hộp chặn phải:
    const entitySquareBlockDown = this.getChildByName(nameSquareBlockDown);
    if (entitySquareBlockDown) {
      squareBlockDown.flag = entitySquareBlockDown.flagX_O;
      if (!squareBlockDown.flag) {
        blockDown = false;
      } else {
        blockDown = true;
      }
    }
    //Trường hợp không có khối chặn:
    if (!blockOn && !blockDown) {
      return true;
    } else {
      //Trường hợp có khối chặn tạo 5 khối cùng flag liền nhau:
      //Chặn trái:
      if (blockOn) {
        if (squareBlockOn.flag === squareStart.flag) {
          return true;
        }
      }
      //Chặn phải:
      if (blockDown) {
        if (squareBlockDown.flag === squareStartEnd.flag) {
          return true;
        }
      }
    }
  },
  checkWinGameLeftDiagonal: function (indexOx, indexOy) {
    console.log("Đường chéo trái", indexOx, indexOy);
    // console.log("%c Tạo độ điểm trên Ox:", "color:red", indexOx, indexOy);
    const arrayFlagLeftDiagonal = [];
    //Khoảng cách liên tiếp ô nếu trùng cờ thì thắng:
    const sizeWin = 4;
    //Điểm giới hạn trên Ox để tính tại ô vuông trung tâm lùi về 4 => maxPoX;
    const maxPoX = 23;
    const maxPoY = 15;
    //Điểm chung tâm cần xét xác ô vuông còn lại:
    const poSquareCenter = {
      po_X: indexOx,
      po_Y: indexOy,
      flag: null,
    };
    //Lấy flag của ô vuông trung tâm:
    const nameRepresentCenter =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      poSquareCenter.po_X +
      "_" +
      "Oy_" +
      poSquareCenter.po_Y;
    const getEntityCenter = this.getChildByName(nameRepresentCenter);
    poSquareCenter.flag = getEntityCenter.flagX_O;
    console.log("Điển trung tâm LeftDiagonal:", poSquareCenter);
    //Vùng tự do:
    if (
      indexOx >= 4 &&
      indexOx < maxPoX - sizeWin &&
      indexOy >= 4 &&
      indexOy < maxPoY - sizeWin
    ) {
      console.log("%c Vùng tự do:", "color:green");
      //Tréo trái nửa dưới:
      for (
        var indexArrayFlagLeftDiagonalFreeSquareDown = -3;
        indexArrayFlagLeftDiagonalFreeSquareDown <= 0;
        indexArrayFlagLeftDiagonalFreeSquareDown++
      ) {
        console.log("Chạy từ:", indexArrayFlagLeftDiagonalFreeSquareDown);
        const po_X =
          poSquareCenter.po_X - indexArrayFlagLeftDiagonalFreeSquareDown;
        const po_Y =
          poSquareCenter.po_Y + indexArrayFlagLeftDiagonalFreeSquareDown;
        console.log("Tọa độ điểm cần check", po_X, po_Y);
        const nameRepresent =
          nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        const getEntity = this.getChildByName(nameRepresent);
        const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
        arrayFlagLeftDiagonal.push(entity);
      }
      //Tréo trái nửa trên:
      for (
        var indexArrayFlagLeftDiagonalFreeSquareUp = 1;
        indexArrayFlagLeftDiagonalFreeSquareUp <= 3;
        indexArrayFlagLeftDiagonalFreeSquareUp++
      ) {
        console.log("Chạy từ:", indexArrayFlagLeftDiagonalFreeSquareUp);
        const po_X =
          poSquareCenter.po_X - indexArrayFlagLeftDiagonalFreeSquareUp;
        const po_Y =
          poSquareCenter.po_Y + indexArrayFlagLeftDiagonalFreeSquareUp;
        console.log("Tọa độ điểm cần check", po_X, po_Y);
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
      console.log("%c Vùng giới hạn", "color:red");
      //Trường hợp sát mép lề trái (0;Oy)=>(4;Oy):
      if (indexOx < 4) {
        // for (
        //   var indexArrayFlagOx = -indexOx;
        //   indexArrayFlagOx <= sizeWin;
        //   indexArrayFlagOx++
        // ) {
        //   const po_X = poSquareCenter.po_X + indexArrayFlagOx;
        //   const po_Y = poSquareCenter.po_Y;
        //   const nameRepresent =
        //     nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        //   const getEntity = this.getChildByName(nameRepresent);
        //   const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
        //   arrayFlagOx.push(entity);
        // }
      } else {
        //Giới hạn mép lề bên phải trục (19,Oy) => (23,Oy);
        // for (
        //   var indexArrayFlagOx = indexOx - sizeWin;
        //   indexArrayFlagOx <= maxPoX;
        //   indexArrayFlagOx++
        // ) {
        //   const po_X = indexArrayFlagOx;
        //   const po_Y = poSquareCenter.po_Y;
        //   const nameRepresent =
        //     nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        //   const getEntity = this.getChildByName(nameRepresent);
        //   const entity = { po_X: po_X, po_Y: po_Y, flag: getEntity.flagX_O };
        //   arrayFlagOx.push(entity);
        // }
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
        winFourOVuong = this.checkBlockHeadFourSquareLeftDiagonal(
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
  //Kiểm tra khối chặn đường chéo trái:
  checkBlockHeadFourSquareLeftDiagonal: function (
    arrayFourFlagSame,
    poSquareCenter
  ) {
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
      po_X: squareStart.po_X - 1,
      po_Y: squareStart.po_Y + 1,
      flag: null,
    };
    //Lấy khối chặn tréo trái:
    const nameSquareBlockOnLeftDiagonal =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockLeft.po_X +
      "_" +
      "Oy_" +
      squareBlockLeft.po_Y;
    //Khối hộp chặn trái:
    const entitySquareBlockLeftDiagonal = this.getChildByName(
      nameSquareBlockOnLeftDiagonal
    );
    if (entitySquareBlockLeftDiagonal) {
      squareBlockOnLeft.flag = entitySquareBlockLeftDiagonal.flagX_O;
      if (!squareBlockLeft.flag) {
        blockLeftOn = false;
      } else {
        blockLeftOn = true;
      }
    }
    //Lấy khối chặn dưới tréo trái dưới:
    const squareBlockDownLeft = {
      po_X: squareStartEnd.po_X + 1,
      po_Y: squareStartEnd.po_Y - 1,
      flag: null,
    };
    //Lấy tên khối chặn trái dưới:
    const nameSquareBlockDownLeftDiagonal =
      nameChirldGameCaro.OVuong_Img +
      "Ox_" +
      squareBlockRight.po_X +
      "_" +
      "Oy_" +
      squareBlockRight.po_Y;
    //Khối hộp chặn dưới trái:
    const entitySquareBlockRightDiagonal = this.getChildByName(
      nameSquareBlockDownLeftDiagonal
    );
    if (entitySquareBlockRightDiagonal) {
      squareBlockDownLeft.flag = entitySquareBlockRight.flagX_O;
      if (!squareBlockRight.flag) {
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
        if (squareBlockLeft.flag === squareStart.flag) {
          return true;
        }
      }
      //Chặn dưới trái:
      if (blockLeftDown) {
        if (squareBlockRight.flag === squareStartEnd.flag) {
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
