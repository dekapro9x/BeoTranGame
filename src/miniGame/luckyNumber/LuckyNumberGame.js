var GameLuckyNumberInit = cc.Scene.extend({ 
    ctor: function () {
      this._super();
      this.init();
      const imagetest = cc.Sprite.create(res.SaoChoi_png );
      imagetest.setPosition(0, 0); //=>Set vị trí tương đối của vật thể trong trục tọa độ x0y
      imagetest.setContentSize(cc.size(0, 0)); //=>Set kích thước
      imagetest.setScale(0.5, 0.5); //Set tỷ lệ so với vật thể gốc và có thể kéo vật thể méo theo trục x0y
      imagetest.setAnchorPoint(cc.p(0.5, 0.5)); //Set tâm vật thể theo thằng cha của nó (0,0) góc dưới trái, (1,1) góc trên phải.
      this.addChild(imagetest, 0);
    }
  })