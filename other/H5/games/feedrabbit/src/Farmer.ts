// TypeScript file
/**
 * the farmer object
 */
class Farmer extends egret.DisplayObjectContainer
{
    //farmer resource name
     private imagename:string;

     //the initial point of the farmer
     private initialPoint:egret.Point;

     //the farmland object
     private farmland:Farmland;

     //use to play different actions 
     private armature:dragonBones.EgretArmatureDisplay;

     //get the shade of the farmer
     public shade:egret.DisplayObject;

     public constructor(imagename:string,loc:egret.Point,farmland:Farmland) {
        super();
        this.imagename = imagename;
        this.initialPoint = loc;
        this.farmland = farmland;

        this.set();
    }

    //load the farmer
    private set()
    {
       
         this.armature = this.loadDrangonBone();
         
      /*
         this.anchorOffsetX = this.armature.width*.5;
         this.anchorOffsetY = this.armature.height*.5;

         this.width = this.armature.width;
         this.height = this.armature.height;
        */
        //add armaturet to this container 
        this.addChild(this.armature);
        console.log("the width of the farmer is "+ this.width);

      
    }
    /**
     * load the drangon bones return a armature
     * 
     */
    private loadDrangonBone():dragonBones.EgretArmatureDisplay{

        //load resources
        let dragonbonesData = RES.getRes( "Ubbie_ske_json" );  
        let textureData = RES.getRes( "Ubbie_tex_json" );  
        let texture = RES.getRes( "Ubbie_tex_png" );

        //build EgretFactory
        var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();  
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));  
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));

        var armature: dragonBones.EgretArmatureDisplay = dragonbonesFactory.buildArmatureDisplay("ubbie");
        
        var shade  = armature.$children;
       
        let width = shade[0].width;
        let height = shade[0].height;
        console.log("the size of the shade is:"+new egret.Point(width,height).toString());

        this.shade = shade[0];

        armature.scaleX = armature.scaleY = 0.2; //set scale
        
        armature.anchorOffsetX = armature.width*.2*.5;
        armature.anchorOffsetY = armature.height*.2;

        return armature;
    }
    /**
     * run to the next Point if not hit something in the farmland
     * @param angle is direction
     * @param step stands for the speed of the farmer forhead
     */
    public run()
    {
       this.armature.animation.play("walk",0);
    }
    
    /**
     * back to the initial point 
     * @param 
    */
    public stand()
    {
        this.armature.animation.play("stand",0);
    }
    public back(time:number)
    {
        this.armature.animation.play("walk2",0);
    }
    /**
     * dig something form the farmland
     */
    public dig()
    {
         this.armature.animation.play("stand",0);
    }
     /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.
     * As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
     /**
     *  遍历所有菜园里的可采集物品，判断是否与当前farmer产生碰撞，是返回1，否返回0
     * @param ids is the object's id collection
     * @return true or false
     */
    private isHitSomething(ids: number[]):boolean
    {
        let flag:boolean = false;
        //添加遍历检测代码
        if(flag)
        {
            return true;
        }
        else 
        {
             return false;
        }
    }
}