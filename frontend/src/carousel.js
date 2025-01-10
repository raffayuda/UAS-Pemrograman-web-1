
    $(document).ready(function(){
            var owl = $(".owl-carousel");
            
            owl.owlCarousel({
                loop: true,
                margin: 20,
                nav: false, // Disabled default nav
                dots: true,
                autoplay: true,
                autoplayTimeout: 3000, // Changed to 3 seconds
                autoplayHoverPause: true,
                smartSpeed: 800, // Smooth transition
                responsive:{
                    0:{
                        items: 1
                    },
                    768:{
                        items: 2
                    },
                    1024:{
                        items: 3
                    }
                }
            });

            // Custom navigation buttons
            $(".custom-next").click(function(){
                owl.trigger("next.owl.carousel");
            });
            $(".custom-prev").click(function(){
                owl.trigger("prev.owl.carousel");
            });

            // Add touch mouse hover effect for buttons
            $(".custom-nav-button").on({
                mouseenter: function() {
                    $(this).css({
                        'transform': 'translateY(-50%) scale(1.1)',
                        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
                    });
                },
                mouseleave: function() {
                    $(this).css({
                        'transform': 'translateY(-50%) scale(1)',
                        'box-shadow': 'none'
                    });
                }
            });
        });
