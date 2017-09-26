/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
streams.users.nunonuno = [];
streams.users.jcruz = [];
window.users = Object.keys(streams.users);

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', 'covfefe', 'keyboards', 'things', 'going to', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', '#butonlyiknowhow', '#forreal', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '#praynunosbladder', '#ssp5squad', '#lit', '#Twittlethis', '#onfleek'];


var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date().toLocaleString();
  addTweet(tweet);
};

for(var i = 0; i < 20; i++){
  generateRandomTweet();
}

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};

var trendingTweets = function(){
  return tags.reduce(function(hash, item) {
    if(item.indexOf('#') !== -1) {
      hash.push(item);
    }
    return hash;
  },[]);
};

 var getUsers = function() {       
  var $users = $('.user');
  $users.html('');
  var users = window.users.sort();
  users.forEach(function(element) {
    var use = element;
    // var $user = $('<div class="user"></div>');
    var $user = $('<li></li>');
    $user.text('@' + use);
    $user.appendTo($users);
  });
}
var tweets = trendingTweets();

var getTweets = function(tweetBank) {
  var $tweets = $('.tweets');
  var $username = $('.user');
  $tweets.html('');
  var index = tweetBank.length - 1;
  while(index >= 0){
    var tweet = tweetBank[index];
    var time = tweetBank[index];
    var user = tweetBank[index];
    var $time = $('<div class="timestamp"></div>');
    var $tweet = $('<div class="message"></div>');
    var $user = $('<div class="user"></div>');
    $tweet.text(tweet.message);
    $time.text('Tweeted on: ' + tweet.created_at);
    $user.text('@' + tweet.user);
    $user.appendTo($tweets);
    $tweet.appendTo($tweets);
    $time.appendTo($tweets);
    index -= 1;
  }
}

var getHashTags = function() {
  var $hashtags = $('.trendingTags');
  $hashtags.html('')
  var tagIndex = tweets;
  tagIndex.forEach(function(element) {
    var hash = element;
    var $trending = $('<div class="hashtags"></div>');
    $trending.text(hash);
    $trending.appendTo($hashtags);
    tagIndex -= 1;
  });
}

var getUserTweets = function(user) {
  var username = user.substring(1);
  getTweets(streams.users[username])
}

