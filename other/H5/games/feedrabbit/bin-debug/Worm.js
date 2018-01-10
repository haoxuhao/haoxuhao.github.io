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
var Worm = (function (_super) {
    __extends(Worm, _super);
    function Worm() {
        var _this = _super.call(this) || this;
        _this.set();
        return _this;
    }
    //load the farmer
    Worm.prototype.set = function () {
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
    Worm.prototype.loadDrangonBone = function () {
        //load resources
        var dragonbonesData = RES.getRes("Worm_ske_json");
        var textureData = RES.getRes("Worm_tex_json");
        var texture = RES.getRes("Worm_tex_png");
        //build EgretFactory
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        var armature = dragonbonesFactory.buildArmatureDisplay("worm");
        armature.scaleX = armature.scaleY = Constants.Scale_Worm; //set scale
        armature.anchorOffsetX = armature.width * .2 * .5;
        armature.anchorOffsetY = armature.height * .2;
        return armature;
    };
    Worm.prototype.run = function () {
        this.armature.animation.play("bone", 0);
    };
    Worm.prototype.stop = function () {
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.
    * As for the property of name please refer to the configuration file of resources/resource.json.
    */
    Worm.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Worm;
}(egret.DisplayObjectContainer));
__reflect(Worm.prototype, "Worm");
//# sourceMappingURL=Worm.js.map