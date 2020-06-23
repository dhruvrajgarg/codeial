const Post = require("../models/post");

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

      return res.render("home", {
        title: "Home",
        posts: fetchedPosts,
      });
    });
};

// module.exports.actionName = function(req, res){}
