const mssql = require ('mssql');
const { sqlConfig } = require('../../Config/config');

const createStudentFeeTable = async(req, res)=>{
    try {
        const table = `
        BEGIN 
        TRY
            CREATE TABLE students(
                stdid VARCHAR(200) PRIMARY KEY,
                name VARCHAR(500) NOT NULL,
                class INT NOT NULL,
                feeBalance INT NOT NULL
            )
        END TRY
    BEGIN   
        CATCH
            THROW 50001, 'Table already Exists!', 1;
        END CATCH`;

    const pool = await mssql.connect(sqlConfig)

    
    await pool.request().query(table, (err)=>{
        if(err instanceof mssql.RequestError){

            console.log({Error: err.message});
        }else{
            console.log('Table created Successfully');
        }
    })

    } catch (error) {
        console.log(error);
        return ({Error: error})
    }
}


module.exports = {
    createStudentFeeTable
}