var EtroGameLayer = cc.Layer.extend({
  sprite: null,
  //Hàm khởi tạo giá trị ban đầu:
  ctor: function () {
    this._super();
    renderLabelTitleNameGame(this);
    renderImgBackground(this);
    renderButtonControlPlayGame(this);
    //Function Testing:
    testDemoFunctions(this);
  },
  //Hàm này xử lý logic cả game:
  update: function () {},
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
      }});
  },
  onTouchEnded: function (touch, event) {
    MOVE_PLAYER = false;
    gamePlayer.getAnimation().play("stop");
  }, 
  checkButton: function(target){
    if(target === this.left){
      MOVE_PLAYER = true;
      KEY = cc.KEY.left;
    }
    if(target === this.right){
      MOVE_PLAYER = true;
      KEY = cc.KEY.right;
    }
    if(target === this.up){
      MOVE_PLAYER = true;
      KEY = cc.KEY.up;
    }
    if(target === this.down){
      MOVE_PLAYER = true;
      KEY = cc.KEY.down;
    }
    if(target === this.fire){
      MOVE_PLAYER = true;
      KEY = cc.KEY.space;
    }
  }
  
});

//Hiển thị tiêu đề và tên game:
function renderLabelTitleNameGame(that) {
  const size = cc.winSize;
  var labelNameGame = new cc.LabelTTF();
  labelNameGame.setFontSize(40);
  labelNameGame.setFontName("Arial");
  labelNameGame.setString("Well Come To Juggling Earth");
  labelNameGame.x = size.width / 2;
  labelNameGame.y = size.height / 2 + 200;
  that.addChild(labelNameGame, 2);
}
//Hiển thị ảnh nền trái đất:
function renderImgBackground(that) {
  const size = cc.winSize;
  that.sprite = new cc.Sprite(res.TraiDat_png);
  that.sprite.attr({
    x: size.width / 2,
    y: size.height / 2 + 120,
  });
  that.sprite.setScale(0.2);
  that.addChild(that.sprite, 0);
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

var BeoTranGameInit = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new EtroGameLayer();
    this.addChild(layer);
  },
});

//Hàm test thuộc tính và view:
function testDemoFunctions(that) {
  //   renderTestImg(that);
}

function renderTestImg(that) {
  var image = cc.Sprite.create(res.TraiDat_png);
  image.setPosition(10, 10);
  image.setContentSize(cc.size(10, 10));
  image.setScale(0.5);
  that.addChild(image, 0);
}
