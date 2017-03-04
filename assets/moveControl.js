cc.Class({
    extends: cc.Component,

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,
        moveStepInPixel: 5,//px
        _playerCurrentTile: cc.v2(1,1),
        _blockArray: null,
    },

    // use this for initialization
    init: function (blockLayer,currentTile) {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // this._blockArray = [
        //     [1,1,1,1,1,1,1] //.→y
        //     [1,0,0,0,0,0,1],//↓x
        //     [1,0,1,0,1,0,1],
        //     [1,0,0,0,0,0,1],
        //     [1,0,0,0,0,0,1],
        //     [1,0,0,0,0,0,1],
        //     [1,1,1,1,1,1,1]
        // ];
        this._blockArray = blockLayer;
        this._playerCurrentTile = currentTile;
    },


    onKeyDown: function(e){
        switch(e.keyCode){
            case cc.KEY.left: this._left = true;break;
            case cc.KEY.right: this._right = true;break;
            case cc.KEY.up: this._up = true;break;
            case cc.KEY.down: this._down = true;break;
        }
    },

    onKeyUp: function(e){
        switch(e.keyCode){
            case cc.KEY.left: this._left = false;break;
            case cc.KEY.right: this._right = false;break;
            case cc.KEY.up: this._up = false;break;
            case cc.KEY.down: this._down = false;break;
        }
    },

    isBlock: function(direction){
        switch(direction){
            case 'left': return !!this._blockArray[this._playerCurrentTile.x - 1][this._playerCurrentTile.y];
            case 'right': return !!this._blockArray[this._playerCurrentTile.x + 1][this._playerCurrentTile.y];
            case 'up': return !!this._blockArray[this._playerCurrentTile.x][this._playerCurrentTile.y + 1];
            case 'down': return !!this._blockArray[this._playerCurrentTile.x][this._playerCurrentTile.y - 1];
        }
    },

    lastStepDistance: function(direction){
        switch(direction){
            case 'left': {
                let leftTile = this.node.parent.getChildByName("tile#"+ (this._playerCurrentTile.x - 1) + "#" + this._playerCurrentTile.y);
                //return Math.max(leftTile.position.x + leftTile.width / 2 - (this.node.position.x - this.node.width / 2), -this.moveStepInPixel);
                let middleStep = leftTile.position.x + leftTile.width / 2 - (this.node.position.x - this.node.width / 2);
                return cc.clampf(-this.moveStepInPixel,middleStep,0);
            }
            case 'right': {
                let rightTile = this.node.parent.getChildByName("tile#"+ (this._playerCurrentTile.x + 1) + "#" + this._playerCurrentTile.y);
                //return Math.min(rightTile.position.x - rightTile.width / 2 - (this.node.position.x + this.node.width / 2), this.moveStepInPixel);
                let middleStep = rightTile.position.x - rightTile.width / 2 - (this.node.position.x + this.node.width / 2);
                return cc.clampf(0,middleStep,this.moveStepInPixel);
            }
            case 'up': {
                let upTile = this.node.parent.getChildByName("tile#"+ (this._playerCurrentTile.x) + "#" + (this._playerCurrentTile.y + 1));
                //return Math.min(upTile.position.y - upTile.height / 2 - (this.node.position.y + this.node.height / 2), this.moveStepInPixel);
                let middleStep = upTile.position.y - upTile.height / 2 - (this.node.position.y + this.node.height / 2);
                return cc.clampf(0,middleStep,this.moveStepInPixel);
            }
            case 'down': {
                let downTile = this.node.parent.getChildByName("tile#"+ (this._playerCurrentTile.x) + "#" + (this._playerCurrentTile.y - 1));
                //return Math.max(downTile.position.y + downTile.height / 2 - (this.node.position.y - this.node.height / 2), -this.moveStepInPixel);
                let middleStep = downTile.position.y + downTile.height / 2 - (this.node.position.y - this.node.height / 2);
                return cc.clampf(-this.moveStepInPixel,middleStep,0);
            }
        }
    },

    changeStandTile: function(direction){
        switch(direction){
            case 'left': {
                let leftTile = this.node.parent.getChildByName("tile#"+ (this._playerCurrentTile.x - 1) + "#" + this._playerCurrentTile.y);
                if(Math.abs(leftTile.position.x - this.node.position.x) < leftTile.width / 2){this._playerCurrentTile.x -= 1};break;
            }
            case 'right': {
                let rightTile = this.node.parent.getChildByName("tile#"+ (this._playerCurrentTile.x + 1) + "#" + this._playerCurrentTile.y);
                if(Math.abs(rightTile.position.x - this.node.position.x) < rightTile.width / 2){this._playerCurrentTile.x += 1};break;
            }
            case 'up': {
                let upTile = this.node.parent.getChildByName("tile#"+ (this._playerCurrentTile.x) + "#" + (this._playerCurrentTile.y + 1));
                if(Math.abs(upTile.position.y - this.node.position.y) < upTile.height / 2){this._playerCurrentTile.y += 1};break;
            }
            case 'down': {
                let downTile = this.node.parent.getChildByName("tile#"+ (this._playerCurrentTile.x) + "#" + (this._playerCurrentTile.y - 1));
                if(Math.abs(downTile.position.y - this.node.position.y) < downTile.height / 2){this._playerCurrentTile.y -= 1};break;
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    lateUpdate: function (dt) {
        let moveVector = cc.Vec2.ZERO;
        if(this._left){moveVector.x += this.isBlock('left') ? this.lastStepDistance('left') : -this.moveStepInPixel;}
        if(this._right){moveVector.x += this.isBlock('right') ? this.lastStepDistance('right') : this.moveStepInPixel;}
        if(this._up){moveVector.y += this.isBlock('up') ? this.lastStepDistance('up') : this.moveStepInPixel;}
        if(this._down){moveVector.y += this.isBlock('down') ? this.lastStepDistance('down') : -this.moveStepInPixel;}
        this.node.position = cc.pAdd(this.node.position, moveVector);
        if(this._left){this.changeStandTile('left')};
        if(this._right){this.changeStandTile('right')};
        if(this._up){this.changeStandTile('up')};
        if(this._down){this.changeStandTile('down')};
        console.log(this._playerCurrentTile.x,this._playerCurrentTile.y);
    },
});
