const path = require('path'); // Add this at the very top

// Replace your old app.use line with this:
app.use(express.static(path.join(__dirname, 'public')));

// Add this "Safety Route" at the very bottom (above http.listen)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
