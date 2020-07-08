import express from 'express';

const port = 3000;
const app = express();
app.get("/", (req: express.Request, resp: express.Response) => {
    console.log(req, resp);
    resp.send("foo")
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));