$doc = $(document);

var Partners = function () {
    var self = this;
    var $doc = $(document);

    this.trafficCount = ko.observable();
    
    //reg profit
    this.regProfit = ko.computed(function () {
        if(this.trafficCount() > 0) {
            var profit = this.trafficCount() * 0.05;
            return profit.toFixed(2);
        } else
            return "--";
    }, this);

    //pays profit
    this.paysProfit = ko.computed(function () {
        if(this.trafficCount() > 0) {
            var profit = this.regProfit() * 0.07;
            return profit.toFixed(2);
        } else {
            return "--";
        }
    }, this);

    //summary profit
    this.summaryProfit = ko.computed(function () {
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
                !$el.closest('.login-bar').lenght > 0
                && !$el.hasClass('.login-bar')
                && !$el.hasClass('.login-trigger')
                && !$el.closest('.login-trigger').lenght > 0
            ) {

            }
        });
    };

    self.loginBar();

    // table webmasters
    self.webmaster = function (webm) {
        var item = this;

        // console.log(webm);

        item.webmaster = ko.observable(webm);
    };

    self.webmasters = function () {
        self.webmasters_table = ko.observableArray();

        $.get('json/webmasters.json', function (data) {
            i = 0;
            while(i < data.response.length) {
                self.webmasters_table.push(new self.webmaster(data.response[i]));
                i++;
            }
        });
    };

    self.webmasters();

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
};

ko.applyBindings(new Partners());