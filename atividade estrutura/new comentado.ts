import * as fs from 'fs';

// Definindo o tipo para o retorno da função countOccurrences
type OccurrencesMap = Map<string, number>;

// Função para contar as ocorrências de cada palavra e pontuação no texto
function countOccurrences(text: string): OccurrencesMap {
    // Divide o texto em palavras, considerando espaços em branco como separadores
    const words: string[] = text.split(/\s+/);
    // Mapa para armazenar as ocorrências de cada palavra/pontuação
    const occurrences: OccurrencesMap = new Map<string, number>();

    // Itera sobre cada palavra no texto
    for (const word of words) {
        // Remove pontuações e converte para minúsculas
        const cleanedWord: string = word.replace(/[,.:;]/g, '').toLowerCase();
        // Verifica se a palavra não é vazia após a limpeza
        if (cleanedWord !== '') {
            // Incrementa o contador de ocorrências para a palavra
            occurrences.set(cleanedWord, (occurrences.get(cleanedWord) || 0) + 1);
        }
    }

    // Conta as ocorrências de pontuações
    const punctuations: RegExpMatchArray | null = text.match(/[,.:;]/g);
    if (punctuations) {
        for (const punctuation of punctuations) {
            // Incrementa o contador de ocorrências para a pontuação
            occurrences.set(punctuation, (occurrences.get(punctuation) || 0) + 1);
        }
    }

    // Retorna o mapa com as ocorrências de palavras e pontuações
    return occurrences;
}

// Função para ler o arquivo de texto e contar as ocorrências
function readFileAndCountOccurrences(filename: string): void {
    // Lê o conteúdo do arquivo
    fs.readFile(filename, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            // Exibe um erro se houver problemas ao ler o arquivo
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        // Conta as ocorrências no texto e imprime o resultado
        const occurrences: OccurrencesMap = countOccurrences(data);
        console.log('Saída:', Object.fromEntries(occurrences));
    });
}

// Nome do arquivo de texto
const filename: string = 'exemplo.txt';
// Chamada da função para ler o arquivo e contar as ocorrências
readFileAndCountOccurrences(filename);
