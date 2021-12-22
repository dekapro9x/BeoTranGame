
var BeoTranGameInit = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var playToJugglingMiniGame = new BeoTranMiniGameInitControlRoot();
    this.addChild(playToJugglingMiniGame);
  },
});
