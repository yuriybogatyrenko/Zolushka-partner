var Partners = function () {
    var self = this;
    var $doc = $(document);

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


    self.dropdown('.dropdown-wrapper');

};

ko.applyBindings(new Partners());