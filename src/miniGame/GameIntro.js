var MenuIntroSelectGameLayer = cc.Layer.extend({
  ctor: function () {
    this._super();
    this.init();
    this.initMenu();
    this.countTimeOutClickMouse = 0;
    this.coutClickMount = 0;
    this.Scale_menu_0 = false;
    this.Scale_menu_1 = false;
    this.Scale_menu_2 = false;
    const that = this;
    this.addImgThienThach();
    //Đặt sự kiện lắng nghe click chuột:
    const listenerEvent = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        const { _point } = touch;
        const { x, y } = _point;
        that.addFlagWhenClickMouse(x, y, that);
      },
      onTouchMoved: function (touch, event) {},
      onTouchEnded: function (touch, event) {},
    });
    cc.eventManager.addListener(listenerEvent, this.ImgThienThach);
    //Hiển thị danh sách menu lựa chọn:
    AddImgBackGroundMenu(this);
  },
  init: function () {
    if ("mouse" in cc.sys.capabilities) {
      cc.eventManager.addListener(
        {
          event: cc.EventListener.MOUSE,
          onMouseMove: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT)
              event.getCurrentTarget().processEvent(event);
          },
        },
        this
      );
    }
    if (cc.sys.capabilities.hasOwnProperty("keyboard")) {
      cc.eventManager.addListener(
        {
          event: cc.EventListener.KEYBOARD,
          onKeyPressed: function (key, event) {
            console.log("Nghe bàn phím:", key);
            console.log("Nghe sự kiện bàn phím:", key);
            MW.KEYS[key] = true;
          },
          onKeyReleased: function (key, event) {
            MW.KEYS[key] = false;
          },
        },
        this
      );
    }
    if (cc.sys.capabilities.hasOwnProperty("touches")) {
      cc.eventManager.addListener(
        {
          prevTouchId: -1,
          event: cc.EventListener.TOUCH_ALL_AT_ONCE,
          onTouchesMoved: function (touches, event) {
            console.log("Cái này làm gì méo hiểu?");
            var touch = touches[0];
            if (this.prevTouchId != touch.getID())
              this.prevTouchId = touch.getID();
            else event.getCurrentTarget().processEvent(touches[0]);
          },
        },
        this
      );
    }
  },
  //Đặt cờ tại mỗi vị trí bắt được sự kiện click chuột:
  addFlagWhenClickMouse: function (x, y, that) {
    console.log("Tọa độ chuột:", x, y);
    const listActionsFlag = [];
    const labelNameGame = new cc.LabelTTF();
    labelNameGame.setFontSize(8);
    labelNameGame.setFontName("Arial");
    labelNameGame.setString("☢");
    const nameFlag = "clickMouse" + that.coutClickMount;
    labelNameGame.setName(nameFlag);
    that.coutClickMount++;
    labelNameGame.x = x;
    labelNameGame.y = y;
    listActionsFlag[0] = cc.spawn(cc.tintTo(0.5, 238, 130, 238));
    listActionsFlag[1] = cc.spawn(cc.tintTo(2.5, 60, 179, 113));
    labelNameGame.runAction(cc.sequence(listActionsFlag));
    this.handleClickMouse(x, y);
    this.addChild(labelNameGame);
    if (this.countTimeOutClickMouse) {
      clearTimeout(this.countTimeOutClickMouse);
    }
    this.countTimeOutClickMouse = setTimeout(function () {
      that.removeChild(that.getChildByName(nameFlag), true);
      // that.removeAllChildren();
    }, 1000);
  },
  addImgThienThach: function () {
    const size = cc.winSize;
    const duration = 1;
    const durationRotate = 0.1;
    this.ImgThienThach = cc.Sprite.create(res.SaoChoi_png);
    this.ImgThienThach.x = size.width;
    this.ImgThienThach.y = size.height;
    this.ImgThienThach.setScale(0.5, 0.55);
    this.ImgThienThach.setAnchorPoint(cc.p(0.5, 0.5));
    this.addChild(this.ImgThienThach, 0);
    const ThienThach2 = cc.Sprite.create(res.SaoChoi_png);
    ThienThach2.x = 40;
    ThienThach2.y = size.height - 40;
    ThienThach2.setScale(0.5, 0.55);
    ThienThach2.setAnchorPoint(cc.p(0.5, 0.5));
    ThienThach2.rotation = 240;
    this.addChild(ThienThach2, 0);
    //Hành động thiên thạch 1:
    const actions1 = cc.spawn(
      cc
        .moveBy(duration, cc.p(-size.width, -size.height))
        .easing(cc.easeSineOut())
    );
    const actions2 = cc.rotateTo(durationRotate, 180);
    const actions3 = cc.moveBy(duration, cc.p(size.width, size.height));
    const actions4 = cc.rotateTo(durationRotate, 0);
    this.ImgThienThach.runAction(
      cc.repeatForever(cc.sequence(actions1, actions2, actions3, actions4))
    );
    //Hành động thiên thạch 2:
    const actions1A = cc.spawn(
      cc
        .moveBy(duration, cc.p(size.width, -size.height))
        .easing(cc.easeSineOut())
    );
    const actions2A = cc.rotateTo(durationRotate, 70);
    const actions3A = cc.moveBy(duration, cc.p(-size.width, size.height));
    const actions4A = cc.rotateTo(durationRotate, 240);
    ThienThach2.runAction(
      cc.repeatForever(cc.sequence(actions1A, actions2A, actions3A, actions4A))
    );
  },
  functionCheckPosition: function (position, size, positionClick) {
    const pxmax = position.x + size.width / 2;
    const pxmin = position.x - size.width / 2;
    const pymax = position.y + size.height / 2;
    const pymin = position.y - size.height / 2;
    var xCheck = false;
    var yCheck = false;
    if (pxmin < positionClick.x && positionClick.x < pxmax) {
      xCheck = true;
    }
    if (pymin < positionClick.y && positionClick.y < pymax) {
      yCheck = true;
    }
    return xCheck && yCheck ? true : false;
  },
  handleClickMouse: function (x, y) {
    const base = 10;
    const parsedX = parseInt(x, base);
    const parsedY = parseInt(y, base);
    //Lấy kích thước item menu 1:
    this.menuLable_0 = this.getChildByName("menuLable_0");
    const menuLable_0_p = this.menuLable_0._position;
    const menuLable_0_Size = this.menuLable_0._contentSize;
    //Lấy kích thước item menu 2:
    this.menuLable_1 = this.getChildByName("menuLable_1");
    const menuLable_1_p = this.menuLable_1._position;
    const menuLable_1_Size = this.menuLable_1._contentSize;
    //Lấy kích thước item menu 3:
    this.menuLable_2 = this.getChildByName("menuLable_2");
    const menuLable_2_p = this.menuLable_2._position;
    const menuLable_2_Size = this.menuLable_2._contentSize;
    //Tính tọa độ và khu vực có thể xử lý actions menu 1:
    if (
      this.functionCheckPosition(
        menuLable_0_p,
        menuLable_0_Size,
        cc.p(parsedX, parsedY)
      )
    ) {
      this.Scale_menu_0 = !this.Scale_menu_0;
      this.menuLable_0.setScale(this.Scale_menu_0 ? 1.25 : 1);
      //Thay đổi màu sắc menu chọn Game + Chuyển cảnh::
      if (this.Scale_menu_0) {
        const actions1 = cc.spawn(cc.tintTo(0.5, 255, 0, 0));
        const delayTime = cc.delayTime(5);
        const actions2 = cc.director.runScene(new GameCaroInit());
        this.menuLable_0.runAction(cc.sequence(actions1, delayTime, actions2));
      } else {
        this.menuLable_0.runAction(cc.spawn(cc.tintTo(0.5, 255, 125, 0)));
      }
    }
    //Tính tọa độ xử lý actions menu2:
    if (
      this.functionCheckPosition(
        menuLable_1_p,
        menuLable_1_Size,
        cc.p(parsedX, parsedY)
      )
    ) {
      this.Scale_menu_1 = !this.Scale_menu_1;
      this.menuLable_1.setScale(this.Scale_menu_1 ? 1.25 : 1);
      if (this.Scale_menu_1) {
        const actions2 = cc.director.runScene(new GameLuckyNumberInit());
        this.menuLable_1.runAction(
          cc.spawn(cc.tintTo(0.5, 255, 0, 0)),
          actions2
        );
      } else {
        this.menuLable_1.runAction(cc.spawn(cc.tintTo(0.5, 255, 125, 0)));
      }
    }
    //Tọa độ menu 3:
    if (
      this.functionCheckPosition(
        menuLable_2_p,
        menuLable_2_Size,
        cc.p(parsedX, parsedY)
      )
    ) {
      this.Scale_menu_2 = !this.Scale_menu_2;
      this.menuLable_2.setScale(this.Scale_menu_2 ? 1.25 : 1);
      if (this.Scale_menu_2) {
        const actions3 = cc.director.runScene(new MapFlappyBirth());
        this.menuLable_2.runAction(
          cc.spawn(cc.tintTo(0.5, 255, 0, 0)),
          actions3
        );
      } else {
        this.menuLable_2.runAction(cc.spawn(cc.tintTo(0.5, 255, 125, 0)));
      }
    }
  },
  initMenu: function () {
    const arrMenu = ListMenuGame;
    const size = cc.winSize;
    for (let index = 0; index < arrMenu.length; index++) {
      const menuLable = new cc.LabelTTF();
      menuLable.setString(index + 1 + "." + arrMenu[index].name);
      menuLable.setFontName("Arial");
      menuLable.setFontSize(35);
      menuLable.x = 0;
      menuLable.y = 0;
      menuLable.setName("menuLable_" + index);
      menuLable.runAction(
        cc.spawn(
          cc.moveBy(0.5, cc.p(200, size.height - 50 * (index + 1))),
          cc.tintTo(0.25, 255, 125, 0)
        )
      );
      this.addChild(menuLable, 5);
    }
  },
});
//Hiển thị ảnh nền Trái Đất:
function AddImgBackGroundMenu(that) {
  const size = cc.winSize;
  const sprite = new cc.Sprite(res.TraiDat_png);
  sprite.attr({
    x: size.width / 2,
    y: size.height / 2,
    scale: 0.5,
    rotation: 180,
  });
  sprite.runAction(cc.rotateTo(100, 360 * 25));
  that.addChild(sprite, 0);
}
