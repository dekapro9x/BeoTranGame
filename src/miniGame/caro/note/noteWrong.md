Lối sai và tư duy sai:
  //Kiểm tra thắng thua trên trục Ox:
  //B1: Lấy ra mảng gồm 7 ô liên tiếp trên trục Ox có 1 điểm trung tâm:
  //B2: Tìm ra 4 ô giống nhau.
  //B3: Kiểm tra chặn đầu - đuôi.
  //Case 1: 4 ô cùng cờ ko chặn đầu => Win.
  //Case 2: 4 ô cùng cờ + 1 chặn đầu cùng cờ => Win.
  checkWinGameOx: function (indexOx, indexOy) {
    console.log("Kiểm tra thắng thua trên trục Ox:");
    const arrayFlagOx = [];
    const sizeWin = 4;
    const lengSquareConsecutive = 3; //Số ô gần kề ô trung tâm cần kiểm tra.
    const maxPoX = 23; // Giới hạn trục Ox 23 ô.
    //Điểm trung tâm trên trục Ox:
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
    //This điểm trung tâm:
    const entitySquareCenterOx = this.getChildByName(nameSquareCenterOx);
    //Cờ hiệu điểm trung tâm:
    squareCenterOx.flag = entitySquareCenterOx.flagX_O;
    //Kiểm tra 3 điểm theo trục Ox gần nhất trung tâm:
    if (indexOx >= 4 && indexOx < maxPoX - sizeWin) {
      console.log("Vùng tự do trục Ox:");
      //2 hướng trái + phải:
      for (
        var indexArrayFlagOxFreeSquare = -lengSquareConsecutive;
        indexArrayFlagOxFreeSquare <= lengSquareConsecutive;
        indexArrayFlagOxFreeSquare++
      ) {
        const po_X = squareCenterOx.po_X + indexArrayFlagOxFreeSquare;
        const po_Y = squareCenterOx.po_Y;
        const nameRepresent =
          nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
        const entitySquareOX = this.getChildByName(nameRepresent);
        const entity = { po_X: po_X, po_Y: po_Y, flag: entitySquareOX.flagX_O };
        arrayFlagOx.push(entity);
      }
    } else {
      console.log("Vùng giới hạn trục Ox:");
      //Trường hợp sát mép lề trái (0;Oy)=>(4;Oy):
      if (indexOx < 4) {
        for (
          var indexArrayFlagOxLimitSquareMin = -indexOx;
          indexArrayFlagOxLimitSquareMin <= sizeWin;
          indexArrayFlagOxLimitSquareMin++
        ) {
          const po_X = squareCenterOx.po_X + indexArrayFlagOxLimitSquareMin;
          const po_Y = squareCenterOx.po_Y;
          const nameRepresent =
            nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
          const entitySquareOX = this.getChildByName(nameRepresent);
          const entity = {
            po_X: po_X,
            po_Y: po_Y,
            flag: entitySquareOX.flagX_O,
          };
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
          const po_Y = squareCenterOx.po_Y;
          const nameRepresent =
            nameChirldGameCaro.OVuong_Img + "Ox_" + po_X + "_" + "Oy_" + po_Y;
          const entitySquareOX = this.getChildByName(nameRepresent);
          const entity = {
            po_X: po_X,
            po_Y: po_Y,
            flag: entitySquareOX.flagX_O,
          };
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
    var winFourSquare = false;
    for (var indexSame = 0; indexSame < arrNeedCheckSame.length; indexSame++) {
      const element = arrNeedCheckSame[indexSame];
      const isCheckSameX_Flag = (item) => item?.flag == "X_Flag";
      const isCheckSameO_Flag = (item) => item?.flag == "O_Flag";
      //Đẩy 1 phần tử vào cuối rồi bỏ 1 phần tử đầu đi sẽ giữ lại mảng chỉ có 4 phần tử.
      arrayFourFlagSame.push(element);
      arrayFourFlagSame.shift();
      const isSameX_Flag = arrayFourFlagSame.every(isCheckSameX_Flag);
      const isSameO_Flag = arrayFourFlagSame.every(isCheckSameO_Flag);
      if (isSameX_Flag || isSameO_Flag) {
        //Kiểm tra cờ hiệu liên tiếp của 4 phần tử có giống nhau không.
        winFourSquare = this.checkBlockHeadFourSquareOx(arrayFourFlagSame);
        break;
      }
    }
    if (winFourSquare) {
      this.youWinScreen();
    }
  },