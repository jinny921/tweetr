$(function() {  
  const $textarea = $('.new-tweet textarea');
  const $counter = $('.counter');
  const MAX_CHARS = $textarea.data('max-length');
  $counter.text(MAX_CHARS);
  
  function onKeyEvent(e) {
    const remaining = MAX_CHARS - this.value.length;
    $counter.text(remaining);
    if(remaining < 0) { 
      $counter.addClass('red');
    } else {
      $counter.removeClass('red');
    }
  }

  $textarea.on('keyup', onKeyEvent);
  $textarea.on('keydown', onKeyEvent);
});

  // $('.new-tweet textarea').on('keydown', function(e) {
  //   // e.preventDefault();
  //   console.log('keydown', this.value.length);
  // });

  // $('.new-tweet textarea').on('keypress', function(e) {
  //   // e.preventDefault();
  //   console.log('keypress', this.value.length);
  // });

  // $('.new-tweet textarea').on('change', function(e) {
  //   // e.preventDefault();
  //   console.log('change', this.value.length);
  // });