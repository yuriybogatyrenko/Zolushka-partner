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

    //dropdown declaration

    self.dropdown = function(className) {
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
                dropdown.listing.toggle();
                dropdown.current.toggleClass('active');
            };

            // open dropdown
            dropdown.open = function () {
                dropdown.listing.show();
                dropdown.current.addClass('active');
            };

            // closing dropdown
            dropdown.close = function () {
                dropdown.listing.hide();
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
                options.elements.find('.'+options.listingClass).hide();
            }
        });
    };

    // dropdown init
    self.dropdown('.dropdown-wrapper');

    // count profit form

};

ko.applyBindings(new Partners());