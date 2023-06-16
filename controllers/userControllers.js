import mssql from "mssql";
import config from '../db/dbconfig.js';



//get all users from database

export async function getAllUsers() {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request.query("SELECT * FROM users");
        res.send(result.recordset);
    } catch {
        res.status(404).json({error:'User not found'});
    } finally {
        pool.close();
    }
}

// get a single user from the database
export async function getUserById(id) {
    try {
    let pool = await sql.connect(config.sql)
        const result = await pool.request()
        .query("SELECT * FROM users WHERE id = @id", { id });
        res.send(result.rowsAffected)
    return result.recordset[0];
    } catch (error) {
        res.status(404).json({error:'User not found'});
    } finally {
        pool.close();
    }
}

// add a new user to the database


export async function addUser(user) {
    
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('email', sql.VarChar, email)
        .query("INSERT INTO users (user_id,username, password,email) VALUES (@user_id,@username, @password,@email)", { user_id:user.user_id , username: user.username, password: user.password, email:user.email });
        res.send(result);
    } catch (error) {
        res.status(404).json({error:'User not found'});
    } finally {
        pool.close();
    }
}

// update a user in the database
export async function updateUser(user) {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request.query("UPDATE users SET username = @username, password = @password WHERE id = @id", { username: user.username, password: user.password, id: user.id });
        res.send(JSON.stringify(result));
    } catch (error) {
        res.status(404).json({error:'User not found'});
        
    } finally {
        pool.close();
    }
}

// delete a user from the database
export async function deleteUser(id) {
    try {
        let pool = await sql.connect(config.sql);
        const result = await request.query("DELETE FROM users WHERE id = @id", { id });
        res.send(result);
    } catch (error) {
        res.status(404).json({error:'User not found'});
    }
    finally {
        pool.close();
    }
}