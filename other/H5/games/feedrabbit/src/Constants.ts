
//这个类定义不同关卡下的元素坐标分布，种类分布，时间限制，通过代价（即分数减）
class Constants {

    /*-------------------定义每一局的位置坐标----------------------------*/
     public static Locations_Round1:egret.Point[] = [new egret.Point(80,150),new egret.Point(80,300),new egret.Point(200,200),
                                          new egret.Point(100,480),new egret.Point(220,300),new egret.Point(400,350),
                                          new egret.Point(400,200),new egret.Point(300,450),new egret.Point(130,400),new egret.Point(300,270),new egret.Point(290,130)];

     public static Locations_Round2:egret.Point[] = [new egret.Point(80,180),new egret.Point(50,300),new egret.Point(100,400),
                                          new egret.Point(200,200),new egret.Point(200,430),new egret.Point(300,250),
                                          new egret.Point(400,150),new egret.Point(400,350),new egret.Point(350,400),
                                          new egret.Point(400,200),new egret.Point(200,300),new egret.Point(50,100),new egret.Point(280,110)];

     public static Locations_Round3:egret.Point[] = [new egret.Point(80,100),new egret.Point(140,240),new egret.Point(80,420),
                                          new egret.Point(280,350),new egret.Point(200,450),new egret.Point(300,200),
                                          new egret.Point(400,150),new egret.Point(400,350),new egret.Point(350,450),new egret.Point(30,210),
                                          new egret.Point(400,250),new egret.Point(200,300),new egret.Point(50,320),new egret.Point(200,100)];

     public static Locations_Round4:egret.Point[] = [new egret.Point(40,180),new egret.Point(50,430),new egret.Point(200,300),
                                          new egret.Point(160,150),new egret.Point(320,280),new egret.Point(150,450),
                                          new egret.Point(50,300),new egret.Point(280,150),new egret.Point(275,470),
                                          new egret.Point(370,160),new egret.Point(350,400),new egret.Point(400,480),new egret.Point(400,300),
                                          new egret.Point(240,370),new egret.Point(125,365),new egret.Point(70,100),new egret.Point(240,100),new egret.Point(235,215)];
    

    /*------------------定义每一句的物品种类及大小----------------------------*/
    private static size_round1:number[] = [1,1,1,1];
    private static size_round2:number[] = [1,.5,.7,.9];
    private static size_round3:number[] = [1,1,1,1];
    private static size_round4:number[] = [1,1,1,1];
    
    public  Article_Round1:Article[];
    public  Article_Round2:Article[];

   public  Article_Round3:Article[];
   public  Article_Round4:Article[];
    /*------------------------------------定义每一关的目标分数---------------------------------------*/
    public static TargetScore_Round1 = 50 ;//40
    public static TargetScore_Round2 = 90;//80
    public static TargetScore_Round3 = 140;//130
    public static TargetScore_Round4 = 190;//190
    /*-----------------------------------定义每一关的时间----------------------------------------*/
    public static Time_Game = 60;

    constructor()
    {
         
     this. Article_Round1 = [new Article("cabbage_png",Constants.size_round1[0]),new Article("cabbage_png",Constants.size_round1[0]),
                                             new Article("cabbage_png",Constants.size_round1[0]),new Article("cabbage_png",Constants.size_round1[0]),
                                             new Article("cabbage_png",Constants.size_round1[0]),new Article("carrot_png",Constants.size_round1[0]),
                                             new Article("carrot_png",Constants.size_round1[0]),new Article("carrot_png",Constants.size_round1[0]),
                                             new Article("stone2_png",1.2),new Article("stone_png",1.2),new Article("stone_png",0.8)];

   this. Article_Round2 = [new Article("cabbage_png",Constants.size_round2[0]),new Article("cabbage_png",1.2),
                                              new Article("cabbage_png",Constants.size_round2[0]),new Article("cabbage_png",Constants.size_round2[0]),
                                              new Article("carrot_png",1.2),new Article("carrot_png",Constants.size_round2[0]),
                                              new Article("carrot_png",0.8),new Article("carrot_png",0.7),new Article("stone2_png",1.2),
                                              new Article("stone_png",1.2),new Article("stone2_png",1.2),new Article("sweetpotato_png",1),new Article("stone2_png",1)];

   this.  Article_Round3 = [new Article("dandelion_png",Constants.size_round3[0]),new Article("sweetpotato_png",1.2),
                                             new Article("sweetpotato_png",Constants.size_round3[0]),new Article("sweetpotato_png",0.8),
                                             new Article("cabbage_png",Constants.size_round3[0]),new Article("cabbage_png",1.2),
                                             new Article("cabbage_png",Constants.size_round3[0]),new Article("carrot_png",0.7),
                                             new Article("carrot_png",Constants.size_round3[0]),new Article("carrot_png",0.6),new Article("stone2_png",1.3),
                                              new Article("stone_png",1.2),new Article("stone2_png",1.2),new Article("stone_png",1.3)];                                          

   this.  Article_Round4 = [new Article("dandelion_png",Constants.size_round4[0]),new Article("dandelion_png",1.3),
                                             new Article("dandelion_png",Constants.size_round4[0]),new Article("sweetpotato_png",1.2),
                                             new Article("sweetpotato_png",Constants.size_round4[0]),new Article("sweetpotato_png",0.8),
                                             new Article("cabbage_png",0.9),new Article("cabbage_png",1.2),
                                             new Article("cabbage_png",Constants.size_round4[0]),new Article("carrot_png",0.8),
                                             new Article("carrot_png",Constants.size_round4[0]),new Article("carrot_png",0.7),
                                             new Article("stone2_png",0.7),new Article("stone_png",1.6),new Article("stone2_png",1),new Article("stone_png",1.1),
                                              new Article("stone2_png",0.8),new Article("stone_png",0.6)]; 

    }
    /*-----------------------------定义一些字符串常量----------------------------*/

    public static btn_tryagain:string = "Try Again";
    public static btn_play:string = "Play";
    public static btn_lookback:string = "Look Back";
    public static msg_failed:string = "Failed";
    public static msg_succeed:string = "Congratuatios";

    /*--------------------------定义总关数----------------------------------*/
    public static Num_Round:number = 4;

    /*--------------------------定义通关动画显示的坐标点和放大倍数及最后的停留位置,过渡时间-------*/
    public static Point_Round:egret.Point = new egret.Point(1136*.3,640*.5);
    public static Scale_Round:number = 2;
    public static Scale_Final:number = 0.7;
    public static Point_Final:egret.Point = new egret.Point(806,12);
    public static Time_Tween:number = 1000;

    /*------------------------定义rubbit的大小安放位置-----------------------------------*/
    public static Point_Rubbit:egret.Point = new egret.Point(1200,620);
    public static Scale_Rubbit:number = 0.35;
    public static Scale_Rabbit_End:number = 1.1;
    public static Point_Rabbit_End:egret.Point = new egret.Point(500,700);

    /*-----------------------定义worm的循环坐标和循环移动的时间-----------------*/
    public static Point_Worm_Start:egret.Point = new egret.Point(200,600);
    public static Point_Worm_End:egret.Point = new egret.Point(200,200);
    public static Scale_Worm:number = 0.5;
    public static Time_Worm:number = 1000;

    //block size 
    public static Size_Block = 50;

    //starting ui 
    public static point_rabbit_s:egret.Point = new egret.Point(530.62,313.13);
    public static point_farmer_s:egret.Point = new egret.Point(600,300);
    public static Time_Conversation:number = 2800;

    //progress bar
    public static loc_progress_bar:egret.Point = new egret.Point(930,320);

    //the end point of the congratuations
    public static Point_Congratuations:egret.Point = new egret.Point(470,400);
    public static Scale_Congratuations:number = 3;
    public static Time_Stay = 10000;

    //target score size and location settings
    public static location_targetscore = new egret.Point(1053,20);
    public static size_targetscore = 28;
    
}