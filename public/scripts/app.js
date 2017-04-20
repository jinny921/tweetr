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
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function createTweetElement(tweet) {
    return `<article>
              <header>
                <img class="avatar" src="${escape(tweet.user.avatars.small)}">
                <div class="fullName">${escape(tweet.user.name)}</div>
                <div class="userAcc">${escape(tweet.user.handle)}</div>
              </header>
              <div class="content">
                <p>${escape(tweet.content.text)}</p>
              </div>
              <footer>
                <p>${escape(moment(tweet.created_at).fromNow())}</p>
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
  };

  function loadTweets(tweets) {
    $.ajax({
      method: "GET", 
      url: "/tweets",
      success: renderTweets
    });
  };

  renderTweets(tweetData);

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
        $('.new-tweet textarea').val('');
        $('.new-tweet .counter').text('140');
      }
     });
    });
});


