import mssql from 'mssql'
import { getallnotes, newNote } from './notebookController'

describe("Notebook Controller", ()=>{
    describe("Adding a note", ()=>{
        it("should create a new note",async()=>{
            // const ID= "xexsx"
             const mockBody = {
                title: "Eat",
                content: "go for a pizza",
                createdAt: "2023-04-04"
             }
             const req = {
                 body: mockBody
             }
 
             jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                 request:jest.fn().mockReturnThis(),
                 input: jest.fn().mockReturnThis(),
                 execute: jest.fn().mockResolvedValueOnce({
                     rowsAffected: [1]
                 })
             })
             await newNote(req, res)
 
             expect(res.json).toHaveBeenCalledWith({
                 message: "Note added Succesfully"
             })
         })
         it("should return error if note not added",async()=>{
            // const ID= "xexsx"
             const mockBody = {
                title: "Eat",
                content: "go for a pizza",
                createdAt: "2023-04-04"
             }
             const req = {
                 body: mockBody
             }
 
             jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                 request:jest.fn().mockReturnThis(),
                 input: jest.fn().mockReturnThis(),
                 execute: jest.fn().mockResolvedValueOnce({
                     rowsAffected: [0]
                 })
             })
             await newNote(req, res)
 
             expect(res.json).toHaveBeenCalledWith({
                 message: "Creation failed"
             })
         })

    })
    describe("Getting all notes", ()=>{
        it("should return all notes successfully" , async()=>{
            const mocknote = [
                {
                    ID: "24a7143f-dbd5-4f76-b922-62c9237dbc2b",
                    title: "Eat",
                    content: "go for a pizza",
                    createdAt: "2023-04-04T00:00:00.000Z"
                  },
                  {
                    ID: "616bd8c6-4ca8-4f88-92d7-f36cb4e70b8d",
                    title: "Eat",
                    content: "go for a pizza",
                    createdAt: "2023-04-04T00:00:00.000Z"
                  }
            ]
            const res = ({notes: [mocknote]})
            const req = {}
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mocknote
                }) 
            }) 
            await getallnotes(req, res)
   
            // expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({notes: mocknote})
        }) 
    })

})