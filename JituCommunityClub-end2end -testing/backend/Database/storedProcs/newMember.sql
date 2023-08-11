-- BEGIN
--         TRY
--             CREATE TABLE members(
--                 id VARCHAR(200) PRIMARY KEY,
--                 memberName VARCHAR(500) NOT NULL,
--                 email VARCHAR(100) NOT NULL,
--                 phoneNumber VARCHAR(20) NOT NULL,
--                 cohort VARCHAR(100) NOT NULL
--             )
--         END TRY
--     BEGIN
--         CATCH
--             THROW 50001, 'Table already Exists!', 1;
--         END CATCH
 
--  SELECT * from members

CREATE OR ALTER PROCEDURE newMember(@id VARCHAR(200), @memberName VARCHAR(500), @email VARCHAR(100), @phoneNumber VARCHAR(20)
, @cohort VARCHAR(100))
AS
BEGIN
    INSERT INTO members(id, memberName, email, phoneNumber, cohort) VALUES (@id , @memberName, @email, @phoneNumber, @cohort)
END
