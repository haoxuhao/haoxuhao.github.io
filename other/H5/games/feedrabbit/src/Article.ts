/**
 * Article 是所有物品的类，通过引入不同的资源名字type可以得到不同的物品，size
 * 确定了物品的大小
 */
class Article extends egret.Sprite{

    //create the default time of this Article
    private DefaultTime = 1000;
    
    private type:string;
    private size:number;
    public  backTime:number;
    public  score:number;
  
    public constructor(type:string,size:number){
        super();
        this.type = type;
        this.size = size;
        this.createArticle();
    }

    private createArticle(){
        let article = this.createBitmapByName(this.type);
        article.scaleX = article.scaleY = this.size;

        //set the container's width and height
        this.$setWidth(article.width);
        this.$setHeight(article.height);

        //set the anchor of the article
        this.anchorOffsetX = article.width*.5;
        this.anchorOffsetY = article.height*.6;

        //set the backTime of the article for return 
        this.backTime = this.createBackTime(this.size);
        //set the value of this article
        this.score = this.calculateScore();
        
        this.addChild(article);
    }

    /**
     * 是否被清除，是返回true 否返回false
     */
    public isRemoved()
    {
        
    }
    /**
     * create the back time according to the size of this article
     */
    private createBackTime(size:number):number
    {
        return 1.5*size*this.DefaultTime;
    }
    /**
     * calculate the score of this article
     */
    private calculateScore():number
    {
        return this.getValue()*this.size;
    }
    /**
     * get the value of the particular article 
     */
    private getValue():number
    {
        let value:number;
        switch(this.type)
        {
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
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    

}