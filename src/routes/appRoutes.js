import { createComment, deleteComment, getAllComments, getCommentById, updateComment } from "../../controllers/commentControllers.js";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../../controllers/postController.js";
import { addUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../controllers/userControllers.js";
import authenticateJWT from  '../../midddleware/middleware.js'
const appRoutes = (app) => {
    app.route("/users")
        .get(getAllUsers, (req, res) => {
        })
        .post(addUser, (req, res) => {

        });
    app.route("/users/:id")
        .get(getUserById, (req, res) => { })
        .put(updateUser, (req, res) => { })
        .delete(deleteUser, (req, res) => { });     
    
    app.route("/posts")
        .get(getAllPosts, (req, res) => {
        })
        .post(createPost,authenticateJWT, (req, res) => {
        });
    app.route("/posts/:id")
        .get(getPostById, (req, res) => {
        })
        .put(updatePost, (req, res) => {
        })
        .delete(deletePost, (req, res) => {
        })
    app.route("/comments")
        .get(getAllComments, (req, res) => {
        })
        .post(createComment, (req, res) => {
        });
    app.route("/comments/:id")
        .get(getCommentById, (req, res) => {
        })
        .put(updateComment, (req, res) => {
        })
        .delete(deleteComment, (req, res) => {
        })
}

export default appRoutes