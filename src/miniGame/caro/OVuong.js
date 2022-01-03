var OVuongHandleEventGame = cc.Scene.extend({
  ctor: function (indexOx, indexOy, father) {
    this._super();
    this.init(indexOx, indexOy);
    this.clickHere = false;
    this.flagX_O = null; //Cờ hiệu báo điền trạng thái X - O.
  },
  init: function (indexOx, indexOy) {
    //Khởi tạo hình vuông:
    //Hình vuông xác định kích thước  = 80 *80;
    const poCenter = { pOx_center: 40, pOy_center: 40 };
    const squareInit = cc.Sprite.create(res.OVuongTrang_png);
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    squareInit.x = poCenter.pOx_center * (indexOx + 1);
    squareInit.y = poCenter.pOy_center * (indexOy + 1);
    squareInit.setScale(scaleSquareInit, scaleSquareInit);
    squareInit.setName(nameRepresentChirldOVuong);
    this.addChild(squareInit, 0);
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
        this.flagX_O = "X_Flag";
        this.removeChild(oVuongRemove, true);
        this.addImgRed(indexOx, indexOy, father);
        father.checkWinGame(indexOx, indexOy);
      } else {
        this.flagX_O = "O_Flag";
        this.removeChild(oVuongRemove, true);
        this.addImgOrage(indexOx, indexOy, father);
        father.checkWinGame(indexOx, indexOy);
      }
    }
  },
  addImgRed: function (indexOx, indexOy, father) {
    const poCenter = { pOx_center: 40, pOy_center: 40 };
    const oVuong = cc.Sprite.create(res.OVuongDo_png);
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    oVuong.x = poCenter.pOx_center * (indexOx + 1);
    oVuong.y = poCenter.pOy_center * (indexOy + 1);
    oVuong.setName(nameRepresentChirldOVuong);
    oVuong.setScale(scaleSquareInit, scaleSquareInit);
    this.addChild(oVuong, 0);
    this.clickHere = true;
    father.onChangeFlag();
  },
  addImgOrage: function (indexOx, indexOy, father) {
    const poCenter = { pOx_center: 40, pOy_center: 40 };
    const oVuong = cc.Sprite.create(res.OVuongCam_png);
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    oVuong.x = poCenter.pOx_center * (indexOx + 1);
    oVuong.y = poCenter.pOy_center * (indexOy + 1);
    oVuong.setName(nameRepresentChirldOVuong);
    oVuong.setScale(scaleSquareInit, scaleSquareInit);
    this.addChild(oVuong, 0);
    this.clickHere = true;
    father.onChangeFlag();
  },
});
