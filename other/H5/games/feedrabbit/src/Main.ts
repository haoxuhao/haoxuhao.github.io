//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    //each step of moving
    private Step:number = 15;
    //each time of moving one step
    private TimeSlice:number = 100;
    //set the defult back time
    private DefaultBackTime:number = 1000;
    //the farm farmland
    private farmland:Farmland;
    //the grass
    private grass:egret.Bitmap;

    //the initial point 
    private initialPoint:egret.Point;
    //the angle
    private angle:number;
    //the Pointer
    private pointer:Pointer;
    //the farmer
    private farmer:Farmer;
    
    //the rubbit 
    private rabbit:Rabbit;
    //the worm
    private worm:Worm;

    //the scores of each articles
    private socres:number[];
    //the scores sum
    private sum: number = 0;

    //used to display the sum of sores
    private textField_Sum: egret.TextField;
    //used to display the the socre of each articles
    private textField_Article: egret.TextField;
    private textField_Message:egret.TextField;

    //the timer of this game
    private timer:egret.Timer;
    private timeShow:egret.TextField;
    private Time_Game:number = Constants.Time_Game; //the time of game 1

    //the round now 
    private round:number = 1;
    private roundShow:egret.TextField;
    //Constants
    private constants:Constants;
    private isPassed:boolean;

    //tip
    private tip:Transition;
    //progress bar
    private progress_bar:eui.ProgressBar;
    
    private rabbit_eat:dragonBones.EgretArmatureDisplay;
    private end_show:egret.Bitmap;
    private target_score:number = Constants.TargetScore_Round1;
    private target_TextField:egret.TextField;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

         //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {

        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }

    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    
    private startingUI:StartingUI;
    //show the introduction ui
    private showStartingUI(){
        this.startingUI = new StartingUI();
        this.stage.addChild(this.startingUI);
        this.startingUI.button.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
              this.createGameScene();
            },this);
    }
    private createScene(){
        
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){

            this.showStartingUI();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        //remove the startingUI and start the main scene
        this.stage.removeChild(this.startingUI);

        this.grass = this.createBitmapByName("bkg_png");
        this.addChild(this.grass);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        this.grass.width = stageW;
        this.grass.height = stageH;
        
        let point:egret.Point = new egret.Point(this.grass.width*.2,50);
     
        console.log(point.toString());
        this.farmland= new Farmland();
        this.farmland.x = point.x;
        this.farmland.y = point.y;
        this.addChild(this.farmland);

        console.log("the location of the farmland is "+ this.farmland.localToGlobal().toString());

      //add some thing to the farmland
      //add a luobo into the verified location 
      this.constants = new Constants();

      let articles:Article[] = [new Article("carrot_png",1.2),new Article("carrot_png",1.5),
                                new Article("dandelion_png",2),new Article("stone2_png",0.3),
                                new Article("soil_png",0.6),new Article("cabbage_png",1)];
      let locs:egret.Point[] = [new egret.Point(0+30,0+30),new egret.Point(30,this.farmland.height-30),
                                new egret.Point(this.farmland.width,0),new egret.Point(this.farmland.width*.5,this.farmland.height*.5),
                                new egret.Point(this.farmland.width,this.farmland.height),new egret.Point(200,200)];

     
      this.setFarmland(this.constants.Article_Round1,Constants.Locations_Round1);

      this.initialPoint = new egret.Point(stageW*.809-50,stageH*0.5+50);
      this.farmer = new Farmer("farmer_png",this.initialPoint,this.farmland);
      this.farmer.x = this.initialPoint.x;
      this. farmer.y = this.initialPoint.y;
      this. farmer.stand();

      this.addChild(this.farmer);

      this.pointer = new Pointer();
      this.pointer.x = this.initialPoint.x-30;
      this.pointer.y = this.initialPoint.y;
      this.addChild(this.pointer);
      
      this.pointer.run();
      console.log("the angle is 195.5 and cos and sin are "+ Math.cos(195.5)+ " sin is "+ Math.sin(195.5));
      this.grass.touchEnabled = true;

      this.grass.addEventListener( egret.TouchEvent.TOUCH_TAP, ( evt:egret.TouchEvent )=>{

            //坐标转换，将指针的转角对应于指示方向.并转换为弧度制
            this.angle = ((180 - this.pointer.angle)/180.0)*Math.PI;

            console.log("the angle now is "+ this.angle);
            this.pointer.stop();
            this.moveFarmer();

            //alert("catch one");

           // this.pointer.run();
        }, this );

       // this.filters = [new egret.BlurFilter(1,1)];
       
        /*------------------------------------------------------------------*/
       this.textField_Sum = new egret.TextField;
       this.setTextForm(this.textField_Sum,800+250,590);
       this.addChild(this.textField_Sum);

       this.timeShow = new egret.TextField;
       this.setTextForm(this.timeShow,500,10);
       this.addChild(this.timeShow);

       this.roundShow = new egret.TextField;
       this.setTextForm(this.roundShow,1000,10);
       this.addChild(this.roundShow);

       this.textField_Message = new egret.TextField;
       this.setTextForm(this.textField_Message,800,600);
       this.addChild(this.textField_Message);

       this.showMessage();
       this.showScore();
       this.showRound();

        this.transitionPlay(0);
        this.mutiShow();
//
        this.target_TextField = new egret.TextField();
        this.addChild(this.target_TextField);
        this.target_TextField.text
        this.target_TextField.size = Constants.size_targetscore;  /* private _txInfo:egret.TextField; */
        this.target_TextField.x = Constants.location_targetscore.x;
        this.target_TextField.y = Constants.location_targetscore.y;

        this.target_TextField.textAlign = egret.HorizontalAlign.LEFT;
        this.target_TextField.textColor = 0x000000;
        this.target_TextField.type = egret.TextFieldType.DYNAMIC;
        this.target_TextField.lineSpacing = 6;
        this.target_TextField.multiline = true;
        this.showTargetScore();
     

       /*---------------------------set timer---------------------------------------*/
       this.setTimer();

       /*----------------------------some euis-------------------------*/

       this.tip = new Transition();
       this.tip.x = this.width*.3;
       this.tip.y = this.height*.3;
       this.addChild(this.tip);

       /*--------------------------------the rubbit------------------*/
       this.rabbit = new Rabbit();
       
       this.rabbit.x = Constants.Point_Rubbit.x;
       this.rabbit.y = Constants.Point_Rubbit.y;
       this.rabbit.anchorOffsetX = this.rabbit.width*.5;
       this.rabbit.anchorOffsetY = this.rabbit.height*.5;
       this.rabbit.stand();
       this.addChild(this.rabbit);

       /*----------------------------worm----------------------*/
       this.worm = new Worm();
       this.worm.visible = false;
       this.worm.x = Constants.Point_Worm_Start.x;
       this.worm.y = Constants.Point_Worm_Start.y;
     //  this.addChild(this.worm);
      // this.showWorm();

      /*----------------------------progress bar------------*/
      this.progress_bar = new eui.ProgressBar();
      this.progress_bar.width = 200;
      this.progress_bar.height = 11;
      this.progress_bar.maximum = Constants.Time_Game;
      this.progress_bar.minimum = 0;
      this.addChild(this.progress_bar);
      this.progress_bar.x = Constants.loc_progress_bar.x;
      this.progress_bar.y = Constants.loc_progress_bar.y;
      this.progress_bar.value = Constants.Time_Game;

      /*-----------rabbit eat--------------------------------*/
      this.loadEatRabbit();
      this.setEnd();


    }
     private loadEatRabbit()
    {
          //load resources
        let dragonbonesData = RES.getRes( "rabbit_eat_ske_json" );  
        let textureData = RES.getRes( "rabbit_eat_tex_json" );  
        let texture = RES.getRes( "rabbit_eat_tex_png" );

        //build EgretFactory
        var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();  
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));  
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));

        var armature: dragonBones.EgretArmatureDisplay = dragonbonesFactory.buildArmatureDisplay("rabbit_eat");

        armature.scaleX = armature.scaleY = Constants.Scale_Rabbit_End; //set scale
        
        armature.anchorOffsetX = armature.width*.2*.5;
        armature.anchorOffsetY = armature.height*.2;
        this.rabbit_eat = armature;
        this.rabbit_eat.visible = false;
        this.rabbit_eat.x = Constants.Point_Rabbit_End.x;
        this.rabbit_eat.y = Constants.Point_Rabbit_End.y;
        this.addChild(this.rabbit_eat);
    }

    private setTextForm(textField:egret.TextField,x:number,y:number)
    {
        textField.size = 32;  /* private _txInfo:egret.TextField; */
        textField.x = x;
        textField.y = y;
        textField.textAlign = egret.HorizontalAlign.LEFT;
        textField.textColor = 0xff0000;
        textField.type = egret.TextFieldType.DYNAMIC;
        textField.lineSpacing = 6;
        textField.multiline = true;
    }
    //print the location of the DisplayObject
    private printTheLocation(element:egret.DisplayObject)
    {
        console.log("( "+element.x+", "+element.y+" )");
    }

    //move the farmer to the point 
    private moveTo(farmer:Farmer,point:egret.Point,time:number):egret.Tween
    {
         let tw = egret.Tween.get(farmer);
         tw.to({x:point.x,y:point.y},time);
         return tw;
    }

    //根据angle的值和预先设定的移动规则，移动farmer
    private moveFarmer()
    {
        //每次移动之前取消触摸事件，返回原点后回复
        this.grass.touchEnabled = false;
        this.pointer.stop();

        //判断当前位置小人是否与物品相接触 
        let targetIndex:number;
        //获取当前farmland里的所有articles
        let targets = this.farmland.$children;

        //获取到所有的目标的坐标
        let targetsPoints = this.getAllTheArticlesAnchor(this.farmland);
        
        this.farmer.run();

        let moveNext = ()=>{

                let loc = this.farmer.localToGlobal();
                let x = loc.x + this.Step*Math.cos(this.angle);
                let y = loc.y - this.Step*Math.sin(this.angle);
                let next = new egret.Point(x,y);
                console.log("the location now is "+ loc.toString());
                console.log("the next point is "+next.toString());
                console.log("the angle is "+ this.angle);
                
                let tw = this.moveTo(this.farmer,next,this.TimeSlice);

                targetIndex = this.isHitSomething(this.farmer,targetsPoints);

                //不是-1，进行操作
                if(targetIndex >= 0)
                {
                    this.farmer.dig();
                    //执行下一步操作，删除当前的目标，返回原点
                    console.log("the target's loc is "+ targetIndex);

                    let target =  <Article>(this.farmland.getChildAt(targetIndex));
                    
                    let backTime = target.backTime;

                    this.farmer.back(backTime);

                    this.sum+=target.score;

                    this.farmland.removeChild(target);
                   
                    //back to the initial point 
                    this.moveTo(this.farmer,this.initialPoint,backTime).call(()=>{

                        this.pointer.run();
                        this.showScore();
                        this.farmer.stand();

                    }).wait(100).call(()=>{this.grass.touchEnabled = true});
                    //calculate the scores 
                  

                }
                else if(this.isOutOfFarmland(this.farmer))
                {
                    this.farmer.back(this.DefaultBackTime);
                    this.moveTo(this.farmer,this.initialPoint,this.DefaultBackTime).call(()=>{

                        this.farmer.stand();
                        this.pointer.run();
                    
                        }).wait(100).call(()=>{

                            if(this.Time_Game == 0)
                            {
                                this.grass.touchEnabled = false;
                            }
                            else
                                 this.grass.touchEnabled = true;

                        });
                }
                else if(this.Time_Game == 0)
                {
                    this.farmer.back(this.DefaultBackTime);
                    this.moveTo(this.farmer,this.initialPoint,this.DefaultBackTime).call(()=>{

                        this.farmer.stand();
                        this.pointer.run();
                    
                        }).wait(100).call(()=>{this.grass.touchEnabled = false});

                }
                else{
                     tw.call(moveNext);
                }
        }
       
        moveNext();

    }
    private setEnd()
    {
         this.end_show = this.createBitmapByName("end_png");
         this.end_show.anchorOffsetX =  this.end_show.width*.5;
         this.end_show.anchorOffsetY =  this.end_show.height*.8;
         this.end_show.x = Constants.Point_Congratuations.x;
         this.end_show.y = Constants.Point_Congratuations.y;
         this.end_show.visible = false;
         this.addChild(this.end_show);
    }
    private showEnd():egret.Tween
    {
        this.grass.touchEnabled = false;
             //指针停止，计时器停止
        this.pointer.stop();
        this.timer.stop();

        this.end_show.visible = true;
        let tw =  egret.Tween.get(this.end_show);
        tw.call(()=>{
            this.end_show.scaleX = this.end_show.scaleY = Constants.Scale_Congratuations*2;
        }).wait(300).call(()=>{
            this.end_show.scaleX = this.end_show.scaleY = Constants.Scale_Congratuations;
        });
        this.rabbit_eat.visible = true;
        this.rabbit_eat.animation.play("eat",0);

        return tw;
    }
    private closeEndShow()
    {
        this.end_show.visible = false;
        this.rabbit_eat.visible = false;
    }
    //show the Worm
    private showWorm()
    {
         let tw:egret.Tween;
         tw = egret.Tween.get(this.worm,{loop:true});
         this.worm.visible = true;
         tw.to({x:Constants.Point_Worm_End.x,y:Constants.Point_Worm_End.y*0.5},Constants.Time_Worm).
         wait(300).to({x:Constants.Point_Worm_End.x,y:Constants.Point_Worm_End.y},Constants.Time_Worm).wait(300). 
         to({x:Constants.Point_Worm_Start.x,y:Constants.Point_Worm_End.y*0.5},Constants.Time_Worm).wait(300). 
         to({x:Constants.Point_Worm_Start.x,y:Constants.Point_Worm_Start.y},Constants.Time_Worm).wait(300);
    }
    //通关的过场动画显示
    private transitionPlay(roundNow:number):egret.Tween
    {
         let tw:egret.Tween;
        // let im1 = this.createBitmapByName("Round1_png");
        
        switch(roundNow)
        {
            case 0:
                let im1 = this.createBitmapByName("Round1_png");
                im1.visible = false;
                im1.x = this.width*.35;
                im1.y = 10;
                this.addChild(im1);
                tw = egret.Tween.get(im1);
                tw.to({x:Constants.Point_Round.x,y:Constants.Point_Round.y*.5},Constants.Time_Tween*.5).call(()=>{

                            im1.visible = true;
                        }
                ).to({x:Constants.Point_Round.x,y:Constants.Point_Round.y},Constants.Time_Tween*.5).call(()=>{
                    im1.scaleX = im1.scaleY = Constants.Scale_Round;
                }).wait(500).to({x:Constants.Point_Final.x*.5,y:Constants.Point_Final.y*.5},Constants.Time_Tween*.5).call(()=>{
                    im1.scaleX = im1.scaleY = Constants.Scale_Final;
                }).wait(100).to({x:Constants.Point_Final.x,y:Constants.Point_Final.y},Constants.Time_Tween*.5);
                break;
            case 1:

                let im2 = this.createBitmapByName("Round2_png");
                im2.visible = false;
                im2.x = this.width*.35;
                im2.y = 10;
                this.addChild(im2);
                tw = egret.Tween.get(im2);
                tw.to({x:Constants.Point_Round.x,y:Constants.Point_Round.y*.5},Constants.Time_Tween*.5).call(()=>{

                            im2.visible = true;
                        }
                ).to({x:Constants.Point_Round.x,y:Constants.Point_Round.y},Constants.Time_Tween*.5).call(()=>{
                    im2.scaleX = im2.scaleY = Constants.Scale_Round;
                }).wait(500).to({x:Constants.Point_Final.x*.5,y:Constants.Point_Final.y*.5},Constants.Time_Tween*.5).call(()=>{
                    im2.scaleX = im2.scaleY = Constants.Scale_Final;
                }).wait(100).to({x:Constants.Point_Final.x,y:Constants.Point_Final.y},Constants.Time_Tween*.5);
                break;
            case 2:
                
                let im3 = this.createBitmapByName("Round3_png");
                im3.visible = false;
                im3.x = this.width*.35;
                im3.y = 10;
                this.addChild(im3);
                tw = egret.Tween.get(im3);
                tw.to({x:Constants.Point_Round.x,y:Constants.Point_Round.y*.5},Constants.Time_Tween*.5).call(()=>{

                            im3.visible = true;
                        }
                ).to({x:Constants.Point_Round.x,y:Constants.Point_Round.y},Constants.Time_Tween*.5).call(()=>{
                    im3.scaleX = im3.scaleY = Constants.Scale_Round;
                }).wait(500).to({x:Constants.Point_Final.x*.5,y:Constants.Point_Final.y*.5},Constants.Time_Tween*.5).call(()=>{
                    im3.scaleX = im3.scaleY = Constants.Scale_Final;
                }).wait(100).to({x:Constants.Point_Final.x,y:Constants.Point_Final.y},Constants.Time_Tween*.5);
                break;
            case 3:
                
                let im4 = this.createBitmapByName("Round4_png");
                im4.visible = false;
                im4.x = this.width*.35;
                im4.y = 10;
                this.addChild(im4);
                tw = egret.Tween.get(im4);
                tw.to({x:Constants.Point_Round.x,y:Constants.Point_Round.y*.5},Constants.Time_Tween*.5).call(()=>{

                            im4.visible = true;
                        }
                ).to({x:Constants.Point_Round.x,y:Constants.Point_Round.y},Constants.Time_Tween*.5).call(()=>{
                    im4.scaleX = im4.scaleY = Constants.Scale_Round;
                }).wait(500).to({x:Constants.Point_Final.x*.5,y:Constants.Point_Final.y*.5},Constants.Time_Tween*.5).call(()=>{
                    im4.scaleX = im4.scaleY = Constants.Scale_Final;
                }).wait(100).to({x:Constants.Point_Final.x,y:Constants.Point_Final.y},Constants.Time_Tween*.5);
                break;

            case 4:
                //加入更加亮眼的动画
                tw = this.showEnd();
                tw.wait(Constants.Time_Stay).call(()=>{
                    this.closeEndShow();
                    this.round = 0;
                    this.sum = 0;
                  
                    this.Time_Game = Constants.Time_Game;
                    this.isPassed = true;
                    this.update();
                    /*
                    this.pointer.run();
                    this.timer.start();
                    this.grass.touchEnabled = true;
                    this.showTime();
                    this.showScore();
                    */
                })
                break;
            default:
                break;
        }
        return tw;
    }
    //放回初始位置,返回时间决定了返回的快慢
    private backToInitialPoint(farmer:Farmer, time:number)
    {

    }
    //get the near points
    private getTheNearPoints(point:egret.Point):egret.Point[]
    {
        let points:egret.Point[] = [];
        let size_width = Constants.Size_Block;
        let size_height = 50;
        for(var i = 0;i<size_width;i++)
        {
            for(var j = 0;j<size_height;j++)
            {
                points[j + size_width*i] = new egret.Point(point.x + i - size_width*.5,point.y + j - size_height*.5);
            }
        }
        return points;
    }
    //获取所有farmland中article全局坐标，返回点集
    private getAllTheArticlesAnchor(farmland:Farmland):egret.Point[]
    {
        //get all the children in farmland every time
        let children = farmland.$children;
        let targets:egret.Point[] = [];

        for(let i:number = 0; i < children.length;i++)
        {
            targets[i] = children[i].localToGlobal(); //获取article的全局坐标放入数组，供碰撞检测遍历
        }

        return targets;
    }
    /**
     * 判断当前位置小人时候出了农场的边界，如果出了则返回1，否则返回0.
     */
    private isOutOfFarmland(farmer:Farmer):boolean
    {
        //获取农场的长宽
        let farmW = this.farmland.width;
        let farmH = this.farmland.height;

        //获取农场和农民的全局位置坐标
        let anchorOfFarmland = this.farmland.localToGlobal();
        let anchorOfFarmer = farmer.localToGlobal();

        //向左走，最后要改为向右的情况
        let leftEdge = anchorOfFarmland.x + farmer.width*.2;
        let upEdge = anchorOfFarmland.y + farmer.height*.7;
        let downEdge = anchorOfFarmland.y + farmH + farmer.height*.5;
       
       console.log("the width of farmer is "+ farmer.width);
       console.log("the height of farmer is "+ farmer.height);

       console.log("the lefEdge is "+ leftEdge);
       console.log("the upEdge is "+ upEdge);
       console.log("the downEdge is "+ downEdge);

       console.log("the anchor of the farmer is "+anchorOfFarmer.toString());

        if(anchorOfFarmer.x < leftEdge)
        {
            return true;
        }
        else if(anchorOfFarmer.y < upEdge)
        {
            return true;
        }
        else if(anchorOfFarmer.y > downEdge)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
    /**
     * 判断当前位置小人是否与物品相接触，如果接触返回1，如果不接触返回0,并且返回找到的target's index
     * @param farmer 
     * @param targets is anchor points of articles is farmland
     * @param target is the finded target's index or -1 if not found
    */
    private isHitSomething(farmer:Farmer,targets:egret.Point[]):number
    {
        let temp:number = -1;

        for(let i:number = 0; i<targets.length;i++)
        {
            if(this.isHitOnePoint(this.farmer,targets[i]))
            {
                temp = i;
                break;
            }
        }
        return temp;
    }
    private isHitOnePoint(farmer:Farmer,point:egret.Point):boolean
    {
        let nearPoints = this.getTheNearPoints(point);
        for(var i = 0;i<nearPoints.length;i++)
        {
            if(farmer.shade.hitTestPoint(nearPoints[i].x,nearPoints[i].y))
            {
                return true;
            }
            else{
                continue;
            }
        }
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
/*---------------------------------退出游戏---------------------------------*/
    private quit()
    {
        
    }
/*-------------------------------田园物品更新模块-----------------------------*/
    /**
     * 数据更新赢了输出提示信息自动进入下一局，反之输出失败信息回到第一局
     */
    private update()
    {
        if(this.isPassed)
        {
            this.grass.touchEnabled = false;
             //指针停止，计时器停止
            this.pointer.stop();
            this.timer.stop();
            this.transitionPlay(this.round).call(()=>{

                this.pointer.run();
                this.timer.start();
                this.grass.touchEnabled = true;
                //更新农场
                switch(this.round)
                 {
                    case 1:
                        this.setFarmland(this.constants.Article_Round2,Constants.Locations_Round2);
                        this.target_score = Constants.TargetScore_Round2;
                        break;
                    case 2:
                        this.setFarmland(this.constants.Article_Round3,Constants.Locations_Round3);
                        this.target_score = Constants.TargetScore_Round3;
                        
                        break;
                    case 3:
                        this.setFarmland(this.constants.Article_Round4,Constants.Locations_Round4);
                        this.target_score = Constants.TargetScore_Round4;
                        break;
                    case 4:
                        this.setFarmland(this.constants.Article_Round1,Constants.Locations_Round1);
                        this.target_score = Constants.TargetScore_Round1;
                        break;
                    default:
                        break;
                 }
                  this.round++;
                  this.Time_Game = Constants.Time_Game;
                  this.showTargetScore();
                  this.showTime();
                  this.showRound();
                  this.showScore();
            });

        }
        else{
             //输出提示信息，提示用户失败了从新回到第一局
             this.tip.showTips(this.isPassed,this.round);
             //设置不接受触摸事件
             this.grass.touchEnabled = false;
             //指针停止，计时器停止
             this.pointer.stop();
             this.timer.stop();
             //监听提示框的按钮，按钮按下
             this.tip.panel_tip.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{

            //重置所有信息
             this.round = 1;
             this.sum = 0;
             this.setFarmland(this.constants.Article_Round1,Constants.Locations_Round1);
             this.grass.touchEnabled = true;
             this.Time_Game = Constants.Time_Game;
             this.target_score = Constants.TargetScore_Round1;
             this.timer.start();
             this.showTime();
             this.showScore();
             this.showRound();
             this.pointer.run();
             this.showTargetScore();
             this.transitionPlay(0);
             /*
             let im1 = this.createBitmapByName("Round1_png");
             im1.x = Constants.Point_Final.x;
             im1.y = Constants.Point_Final.y;
             im1.scaleX = im1.scaleY = Constants.Scale_Final;
             this.addChild(im1);
             */
            },this);
           
        }
    }
    
    //famland 数据更新操作
    private setFarmland(articles:Article[],locations:egret.Point[])
    {
        //将剩余的articles清除
        let childrenLeft = this.farmland.$children;
        console.log("the children left is "+ childrenLeft.length);
        /*
        for(var i = 1;i < childrenLeft.length;i++)
        {
            this.farmland.removeChild(childrenLeft[i]);
        }
        */
        this.farmland.removeChildren();
        //添加新的articles
        for(var i:number = 0;i<articles.length;i++)
        {
            this.farmland.add(articles[i],locations[i]);
        }
    }

    //判断是否胜利
    private isWin():boolean
    {
        switch(this.round)
        {
            case 1:
               this.sum -= Constants.TargetScore_Round1;
               break;
            case 2:
               this.sum -= Constants.TargetScore_Round2;
               break;
            case 3:
               this.sum -= Constants.TargetScore_Round3;
               break;
            case 4:
                this.sum -= Constants.TargetScore_Round4;
               break;
            default:
                break;       
        }

        if(this.sum >= 0)
            return true;
        else
            return false;

    }
/*---------------------显示信息更新模块-----------------------------------------*/
    /**
     * display the scores and other message
     */
    private showScore()
    {
        this.textField_Sum.text = this.sum.toString();
    }
    private showTargetScore()
    {
        this.target_TextField.text = "Target "+ "\n"+ this.target_score.toString();
    }
    private mutiShow(){
        let text1 = new egret.TextField();
        let text2 = new egret.TextField();
        let text3 = new egret.TextField();
        let text4 = new egret.TextField();
        this.setTextForm1(text1);
        this.setTextForm1(text2);
        this.setTextForm1(text3);
        this.setTextForm1(text4);

        text1.x = 770;
        text1.y = 590;

        text2.x = 840;
        text2.y = 590;

        text3.x = 900;
        text3.y = 590;

        text4.x = 970;
        text4.y = 590;

        text1.text = "15";
        text2.text = "25";
        text3.text = "40";
        text4.text = "50";

        this.addChild(text1);
        this.addChild(text2);
        this.addChild(text3);
        this.addChild(text4);
    }
    private setTextForm1(text:egret.TextField)
    {
        text.textAlign = egret.HorizontalAlign.LEFT;
        text.textColor = 0xff0000;
        text.type = egret.TextFieldType.DYNAMIC;
        text.lineSpacing = 6;
        text.multiline = true;
    }
    private showRound()
    {
        // this.roundShow.text = "Round: " + this.round;
    }
    private showMessage()
    {
        //this.textField_Message.text = "is win or not ? :" +this.isPassed;
    }
    private showTime()
    {
        //this.timeShow.text = "Time: "+ this.Time_Game;
        this.progress_bar.value = this.Time_Game;
    }
    private timeFunction()
    {
        this.Time_Game--;
        this.showTime();
        if(this.Time_Game == 0)
        {
            this.isPassed = this.isWin();
            
            this.showMessage();

            this.update();

        }
    }
    private setTimer()
    {
        this.timer = new egret.Timer(1000, 0);

        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timeFunction, this);
        
        this.timer.start();
    }

}


