$doc = $(document);

var PartnersView = function () {
    var self = this;
    var $doc = $(document);

    self.trafficCount = ko.observable();
    
    //reg profit
    self.regProfit = ko.computed(function () {
        if(this.trafficCount() > 0) {
            var profit = this.trafficCount() * 0.05;
            return profit.toFixed(2);
        } else
            return "--";
    }, this);

    //pays profit
    self.paysProfit = ko.computed(function () {
        if(this.trafficCount() > 0) {
            var profit = this.regProfit() * 0.07;
            return profit.toFixed(2);
        } else {
            return "--";
        }
    }, this);

    //summary profit
    self.summaryProfit = ko.computed(function () {
        if(this.trafficCount() > 0) {
            var total_profit = parseFloat(this.paysProfit()) + parseFloat(this.regProfit());
            return total_profit.toFixed(2);
        } else {
            return "--";
        }
    }, this);

    // login bar
    self.loginBar = function (className) {
        var login = {};

        login.trigger = $('.login-trigger');
        login.bar = $('.login-bar');

        login.closeBtn = $('[data-close-login-bar]')

        login.open = function () {
            login.bar.fadeIn(200);
        };

        login.close = function () {
            login.bar.fadeOut(200);
        };

        login.closeBtn.bind('click', function () {
            login.close();
        });

        login.trigger.bind('click', function () {
            login.bar.fadeToggle(200);
        });

        $doc.click(function (e) {
            var $el = $(e.target);
            if(
                !$el.closest('.login-bar').length > 0
                && !$el.hasClass('.login-bar')
                && !$el.hasClass('.login-trigger')
                && !$el.closest('.login-trigger').length > 0
            ) {
                login.close();
            }
        });
    };

    self.loginBar();

    self.checkbox = function () {
        $('input:checkbox').each(function () {
            var $this = $(this);
            if($this.hasClass('no-style'))
                return;
            $this.wrap('<span class="jq_checkbox"></span>');
            $this.after('<span class="jq_checkbox__detector"></span>');
        });
    };

    self.checkbox();

    self.Webmasters = ko.observableArray();

    WebmastersInit(self.Webmasters);
};


// webmasters init function
var WebmastersInit = function (WebmastersArray) {

    var wm = this;

    // table webmasters
    wm.Webmaster = function (webm) {
        var item = this;
        item.webmaster = ko.observable(webm);
    };

    // load webmasters
    wm.loadWebmasters = function () {
        $.get('json/webmasters.json', function (response) {
            WebmastersArray($.map(response.response, function (item) {
                return new wm.Webmaster(item);
            }));
        });
    };

    wm.loadWebmasters();
};

//dropdown declaration

var Dropdown = function(className) {
    var options = {};

    options.elements = $(className);
    options.currentClass = 'dropdown__current';
    options.listingClass = 'dropdown__listing';
    options.itemClass = 'dropdown__item';
    options.linkClass = 'dropdown__link';

    options.elements.each(function () {
        var dropdown = {};
        dropdown.element = $(this);
        dropdown.listing = dropdown.element.find('.'+options.listingClass);
        dropdown.current = dropdown.element.find('.'+options.currentClass);

        // toggle action bind
        dropdown.current.on('click', function () {
            dropdown.toggle();
        });

        // toggle dropdown
        dropdown.toggle = function () {
            dropdown.listing.fadeToggle(200);
            dropdown.current.toggleClass('active');
        };

        // open dropdown
        dropdown.open = function () {
            dropdown.listing.fadeIn(200);
            dropdown.current.addClass('active');
        };

        // closing dropdown
        dropdown.close = function () {
            dropdown.listing.fadeOut(200);
            dropdown.current.removeClass('active');
        };
    });

    $doc.on('click', function (e) {
        var $target = $(e.target);
        if(!$target.hasClass(options.listingClass)
            && !$target.closest('.'+options.currentClass).length > 0
            && !$target.hasClass(options.currentClass)
            && !$target.closest('.'+options.listingClass).length > 0
        ) {
            options.elements.find('.'+options.listingClass).fadeOut(200);
        }
    });
};

// dropdown init
new Dropdown('.dropdown-wrapper');

ko.applyBindings(new PartnersView());
