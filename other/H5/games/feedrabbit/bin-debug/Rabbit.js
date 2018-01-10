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
var Rabbit = (function (_super) {
    __extends(Rabbit, _super);
    function Rabbit() {
        var _this = _super.call(this) || this;
        _this.set();
        return _this;
    }
    //load the farmer
    Rabbit.prototype.set = function () {
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
    Rabbit.prototype.loadDrangonBone = function () {
        //load resources
        var dragonbonesData = RES.getRes("rabbit_ske_json");
        var textureData = RES.getRes("rabbit_tex_json");
        var texture = RES.getRes("rabbit_tex_png");
        //build EgretFactory
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        var armature = dragonbonesFactory.buildArmatureDisplay("rabbit");
        armature.scaleX = armature.scaleY = Constants.Scale_Rubbit; //set scale
        armature.anchorOffsetX = armature.width * .2 * .5;
        armature.anchorOffsetY = armature.height * .2;
        return armature;
    };
    /**
     * rubbit eat something
     */
    Rabbit.prototype.eat = function () {
        this.armature.animation.play("eat", 0);
    };
    /**
     *rubbit eat something
     * @param
    */
    Rabbit.prototype.stand = function () {
        this.armature.animation.play("vib", 0);
    };
    /**
     * rubbit die
     */
    Rabbit.prototype.die = function () {
        this.armature.animation.play("vib", 0);
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.
    * As for the property of name please refer to the configuration file of resources/resource.json.
    */
    Rabbit.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Rabbit;
}(egret.DisplayObjectContainer));
__reflect(Rabbit.prototype, "Rabbit");
//# sourceMappingURL=Rabbit.js.map