import * as fs from 'fs';

type OccurrencesMap = Map<string, number>;

function countOccurrences(text: string): OccurrencesMap {
    const words: string[] = text.split(/\s+/);
    const occurrences: OccurrencesMap = new Map<string, number>();

    for (const word of words) {
        const cleanedWord: string = word.replace(/[,.:;]/g, '').toLowerCase();
        if (cleanedWord !== '') {
            occurrences.set(cleanedWord, (occurrences.get(cleanedWord) || 0) + 1);
        }
    }

    const punctuations: RegExpMatchArray | null = text.match(/[,.:;]/g);
    if (punctuations) {
        for (const punctuation of punctuations) {
            occurrences.set(punctuation, (occurrences.get(punctuation) || 0) + 1);
        }
    }

    return occurrences;
}

function readFileAndCountOccurrences(filename: string): void {
    fs.readFile(filename, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        const occurrences: OccurrencesMap = countOccurrences(data);
        console.log('Saída:', Object.fromEntries(occurrences));
    });
}

const filename: string = 'exemplo.txt';
readFileAndCountOccurrences(filename);
