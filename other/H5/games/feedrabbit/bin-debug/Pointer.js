var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pointer = (function (_super) {
    __extends(Pointer, _super);
    function Pointer() {
        var _this = _super.call(this) || this;
        _this.mode = 0;
        _this.direction = 0; //旋转方向指示，默认为0，逆时针
        _this.createPointer();
        return _this;
    }
    //load the image and do some settings
    Pointer.prototype.createPointer = function () {
        this.pointer = this.createBitmapByName("arrow_png");
        var round = this.createBitmapByName("round_png");
        round.anchorOffsetX = 0;
        round.anchorOffsetY = round.height * .5;
        this.anchorOffsetX = this.pointer.width * .5;
        this.anchorOffsetY = round.height * .5;
        this.pointer.anchorOffsetX = this.pointer.width;
        this.pointer.anchorOffsetY = this.pointer.height * .5;
        round.x = 0 - this.pointer.width - 10;
        this.addChild(this.pointer);
        this.addChild(round);
        this.$setWidth(this.pointer.width);
        this.$setHeight(round.height);
        this.addEventListener(egret.Event.ENTER_FRAME, this.changeRotation, this);
    };
    //make the pointer rotating, set the mode 0
    Pointer.prototype.run = function () {
        this.mode = 0;
    };
    Pointer.prototype.changeRotation = function (evt) {
        if (this.mode == 0) {
            if (this.pointer.rotation == 70) {
                this.pointer.rotation -= Pointer.STEP_ROT;
                this.direction = 0;
            }
            else if (this.pointer.rotation == -70) {
                this.pointer.rotation += Pointer.STEP_ROT;
                this.direction = 1;
            }
            else {
                if (this.direction) {
                    this.pointer.rotation += Pointer.STEP_ROT;
                }
                else {
                    this.pointer.rotation -= Pointer.STEP_ROT;
                }
            }
            this.angle = this.pointer.rotation;
            // console.log("the pointer rotation now is "+ this.angle);
            return false;
        }
        else {
            this.angle = this.pointer.rotation;
            console.log("the pointer rotation now is " + this.angle);
            return false;
        }
    };
    //stop the pointer,set the mode 1
    Pointer.prototype.stop = function () {
        this.mode = 1;
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    Pointer.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Pointer;
}(egret.DisplayObjectContainer));
Pointer.STEP_ROT = 1;
__reflect(Pointer.prototype, "Pointer");
//# sourceMappingURL=Pointer.js.map