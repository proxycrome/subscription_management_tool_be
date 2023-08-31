import app from "./server.js";

const port = process.env.PORT || 6000;



app.listen(port, () => {
    console.log(`Server connected at http://localhost:${port}`);
})