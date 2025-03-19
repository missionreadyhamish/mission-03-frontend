const app = require("./app");

const port = 4000;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
