const mssql = require('mssql');
const { sqlConfig } = require('../../Config/config');

const createMembersTable = async(req, res)=>{
    try {
        const table = `BEGIN
        TRY
            CREATE TABLE members(
                id VARCHAR(200) PRIMARY KEY,
                memberName VARCHAR(500) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phoneNumber VARCHAR(20) NOT NULL,
                cohort VARCHAR(100) NOT NULL
            )
        END TRY
    BEGIN
        CATCH
            
        END CATCH`;

    const pool = await mssql.connect(sqlConfig)
    await pool.query(table, (err)=>{
        if(err instanceof mssql.RequestError){ 
            console.log({Error: err.message});
        }
        else{
            // console.log('Table Created Successfully');
        }
    })

    } catch (error) {
        return res({Error: error})
    }
}

module.exports = {
    createMembersTable
}