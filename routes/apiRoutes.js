const fs = require('fs')
let notesFile = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');
// const stores = require('../db/stores.js')


module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) throw err;
            notesDb = JSON.parse(data)
            res.json(notesDb);
        });
    })


    app.post("/api/notes", function (req, res) {
        let newNote = req.body
        newNote.id = uuidv4()
        let notesDb = [];
        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) throw err;
            notesDb = JSON.parse(data)
            notesDb.push(newNote)
            let newNotesDb = JSON.stringify(notesDb)
            fs.writeFile("./db/db.json", newNotesDb, (err) => {
                if (err) throw err;
                return res.json(notesFile)
            })
        })
    })

    app.delete("/api/notes/:id", function (req, res) {
        console.log(req.params.id)
        noteID = req.params.id
        // res.end()
        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) throw err;
            let notesDb = JSON.parse(data)
            // loop through the data and find a match for the id in question
            for (let i = 0; i < notesDb.length; i++) {
                if (notesDb[i].id === noteID) {
                    console.log('Here\'s your match!')
                    console.log(notesDb[i])
                    notesDb.splice(i, 1)
                }
            }
            let newNotesDb = JSON.stringify(notesDb)
            fs.writeFile("./db/db.json", newNotesDb, (err) => {
                if (err) throw err;
                return res.json(notesFile)
            })
        })
    })
};