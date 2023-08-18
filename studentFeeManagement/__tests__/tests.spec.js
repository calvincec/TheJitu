import mssql from 'mssql'


/**In all the tests below, Be sure to import all the following functions from where you have implemented them
 * addStudent()                 used to add one student
 * updateFee()                  used to update fee for a student
 * fetchStudents()              used to get all students details
 * fetchOneStudent()            used to get one student details
 * removeUser()                 used delete one student from records
 */

describe("Add a new student to records",()=>{
    /*
        * In both tests below:

        * ensure the enpoint runs with a request with a body that looks like sampleBody in the tests below 
        * expects a response with the message "Student Registered successfully" if success and
        * mesage "Failed to register the student" if a failure
        * use mssql database to store the information
        * inside the controllers, the function addStudent(req, res)  will be used to add a new student

        */
    it("should successfully add a new student to the records",async()=>{
       
        const sampleBody = {
            name: "nyonje",
            class: 4,
            feeBalance: 6700,
        }
        const req = {
            body: sampleBody
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })
        await addStudent(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Student Registered successfully"
        })
    })
    
    it("should create a project",async()=>{
        
         const sampleBody = {
            name: "nyonje",
            class: 4,
            feeBalance: 6700,
         }
         const req = {
             body: sampleBody
         }
         jest.spyOn(mssql, "connect").mockResolvedValueOnce({
             request:jest.fn().mockReturnThis(),
             input: jest.fn().mockReturnThis(),
             execute: jest.fn().mockResolvedValueOnce({
                 rowsAffected: [0]
             })
         })
         await addStudent(req, res)
         expect(res.json).toHaveBeenCalledWith({
             message: "Failed to register the student"
         })
     })
})



describe("Updating fee balance ", ()=>{
    /*
        * In both tests below:

        * ensure the enpoint runs with a request with a body that looks like mockBody 
        * expects a response with the message "Fee balance changed successfully" if success and
        * mesage 'student records not found' if a failure
        * use mssql database to store the information
        * inside the controllers, the function updateFee(req, res)  will be used to update fee for a student

        */
    it("should update student's fee balance in a success", async()=>{
        const stdid = 'hcejciejceo'
        const mockBody = {
            feeBalance: 8903,
        }
        const req = {
            params:{
                stdid:stdid
            },
            body: mockBody
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })

        await updateFee(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Fee balance changed successfully"
        })
    })

    it("ought to error out when the student id is not found", async ()=>{
        const stdid = 'jfekkfjef'
        const mockBody = {
            feeBalance: 849488,
        }
        const req = {
            params:{
                stdid:stdid
            },
            body: mockBody
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            })
        })

        await updateFee(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: 'student records not found'
        })
    }) 
})







describe("Getting all student details", ()=>{
    it('should get student details successfully', async()=>{
        /*
        * ensure the enpoint runs with no request but expects a response with the details as in sampleDetails below
        * use mssql database to store the information
        * inside the controllers, the function fetchStudents(req, res)  will be used to fetch all students

        */

        const sampleDetails = [
            {
                stdid: "vshcvshxs",
                name: "nyonje",
                class: 4,
                feeBalance: 6700,

            },
            {
                stdid: "jnkdcdkc",
                name: "mike",
                class: 8,
                feeBalance: 89000,
            }
        ]

        const req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: sampleDetails
                })
            })

            await fetchStudents(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({students: sampleDetails})
    })  
})

describe("Getting details for one student", ()=>{
    it('should get details for one student in a success', async()=>{
        /*
        * ensure the enpoint runs with one request parameter(student id) and expects a response with the details of one student
        * use mssql database to store the information and get
        * inside the controllers, the function fetchOneStudent(req, res)  will be used to fetch one student's details

        */
        const stdid = 'sryiuaraw1234'
        const sampleDetail = {
            stdid: "vshcvshxs",
            name: "nyonje",
            class: 4,
            feeBalance: 6700,
        }

        const req = {
            params: {
                id: stdid
            }
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [sampleDetail]
            })
        })

        await fetchOneStudent(req, res)
        expect(res.json).toHaveBeenCalledWith({student: [sampleDetail]})
        expect(res.status).toHaveBeenCalledWith(200)
    })

})

describe("Delete a student record", ()=>{
    it('Successfully delete record for one student', async()=>{
        /*
        * ensure the enpoint runs with one request parameter(student id) and expects a response with the messaage 'Student removed from the active records'
        * use mssql database to store the information and get
        * inside the controllers, the function removeUser(req, res)  will be used to delete records for one student

        */
        const stdid = 'sryiuaraw1234'
        const req = {
            params:{
                stdid: stdid
            }
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })

        await removeUser(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: 'Student removed from the active records'
        })     
    })

    it("should return an error when student id entered is not available", async()=>{
        /** 
        * ensure the enpoint runs with one request parameter(student id) and 
        * expects a response with the message 'Not an active student'
        * use mssql database to store the information and get
        * inside the controllers, the function removeUser(req, res)  will be used to delete records for one student

        */
        const stdid = 'sryiuaraw1234'
        const req = {
            params:{
                stdid: stdid
            }
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [0]
            })
        })

        await removeUser(req, res)


        expect(res.json).toHaveBeenCalledWith({
            message: 'Not an active student'
        })
    })

})