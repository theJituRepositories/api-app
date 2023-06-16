import mssql from 'mssql'
import config from '../db/dbconfig.js';

// get all comments 
export async function getAllComments() {
    try {
        const pool = new mssql.ConnectionPool(config.sql);
        const request = new mssql.Request(pool);
        const result = await request.query("SELECT * FROM comments");
        res.send(result.recordset);
    } catch (error) {
        res.status(404).json({error:'Comment not found'});
    } finally {
        pool.close();
    }
}



// create a new comment 
export async function createComment(comment) {
    try {
        const pool = new mssql.ConnectionPool(config.sql);
        const request = new mssql.Request(pool);
        const result = await request.query("INSERT INTO comments (content, post_id) VALUES (@content, @post_id)", { content: comment.content, post_id: comment.post_id });
        res.send(result);
    } catch (error) {
        res.status(404).json({error:'couldnt create comment'});
    } finally {
        pool.close();
    }
}
// Retrieve information about a specific comment by id
export async function getCommentById(id) {
    try {
        const pool = new mssql.ConnectionPool(config.sql);
        const request = new mssql.Request(pool);
        const result = await request.query("SELECT * FROM comments WHERE id = @id", { id });
        return result.recordset[0];
    } catch (error) {
        res.status(404).json({error:'Comment not found'});
    } finally {
        pool.close();
    }
}
// update the details of a comment
export async function updateComment(comment) {
    try {
        const pool = new mssql.ConnectionPool(config.sql);
        const request = new mssql.Request(pool);
        const result = await request.query("UPDATE comments SET content = @content WHERE id = @id", { content: comment.content, id: comment.id });
        return result.recordset[0];
    } catch (error) {
        res.status(404).json({error:'Comment not found'});
    } finally {
        pool.close();
    }
}

// delete a comment
export async function deleteComment(id) {
    try {
        const pool = new mssql.ConnectionPool(config.sql);
        const request = new mssql.Request(pool);
        const result = await request.query("DELETE FROM comments WHERE id = @id", { id });
        return result.recordset[0];
    } catch (error) {
        res.status(404).json({error:'Comment not found'});
    } finally {
        pool.close();
    }
}