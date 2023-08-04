CREATE OR ALTER PROCEDURE updateNote(@ID VARCHAR(40), @title  VARCHAR(100), @content VARCHAR(1000), @createdAt DATE)
AS
    BEGIN
        UPDATE notesTable SET title = @title, content = @content, createdAt = @createdAt WHERE ID= @ID
    END