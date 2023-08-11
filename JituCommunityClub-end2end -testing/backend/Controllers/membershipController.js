const {v4} = require('uuid');
const jwt = require('jsonwebtoken')
const mssql = require('mssql');

const { sqlConfig } = require('../Config/config');
const { createMembersTable } = require('../Database/Tables/createTables');
const { registerUserval } = require('../Validators/emailvalidator');



const registerUser = async(req,res)=>{
    try {
        const id = v4()
        const {memberName, email, phoneNumber, cohort} = req.body
        const {error} = registerUserval.validate({email})
        if (error){
            return res.status(400).json({error: "ensure your email follows the format 'fname.lname@thejitu.com' where fname and lname is your first name and last name respectively"})
        }
    
        const pool  = await mssql.connect(sqlConfig)
        if(pool.connected){
            createMembersTable()
            const result = await pool.request()
           .input('id', mssql.VarChar, id)
           .input('memberName', mssql.VarChar, memberName)
           .input('email', mssql.VarChar, email)
           .input('phoneNumber', mssql.VarChar, phoneNumber)
           .input('cohort', mssql.VarChar, cohort)
           .execute('newMember')
    
           if(result.rowsAffected==1){
            return res.json({
                message: "Project created Succesfully",
            })}
            else{
                return res.json({message: "Creation failed"})
            }
        }
    } catch (error) {
        return res.json({error})
    }
    
}



module.exports = {
    registerUser
}