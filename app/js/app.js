(function() {

    function YOURAPPNAME(doc) {
        var _self = this;

        _self.doc = doc;

        _self.constructor(_self);
    }

    YOURAPPNAME.prototype.constructor = function() {
        console.log('Paste your app code here...');
    };

    var app = new YOURAPPNAME(document);

})();