!function ($) {
    $(function(){
      
      var $window = $(window);
      
      // make code pretty
      window.prettyPrint && prettyPrint();
      
      // side bar
      $('.bs-docs-sidenav').affix({
                                  offset: {
                                  top: function() {
                                  return $("#documentation").position().top;
                                  
                                  },
                                  bottom:270,
                                  }
                                  });
      });
}(window.jQuery)