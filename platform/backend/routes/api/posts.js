const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/post');

//route POST api/posts
//@desc     create a post
//@access private
router.post(
	'/',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const newPost = {
				text: req.body.text,
				name: user.name,
				avatar: user.avartar,
				user: req.user.id,
            };

            post = new Post(newPost);
            await post.save();
            res.json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error from create post');
		}
	}
);

//route GET api/posts
//@desc     get all posts
//@access private

router.get("/", auth, async (req, res) =>
{
    try {

        const posts = await Post.find().sort({
            date:-1
        });
        res.json(posts);

    } catch (error)
    {

			console.error(error.message);
			res.status(500).send('Server error from get post');
    }
})


//route GET api/posts/:id
//@desc     get post by id
//@access private

router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found with this id' });
		}
		res.json(post);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error from get post');
	}
});


//route DELETE api/posts/:id
//@desc    delete post by id
//@access private

router.delete('/:id', auth, async (req, res) => {
	try {
        const post = await Post.findById(req.params.id);

        if (post.user.toString() != req.user.id)
        {
            return res.status(401).json({ msg: 'user not authorized' });

        }

        await post.deleteOne();
        res.json({msg:'Post removed!'})

	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error from delete post');
	}
});



//route PUT api/posts/like/:id
//@desc    like a post
//@access private
router.put('/like/:id', auth, async (req, res) =>
{
    try {

        const post = await Post.findById(req.params.id);

        //check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
        {
            return res.status(400).json({ msg: 'Post already liked' });

        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);


    } catch (error)
    {
        console.error(error.message);
        res.status(500).send("Server error")

    }
})




//route PUT api/posts/unlike/:id
//@desc    like a post
//@access private
router.put('/unlike/:id', auth, async (req, res) =>
{
    try {

        const post = await Post.findById(req.params.id);

        //check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0)
        {
            return res.status(400).json({ msg: 'Post has not yet been liked' });

        }

        //get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex,1);

        await post.save();

        res.json("unliked done");


    } catch (error)
    {
        console.error(error.message);
        res.status(500).send("Server error")

    }
})


//route POST api/posts/comment/:id
//@desc     create a comment on a post
//@access private
router.post(
	'/comment/:id',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
            const user = await User.findById(req.user.id).select('-password');

            const post = await Post.findById(req.params.id);


			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

            post.comments.unshift(newComment);

            await post.save();
            res.json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error from posting comment on a post');
		}
	}
);

// route DELETE api/posts/comment/:id/:comment_id
// @desc     delete a comment on a post
// @access   private
router.delete(
  '/comment/:id/:comment_id',
  [auth],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Find the comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      // Check if the comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      // Check user authorization
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      // Get the index of the comment to be removed
      const removeIndex = post.comments
        .map((comment) => comment.id.toString())
        .indexOf(req.params.comment_id);

      // Remove the comment from the comments array
        post.comments = post.comments.filter(
            (comment) => comment.id !== req.params.comment_id
        );

      // Save the post after removing the comment
      await post.save();

      res.json({ msg: 'Comment removed', post });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error while deleting comment');
    }
  }
);

module.exports = router;


