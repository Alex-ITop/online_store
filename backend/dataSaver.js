const { json } = require("express");
let xlsx = require("xlsx");

async function getData(jsonObject, name) {
    var myWorkSheet = xlsx.utils.json_to_sheet(jsonObject);
    var myWorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(myWorkBook, myWorkSheet, "myWorkSheet");
    xlsx.writeFile(myWorkBook, `${name}`, {bookType: 'xlsx', type: 'buffer'});
}

module.exports = getData;