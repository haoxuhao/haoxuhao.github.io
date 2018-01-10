var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Transition = (function (_super) {
    __extends(Transition, _super);
    function Transition() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    //init the euis
    Transition.prototype.init = function () {
        this.panel_tip = new eui.Panel();
        this.panel_tip.horizontalCenter = 0;
        this.panel_tip.verticalCenter = 0;
    };
    Transition.prototype.showTips = function (isPassed, round) {
        if (isPassed && (round == Constants.Num_Round)) {
            this.panel_tip.title = Constants.msg_succeed;
            //  this.panel_tip.closeButton.label = Constants.btn_tryagain;
            this.addChild(this.panel_tip);
        }
        else if (!isPassed) {
            this.panel_tip.title = Constants.msg_failed;
            //  this.panel_tip.closeButton.label = Constants.btn_tryagain;
            this.addChild(this.panel_tip);
        }
        else {
        }
    };
    return Transition;
}(eui.Component));
__reflect(Transition.prototype, "Transition");
//# sourceMappingURL=Transition.js.map