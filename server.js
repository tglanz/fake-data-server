const express = require("express");
const path = require("path");
const morgan = require("morgan");

const argv = require("minimist")(process.argv.slice(2));
const PORT = argv.port || 3000;
const FAKE_DATA_DIR = argv.fakeDataDir || './fake-data';

console.log("Read args", {
    PORT, FAKE_DATA_DIR
})

const app = express();
app.use(morgan("tiny"))

app.get("*", (req, res) => {
    try {
        const fakeResponsePath = `${FAKE_DATA_DIR}${req.url}.json`
        const json = require(fakeResponsePath);
        res.status(200).send(json);
    } catch (error){
        res.status(500).send(error.message);
    }
})

app.listen(PORT, () => {
    console.log(``);
    console.log(`Server has started on port ${PORT}.`);
    console.log(`To fake get responses, add files to "${FAKE_DATA_DIR}"/exact/route/to/fake.json.`);
    console.log(``);
})