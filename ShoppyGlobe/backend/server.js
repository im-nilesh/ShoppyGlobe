import express from "express";

const app = new express();

const port = 5100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
