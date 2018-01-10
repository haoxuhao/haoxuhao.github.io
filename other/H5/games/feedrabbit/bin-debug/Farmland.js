var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * the farmland object
 */
var Farmland = (function (_super) {
    __extends(Farmland, _super);
    /**
     * 在框架之上添加一块土地
     *@param loc is the location of this land
    */
    function Farmland() {
        var _this = _super.call(this) || this;
        _this.loadBg();
        return _this;
    }
    //load the background of the farmland
    Farmland.prototype.loadBg = function () {
        var width = 900;
        var height = 500;
        this.$setWidth(width);
        this.$setHeight(height);
    };
    /**
     * add some thing to it
     * @param obj is adding to the farmland
     * @param loc is the location to add
     * */
    Farmland.prototype.add = function (obj, loc) {
        obj.anchorOffsetX = obj.width * .5;
        obj.anchorOffsetY = obj.height * .5;
        obj.x = loc.x;
        obj.y = loc.y;
        this.addChild(obj);
    };
    /**
     * remove some a obj from the farmland
     */
    Farmland.prototype.remove = function () {
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    Farmland.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Farmland;
}(egret.Sprite));
__reflect(Farmland.prototype, "Farmland");
//# sourceMappingURL=Farmland.js.map