
import mssql from 'mssql';
import config from '../db/dbconfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Middleware to require authentication
export const userRequired = (req, res, next) => {
if (req.user) {
next();
} else {
return res.status(401).json({ message: 'Unauthorized user!' });
}
};

// Get all posts
export async function getAllPosts(req, res) {
try {
let pool = await mssql.connect(config.sql);
const result = await pool.request().query('SELECT * FROM posts');
res.send(result.recordset);
} catch (error) {
res.status(404).json({ error: 'Post not found' });
} finally {
pool.close();
}
}

// Create a new post
export async function createPost(req, res) {
const { title, content } = req.body;
try {
let pool = await mssql.connect(config.sql);
const result = await pool
.request()
.query('INSERT INTO posts (title, content) VALUES (@title, @content)', { title, content });
const postId = result.recordset[0].id;
if (req.user) {
  const { userId } = req.user;
  // Save the userId and postId in the database or perform any required operations
   const result2 = await pool
     .request()
     .query('INSERT INTO user_posts (user_id, post_id) VALUES (@userId, @postId)', { userId, postId });

  res.status(201).json({ message: 'Post created successfully' });
} else {
  res.status(401).json({ message: 'Unauthorized user!' });
}
} catch (error) {
res.status(404).json({ error: 'Could not create post' });
} finally {
pool.close();
}
}

// Retrieve a specific post by id
export async function getPostById(req, res) {
const { id } = req.params;
try {
let pool = await mssql.connect(config.sql);
const result = await pool.request().query('SELECT * FROM posts WHERE id = @id', { id });
const post = result.recordset[0];
res.send(post);
} catch (error) {
res.status(404).json({ error: 'Post not found' });
} finally {
pool.close();
}
}

// Update the details of a post
export async function updatePost(req, res) {
const { id, title, content } = req.body;
try {
let pool = await mssql.connect(config.sql);
const result = await pool
.request()
.query('UPDATE posts SET title = @title, content = @content WHERE id = @id', { id, title, content });
res.send(result);
} catch (error) {
res.status(404).json({ error: 'Post not found' });
} finally {
pool.close();
}
}

// Delete a post
export async function deletePost(req, res) {
const { id } = req.params;
try {
let pool = await mssql.connect(config.sql);
const result = await pool.request().query('DELETE FROM posts WHERE id = @id', { id });
res.send(result);
} catch (error) {
res.status(404).json({ error: 'Post not found' });
} finally {
pool.close();
}
}






