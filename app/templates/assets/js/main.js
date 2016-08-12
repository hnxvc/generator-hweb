(function($) {
  'use strict';

  $(function() {


    /* --------------------------------------------------------------------------
       Main slide
       -------------------------------------------------------------------------- */

    function activeAnimate(slide, currentSlide) {

      slide.find(".slick-slide[data-slick-index=" + currentSlide + "]").find("[data-animate ^= 'animated']").each(function() {

        var animEndEv = 'webkitAnimationEnd animationend';
        var that = $(this);
        // add animate
        var animate = that.attr("data-animate");
        that.addClass(animate).one(animEndEv, function() {
          that.removeClass(animate);
        });

        // animate delay + duration
        var timeDelay = that.attr("data-delay");
        var timeDuration = that.attr("data-duration");
        that.css({
          "animation-delay": timeDelay,
          "-webkit-animation-delay": timeDelay,
          "animation-duration": timeDuration,
          "-webkit-animation-duration": timeDuration,
          "opacity": 1
        });

      });

      slide.find(".slick-slide[data-slick-index=" + currentSlide + "]").siblings().find("[data-animate ^= 'animated']").css("opacity", "0");

    }


    var animate_slide = $('.<%=prefix%>-main-slide');

    /* Init slide
    -------------------------------------------------------------------------- */
    animate_slide.on('init', function() {
      $(this).addClass("first");
      $(".<%=prefix%>-overlay-slide").fadeOut();
    });

    /* Setup slide
    -------------------------------------------------------------------------- */
    animate_slide.slick({
      dots: true,
      fade: true,
      // autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
    });

    /* Active animate first run times
    -------------------------------------------------------------------------- */
    animate_slide.on('setPosition', function() {
      if ($(this).hasClass("first")) {
        activeAnimate($(this), 0);
        animate_slide.removeClass("first");
      }
    });


    /* After change Slide
    -------------------------------------------------------------------------- */
    animate_slide.on('afterChange', function(event, slick, currentSlide) {
      activeAnimate($(this), currentSlide);
    });


    /* --------------------------------------------------------------------------
       Mobile Navigation
       -------------------------------------------------------------------------- */

    function rstAnimateRight(element, number) {
      $(element).animate({
        right: number
      }, 300);
    }

    $(".<%=prefix%>-menu-mobile li.menu-item-has-children").prepend("<span class='<%=prefix%>-open-menu-mobile'></span>");
    $(".<%=prefix%>-toggle-menu").click(function() {

      $(".<%=prefix%>-toggle-menu").toggleClass("active");
      // Sidebar menu
      if ($(".<%=prefix%>-toggle-menu").hasClass("active")) {
        rstAnimateRight($(".<%=prefix%>-menu-mobile"), 0);
        $(".<%=prefix%>-overlay-mobile").show();
      } else {
        rstAnimateRight($(".<%=prefix%>-menu-mobile"), -266);
        $(".<%=prefix%>-overlay-mobile").hide();
      }

    });

    // multi level menu
    $(".<%=prefix%>-open-menu-mobile").on("click", function() {
      $(this).toggleClass("active");
      $(this).parent("li").siblings().find("ul").slideUp();
      $(this).parent("li").siblings().find(".<%=prefix%>-open-menu-mobile").removeClass("active");
      $(this).siblings('ul').slideToggle();
    });

    $(".<%=prefix%>-overlay-mobile").click(function() {
      $(".<%=prefix%>-top-menu-mobile .<%=prefix%>-toggle-menu.active").trigger("click");
    });



  }); // end document ready

  $(window).load(function() {


  });


})(jQuery); // end JQuery namespace
