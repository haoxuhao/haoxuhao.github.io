//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        //each step of moving
        _this.Step = 15;
        //each time of moving one step
        _this.TimeSlice = 100;
        //set the defult back time
        _this.DefaultBackTime = 1000;
        //the scores sum
        _this.sum = 0;
        _this.Time_Game = Constants.Time_Game; //the time of game 1
        //the round now 
        _this.round = 1;
        _this.target_score = Constants.TargetScore_Round1;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    };
    //show the introduction ui
    Main.prototype.showStartingUI = function () {
        var _this = this;
        this.startingUI = new StartingUI();
        this.stage.addChild(this.startingUI);
        this.startingUI.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.createGameScene();
        }, this);
    };
    Main.prototype.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.showStartingUI();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        //remove the startingUI and start the main scene
        this.stage.removeChild(this.startingUI);
        this.grass = this.createBitmapByName("bkg_png");
        this.addChild(this.grass);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.grass.width = stageW;
        this.grass.height = stageH;
        var point = new egret.Point(this.grass.width * .2, 50);
        console.log(point.toString());
        this.farmland = new Farmland();
        this.farmland.x = point.x;
        this.farmland.y = point.y;
        this.addChild(this.farmland);
        console.log("the location of the farmland is " + this.farmland.localToGlobal().toString());
        //add some thing to the farmland
        //add a luobo into the verified location 
        this.constants = new Constants();
        var articles = [new Article("carrot_png", 1.2), new Article("carrot_png", 1.5),
            new Article("dandelion_png", 2), new Article("stone2_png", 0.3),
            new Article("soil_png", 0.6), new Article("cabbage_png", 1)];
        var locs = [new egret.Point(0 + 30, 0 + 30), new egret.Point(30, this.farmland.height - 30),
            new egret.Point(this.farmland.width, 0), new egret.Point(this.farmland.width * .5, this.farmland.height * .5),
            new egret.Point(this.farmland.width, this.farmland.height), new egret.Point(200, 200)];
        this.setFarmland(this.constants.Article_Round1, Constants.Locations_Round1);
        this.initialPoint = new egret.Point(stageW * .809 - 50, stageH * 0.5 + 50);
        this.farmer = new Farmer("farmer_png", this.initialPoint, this.farmland);
        this.farmer.x = this.initialPoint.x;
        this.farmer.y = this.initialPoint.y;
        this.farmer.stand();
        this.addChild(this.farmer);
        this.pointer = new Pointer();
        this.pointer.x = this.initialPoint.x - 30;
        this.pointer.y = this.initialPoint.y;
        this.addChild(this.pointer);
        this.pointer.run();
        console.log("the angle is 195.5 and cos and sin are " + Math.cos(195.5) + " sin is " + Math.sin(195.5));
        this.grass.touchEnabled = true;
        this.grass.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            //坐标转换，将指针的转角对应于指示方向.并转换为弧度制
            _this.angle = ((180 - _this.pointer.angle) / 180.0) * Math.PI;
            console.log("the angle now is " + _this.angle);
            _this.pointer.stop();
            _this.moveFarmer();
            //alert("catch one");
            // this.pointer.run();
        }, this);
        // this.filters = [new egret.BlurFilter(1,1)];
        /*------------------------------------------------------------------*/
        this.textField_Sum = new egret.TextField;
        this.setTextForm(this.textField_Sum, 800 + 250, 590);
        this.addChild(this.textField_Sum);
        this.timeShow = new egret.TextField;
        this.setTextForm(this.timeShow, 500, 10);
        this.addChild(this.timeShow);
        this.roundShow = new egret.TextField;
        this.setTextForm(this.roundShow, 1000, 10);
        this.addChild(this.roundShow);
        this.textField_Message = new egret.TextField;
        this.setTextForm(this.textField_Message, 800, 600);
        this.addChild(this.textField_Message);
        this.showMessage();
        this.showScore();
        this.showRound();
        this.transitionPlay(0);
        this.mutiShow();
        //
        this.target_TextField = new egret.TextField();
        this.addChild(this.target_TextField);
        this.target_TextField.text;
        this.target_TextField.size = Constants.size_targetscore; /* private _txInfo:egret.TextField; */
        this.target_TextField.x = Constants.location_targetscore.x;
        this.target_TextField.y = Constants.location_targetscore.y;
        this.target_TextField.textAlign = egret.HorizontalAlign.LEFT;
        this.target_TextField.textColor = 0x000000;
        this.target_TextField.type = egret.TextFieldType.DYNAMIC;
        this.target_TextField.lineSpacing = 6;
        this.target_TextField.multiline = true;
        this.showTargetScore();
        /*---------------------------set timer---------------------------------------*/
        this.setTimer();
        /*----------------------------some euis-------------------------*/
        this.tip = new Transition();
        this.tip.x = this.width * .3;
        this.tip.y = this.height * .3;
        this.addChild(this.tip);
        /*--------------------------------the rubbit------------------*/
        this.rabbit = new Rabbit();
        this.rabbit.x = Constants.Point_Rubbit.x;
        this.rabbit.y = Constants.Point_Rubbit.y;
        this.rabbit.anchorOffsetX = this.rabbit.width * .5;
        this.rabbit.anchorOffsetY = this.rabbit.height * .5;
        this.rabbit.stand();
        this.addChild(this.rabbit);
        /*----------------------------worm----------------------*/
        this.worm = new Worm();
        this.worm.visible = false;
        this.worm.x = Constants.Point_Worm_Start.x;
        this.worm.y = Constants.Point_Worm_Start.y;
        //  this.addChild(this.worm);
        // this.showWorm();
        /*----------------------------progress bar------------*/
        this.progress_bar = new eui.ProgressBar();
        this.progress_bar.width = 200;
        this.progress_bar.height = 11;
        this.progress_bar.maximum = Constants.Time_Game;
        this.progress_bar.minimum = 0;
        this.addChild(this.progress_bar);
        this.progress_bar.x = Constants.loc_progress_bar.x;
        this.progress_bar.y = Constants.loc_progress_bar.y;
        this.progress_bar.value = Constants.Time_Game;
        /*-----------rabbit eat--------------------------------*/
        this.loadEatRabbit();
        this.setEnd();
    };
    Main.prototype.loadEatRabbit = function () {
        //load resources
        var dragonbonesData = RES.getRes("rabbit_eat_ske_json");
        var textureData = RES.getRes("rabbit_eat_tex_json");
        var texture = RES.getRes("rabbit_eat_tex_png");
        //build EgretFactory
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        var armature = dragonbonesFactory.buildArmatureDisplay("rabbit_eat");
        armature.scaleX = armature.scaleY = Constants.Scale_Rabbit_End; //set scale
        armature.anchorOffsetX = armature.width * .2 * .5;
        armature.anchorOffsetY = armature.height * .2;
        this.rabbit_eat = armature;
        this.rabbit_eat.visible = false;
        this.rabbit_eat.x = Constants.Point_Rabbit_End.x;
        this.rabbit_eat.y = Constants.Point_Rabbit_End.y;
        this.addChild(this.rabbit_eat);
    };
    Main.prototype.setTextForm = function (textField, x, y) {
        textField.size = 32; /* private _txInfo:egret.TextField; */
        textField.x = x;
        textField.y = y;
        textField.textAlign = egret.HorizontalAlign.LEFT;
        textField.textColor = 0xff0000;
        textField.type = egret.TextFieldType.DYNAMIC;
        textField.lineSpacing = 6;
        textField.multiline = true;
    };
    //print the location of the DisplayObject
    Main.prototype.printTheLocation = function (element) {
        console.log("( " + element.x + ", " + element.y + " )");
    };
    //move the farmer to the point 
    Main.prototype.moveTo = function (farmer, point, time) {
        var tw = egret.Tween.get(farmer);
        tw.to({ x: point.x, y: point.y }, time);
        return tw;
    };
    //根据angle的值和预先设定的移动规则，移动farmer
    Main.prototype.moveFarmer = function () {
        var _this = this;
        //每次移动之前取消触摸事件，返回原点后回复
        this.grass.touchEnabled = false;
        this.pointer.stop();
        //判断当前位置小人是否与物品相接触 
        var targetIndex;
        //获取当前farmland里的所有articles
        var targets = this.farmland.$children;
        //获取到所有的目标的坐标
        var targetsPoints = this.getAllTheArticlesAnchor(this.farmland);
        this.farmer.run();
        var moveNext = function () {
            var loc = _this.farmer.localToGlobal();
            var x = loc.x + _this.Step * Math.cos(_this.angle);
            var y = loc.y - _this.Step * Math.sin(_this.angle);
            var next = new egret.Point(x, y);
            console.log("the location now is " + loc.toString());
            console.log("the next point is " + next.toString());
            console.log("the angle is " + _this.angle);
            var tw = _this.moveTo(_this.farmer, next, _this.TimeSlice);
            targetIndex = _this.isHitSomething(_this.farmer, targetsPoints);
            //不是-1，进行操作
            if (targetIndex >= 0) {
                _this.farmer.dig();
                //执行下一步操作，删除当前的目标，返回原点
                console.log("the target's loc is " + targetIndex);
                var target = (_this.farmland.getChildAt(targetIndex));
                var backTime = target.backTime;
                _this.farmer.back(backTime);
                _this.sum += target.score;
                _this.farmland.removeChild(target);
                //back to the initial point 
                _this.moveTo(_this.farmer, _this.initialPoint, backTime).call(function () {
                    _this.pointer.run();
                    _this.showScore();
                    _this.farmer.stand();
                }).wait(100).call(function () { _this.grass.touchEnabled = true; });
            }
            else if (_this.isOutOfFarmland(_this.farmer)) {
                _this.farmer.back(_this.DefaultBackTime);
                _this.moveTo(_this.farmer, _this.initialPoint, _this.DefaultBackTime).call(function () {
                    _this.farmer.stand();
                    _this.pointer.run();
                }).wait(100).call(function () {
                    if (_this.Time_Game == 0) {
                        _this.grass.touchEnabled = false;
                    }
                    else
                        _this.grass.touchEnabled = true;
                });
            }
            else if (_this.Time_Game == 0) {
                _this.farmer.back(_this.DefaultBackTime);
                _this.moveTo(_this.farmer, _this.initialPoint, _this.DefaultBackTime).call(function () {
                    _this.farmer.stand();
                    _this.pointer.run();
                }).wait(100).call(function () { _this.grass.touchEnabled = false; });
            }
            else {
                tw.call(moveNext);
            }
        };
        moveNext();
    };
    Main.prototype.setEnd = function () {
        this.end_show = this.createBitmapByName("end_png");
        this.end_show.anchorOffsetX = this.end_show.width * .5;
        this.end_show.anchorOffsetY = this.end_show.height * .8;
        this.end_show.x = Constants.Point_Congratuations.x;
        this.end_show.y = Constants.Point_Congratuations.y;
        this.end_show.visible = false;
        this.addChild(this.end_show);
    };
    Main.prototype.showEnd = function () {
        var _this = this;
        this.grass.touchEnabled = false;
        //指针停止，计时器停止
        this.pointer.stop();
        this.timer.stop();
        this.end_show.visible = true;
        var tw = egret.Tween.get(this.end_show);
        tw.call(function () {
            _this.end_show.scaleX = _this.end_show.scaleY = Constants.Scale_Congratuations * 2;
        }).wait(300).call(function () {
            _this.end_show.scaleX = _this.end_show.scaleY = Constants.Scale_Congratuations;
        });
        this.rabbit_eat.visible = true;
        this.rabbit_eat.animation.play("eat", 0);
        return tw;
    };
    Main.prototype.closeEndShow = function () {
        this.end_show.visible = false;
        this.rabbit_eat.visible = false;
    };
    //show the Worm
    Main.prototype.showWorm = function () {
        var tw;
        tw = egret.Tween.get(this.worm, { loop: true });
        this.worm.visible = true;
        tw.to({ x: Constants.Point_Worm_End.x, y: Constants.Point_Worm_End.y * 0.5 }, Constants.Time_Worm).
            wait(300).to({ x: Constants.Point_Worm_End.x, y: Constants.Point_Worm_End.y }, Constants.Time_Worm).wait(300).
            to({ x: Constants.Point_Worm_Start.x, y: Constants.Point_Worm_End.y * 0.5 }, Constants.Time_Worm).wait(300).
            to({ x: Constants.Point_Worm_Start.x, y: Constants.Point_Worm_Start.y }, Constants.Time_Worm).wait(300);
    };
    //通关的过场动画显示
    Main.prototype.transitionPlay = function (roundNow) {
        var _this = this;
        var tw;
        // let im1 = this.createBitmapByName("Round1_png");
        switch (roundNow) {
            case 0:
                var im1_1 = this.createBitmapByName("Round1_png");
                im1_1.visible = false;
                im1_1.x = this.width * .35;
                im1_1.y = 10;
                this.addChild(im1_1);
                tw = egret.Tween.get(im1_1);
                tw.to({ x: Constants.Point_Round.x, y: Constants.Point_Round.y * .5 }, Constants.Time_Tween * .5).call(function () {
                    im1_1.visible = true;
                }).to({ x: Constants.Point_Round.x, y: Constants.Point_Round.y }, Constants.Time_Tween * .5).call(function () {
                    im1_1.scaleX = im1_1.scaleY = Constants.Scale_Round;
                }).wait(500).to({ x: Constants.Point_Final.x * .5, y: Constants.Point_Final.y * .5 }, Constants.Time_Tween * .5).call(function () {
                    im1_1.scaleX = im1_1.scaleY = Constants.Scale_Final;
                }).wait(100).to({ x: Constants.Point_Final.x, y: Constants.Point_Final.y }, Constants.Time_Tween * .5);
                break;
            case 1:
                var im2_1 = this.createBitmapByName("Round2_png");
                im2_1.visible = false;
                im2_1.x = this.width * .35;
                im2_1.y = 10;
                this.addChild(im2_1);
                tw = egret.Tween.get(im2_1);
                tw.to({ x: Constants.Point_Round.x, y: Constants.Point_Round.y * .5 }, Constants.Time_Tween * .5).call(function () {
                    im2_1.visible = true;
                }).to({ x: Constants.Point_Round.x, y: Constants.Point_Round.y }, Constants.Time_Tween * .5).call(function () {
                    im2_1.scaleX = im2_1.scaleY = Constants.Scale_Round;
                }).wait(500).to({ x: Constants.Point_Final.x * .5, y: Constants.Point_Final.y * .5 }, Constants.Time_Tween * .5).call(function () {
                    im2_1.scaleX = im2_1.scaleY = Constants.Scale_Final;
                }).wait(100).to({ x: Constants.Point_Final.x, y: Constants.Point_Final.y }, Constants.Time_Tween * .5);
                break;
            case 2:
                var im3_1 = this.createBitmapByName("Round3_png");
                im3_1.visible = false;
                im3_1.x = this.width * .35;
                im3_1.y = 10;
                this.addChild(im3_1);
                tw = egret.Tween.get(im3_1);
                tw.to({ x: Constants.Point_Round.x, y: Constants.Point_Round.y * .5 }, Constants.Time_Tween * .5).call(function () {
                    im3_1.visible = true;
                }).to({ x: Constants.Point_Round.x, y: Constants.Point_Round.y }, Constants.Time_Tween * .5).call(function () {
                    im3_1.scaleX = im3_1.scaleY = Constants.Scale_Round;
                }).wait(500).to({ x: Constants.Point_Final.x * .5, y: Constants.Point_Final.y * .5 }, Constants.Time_Tween * .5).call(function () {
                    im3_1.scaleX = im3_1.scaleY = Constants.Scale_Final;
                }).wait(100).to({ x: Constants.Point_Final.x, y: Constants.Point_Final.y }, Constants.Time_Tween * .5);
                break;
            case 3:
                var im4_1 = this.createBitmapByName("Round4_png");
                im4_1.visible = false;
                im4_1.x = this.width * .35;
                im4_1.y = 10;
                this.addChild(im4_1);
                tw = egret.Tween.get(im4_1);
                tw.to({ x: Constants.Point_Round.x, y: Constants.Point_Round.y * .5 }, Constants.Time_Tween * .5).call(function () {
                    im4_1.visible = true;
                }).to({ x: Constants.Point_Round.x, y: Constants.Point_Round.y }, Constants.Time_Tween * .5).call(function () {
                    im4_1.scaleX = im4_1.scaleY = Constants.Scale_Round;
                }).wait(500).to({ x: Constants.Point_Final.x * .5, y: Constants.Point_Final.y * .5 }, Constants.Time_Tween * .5).call(function () {
                    im4_1.scaleX = im4_1.scaleY = Constants.Scale_Final;
                }).wait(100).to({ x: Constants.Point_Final.x, y: Constants.Point_Final.y }, Constants.Time_Tween * .5);
                break;
            case 4:
                //加入更加亮眼的动画
                tw = this.showEnd();
                tw.wait(Constants.Time_Stay).call(function () {
                    _this.closeEndShow();
                    _this.round = 0;
                    _this.sum = 0;
                    _this.Time_Game = Constants.Time_Game;
                    _this.isPassed = true;
                    _this.update();
                    /*
                    this.pointer.run();
                    this.timer.start();
                    this.grass.touchEnabled = true;
                    this.showTime();
                    this.showScore();
                    */
                });
                break;
            default:
                break;
        }
        return tw;
    };
    //放回初始位置,返回时间决定了返回的快慢
    Main.prototype.backToInitialPoint = function (farmer, time) {
    };
    //get the near points
    Main.prototype.getTheNearPoints = function (point) {
        var points = [];
        var size_width = Constants.Size_Block;
        var size_height = 50;
        for (var i = 0; i < size_width; i++) {
            for (var j = 0; j < size_height; j++) {
                points[j + size_width * i] = new egret.Point(point.x + i - size_width * .5, point.y + j - size_height * .5);
            }
        }
        return points;
    };
    //获取所有farmland中article全局坐标，返回点集
    Main.prototype.getAllTheArticlesAnchor = function (farmland) {
        //get all the children in farmland every time
        var children = farmland.$children;
        var targets = [];
        for (var i = 0; i < children.length; i++) {
            targets[i] = children[i].localToGlobal(); //获取article的全局坐标放入数组，供碰撞检测遍历
        }
        return targets;
    };
    /**
     * 判断当前位置小人时候出了农场的边界，如果出了则返回1，否则返回0.
     */
    Main.prototype.isOutOfFarmland = function (farmer) {
        //获取农场的长宽
        var farmW = this.farmland.width;
        var farmH = this.farmland.height;
        //获取农场和农民的全局位置坐标
        var anchorOfFarmland = this.farmland.localToGlobal();
        var anchorOfFarmer = farmer.localToGlobal();
        //向左走，最后要改为向右的情况
        var leftEdge = anchorOfFarmland.x + farmer.width * .2;
        var upEdge = anchorOfFarmland.y + farmer.height * .7;
        var downEdge = anchorOfFarmland.y + farmH + farmer.height * .5;
        console.log("the width of farmer is " + farmer.width);
        console.log("the height of farmer is " + farmer.height);
        console.log("the lefEdge is " + leftEdge);
        console.log("the upEdge is " + upEdge);
        console.log("the downEdge is " + downEdge);
        console.log("the anchor of the farmer is " + anchorOfFarmer.toString());
        if (anchorOfFarmer.x < leftEdge) {
            return true;
        }
        else if (anchorOfFarmer.y < upEdge) {
            return true;
        }
        else if (anchorOfFarmer.y > downEdge) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 判断当前位置小人是否与物品相接触，如果接触返回1，如果不接触返回0,并且返回找到的target's index
     * @param farmer
     * @param targets is anchor points of articles is farmland
     * @param target is the finded target's index or -1 if not found
    */
    Main.prototype.isHitSomething = function (farmer, targets) {
        var temp = -1;
        for (var i = 0; i < targets.length; i++) {
            if (this.isHitOnePoint(this.farmer, targets[i])) {
                temp = i;
                break;
            }
        }
        return temp;
    };
    Main.prototype.isHitOnePoint = function (farmer, point) {
        var nearPoints = this.getTheNearPoints(point);
        for (var i = 0; i < nearPoints.length; i++) {
            if (farmer.shade.hitTestPoint(nearPoints[i].x, nearPoints[i].y)) {
                return true;
            }
            else {
                continue;
            }
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /*---------------------------------退出游戏---------------------------------*/
    Main.prototype.quit = function () {
    };
    /*-------------------------------田园物品更新模块-----------------------------*/
    /**
     * 数据更新赢了输出提示信息自动进入下一局，反之输出失败信息回到第一局
     */
    Main.prototype.update = function () {
        var _this = this;
        if (this.isPassed) {
            this.grass.touchEnabled = false;
            //指针停止，计时器停止
            this.pointer.stop();
            this.timer.stop();
            this.transitionPlay(this.round).call(function () {
                _this.pointer.run();
                _this.timer.start();
                _this.grass.touchEnabled = true;
                //更新农场
                switch (_this.round) {
                    case 1:
                        _this.setFarmland(_this.constants.Article_Round2, Constants.Locations_Round2);
                        _this.target_score = Constants.TargetScore_Round2;
                        break;
                    case 2:
                        _this.setFarmland(_this.constants.Article_Round3, Constants.Locations_Round3);
                        _this.target_score = Constants.TargetScore_Round3;
                        break;
                    case 3:
                        _this.setFarmland(_this.constants.Article_Round4, Constants.Locations_Round4);
                        _this.target_score = Constants.TargetScore_Round4;
                        break;
                    case 4:
                        _this.setFarmland(_this.constants.Article_Round1, Constants.Locations_Round1);
                        _this.target_score = Constants.TargetScore_Round1;
                        break;
                    default:
                        break;
                }
                _this.round++;
                _this.Time_Game = Constants.Time_Game;
                _this.showTargetScore();
                _this.showTime();
                _this.showRound();
                _this.showScore();
            });
        }
        else {
            //输出提示信息，提示用户失败了从新回到第一局
            this.tip.showTips(this.isPassed, this.round);
            //设置不接受触摸事件
            this.grass.touchEnabled = false;
            //指针停止，计时器停止
            this.pointer.stop();
            this.timer.stop();
            //监听提示框的按钮，按钮按下
            this.tip.panel_tip.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //重置所有信息
                _this.round = 1;
                _this.sum = 0;
                _this.setFarmland(_this.constants.Article_Round1, Constants.Locations_Round1);
                _this.grass.touchEnabled = true;
                _this.Time_Game = Constants.Time_Game;
                _this.target_score = Constants.TargetScore_Round1;
                _this.timer.start();
                _this.showTime();
                _this.showScore();
                _this.showRound();
                _this.pointer.run();
                _this.showTargetScore();
                _this.transitionPlay(0);
                /*
                let im1 = this.createBitmapByName("Round1_png");
                im1.x = Constants.Point_Final.x;
                im1.y = Constants.Point_Final.y;
                im1.scaleX = im1.scaleY = Constants.Scale_Final;
                this.addChild(im1);
                */
            }, this);
        }
    };
    //famland 数据更新操作
    Main.prototype.setFarmland = function (articles, locations) {
        //将剩余的articles清除
        var childrenLeft = this.farmland.$children;
        console.log("the children left is " + childrenLeft.length);
        /*
        for(var i = 1;i < childrenLeft.length;i++)
        {
            this.farmland.removeChild(childrenLeft[i]);
        }
        */
        this.farmland.removeChildren();
        //添加新的articles
        for (var i = 0; i < articles.length; i++) {
            this.farmland.add(articles[i], locations[i]);
        }
    };
    //判断是否胜利
    Main.prototype.isWin = function () {
        switch (this.round) {
            case 1:
                this.sum -= Constants.TargetScore_Round1;
                break;
            case 2:
                this.sum -= Constants.TargetScore_Round2;
                break;
            case 3:
                this.sum -= Constants.TargetScore_Round3;
                break;
            case 4:
                this.sum -= Constants.TargetScore_Round4;
                break;
            default:
                break;
        }
        if (this.sum >= 0)
            return true;
        else
            return false;
    };
    /*---------------------显示信息更新模块-----------------------------------------*/
    /**
     * display the scores and other message
     */
    Main.prototype.showScore = function () {
        this.textField_Sum.text = this.sum.toString();
    };
    Main.prototype.showTargetScore = function () {
        this.target_TextField.text = "Target " + "\n" + this.target_score.toString();
    };
    Main.prototype.mutiShow = function () {
        var text1 = new egret.TextField();
        var text2 = new egret.TextField();
        var text3 = new egret.TextField();
        var text4 = new egret.TextField();
        this.setTextForm1(text1);
        this.setTextForm1(text2);
        this.setTextForm1(text3);
        this.setTextForm1(text4);
        text1.x = 770;
        text1.y = 590;
        text2.x = 840;
        text2.y = 590;
        text3.x = 900;
        text3.y = 590;
        text4.x = 970;
        text4.y = 590;
        text1.text = "15";
        text2.text = "25";
        text3.text = "40";
        text4.text = "50";
        this.addChild(text1);
        this.addChild(text2);
        this.addChild(text3);
        this.addChild(text4);
    };
    Main.prototype.setTextForm1 = function (text) {
        text.textAlign = egret.HorizontalAlign.LEFT;
        text.textColor = 0xff0000;
        text.type = egret.TextFieldType.DYNAMIC;
        text.lineSpacing = 6;
        text.multiline = true;
    };
    Main.prototype.showRound = function () {
        // this.roundShow.text = "Round: " + this.round;
    };
    Main.prototype.showMessage = function () {
        //this.textField_Message.text = "is win or not ? :" +this.isPassed;
    };
    Main.prototype.showTime = function () {
        //this.timeShow.text = "Time: "+ this.Time_Game;
        this.progress_bar.value = this.Time_Game;
    };
    Main.prototype.timeFunction = function () {
        this.Time_Game--;
        this.showTime();
        if (this.Time_Game == 0) {
            this.isPassed = this.isWin();
            this.showMessage();
            this.update();
        }
    };
    Main.prototype.setTimer = function () {
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timeFunction, this);
        this.timer.start();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map