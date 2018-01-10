class Transition extends eui.Component{

    //define the panel to show the tips,if failed then set the tile "failed" else if win at last then show title "congratuations"
    //both of the two situations contains a button "play again"
    public panel_tip:eui.Panel;
    
    constructor()
    {
        super();
        this.init();
    }
    
    //init the euis
    private init()
    {

        this.panel_tip = new eui.Panel();
        this.panel_tip.horizontalCenter = 0;
        this.panel_tip.verticalCenter = 0;
       
    }

    public showTips(isPassed:boolean,round:number)
    {
        if(isPassed&&(round == Constants.Num_Round))
        {
            this.panel_tip.title = Constants.msg_succeed;
          
          //  this.panel_tip.closeButton.label = Constants.btn_tryagain;
            this.addChild(this.panel_tip);
        }
        else if(!isPassed){
            this.panel_tip.title = Constants.msg_failed;
          //  this.panel_tip.closeButton.label = Constants.btn_tryagain;
            this.addChild(this.panel_tip);
        }
        else{
            //do nothing
        }
    }
    
}