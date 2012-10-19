!function ($) {
    $(function(){
      
      var $window = $(window);
      
      // make code pretty
      window.prettyPrint && prettyPrint();
      
      // side bar
      $('.bs-docs-sidenav').affix({
            offset: {
                //top: function () { return $window.width() <= 980 ? 290 : 210 },
                top: function() {
                                  return $("#documentation").position().top;
                                  
                },
                                  bottom:270,
                                  /*
                bottom: function() {
                    var sidebarele = $(".bs-docs-sidebar ul").offset().top + $(".bs-docs-sidebar ul").height() - $(window).scrollTop();
                    var docele = $("#documentation").offset().top + $("#documentation").height() - $(window).scrollTop();
                    
                    reset = 'affix affix-top affix-bottom';

                                  if(($(window).height() - docele) < 0) {
                                  //console.log("hidden" + ($(window).height() - docele));
                                  //$(".bs-docs-sidebar ul").hide(0);
                    } else {
                                  //$(".bs-docs-sidebar ul").show(0);
                                  
                                  //console.log("show" + ($(window).height() - docele));
                        return $(window).height() - docele;
      }
                }
                                   */
            }
      });
    });
}(window.jQuery)