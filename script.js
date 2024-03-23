//Used for the Skills bar
$('.skills dd').each(function() {
    $(this).css({
      width: $(this).text() + '%'
    });
  });
  
  // matchHeight.js
  $(function() {
   $('.matchHeight').matchHeight();
  });