import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/calculate', (req, res) => {
    const {height,weight} = req.body
    let BMI = weight / (height* height)

    res.send(`<p>Height of ${height} & Weight of ${weight} gives you BMI of ${BMI.toFixed(2)}</p>`);
})

// Start the server
app.listen (3000, ()=>{
console. log('Server listening on port 3000');
});
