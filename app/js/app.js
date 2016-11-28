(function() {

    function YOURAPPNAME(doc) {
        var _self = this;

        _self.doc = doc;
        _self.window = window;

        _self.bootstrap(_self);
    }

    YOURAPPNAME.prototype.bootstrap = function() {
        this.appLoad('loading', function (callback) {
            console.log('Paste your app code here... While app is loading. 4example it may be preloader <br/>');
        });

        this.appLoad('dom', function () {
            console.log('Paste your app code here... Pure javascript app code... <br/>');
        });

        this.appLoad('full', function (e) {
            console.log('Paste external app source code here... For example if your use jQuery and smg else <br/>');
        });

    };

    YOURAPPNAME.prototype.appLoad  = function (type, callback) {
        switch(type) {
            case 'full':
                this.window.onload = function(e) {
                    callback(e);
                };

                break;
            case 'dom':
                if (this.doc.readyState === 'complete') callback();

                break;
            case 'loading':
                if (this.doc.readyState === 'loading') callback();

                break;
            default:
                callback();
        }
    };

    var app = new YOURAPPNAME(document);

})();