var EtroGameLayer = cc.Layer.extend({
  sprite: null,
  //Hàm khởi tạo giá trị ban đầu:
  ctor: function () {
    this._super();
    main(this);
    //Function Testing:
    this.renderUITest();
    testDemoFunctions(this);
  },
  //Hàm này xử lý logic cả game:
  update: function () {},
  onTouchStartGame: function () {},
  setActionButtonControl: function () {
    var listener1 = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
          target.parent.checkButton(target);
          target.opacity = 180;
          return true;
        }
        return false;
      },
    });
  },
  onTouchEnded: function (touch, event) {
    MOVE_PLAYER = false;
    gamePlayer.getAnimation().play("stop");
  },
  checkButton: function (target) {
    if (target === this.left) {
      MOVE_PLAYER = true;
      KEY = cc.KEY.left;
    }
    if (target === this.right) {
      MOVE_PLAYER = true;
      KEY = cc.KEY.right;
    }
    if (target === this.up) {
      MOVE_PLAYER = true;
      KEY = cc.KEY.up;
    }
    if (target === this.down) {
      MOVE_PLAYER = true;
      KEY = cc.KEY.down;
    }
    if (target === this.fire) {
      MOVE_PLAYER = true;
      KEY = cc.KEY.space;
    }
  },
  renderUITest: function () {
   
  },
});

//Hàm main:
function main(that) {
  renderLabelTitleNameGame(that);
  renderImgBackground(that);
  renderButtonStartPlayGame(that);
  // renderButtonControlPlayGame(that);
}

//Hiển thị tiêu đề và tên game:
function renderLabelTitleNameGame(that) {
  const size = cc.winSize;
  var labelNameGame = new cc.LabelTTF();
  labelNameGame.setFontSize(40);
  labelNameGame.setFontName("Arial");
  labelNameGame.setString("Play To Juggling Earth");
  labelNameGame.x = size.width / 2;
  labelNameGame.y = 0;
  labelNameGame.runAction(
    cc.spawn(
      cc.moveBy(2.5, cc.p(0, size.height - 40)),
      cc.tintTo(3, 238, 130, 238)
    )
  );
  labelNameGame.runAction(cc.spawn(cc.tintTo(2.5, 255, 0, 0)));
  that.addChild(labelNameGame, 0);
}

//Hiển thị ảnh nền trái đất: (Tạo 1 vật thể => Gắn hành động)
function renderImgBackground(that) {
  const size = cc.winSize;
  //Tạo ra vật thể 2D trái đất:
  that.spriteEarth = new cc.Sprite(res.TraiDat_png);
  //attr định ngĩa các thuộc tính:
  that.spriteEarth.attr({
    x: size.width / 2,
    y: size.height / 2,
    scale: 0.5,
    rotation: 180,
  });
  //Gán thuộc tính khởi tạo:
  that.spriteEarth.setScale(0.2, null);
  //Gắn hành động:
  that.spriteEarth.runAction(
    cc.sequence(cc.rotateTo(2, 0), cc.scaleTo(2, 0.5, 0.5))
  );
  that.addChild(that.spriteEarth, 0);
}

//Hiển thị nút Play Game:
function renderButtonControlPlayGame(that) {
  const sizeBtn = 0.06;
  // Nút điều khiển bên trái:
  var leftButtonControlActivity = (that.leftButtonControlActivity =
    cc.Sprite.create(res.StartGameBnt_png));
  leftButtonControlActivity.scale = sizeBtn;
  that.leftButtonControlActivity.x = 95;
  that.leftButtonControlActivity.y = 80;
  that.addChild(leftButtonControlActivity, 0);

  // Nút điều khiển bên phải:
  var rightButtonControlActivity = (that.rightButtonControlActivity =
    cc.Sprite.create(res.StartGameBnt_png));
  rightButtonControlActivity.scale = sizeBtn;
  that.rightButtonControlActivity.y = 80;
  that.rightButtonControlActivity.x = 205;
  that.rightButtonControlActivity.rotation = 180;
  that.addChild(rightButtonControlActivity, 0);

  // Nút điều khiển lên trên:
  var upButtonControlActivity = (that.upButtonControlActivity =
    cc.Sprite.create(res.StartGameBnt_png));
  upButtonControlActivity.scale = sizeBtn;
  that.upButtonControlActivity.y = 130;
  that.upButtonControlActivity.x = 150;
  that.upButtonControlActivity.rotation = 90;
  that.addChild(upButtonControlActivity, 0);

  //Nút điều khiển xuống dưới:
  var downButtonControlActivity = (that.downButtonControlActivity =
    cc.Sprite.create(res.StartGameBnt_png));
  downButtonControlActivity.scale = sizeBtn;
  that.downButtonControlActivity.y = 40;
  that.downButtonControlActivity.x = 150;
  that.downButtonControlActivity.rotation = 270;
  that.addChild(downButtonControlActivity, 0);

  //Nút bắn:
  that.fireActions = cc.Sprite.create(res.StartGameBnt_png);
  that.fireActions.y = 80;
  that.fireActions.scale = 0.12;
  that.fireActions.x = 850;
  that.addChild(that.fireActions, 0);
  that.setActionButtonControl();
}

//Nút bắt đầu Game:
function renderButtonStartPlayGame(that) {
  const startGame = cc.Sprite.create(res.StartGameBnt_png);
  startGame.y = 120;
  startGame.x = 850;
  startGame.scale = 0.2;
  const labelStartGame = new cc.LabelTTF();
  labelStartGame.setFontSize(35);
  labelStartGame.setFontName("Arial");
  labelStartGame.setString("Start");
  labelStartGame.x = 850;
  labelStartGame.y = 60;
  labelStartGame.runAction(cc.spawn(cc.tintTo(2, 255, 99, 71)));
  const labelTouchStartGame = cc.Layer.create();
  labelTouchStartGame.addChild(startGame, 0);
  labelTouchStartGame.addChild(labelStartGame, 0);
  that.addChild(labelTouchStartGame, 0);
}

var BeoTranGameInit = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new EtroGameLayer();
    this.addChild(layer);
  },
});

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
//Hàm test thuộc tính và view:
function testDemoFunctions(that) {
  // renderTestImg(that);
  // renderTestAnimations(that);
}

function renderTestImg(that) {
  var image = cc.Sprite.create(res.TraiDat_png);
  image.setPosition(0, 0); //=>Set vị trí tương đối của vật thể trong trục tọa độ x0y
  image.setContentSize(cc.size(0, 0)); //=>Set kích thước
  image.setScale(0.5, 0.5); //Set tỷ lệ so với vật thể gốc và có thể kéo vật thể méo theo trục x0y
  image.setAnchorPoint(cc.p(0.5, 0.5)); //Set tâm vật thể theo thằng cha của nó (0,0) góc dưới trái, (1,1) góc trên phải.
  that.addChild(image, 0);
}

function renderTestAnimations(that) {
  const size = cc.winSize;
  var closeItem = new cc.MenuItemImage(
    res.CloseNormal_png,
    res.CloseSelected_png,
    function () {
      cc.log("Menu is clicked!");
    },
    that
  );
  closeItem.attr({
    x: size.width - 20,
    y: 20,
    anchorX: 0.5,
    anchorY: 0.5,
  });
  var menu = new cc.Menu(closeItem);
  menu.x = 0;
  menu.y = 0;
  that.addChild(menu, 1);
  //Chữ hiệu ứng màu:
  var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
  helloLabel.x = size.width / 2;
  helloLabel.y = 0;
  helloLabel.runAction(
    cc.spawn(
      cc.moveBy(2.5, cc.p(0, size.height - 40)),
      cc.tintTo(2.5, 255, 125, 0)
    )
  );
  that.addChild(helloLabel, 5);
  //Ảnh hiệu hứng phóng to:
  that.sprite = new cc.Sprite(res.HelloWorld_png);
  that.sprite.attr({
    x: size.width / 2,
    y: size.height / 2,
    scale: 0.5,
    rotation: 180,
  });
  that.addChild(that.sprite, 0);
  that.sprite.runAction(cc.sequence(cc.rotateTo(2, 0), cc.scaleTo(2, 1, 1)));
  return true;
}
