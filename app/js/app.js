(function() {

    function YOURAPPNAME(doc) {
        var _self = this;

        _self.doc = doc;
        _self.window = window;

        _self.bootstrap(_self);
    }

    YOURAPPNAME.prototype.bootstrap = function() {
        this.appLoad('loading', function () {
            console.log('Paste your app code here... While app is loading. 4example it may be preloader');
        });

        this.appLoad('dom', function () {
            console.log('Paste your app code here... Pure javascript app code...');
        });

        this.appLoad('full', function (e) {
            console.log('Paste external app source code here... For example if your use jQuery and something else');
        });

    };

    // Window load types (loading, dom, full)
    YOURAPPNAME.prototype.appLoad  = function (type, callback) {
        var _self = this;

        switch(type) {
            case 'loading':
                if (_self.doc.readyState === 'loading') callback();

                break;
            case 'dom':
                _self.doc.onreadystatechange = function () {
                    if (_self.doc.readyState === 'complete') callback();
                };

                break;
            case 'full':
                _self.window.onload = function(e) {
                    callback(e);
                };

                break;
            default:
                callback();
        }
    };

    var app = new YOURAPPNAME(document);

})();