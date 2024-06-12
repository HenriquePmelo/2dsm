"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function countOccurrences(text) {
    var words = text.split(/\s+/);
    var occurrences = new Map();
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        var cleanedWord = word.replace(/[,.:;]/g, '').toLowerCase();
        if (cleanedWord !== '') {
            occurrences.set(cleanedWord, (occurrences.get(cleanedWord) || 0) + 1);
        }
    }
    var punctuations = text.match(/[,.:;]/g);
    if (punctuations) {
        for (var _a = 0, punctuations_1 = punctuations; _a < punctuations_1.length; _a++) {
            var punctuation = punctuations_1[_a];
            occurrences.set(punctuation, (occurrences.get(punctuation) || 0) + 1);
        }
    }
    return occurrences;
}
function readFileAndCountOccurrences(filename) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }
        var occurrences = countOccurrences(data);
        console.log('Saída:', Object.fromEntries(occurrences));
    });
}
var filename = 'exemplo.txt';
readFileAndCountOccurrences(filename);
