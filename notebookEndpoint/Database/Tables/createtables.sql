BEGIN
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
        THROW 5001, 'Table already exists', 1;
    END CATCH