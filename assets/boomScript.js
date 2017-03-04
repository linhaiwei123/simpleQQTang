cc.Class({
    extends: cc.Component,

    properties: {
        _power: null,
        _currentGrid: null,
    },

    
    init: function (currentGrid,power) {
        this._power = power,
        this._currentGrid = currentGrid;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
