(function() {

    var app = new YOURAPPNAME(document);

    function YOURAPPNAME(doc) {
        var _self = this;

        _self.doc = doc;
        _self.window = window;

        _self.bootstrap(_self);
    }

    YOURAPPNAME.prototype.bootstrap = function() {
        this.appLoad('loading', function () {
            console.log('App is loading... Paste your app code here.');
        });

        this.appLoad('dom', function () {
            console.log('DOM is loaded! Paste your app code here (Pure JS code).');
            // Do not use jQuery here cause external libs do not loads here...
        });

        this.appLoad('full', function (e) {
            console.log('App was fully load! Paste external app source code here... For example if your use jQuery and something else');
            // Please do not use jQuery ready state function to avoid mass calling document event trigger!
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

})();