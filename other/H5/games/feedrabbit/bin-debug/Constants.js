var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//这个类定义不同关卡下的元素坐标分布，种类分布，时间限制，通过代价（即分数减）
var Constants = (function () {
    function Constants() {
        this.Article_Round1 = [new Article("cabbage_png", Constants.size_round1[0]), new Article("cabbage_png", Constants.size_round1[0]),
            new Article("cabbage_png", Constants.size_round1[0]), new Article("cabbage_png", Constants.size_round1[0]),
            new Article("cabbage_png", Constants.size_round1[0]), new Article("carrot_png", Constants.size_round1[0]),
            new Article("carrot_png", Constants.size_round1[0]), new Article("carrot_png", Constants.size_round1[0]),
            new Article("stone2_png", 1.2), new Article("stone_png", 1.2), new Article("stone_png", 0.8)];
        this.Article_Round2 = [new Article("cabbage_png", Constants.size_round2[0]), new Article("cabbage_png", 1.2),
            new Article("cabbage_png", Constants.size_round2[0]), new Article("cabbage_png", Constants.size_round2[0]),
            new Article("carrot_png", 1.2), new Article("carrot_png", Constants.size_round2[0]),
            new Article("carrot_png", 0.8), new Article("carrot_png", 0.7), new Article("stone2_png", 1.2),
            new Article("stone_png", 1.2), new Article("stone2_png", 1.2), new Article("sweetpotato_png", 1), new Article("stone2_png", 1)];
        this.Article_Round3 = [new Article("dandelion_png", Constants.size_round3[0]), new Article("sweetpotato_png", 1.2),
            new Article("sweetpotato_png", Constants.size_round3[0]), new Article("sweetpotato_png", 0.8),
            new Article("cabbage_png", Constants.size_round3[0]), new Article("cabbage_png", 1.2),
            new Article("cabbage_png", Constants.size_round3[0]), new Article("carrot_png", 0.7),
            new Article("carrot_png", Constants.size_round3[0]), new Article("carrot_png", 0.6), new Article("stone2_png", 1.3),
            new Article("stone_png", 1.2), new Article("stone2_png", 1.2), new Article("stone_png", 1.3)];
        this.Article_Round4 = [new Article("dandelion_png", Constants.size_round4[0]), new Article("dandelion_png", 1.3),
            new Article("dandelion_png", Constants.size_round4[0]), new Article("sweetpotato_png", 1.2),
            new Article("sweetpotato_png", Constants.size_round4[0]), new Article("sweetpotato_png", 0.8),
            new Article("cabbage_png", 0.9), new Article("cabbage_png", 1.2),
            new Article("cabbage_png", Constants.size_round4[0]), new Article("carrot_png", 0.8),
            new Article("carrot_png", Constants.size_round4[0]), new Article("carrot_png", 0.7),
            new Article("stone2_png", 0.7), new Article("stone_png", 1.6), new Article("stone2_png", 1), new Article("stone_png", 1.1),
            new Article("stone2_png", 0.8), new Article("stone_png", 0.6)];
    }
    return Constants;
}());
/*-------------------定义每一局的位置坐标----------------------------*/
Constants.Locations_Round1 = [new egret.Point(80, 150), new egret.Point(80, 300), new egret.Point(200, 200),
    new egret.Point(100, 480), new egret.Point(220, 300), new egret.Point(400, 350),
    new egret.Point(400, 200), new egret.Point(300, 450), new egret.Point(130, 400), new egret.Point(300, 270), new egret.Point(290, 130)];
Constants.Locations_Round2 = [new egret.Point(80, 180), new egret.Point(50, 300), new egret.Point(100, 400),
    new egret.Point(200, 200), new egret.Point(200, 430), new egret.Point(300, 250),
    new egret.Point(400, 150), new egret.Point(400, 350), new egret.Point(350, 400),
    new egret.Point(400, 200), new egret.Point(200, 300), new egret.Point(50, 100), new egret.Point(280, 110)];
Constants.Locations_Round3 = [new egret.Point(80, 100), new egret.Point(140, 240), new egret.Point(80, 420),
    new egret.Point(280, 350), new egret.Point(200, 450), new egret.Point(300, 200),
    new egret.Point(400, 150), new egret.Point(400, 350), new egret.Point(350, 450), new egret.Point(30, 210),
    new egret.Point(400, 250), new egret.Point(200, 300), new egret.Point(50, 320), new egret.Point(200, 100)];
Constants.Locations_Round4 = [new egret.Point(40, 180), new egret.Point(50, 430), new egret.Point(200, 300),
    new egret.Point(160, 150), new egret.Point(320, 280), new egret.Point(150, 450),
    new egret.Point(50, 300), new egret.Point(280, 150), new egret.Point(275, 470),
    new egret.Point(370, 160), new egret.Point(350, 400), new egret.Point(400, 480), new egret.Point(400, 300),
    new egret.Point(240, 370), new egret.Point(125, 365), new egret.Point(70, 100), new egret.Point(240, 100), new egret.Point(235, 215)];
/*------------------定义每一句的物品种类及大小----------------------------*/
Constants.size_round1 = [1, 1, 1, 1];
Constants.size_round2 = [1, .5, .7, .9];
Constants.size_round3 = [1, 1, 1, 1];
Constants.size_round4 = [1, 1, 1, 1];
/*------------------------------------定义每一关的目标分数---------------------------------------*/
Constants.TargetScore_Round1 = 50; //40
Constants.TargetScore_Round2 = 90; //80
Constants.TargetScore_Round3 = 140; //130
Constants.TargetScore_Round4 = 190; //190
/*-----------------------------------定义每一关的时间----------------------------------------*/
Constants.Time_Game = 60;
/*-----------------------------定义一些字符串常量----------------------------*/
Constants.btn_tryagain = "Try Again";
Constants.btn_play = "Play";
Constants.btn_lookback = "Look Back";
Constants.msg_failed = "Failed";
Constants.msg_succeed = "Congratuatios";
/*--------------------------定义总关数----------------------------------*/
Constants.Num_Round = 4;
/*--------------------------定义通关动画显示的坐标点和放大倍数及最后的停留位置,过渡时间-------*/
Constants.Point_Round = new egret.Point(1136 * .3, 640 * .5);
Constants.Scale_Round = 2;
Constants.Scale_Final = 0.7;
Constants.Point_Final = new egret.Point(806, 12);
Constants.Time_Tween = 1000;
/*------------------------定义rubbit的大小安放位置-----------------------------------*/
Constants.Point_Rubbit = new egret.Point(1200, 620);
Constants.Scale_Rubbit = 0.35;
Constants.Scale_Rabbit_End = 1.1;
Constants.Point_Rabbit_End = new egret.Point(500, 700);
/*-----------------------定义worm的循环坐标和循环移动的时间-----------------*/
Constants.Point_Worm_Start = new egret.Point(200, 600);
Constants.Point_Worm_End = new egret.Point(200, 200);
Constants.Scale_Worm = 0.5;
Constants.Time_Worm = 1000;
//block size 
Constants.Size_Block = 50;
//starting ui 
Constants.point_rabbit_s = new egret.Point(530.62, 313.13);
Constants.point_farmer_s = new egret.Point(600, 300);
Constants.Time_Conversation = 2800;
//progress bar
Constants.loc_progress_bar = new egret.Point(930, 320);
//the end point of the congratuations
Constants.Point_Congratuations = new egret.Point(470, 400);
Constants.Scale_Congratuations = 3;
Constants.Time_Stay = 10000;
//target score size and location settings
Constants.location_targetscore = new egret.Point(1053, 20);
Constants.size_targetscore = 28;
__reflect(Constants.prototype, "Constants");
//# sourceMappingURL=Constants.js.map