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
                                  //return $("#configuration").position().top;
                                  return $(".bs-docs-sidebar").parent().parent().position().top;
                                  
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
      
      // navigation tabs
      $('.nav-tabs a').click(function (e) {
                             e.preventDefault();
                             $(this).tab('show');
                             });

      
      });
    
}(window.jQuery)