// 添加上期信息
function showPrevPeriod(ccNode, options) {
  // 添加上期排序
  for (var i = 0; i < options.sorts.length; i++) {
    var num = cc.Sprite.create("img/num/" + options.sorts[i] + ".png");
    num.setPosition(440 + i * 75, 900);
    ccNode.addChild(num, 1);
  }
  // 添加当前期号
  var periodNums = cc.LabelTTF.create('期号: ' + options.period, 'arial', 30, cc.size(424, 94), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
  periodNums.setPosition(1400, 900)
  ccNode.addChild(periodNums, 1);

  // 添加底部冠亚军和及龙虎榜
  var footbg = new cc.LayerColor(cc.color(50, 50, 50, 255), 1440, 130);
  footbg.setPosition(0, 0);
  ccNode.addChild(footbg, 0);

  // 等待开奖
  var footCurrentPeriod = cc.Sprite.create("img/foot_bg_1.png");
  footCurrentPeriod.setPosition(208, 65);
  footbg.addChild(footCurrentPeriod, 1);
  var footCurrentPeriodText = cc.LabelTTF.create('等待开奖：' + (options.period + 1), 'arial', 32, cc.size(424, 94), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
  footCurrentPeriodText.setPosition(210, 47)

  // footCurrentPeriodText.setString('等待开奖：901125');
  footCurrentPeriod.addChild(footCurrentPeriodText, 2);

  // 冠亚军和
  var footCurrentChampion = cc.Sprite.create("img/foot_bg_2.png");
  footCurrentChampion.setPosition(625, 65);
  footbg.addChild(footCurrentChampion, 1);
  var footCurrentChampionText = cc.LabelTTF.create('冠亚军和：', 'arial', 32, cc.size(424, 94), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
  footCurrentChampionText.setPosition(232, 47)
  footCurrentChampion.addChild(footCurrentChampionText, 2);

  // 冠亚军和 赋值
  for (var i = 0; i < 3; i++) {
    var GYH = cc.Sprite.create("img/ball_orange.png");
    GYH.setPosition(210 + i * 80, 47);
    var GYHTEXT;
    switch (i) {
      case 0 :
        GYHTEXT = options.sorts[0] + options.sorts[1];
        break;
      case 1 :
        GYHTEXT = (options.sorts[0] + options.sorts[1]) % 2 == 0 ? '双' : '单';
        break;
      case 2 :
        GYHTEXT = options.sorts[0] + options.sorts[1] > 10 ? '大' : '小';
        break;
      default:
        ;
    }
    var GYHTEXTNODE = cc.LabelTTF.create(GYHTEXT, 'arial', 28, cc.size(68, 68), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    GYHTEXTNODE.setPosition(34, 34);
    GYH.addChild(GYHTEXTNODE, 4);
    footCurrentChampion.addChild(GYH, 3);
  }
  // 1-5龙虎
  var footCurrentLong = cc.Sprite.create("img/foot_bg_3.png");
  footCurrentLong.setPosition(1138, 65);
  footbg.addChild(footCurrentLong, 2);
  var footCurrentLongText = cc.LabelTTF.create('1-5龙虎：', 'arial', 32, cc.size(424, 94), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
  footCurrentLongText.setPosition(232, 47);
  footCurrentLong.addChild(footCurrentLongText, 2);
  // 1-5龙虎 赋值
  for (var i = 0; i < 5; i++) {
    var LONGHU = cc.Sprite.create("img/ball_orange.png");
    LONGHU.setPosition(210 + i * 80, 47);
    var LONGHUTEXT;
    switch (i) {
      case 0 :
        LONGHUTEXT = options.sorts[0] > options.sorts[9] ? '龙' : '虎';
        break;
      case 1 :
        LONGHUTEXT = options.sorts[1] > options.sorts[8] ? '龙' : '虎';
        break;
      case 2 :
        LONGHUTEXT = options.sorts[2] > options.sorts[7] ? '龙' : '虎';
        break;
      case 3 :
        LONGHUTEXT = options.sorts[3] > options.sorts[6] ? '龙' : '虎';
        break;
      case 4 :
        LONGHUTEXT = options.sorts[4] > options.sorts[5] ? '龙' : '虎';
        break;
      default:
        ;
    }
    var LONGHUTEXTNODE = cc.LabelTTF.create(LONGHUTEXT, 'arial', 30, cc.size(68, 68), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    LONGHUTEXTNODE.setPosition(34, 34);
    LONGHU.addChild(LONGHUTEXTNODE, 4);
    footCurrentLong.addChild(LONGHU, 3);
  }
};

// 动画初始化
window.onload = function () {
  cc.game.onStart = function () {

    // 设置自适应 width height
    cc.view.setDesignResolutionSize(1440, 960, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    // 第一个场景
    var startLayer = cc.Layer.extend({
      ctor: function () {
        this._super();
        var size = cc.director.getWinSize();

        // 添加顶部背景图
        var headbg = cc.Sprite.create("img/head_bg.png");
        headbg.setPosition(size.width / 2, size.height - 60);
        this.addChild(headbg, 0);
        //this.setAnchorPoint()

        // 添加 LOGO
        var logoPK10 = cc.Sprite.create("img/logo.png");
        logoPK10.setPosition(205, 900);
        this.addChild(logoPK10, 1);

        // 添加中间背景图
        var runwrap = cc.Layer.create();
        this.addChild(runwrap, 0);
        // 风景墙
        var initBg = cc.Sprite.create("img/scenery_new.jpg");
        initBg.setPosition(size.width / 2 - 1280, 770);
        runwrap.addChild(initBg, 1);
        // 跑道
        var road = cc.Sprite.create("img/road.jpg");
        road.setPosition(size.width / 2 - 340, 420);
        runwrap.addChild(road, 1);
        // 起点线
        var startLine = cc.Sprite.create("img/finishline.png");
        startLine.setPosition(size.width / 2 + 450, 425);
        runwrap.addChild(startLine, 1);
        // 红灯
        var light = cc.Sprite.create("img/trafficlight.png");
        light.setPosition(size.width / 2, size.height / 2 - 60);
        runwrap.addChild(light, 1);
        // 赛车
        var cars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var carsSize = function (n, type) {
          var sizeH = [44, 44, 47, 47, 50, 53, 59, 59, 66, 66],
            sizeW = [0, 0, 3, 3, 0, 0, 3, 5, 10, 16],
            count = 0;
          if (type == 'h') {
            for (var hk = 0; hk < n; hk++) {
              count += sizeH[hk] - 2;
            }
          } else {
            var wks = 0;
            for (var wk = 0; wk < n; wk++) {
              wks += 10;
            }
            count = sizeW[n] + wks;
          }
          return count;
        }
        for (var i = 1; i <= 10; i++) {
          cars[i] = cc.Sprite.create("img/car/car" + i + ".png");
          cars[i].setPosition(size.width / 2 + 630 - carsSize(i - 1, 'w'), 710 - carsSize(i, 'h'));
          cars[i]._setWidth(160);
          cars[i]._setHeight(44);
          runwrap.addChild(cars[i], 2)
        }
        // 添加上期信息
        showPrevPeriod(this, {
          period: 901123,
          sorts: [5, 6, 4, 3, 9, 8, 7, 2, 1, 10]
        });
        // 场景结束
        return true;
      }
    });
    var startScene = cc.Scene.extend({
      onEnter: function () {
        this._super();
        var layer = new startLayer();
        this.addChild(layer);
      }
    });

    // 第二个场景
    var secondLayer = cc.Layer.extend({
      ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        // 添加 顶部背景图
        var headbg = cc.Sprite.create("img/woman.jpg");
        headbg.setPosition(size.width / 2, size.height - 60);
        this.addChild(headbg, 0);
        return true;
      }
    });
    var secondScene = cc.Scene.extend({
      onEnter: function () {
        this._super();
        var layer = new secondLayer();
        this.addChild(layer);
      }
    });

    // 预加载完后播放
    cc.LoaderScene.preload(null, function () {
      cc.director.runScene(new startScene());
    }, this);
  };

  // 煊染至画布
  cc.game.run("gameCanvas");

};
