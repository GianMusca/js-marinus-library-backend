const service = require('../services/book.service');

exports.getAll = async (req, res) => {
  try {
    const books = await service.getAll();
    res.json(books)
  } catch(err) {
    res.status(500).json({ error: 'Error getting the books' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await service.getById(req.params.id);
    if (!book)
      return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Error getting the book' });
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await service.getByAuthor(req.params.author);
    if (!books)
      return res.status(404).json({ error: 'Books not found' });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error getting the books' });
  }
};

exports.getBooksByGenre = async (req, res) => {
  try {
    const books = await service.getByGenre(req.params.genre);
    if (!books)
      return res.status(404).json({ error: 'Books not found' });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error getting the books' });
  }
};

exports.getBooksGenres = async (req, res) => {
  try {
    const genres = await service.getGenres();
    res.json(genres)
  } catch(err) {
    res.status(500).json({ error: 'Error getting the genres' });
  }
};

exports.getBooksAuthors = async (req, res) => {
  try {
    const authors = await service.getAuthors();
    res.json(authors)
  } catch(err) {
    res.status(500).json({ error: 'Error getting the authors' });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = await service.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Error creating the book' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await service.update(req.params.id, req.body);
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Error updating the book' });
  }
};

exports.updatePartialBook = async (req, res) => {
  try {
    const updatedBook = await service.updatePartial(req.params.id, req.body);
    res.json(updatedBook);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error updating the book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await service.remove(req.params.id);
    res.json(deletedBook);
  } catch (err) {
    res.status(500).json({ error: 'Error deleting the book' });
  }
};