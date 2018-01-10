/**
 * the farmland object
 */
class Farmland extends egret.Sprite{

     /**
      * 在框架之上添加一块土地
      *@param loc is the location of this land
     */ 
     public constructor(){
         super();
         this.loadBg();  
    }

    //load the background of the farmland
    private loadBg()
    {
        let width:number = 900;
        let height:number =500;

        this.$setWidth(width);
        this.$setHeight(height);
    }
    
    /**
     * add some thing to it
     * @param obj is adding to the farmland
     * @param loc is the location to add
     * */
    public  add(obj:egret.Sprite,loc:egret.Point)
    {
        obj.anchorOffsetX = obj.width*.5;
        obj.anchorOffsetY = obj.height*.5;
      
        obj.x = loc.x;
        obj.y = loc.y;
        this.addChild(obj);
    }

    /**
     * remove some a obj from the farmland
     */
    public remove()
    {
        
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