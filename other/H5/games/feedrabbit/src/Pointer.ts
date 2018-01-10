class Pointer extends egret.DisplayObjectContainer{

    public angle:number; //当前的角度

    private pointer: egret.Bitmap;
    private static STEP_ROT = 1;

    private mode = 0;
    private direction = 0; //旋转方向指示，默认为0，逆时针

    constructor(){
        super()
        this.createPointer();
    }
    
    //load the image and do some settings
    private createPointer()
    {
        this.pointer = this.createBitmapByName("arrow_png");
       
         let round = this.createBitmapByName("round_png");
        round.anchorOffsetX = 0;
        round.anchorOffsetY = round.height*.5;

        this.anchorOffsetX = this.pointer.width*.5;
        this.anchorOffsetY = round.height*.5;
        
        this.pointer.anchorOffsetX = this.pointer.width;
        this.pointer.anchorOffsetY = this.pointer.height*.5;

        round.x = 0 - this.pointer.width-10;
        
        this.addChild(this.pointer);
        this.addChild(round);
      

        this.$setWidth(this.pointer.width);
        this.$setHeight(round.height);

        this.addEventListener( egret.Event.ENTER_FRAME, this.changeRotation, this );

    }

    //make the pointer rotating, set the mode 0
    public run()
    {
        this.mode = 0;
    }

    private changeRotation(evt:egret.Event)
    {
         if(this.mode == 0)
         {
             if(this.pointer.rotation == 70)
             {
                 this.pointer.rotation -= Pointer.STEP_ROT;
                 this.direction = 0;
             }
             else if(this.pointer.rotation == -70)
             {
                 this.pointer.rotation += Pointer.STEP_ROT;
                 this.direction = 1;
             }
             else{
                 if(this.direction)
                 {
                      this.pointer.rotation += Pointer.STEP_ROT;
                 }
                 else{
                      this.pointer.rotation -= Pointer.STEP_ROT;
                 }
             }
            
             this.angle =  this.pointer.rotation;
            // console.log("the pointer rotation now is "+ this.angle);
             return false;  
         }
         else{
             
             this.angle =  this.pointer.rotation;
             console.log("the pointer rotation now is "+ this.angle);
             return false;  
         }
         
    }

    //stop the pointer,set the mode 1
    public stop()
    {   
        this.mode = 1;
        
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