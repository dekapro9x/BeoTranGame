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
  // Case 2: flag giống ô trung tâm thì win (Case 5 điểm):
  const squareRightCenterPlus1 = {
    po_X: poSquareCenter.po_X + 1,
    po_Y: poSquareCenter.po_Y,
    flag: null,
  };
} else {
  directionFourSquare = "Right";
}