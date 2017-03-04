cc.Class({
    extends: cc.Component,

    properties: {
        _blockLayer:[],
        blockTilePrefab: cc.Prefab,
        groundTilePrefab: cc.Prefab,
        playerPrefab: cc.Prefab,
    },

    onLoad: function () {
        //load 加载地图网格数据
        let panelGridData = require("panelGridData2");
        //parse 解析数据的坐标系
        let originGridData = panelGridData.layers[0].data;
        let originGridWidth = panelGridData.width;
        let originGridHeight = panelGridData.height;
        let originTileWidth = panelGridData.tilewidth;
        let originTileHeight = panelGridData.tileheight;
        for(let x = 0, w = originGridWidth ; x < w; x++){
            for(let y = 0,h = originGridHeight ; y < h; y++){
                let idx = y * h + x;
                let isBlock = originGridData[idx] == 4? true : false;
                let convertedX = x;
                let convertedY = h - y - 1;
                if(this._blockLayer[convertedX] == undefined){
                    this._blockLayer[convertedX] = [];
                }
                this._blockLayer[convertedX][convertedY] = isBlock;
            }
        }
        //renderer
        for(let convertedX = 0, w = originGridWidth; convertedX < w; convertedX++){
            for(let convertedY = 0, h = originGridWidth; convertedY < h; convertedY++){
                let convertedXOffset = convertedX - Math.floor(w/2);
                let convertedYOffset = convertedY - Math.floor(h/2);
                let isBlock = this._blockLayer[convertedX][convertedY];
                let tile = null;
                if(isBlock){
                    tile = cc.instantiate(this.blockTilePrefab);
                }else{
                    tile = cc.instantiate(this.groundTilePrefab);
                }
                this.node.addChild(tile);
                tile.position = cc.v2(convertedXOffset * originTileWidth, convertedYOffset * originTileHeight);
                tile.name = "tile#" + convertedX + "#" + convertedY;
            }
        }
        //add player
        let player = cc.instantiate(this.playerPrefab);
        this.node.addChild(player);
        let startGrid = cc.v2(1,1);
        let startTile = this.node.getChildByName("tile#" + startGrid.x + "#" + startGrid.y);
        player.position = startTile.position;
        player.name = 'player';
        player.getComponent('moveControl').init(this._blockLayer,startGrid);
        player.setSiblingIndex(1000);
    },

    
});
