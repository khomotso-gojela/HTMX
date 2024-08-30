const express = require('express');

const router = express.Router();

const books = [
  { id: 1, name: 'The Night Circus', author: 'Erin Morgenstern', description:'A fantasy novel set in a magical competition between two young illusionists, Celia and Marco, who fall in love despite the high stakes of their rivalry. The circus, a central element, only appears at night and is filled with enchanting and mysterious wonders.' },
  { id: 2, name: 'Never Let Me Go', author: 'Kazuo Ishiguro', description:'A dystopian science fiction novel exploring the lives of clones raised for organ donation. The story delves into themes of humanity, memory, and the ethical implications of cloning, following the lives of Kathy, Tommy, and Ruth as they come to terms with their fate.' },
  { id: 3, name: 'The Road', author: 'Cormac McCarthy', description:'This Pulitzer Prize-winning novel depicts a bleak post-apocalyptic world through the journey of a father and his young son. The narrative is both harrowing and hopeful, focusing on their struggle for survival and their bond amidst the desolation.' },
  { id: 4, name: 'Pachinko', author: 'Min Jin Lee', description:'A multigenerational saga about a Korean family living in Japan. The novel explores themes of identity, resilience, and discrimination as the family members navigate their lives through war, economic hardship, and societal prejudice.' },
  { id: 5, name: 'Circe', author: 'Madeline Miller', description:`A retelling of the myth of Circe, the enchantress from Homer's "Odyssey." The novel gives Circe a voice of her own, exploring her transformation from a misunderstood nymph into a powerful and self-reliant witch.` },
  
];

// GET /books
router.get('/books', (req, res) => {
  res.render('index', { action: '', books, book: {} });
});
router.get('/', (req, res) => {
  res.render('index', { action: '', books, book: {} });
});

// GET /books/new
router.get('/books/new', (req, res) => {
  if (req.headers['hx-request']) {
    res.render('form', { book: {} });
  } else {
    res.render('index', { action: 'new', books, book: {} });
  }
});


// GET /books/1
router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((c) => c.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('book', { book });
  } else {
    res.render('index', { action: 'show', books, book });
  }
});

// GET /books/1/edit
router.get('/books/:id/edit', (req, res) => {
  const { id } = req.params;
  const book = books.find((c) => c.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('form', { book });
  } else {
    res.render('index', { action: 'edit', books, book });
  }
});

// POST /books
router.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
  };

  books.push(newBook);

  if (req.headers['hx-request']) {
    res.render('sidebar', { books }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="afterbegin">
          <p class="flash">Book was successfully added!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.render('index', { action: 'new', books, book: {} });
  }
});

// PUT /books/1
router.put('/update/:id', (req, res) => {
  const { id } = req.params;

  const newBook = {
    id: Number(id),
    name: req.body.name,
    author: req.body.author,
    description: req.body.description
  };

  const index = books.findIndex((c) => c.id === Number(id));

  if (index !== -1) books[index] = newBook;

  if (req.headers['hx-request']) {
    res.render('sidebar', { books }, (err, sidebarHtml) => {
      res.render('book', { book: books[index] }, (err, contactHTML) => {
        const html = `
          ${sidebarHtml}
          <main id="content" hx-swap-oob="true">
            <p class="flash">Book was successfully updated!</p>
            ${contactHTML}
          </main>
        `;

        res.send(html);
      });
    });
  } else {
    res.redirect(`/books/${index + 1}`);
  }
});

// DELETE /books/1
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((c) => c.id === Number(id));

  if (index !== -1) books.splice(index, 1);
  if (req.headers['hx-request']) {
    res.render('sidebar', { books }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="true">
          <p class="flash">Book was successfully deleted!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.redirect('/books');
  }
});

module.exports = router;