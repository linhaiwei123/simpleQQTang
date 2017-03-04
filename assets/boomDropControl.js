cc.Class({
    extends: cc.Component,

    properties: {
        //boomPrefab: cc.Prefab,
        _moveControlComp: null,
        _boomManagerComp: null,
        power: 2,
    },

    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this._moveControlComp = this.getComponent('moveControl');
        this._boomManagerComp = this.node.parent.getComponent('boomManager');
    },

    onKeyDown: function(e){
        if(e.keyCode === cc.KEY.space){
            this.dropBoom();
        }
    },

    dropBoom: function(){
        let currentGrid = this._moveControlComp._playerCurrentTile;
        // let currentTile = this.node.parent.getChildByName("tile#" + currentGrid.x + "#" + currentGrid.y);
        // let currentPosition = currentTile.position;
        // let boom = cc.instantiate(this.boomPrefab);
        // this.node.parent.addChild(boom);
        // boom.position = currentPosition;
        // boom.setSiblingIndex(this.node.getSiblingIndex() - 1);
        this._boomManagerComp.wantDropBoom(currentGrid,this.node.getSiblingIndex() - 1,this.power);
    }

});
