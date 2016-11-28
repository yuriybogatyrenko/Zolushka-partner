(function() {

    function YOURAPPNAME(doc) {
        var _self = this;

        _self.doc = doc;

        _self.bootstrap(_self);
    }

    YOURAPPNAME.prototype.bootstrap = function() {
        console.log('Paste your app code here...');
    };

    var app = new YOURAPPNAME(document);

})();