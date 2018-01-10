var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Article 是所有物品的类，通过引入不同的资源名字type可以得到不同的物品，size
 * 确定了物品的大小
 */
var Article = (function (_super) {
    __extends(Article, _super);
    function Article(type, size) {
        var _this = _super.call(this) || this;
        //create the default time of this Article
        _this.DefaultTime = 1000;
        _this.type = type;
        _this.size = size;
        _this.createArticle();
        return _this;
    }
    Article.prototype.createArticle = function () {
        var article = this.createBitmapByName(this.type);
        article.scaleX = article.scaleY = this.size;
        //set the container's width and height
        this.$setWidth(article.width);
        this.$setHeight(article.height);
        //set the anchor of the article
        this.anchorOffsetX = article.width * .5;
        this.anchorOffsetY = article.height * .6;
        //set the backTime of the article for return 
        this.backTime = this.createBackTime(this.size);
        //set the value of this article
        this.score = this.calculateScore();
        this.addChild(article);
    };
    /**
     * 是否被清除，是返回true 否返回false
     */
    Article.prototype.isRemoved = function () {
    };
    /**
     * create the back time according to the size of this article
     */
    Article.prototype.createBackTime = function (size) {
        return 1.5 * size * this.DefaultTime;
    };
    /**
     * calculate the score of this article
     */
    Article.prototype.calculateScore = function () {
        return this.getValue() * this.size;
    };
    /**
     * get the value of the particular article
     */
    Article.prototype.getValue = function () {
        var value;
        switch (this.type) {
            case "carrot_png":
                value = 15;
                break;
            case "dandelion_png":
                value = 50;
                break;
            case "cabbage_png":
                value = 25;
                break;
            case "sweetpotato_png":
                value = 40;
                break;
            default:
                value = 0;
                break;
        }
        return value;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Article.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Article;
}(egret.Sprite));
__reflect(Article.prototype, "Article");
//# sourceMappingURL=Article.js.map