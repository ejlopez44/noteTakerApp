const fs = require('fs')


module.exports = {
    function: storeData
}

function storeData(note) {
    let obj = [];
    fs.readFileSync("/db.json", "utf8", function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data)
        obj.push(note)
        let notesArr = JSON.stringify(obj)
        fs.writeFileSync("/db.json", notesArr, (err) => {
            if (err) throw err;
        })
    })
}
