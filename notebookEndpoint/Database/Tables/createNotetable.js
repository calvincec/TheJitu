const mssql = require('mssql');
const { sqlConfig } = require('../../Config/config');


const createTable = async(req, res)=>{
    try {
        const table = `BEGIN
        TRY
            CREATE TABLE notesTable(
                ID VARCHAR(40) PRIMARY key,
                title VARCHAR(100) NOT NULL,
                content VARCHAR(1000) NOT NULL,
                createdAt DATE NOT NULL
            )
        END TRY
    BEGIN
        CATCH
            THROW 50001, 'Table already exists', 1;
        END CATCH`;

    const pool = await mssql.connect(sqlConfig)

    await pool.query(table, (err)=>{
        if(err instanceof mssql.RequestError){
            console.log({Error: err.message});
        }
        else{
            console.log('Table Created Successfully');
        }
    })

    } catch (error) {
        return res({Error: error})
    }
}
createTable()

module.exports = {
    createTable
}
