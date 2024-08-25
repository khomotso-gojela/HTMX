import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle POST request for contacts search from jsonplaceholder
app.post('/search/api', async (req, res) => {
  const searchTerm = req.body.search.toLowerCase();

  if (!searchTerm) {
    return res.send('<tr></tr>');
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const contacts = await response.json();

  const searchResults = contacts.filter((contact) => {
    const name = contact.name.toLowerCase();
    const email = contact.email.toLowerCase();

    return name.includes(searchTerm) || email.includes(searchTerm);
  });

  setTimeout(() => {
    const searchResultHtml = searchResults
      .map(
        (contact) => `
      <tr>
        <td><div class="my-4 p-2">${contact.name}</div></td>
        <td><div class="my-4 p-2">${contact.email}</div></td>
      </tr>
    `
      )
      .join('');

    res.send(searchResultHtml);
  }, 1000);
});

app.listen(3000, () => console.log('Server started on port 3000'));