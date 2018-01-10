class StartingUI extends egret.DisplayObjectContainer
{
    public button:eui.Button;

    constructor()
    {
        super();
        this.loadBg();
    }

    private loadBg()
    {
        let bg = this.createBitmapByName("start_png");
        this.addChild(bg);
        this.setButton();
        this.playConversation();
    }

    private playConversation()
    {
        let im1 = this.createBitmapByName("Yuan1_png");
        let im2 = this.createBitmapByName("Bei1_png");
        let im3 = this.createBitmapByName("Yuan2_png");
        let im4 = this.createBitmapByName("Bei2_png");
        let im5 = this.createBitmapByName("Yuan3_png");
        let im6 = this.createBitmapByName("Yuan4_png");
        let im7 = this.createBitmapByName("Bei3_png");
        let im8 = this.createBitmapByName("Yuan5_png");

        im1.visible = false;
        im2.visible = false;
        im3.visible = false;
        im4.visible = false;
        im5.visible = false;
        im6.visible = false;
        im7.visible = false;
        im8.visible = false;
        
        this.setLocation(im1,Constants.point_farmer_s);
        this.setLocation(im2,Constants.point_rabbit_s);

        this.setLocation(im3,Constants.point_farmer_s);
        this.setLocation(im4,Constants.point_rabbit_s);

        this.setLocation(im5,Constants.point_farmer_s);
        this.setLocation(im6,Constants.point_rabbit_s);

        this.setLocation(im7,Constants.point_farmer_s);
        this.setLocation(im8,Constants.point_rabbit_s);

        let tw = egret.Tween.get(im1);

        tw.wait(300).call(()=>{im1.visible = true}).
        wait(Constants.Time_Conversation*.5).call(()=>{
            im1.visible = false;
            im2.visible = true;
        }). wait(Constants.Time_Conversation).call(()=>{
            im2.visible = false;
            im3.visible = true;
        }).wait(Constants.Time_Conversation).call(()=>{
            im3.visible = false;
            im4.visible = true;
        }).wait(Constants.Time_Conversation).call(()=>{
            im4.visible = false;
            im5.visible = true;
        }).wait(Constants.Time_Conversation).call(()=>{
            im5.visible = false;
            im6.visible = true;
        }).wait(Constants.Time_Conversation).call(()=>{
            im6.visible = false;
            im7.visible = true;
        }).wait(Constants.Time_Conversation).call(()=>{
            im8.visible = true;
        }).call(()=>{
            this.button.visible = true;
        });
    }
    private setLocation(im:egret.Bitmap,loc:egret.Point)
    {
        im.anchorOffsetX = im.width*.5;
        im.anchorOffsetY = im.height*.5;
        im.x = loc.x;
        im.y = loc.y;
        this.addChild(im);
    }
    private setButton()
    {
        this.button = new eui.Button;
        this.button.skinName ="resource/eui_skins/ButtonSkin.exml";
        this.button.name = Constants.btn_play;
        this.button.label = Constants.btn_play;
        this.button.x = this.width*0.5;
        this.button.y = this.height*.9;
        this.button.anchorOffsetX = this.button.width*0.5;
        this.button.anchorOffsetY = this.button.height*.8;
        this.addChild(this.button);
        this.button.visible = false;
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