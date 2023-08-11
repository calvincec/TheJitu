import mssql from 'mssql'
import { registerUser } from './membershipController'

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}


describe('membership controller', ()=>{
    describe('Add a new member successfully', ()=>{
        const id = "scjcjcdcd"
        const req = {body: {
            memberName: "Calvincedemo",
            email: "fname.lname@thejitu.net",
            phoneNumber: "07837382",
            cohort: "previus"
        }
            
        }
        it('should add a new member in a success', async()=>{
            const mockedInput = jest.fn().mockReturnThis()

            const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})
    
            const mockedRequest ={
                input: mockedInput,
                execute: mockedExecute
            }
    
            const mockedPool ={
                request: jest.fn().mockReturnValue(mockedRequest)
            }
    
            jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)
    
            await registerUser(req, res)
            expect(res.json).toHaveBeenCalledWith({
                message: 'Project created Succesfully'
            })
    
        })
    })
     
})