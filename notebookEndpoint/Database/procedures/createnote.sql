CREATE OR ALTER PROCEDURE addNote(@ID VARCHAR(200), @title VARCHAR(500), @content VARCHAR(1000), @createdAt DATE)
AS
BEGIN
    INSERT INTO notesTable(ID, title, content, createdAt) VALUES(@ID, @title, @content, @createdAt)
END

SELECT *FROM notesTable