// TypeScript file
/**
 * the farmer object
 */
class Rabbit extends egret.DisplayObjectContainer
{    
     //use to play different actions 
     private armature:dragonBones.EgretArmatureDisplay;

     //rabbit eat 
     private rabbit_eat:dragonBones.EgretArmatureDisplay;
     

     public constructor() {
        super();
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
        let dragonbonesData = RES.getRes( "rabbit_ske_json" );  
        let textureData = RES.getRes( "rabbit_tex_json" );  
        let texture = RES.getRes( "rabbit_tex_png" );

        //build EgretFactory
        var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();  
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));  
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));

        var armature: dragonBones.EgretArmatureDisplay = dragonbonesFactory.buildArmatureDisplay("rabbit");

        armature.scaleX = armature.scaleY = Constants.Scale_Rubbit; //set scale
        
        armature.anchorOffsetX = armature.width*.2*.5;
        armature.anchorOffsetY = armature.height*.2;

        return armature;
    }
   
    /**
     * rubbit eat something
     */
    public eat()
    {
       this.armature.animation.play("eat",0);
    }
    
    /**
     *rubbit eat something  
     * @param 
    */
    public stand()
    {
        this.armature.animation.play("vib",0);
    }
    /**
     * rubbit die
     */
    public die()
    {
         this.armature.animation.play("vib",0);
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

}