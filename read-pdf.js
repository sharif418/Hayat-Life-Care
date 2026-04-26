const fs = require('fs');
const pdf = require('pdf-parse');
let dataBuffer = fs.readFileSync('/Users/sharifmohammadnasrullah/Downloads/Hayat Life Care Brochure-2026-2D-3mb (1).pdf');
pdf(dataBuffer).then(function(data) {
    console.log(data.text);
});
