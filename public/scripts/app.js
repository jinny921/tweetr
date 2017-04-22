/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {

  function createTweetElement(tweet) {
    return `<article data-postID="${escape(tweet._id)}">
              <header>
                <img class="avatar" src="${escape(tweet.user.avatars.small)}">
                <div class="fullName">${escape(tweet.user.name)}</div>
                <div class="userAcc">${escape(tweet.user.handle)}</div>
              </header>
              <div class="content">
                <p>${escape(tweet.content.text)}</p>
              </div>
              <footer>
                <p>${escape(moment(tweet.created_at).fromNow())}</p><br>
                <p># Likes: ${escape(tweet.likes)}</p>
                <div class="icons">
                  <i class="fa fa-flag" aria-hidden="true"></i>
                  <i class="fa fa-retweet" aria-hidden="true"></i>
                  <i class="fa fa-heart" aria-hidden="true"></i>
                </div>
              </footer>
            </article>`
  };

  function renderTweets(tweets) {
    $('#tweets').empty().append(tweets.reverse().map(createTweetElement));

    $(".fa-heart").on("click", function( event ) {
      const postId = $(this).closest('article').attr('data-postID');
      $.ajax({
        method: "put",
        url: "/tweets/" + postId + '/like', 
        // success: (err, result) => {
        //   console.log(result);
        // }
        success(){
          loadTweets();
        }
      })
    });
  };

  function loadTweets() {
    $.ajax({
      method: "GET", 
      url: "/tweets",
      success: renderTweets
    });
  };

  loadTweets();

  const $textarea = $('.new-tweet textarea');
  const MAX_CHARS = $textarea.data('max-length');
  const $error = $('.new-tweet span.err');

 $( "#nav-bar .composeButton" ).click(function() {
  $(this).toggleClass('change');
  $( ".new-tweet" ).slideToggle();
  $textarea.focus();
 });

  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    const remaining = MAX_CHARS - $textarea.val().length;

    if (remaining === MAX_CHARS) {
      $error.text('Wanna tweeeeeeeet?');
      return;
    } 
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $( this ).serialize(),
      success(){
        loadTweets();
        $('.new-tweet').slideToggle();
        $textarea.val('');
        $('.new-tweet .counter').text('140');
        $error.text("");
      }
     });
    });

});


