cc.Class({
    extends: cc.Component,

    properties: {
        _GIDPool: [],
        _groupStack: [],
        boomDuration: 3000,//ms
        _panelManager: null,
        boomPrefab: cc.Prefab,
        _boomLayer: [],
    },

    
    onLoad: function () {
        
        this._panelManager = this.getComponent("panelManager");
        //初始化组ID池
        let blockLayer = this._panelManager._blockLayer;
        for(let i = 0; i < blockLayer.length; i++){
            for(let j = 0; j < blockLayer[i].length; j++){
                this._GIDPool.push(i * blockLayer.length + j);
            }
        }
        //炮弹刚进来 归组
        //炮弹爆炸后 或 炮弹进来后 合并组
        
        
    },

    wantDropBoom: function(currentGrid,zIndex,power){
        //检查位置是不是block 是的话就不能放炸弹
        let isBlock = !!this._panelManager._blockLayer[currentGrid.x][currentGrid.y];
        if(isBlock){return;}
        this._panelManager._blockLayer[currentGrid.x][currentGrid.y] = true;
        //渲染炸弹
        let boom = this.renderBoom(currentGrid,zIndex);
        //初始化数据
        boom.getComponent('boomScript').init(currentGrid,power);
        boom.name = "boom#" + currentGrid.x + "#" + currentGrid.y;
        //炸弹加入组
        this.addGroup(currentGrid,power,boom)
    },

    renderBoom: function(currentGrid,zIndex){
        let currentTile = this.node.getChildByName("tile#" + currentGrid.x + "#" + currentGrid.y);
        let currentPosition = currentTile.position;
        let boom = cc.instantiate(this.boomPrefab);
        this.node.addChild(boom);
        boom.position = currentPosition;
        boom.setSiblingIndex(zIndex);
        return boom;
    },

    addGroup: function(currentGrid,power,boom){
        
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
