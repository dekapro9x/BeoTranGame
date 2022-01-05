var OVuongHandleEventGame = cc.Scene.extend({
  ctor: function (indexOx, indexOy) {
    console.log("Tâm hình vuông:", indexOx, indexOy);
    this._super();
    this.init(indexOx, indexOy);
    this.clickHere = false;
    this.flagX_O = null; //Cờ hiệu báo điền trạng thái X - O.
  },
  init: function (indexOx, indexOy) {
    //Khởi tạo hình vuông:
    // Hình vuông xác định kích thước  = 40 *40;
    const poCenter = { pOx_center: 20, pOy_center: 20 };
    this.squareInit = cc.Sprite.create(res.OVuongTrang_png);
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    this.squareInit.x = poCenter.pOx_center + 40 * indexOx;
    this.squareInit.y = poCenter.pOy_center + 40 * indexOy;
    this.squareInit.setScale(scaleSquareInit, scaleSquareInit);
    this.squareInit.setName(nameRepresentChirldOVuong);
    const actions = cc.rotateBy(8, 90 * 20);
    this.squareInit.runAction(actions);
    this.addChild(this.squareInit, 0);
  },
  //Hiệu ứng nổ pháo hoa:
  animationsPopPop: function () {},
  //Thắng game:
  animationsWin: function () {
    const actions = cc.rotateBy(8, 90 * 20);
    this.squareFlag.runAction(actions);
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
        //Xóa ảnh khởi tạo thay thế ảnh Flag vào:
        this.removeChild(oVuongRemove, true);
        this.squareFlag_X(indexOx, indexOy, father);
        father.checkWinGame(indexOx, indexOy);
      } else {
        this.flagX_O = "O_Flag";
        //Xóa ảnh khởi tạo thay thế ảnh Flag vào:
        this.removeChild(oVuongRemove, true);
        this.squareFlag_O(indexOx, indexOy, father);
        father.checkWinGame(indexOx, indexOy);
      }
    }
  },
  //Cờ hiệu X:
  squareFlag_X: function (indexOx, indexOy, father) {
    const poCenter = { pOx_center: 20, pOy_center: 20 };
    this.squareFlag = cc.Sprite.create(res.OVuongDo_png);
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    this.squareFlag.x = poCenter.pOx_center + 40 * indexOx;
    this.squareFlag.y = poCenter.pOy_center + 40 * indexOy;
    this.squareFlag.setName(nameRepresentChirldOVuong);
    this.squareFlag.setScale(scaleSquareInit, scaleSquareInit);
    this.addChild(this.squareFlag, 0);
    this.clickHere = true;
    father.onChangeFlag();
    this.musicRanDomRingSmile();
    this.animationsWin();
  },
  //Cờ hiệu O:
  squareFlag_O: function (indexOx, indexOy, father) {
    const poCenter = { pOx_center: 20, pOy_center: 20 };
    this.squareFlag = cc.Sprite.create(res.OVuongCam_png);
    const nameRepresentChirldOVuong =
      nameChirldGameCaro.OVuong_Img + "Ox_" + indexOx + "_" + "Oy_" + indexOy;
    this.squareFlag.x = poCenter.pOx_center + 40 * indexOx;
    this.squareFlag.y = poCenter.pOy_center + 40 * indexOy;
    this.squareFlag.setName(nameRepresentChirldOVuong);
    this.squareFlag.setScale(scaleSquareInit, scaleSquareInit);
    this.addChild(this.squareFlag, 0);
    this.clickHere = true;
    father.onChangeFlag();
    this.musicRanDomRingSmile();
  },
  musicRanDomRingSmile: function () {
    const random = Math.floor(Math.random() * 10);
    switch (random) {
      case 1:
        cc.audioEngine.playMusic(res.BacDa_Intro_mp3);
        break;
      case 2:
        cc.audioEngine.playMusic(res.HuaHoaHong_Intro_mp3);
        break;
      case 3:
        cc.audioEngine.playMusic(res.ATheLamSao_mp3);
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
      case 9:
        break;
      case 10:
        break;
      default:
        console.log("random", random);
        break;
    }
  },
});
