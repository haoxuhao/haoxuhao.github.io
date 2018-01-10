var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
/**
 * the farmer object
 */
var Farmer = (function (_super) {
    __extends(Farmer, _super);
    function Farmer(imagename, loc, farmland) {
        var _this = _super.call(this) || this;
        _this.imagename = imagename;
        _this.initialPoint = loc;
        _this.farmland = farmland;
        _this.set();
        return _this;
    }
    //load the farmer
    Farmer.prototype.set = function () {
        this.armature = this.loadDrangonBone();
        /*
           this.anchorOffsetX = this.armature.width*.5;
           this.anchorOffsetY = this.armature.height*.5;
  
           this.width = this.armature.width;
           this.height = this.armature.height;
          */
        //add armaturet to this container 
        this.addChild(this.armature);
        console.log("the width of the farmer is " + this.width);
    };
    /**
     * load the drangon bones return a armature
     *
     */
    Farmer.prototype.loadDrangonBone = function () {
        //load resources
        var dragonbonesData = RES.getRes("Ubbie_ske_json");
        var textureData = RES.getRes("Ubbie_tex_json");
        var texture = RES.getRes("Ubbie_tex_png");
        //build EgretFactory
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        var armature = dragonbonesFactory.buildArmatureDisplay("ubbie");
        var shade = armature.$children;
        var width = shade[0].width;
        var height = shade[0].height;
        console.log("the size of the shade is:" + new egret.Point(width, height).toString());
        this.shade = shade[0];
        armature.scaleX = armature.scaleY = 0.2; //set scale
        armature.anchorOffsetX = armature.width * .2 * .5;
        armature.anchorOffsetY = armature.height * .2;
        return armature;
    };
    /**
     * run to the next Point if not hit something in the farmland
     * @param angle is direction
     * @param step stands for the speed of the farmer forhead
     */
    Farmer.prototype.run = function () {
        this.armature.animation.play("walk", 0);
    };
    /**
     * back to the initial point
     * @param
    */
    Farmer.prototype.stand = function () {
        this.armature.animation.play("stand", 0);
    };
    Farmer.prototype.back = function (time) {
        this.armature.animation.play("walk2", 0);
    };
    /**
     * dig something form the farmland
     */
    Farmer.prototype.dig = function () {
        this.armature.animation.play("stand", 0);
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.
    * As for the property of name please refer to the configuration file of resources/resource.json.
    */
    Farmer.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
    *  遍历所有菜园里的可采集物品，判断是否与当前farmer产生碰撞，是返回1，否返回0
    * @param ids is the object's id collection
    * @return true or false
    */
    Farmer.prototype.isHitSomething = function (ids) {
        var flag = false;
        //添加遍历检测代码
        if (flag) {
            return true;
        }
        else {
            return false;
        }
    };
    return Farmer;
}(egret.DisplayObjectContainer));
__reflect(Farmer.prototype, "Farmer");
//# sourceMappingURL=Farmer.js.map