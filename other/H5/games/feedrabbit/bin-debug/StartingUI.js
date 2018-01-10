var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StartingUI = (function (_super) {
    __extends(StartingUI, _super);
    function StartingUI() {
        var _this = _super.call(this) || this;
        _this.loadBg();
        return _this;
    }
    StartingUI.prototype.loadBg = function () {
        var bg = this.createBitmapByName("start_png");
        this.addChild(bg);
        this.setButton();
        this.playConversation();
    };
    StartingUI.prototype.playConversation = function () {
        var _this = this;
        var im1 = this.createBitmapByName("Yuan1_png");
        var im2 = this.createBitmapByName("Bei1_png");
        var im3 = this.createBitmapByName("Yuan2_png");
        var im4 = this.createBitmapByName("Bei2_png");
        var im5 = this.createBitmapByName("Yuan3_png");
        var im6 = this.createBitmapByName("Yuan4_png");
        var im7 = this.createBitmapByName("Bei3_png");
        var im8 = this.createBitmapByName("Yuan5_png");
        im1.visible = false;
        im2.visible = false;
        im3.visible = false;
        im4.visible = false;
        im5.visible = false;
        im6.visible = false;
        im7.visible = false;
        im8.visible = false;
        this.setLocation(im1, Constants.point_farmer_s);
        this.setLocation(im2, Constants.point_rabbit_s);
        this.setLocation(im3, Constants.point_farmer_s);
        this.setLocation(im4, Constants.point_rabbit_s);
        this.setLocation(im5, Constants.point_farmer_s);
        this.setLocation(im6, Constants.point_rabbit_s);
        this.setLocation(im7, Constants.point_farmer_s);
        this.setLocation(im8, Constants.point_rabbit_s);
        var tw = egret.Tween.get(im1);
        tw.wait(300).call(function () { im1.visible = true; }).
            wait(Constants.Time_Conversation * .5).call(function () {
            im1.visible = false;
            im2.visible = true;
        }).wait(Constants.Time_Conversation).call(function () {
            im2.visible = false;
            im3.visible = true;
        }).wait(Constants.Time_Conversation).call(function () {
            im3.visible = false;
            im4.visible = true;
        }).wait(Constants.Time_Conversation).call(function () {
            im4.visible = false;
            im5.visible = true;
        }).wait(Constants.Time_Conversation).call(function () {
            im5.visible = false;
            im6.visible = true;
        }).wait(Constants.Time_Conversation).call(function () {
            im6.visible = false;
            im7.visible = true;
        }).wait(Constants.Time_Conversation).call(function () {
            im8.visible = true;
        }).call(function () {
            _this.button.visible = true;
        });
    };
    StartingUI.prototype.setLocation = function (im, loc) {
        im.anchorOffsetX = im.width * .5;
        im.anchorOffsetY = im.height * .5;
        im.x = loc.x;
        im.y = loc.y;
        this.addChild(im);
    };
    StartingUI.prototype.setButton = function () {
        this.button = new eui.Button;
        this.button.skinName = "resource/eui_skins/ButtonSkin.exml";
        this.button.name = Constants.btn_play;
        this.button.label = Constants.btn_play;
        this.button.x = this.width * 0.5;
        this.button.y = this.height * .9;
        this.button.anchorOffsetX = this.button.width * 0.5;
        this.button.anchorOffsetY = this.button.height * .8;
        this.addChild(this.button);
        this.button.visible = false;
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    StartingUI.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return StartingUI;
}(egret.DisplayObjectContainer));
__reflect(StartingUI.prototype, "StartingUI");
//# sourceMappingURL=StartingUI.js.map