const pool = require('../config/db.mysql');

exports.getAll = async () => {
  const [rows] = await pool.query(`
    SELECT 
        b.id, 
        b.title, 
        a.name as author,
        GROUP_CONCAT(g.name SEPARATOR ', ') as genre,
        b.published_year,
        b.number_of_pages,
        b.language,
        b.publisher,
        b.synopsis,
        b.img_url,
        b.created_at,
        b.updated_at
    FROM books b
    LEFT JOIN authors a
    ON b.author_id = a.id
    LEFT JOIN book_genres bg ON b.id = bg.book_id
    LEFT JOIN genres g ON g.id = bg.genre_id
    GROUP BY b.id, b.title;
  `);
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await pool.query(`
    SELECT 
        b.id, 
        b.title, 
        a.name AS author,
        GROUP_CONCAT(g.name SEPARATOR ', ') AS genre,
        b.published_year,
        b.number_of_pages,
        b.language,
        b.publisher,
        b.synopsis,
        b.img_url,
        b.created_at,
        b.updated_at
    FROM books b
    LEFT JOIN authors a ON b.author_id = a.id
    LEFT JOIN book_genres bg ON b.id = bg.book_id
    LEFT JOIN genres g ON g.id = bg.genre_id
    WHERE b.id = ?
    GROUP BY b.id, b.title;
  `,
    [id]
  );
  return rows[0];
};

exports.getByAuthor = async (author) => {
  const [rows] = await pool.query(`
    SELECT 
        b.id, 
        b.title, 
        a.name AS author,
        GROUP_CONCAT(g.name SEPARATOR ', ') AS genre,
        b.published_year,
        b.number_of_pages,
        b.language,
        b.publisher,
        b.synopsis,
        b.img_url,
        b.created_at,
        b.updated_at
    FROM books b
    LEFT JOIN authors a ON b.author_id = a.id
    LEFT JOIN book_genres bg ON b.id = bg.book_id
    LEFT JOIN genres g ON g.id = bg.genre_id
    WHERE a.name LIKE ?
    GROUP BY b.id, b.title;
  `,
    ['%'+author+'%']
  );
  return rows;
};

exports.getByGenre = async (genre_id) => {
  const [rows] = await pool.query(`
    SELECT 
        b.id, 
        b.title, 
        a.name AS author,
        GROUP_CONCAT(g.name SEPARATOR ', ') AS genre,
        b.published_year,
        b.number_of_pages,
        b.language,
        b.publisher,
        b.synopsis,
        b.img_url,
        b.created_at,
        b.updated_at
    FROM books b
    LEFT JOIN authors a ON b.author_id = a.id
    LEFT JOIN book_genres bg ON b.id = bg.book_id
    LEFT JOIN genres g ON g.id = bg.genre_id
    WHERE bg.genre_id =  ?
    GROUP BY b.id, b.title;
  `,
    [genre_id]
  );
  return rows;
};

exports.getAuthors = async () => {
  const [rows] = await pool.query(`
    SELECT 
        a.name AS author
    FROM authors a;
  `
  );
  return rows;
};

exports.getGenres = async () => {
  const [rows] = await pool.query(`
    SELECT 
        g.name AS genre
    FROM genres g;
  `
  );
  return rows;
};

exports.create = async (data) => {    
    let authorId = await createAuthor(data.author)

    const genreIds = await createGenre(data.genres)

    fields = [];
    values = [];
    placeholders = [];
    let bookId = null;
    delete data.genres

    for (const key in data) {
        if (key == 'author') {
            fields.push('author_id');
            values.push(authorId);
        } else {
            fields.push(key);
            values.push(data[key]);
        } 
        placeholders.push('?');
    }

    const [resultBook] = await pool.query(
        `INSERT INTO books (${fields.join(', ')}) VALUES (${placeholders.join(', ')})`,
        values
    );

    bookId = resultBook.insertId
    const genreValues = genreIds.flatMap((genreId) => [bookId, genreId])

    const [resultGenre] = await pool.query(
        `INSERT INTO book_genres (book_id, genre_id) VALUES ${genreIds.map(() => '(?, ?)').join(', ')}`,
        genreValues
    );

    return { id: bookId };
};

exports.update = async (id , {title, author, genres, published_year, number_of_pages, language, publisher, synopsis, img_url}) => {
    let authorId = await createAuthor(author)
    const genreIds = await createGenre(genres)
    await pool.query(
        'UPDATE books SET title = ?, author_id = ?, published_year = ?, number_of_pages = ?, language = ?, publisher = ?, synopsis = ?, img_url = ? WHERE id = ?',
        [title, authorId, published_year, number_of_pages, language, publisher, synopsis, img_url, id]
    );

    const [resultDeleteGenre] = await pool.query('DELETE FROM book_genres WHERE book_id = ?', [id]);

    const genreValues = genreIds.flatMap((genreId) => [id, genreId])
    const [resultGenre] = await pool.query(
        `INSERT INTO book_genres (book_id, genre_id) VALUES ${genreIds.map(() => '(?, ?)').join(', ')}`,
        genreValues
    );

    return { id, title};
};

exports.updatePartial = async (id , data) => {
    const fields = { ...data };
    console.log(fields)
    if(fields.author) {
        let authorId = await createAuthor(data.author)
        fields.author_id = authorId;
        delete fields.author;
    }

    if (data.genres) {
        const [resultDeleteGenre] = await pool.query('DELETE FROM book_genres WHERE book_id = ?', [id]);
        genreIds = await createGenre(data.genres)
        const genreValues = genreIds.flatMap((genreId) => [id, genreId])
        const [resultGenre] = await pool.query(
            `INSERT INTO book_genres (book_id, genre_id) VALUES ${genreIds.map(() => '(?, ?)').join(', ')}`,
            genreValues
        );
        delete fields.genres
    }

    if (Object.keys(fields).length > 0) {
      const setClause = Object.keys(fields).map(key => `${key} = ?`).join(', ');
      const values = Object.values(fields);
      console.log(`UPDATE books SET ${setClause} WHERE id = ?`)
      await pool.query(`UPDATE books SET ${setClause} WHERE id = ?`, [...values, id]);
    }

    return { id };
};

exports.remove = async (id) => {
    await pool.query('DELETE FROM books WHERE id = ?', [id]);
    return { deleted: true };
};


const createAuthor = async (author) => {
    let authorId = null;
    console.log(author)
    const [rowsAuthor] = await pool.query(
        'SELECT id FROM authors WHERE name = ?',
        [author]
    );
    if (rowsAuthor.length > 0) {
        authorId = rowsAuthor[0].id;
    } 
    else {
        const [resultAuthor] = await pool.query(
            'INSERT INTO authors (name) VALUES (?)',
            [author]
        );
        authorId = resultAuthor.insertId;
    }
    
    return authorId;
};

const createGenre = async (genres) => {
    const genreIds = []
    for (const genreName of genres) {
        const [existing] = await pool.query(
            'SELECT id FROM genres WHERE name = ?',
        [genreName]
        );
        
        if(existing.length > 0) {
            genreIds.push(existing[0].id);
        } 
        else {
            const [inserted] = await pool.query(
                'INSERT INTO genres (name) VALUES (?)',
            [genreName]
        );
            genreIds.push(inserted.insertId);
        }
    }

    return genreIds
}