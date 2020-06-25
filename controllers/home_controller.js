const Post = require("../models/post");
const User = require('../models/user'); 
module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({
      path : "comments",
      populate : {
        path : "user"
      }
    })
    .exec(function (err, fetchedPosts) {
      if (err) {
        console.log("Error in Fetching posts", err);
        return;
      }
      //console.log(Post.populated('user'));
      User.find({}, function(err , fetchedUsers){
        if (err) {
          console.log("Error in Fetching users", err);
          return;
        }
        return res.render("home", {
          title: "Home",
          posts: fetchedPosts,
          all_users : fetchedUsers
        });
      });
    });
};

// module.exports.actionName = function(req, res){}
