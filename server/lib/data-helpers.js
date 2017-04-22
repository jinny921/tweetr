"use strict";

const { ObjectID } = require("mongodb");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find({}).toArray(callback);
    },

    //increases likes in mongoDB
    likeInc: function(postid, callback) {
      db.collection("tweets").updateOne({_id:ObjectID(postid)}, {$inc: {likes: 1}}, callback);
    },

    //decreasing likes in mongoDB
    likeDec: function(postid, callback) {
      db.collection("tweets").updateOne({_id:ObjectID(postid)}, {$inc: {likes: -1}}, callback);
    }
  };
}
