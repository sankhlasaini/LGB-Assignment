// Dependency
const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const multer = require('multer');
const upload = multer({ dest: 'storage/' });
const app = express();

// Variables
const port = 3001;
const fileToRead = 'wc.txt';

// Read Given File
readFile(fileToRead);

// This will Read the file given in args and Print it on the Console.
function readFile(file) {
    fs.readFile('./storage/' + file, (err, data) => {
        console.log('\nThis is the Content of ' + fileToRead + '--------------------------------' + '\n\n');
        console.log(data.toString());
        console.log('\n\n' + 'File Content ends here ' + '--------------------------------------');
    });
    return '';
}

// This Get API is to get concatenation of two Query Parameters
app.get('/getProduct', (req, res) => {
    if (Object.keys(req.query).length == 2) {
        let sum = '';
        for (const key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                sum += req.query[key];
            }
        }
        res.status(200).send({ success: true, concatenation: sum })
    } else {
        res.status(400).send({ success: false, msg: 'Please Provide 2 Parameters' });
    }
});


// This Post API is to Upload a File and Save it into storage Folder
app.post('/uploadFile', upload.single('file'), (req, res) => {
    console.log('uploadFile', req.file);
    fs.renameSync('./storage/' + req.file.filename, './storage/' + req.file.originalname, (err) => {
        console.log(err);
    });
    res.status(200).send({ success: true, msg: 'File Saved in Storage Folder' });
});


// This Get API is to get First Non Repeating Char from a Given String in Query Params.
app.get('/getNonRepeatingChar', (req, res) => {
    if (Object.keys(req.query).length == 1) {
        let inputString = '';
        let result;
        for (const key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                inputString = req.query[key];
            }
        }
        for (let i = 0; i < inputString.length; i++) {
            let c = inputString.charAt(i);
            if (inputString.indexOf(c) == i && inputString.indexOf(c, i + 1) == -1) {
                result = c;
                break;
            }
        }
        if (result) {
            res.status(200).send({ 'firstNonRepeatingChar': result, success: true });
        } else {
            res.status(500).send({ success: false, msg: 'First Non Repeating Char NOT found in ' + inputString })
        }
    } else {
        res.status(400).send({ success: false, msg: 'Please Provide 1 String Parameters' });
    }
});


// This Get API is for Web Crawler for Given Web URL in Quesry Param.
app.get('/webCrawler', (req, res) => {
    if (Object.keys(req.query).length == 1) {
        let website = '';
        for (const key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                website = req.query[key];
                request(website, (error, response, body) => {
                    var allAbsoluteLinks = new Set();
                    var imagesUrl = new Set();
                    if (error) {
                        // ON ERROR
                        // console.log("Error: ", error);
                        res.send({
                            success: false,
                            error: error.message
                        })
                    } else if (response && response.statusCode === 200) {
                        // ON SUCCESS
                        var $ = cheerio.load(body);
                        // GET IMAGES
                        $("body").find("img").each(el => {
                            imagesUrl.add($("body").find("img")[el].attribs.src);
                        });
                        // GET URLS
                        $("a[href^='http']").each(function () {
                            allAbsoluteLinks.add($(this).attr('href'));
                        });
                        res.send({
                            success: true,
                            urls: Array.from(allAbsoluteLinks),
                            images: Array.from(imagesUrl)
                        });
                    } else {
                        res.send({
                            success: false
                        })
                    }
                });
            }
        }
    } else {
        res.status(400).send({ success: false, msg: 'Please Provide 1 Parameters With Website URL' });
    }
});

// Starting the Server
app.listen(port, () => {
    console.log('Server is Running on ' + port);
});

module.exports = {
    app: app,
    readFile: readFile
}