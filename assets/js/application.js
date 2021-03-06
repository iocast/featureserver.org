!function ($) {
    $(function(){
      
      var $window = $(window);
      
      // Disable certain links in docs
      $('section [href=#]').click(function (e) {
                                   e.preventDefault()
                                   })
      
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
      // dropdowns
      $('.dropdown-toggle').dropdown();
      
      // tooltips
      $('a[rel=tooltip]').tooltip();
      
      // popover
      $('a[rel=popover]').popover({
                                  trigger : 'hover'
                                  });
      
      });
    
}(window.jQuery)