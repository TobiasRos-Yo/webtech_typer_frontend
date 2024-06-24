const url_sub_sing_der =
  'https://raw.githubusercontent.com/cpos/AlleDeutschenWoerter/main/Substantive/substantiv_singular_der.txt'
const url_sub_sing_die =
  'https://raw.githubusercontent.com/cpos/AlleDeutschenWoerter/main/Substantive/substantiv_singular_die.txt'
const url_sub_sing_das =
  'https://raw.githubusercontent.com/cpos/AlleDeutschenWoerter/main/Substantive/substantiv_singular_das.txt'

const url_adj =
  'https://raw.githubusercontent.com/cpos/AlleDeutschenWoerter/main/Adjektive/Adjektive.txt'

const url_regelm_verb =
  'https://raw.githubusercontent.com/cpos/AlleDeutschenWoerter/main/Verben/Verben_regelmaesig.txt'
const url_unregelm_verb =
  'https://raw.githubusercontent.com/cpos/AlleDeutschenWoerter/main/Verben/Verben_unregelmae%C3%9Fig_Infinitiv.txt'


async function fetchData(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
  }
  const data = response.text();
  return data;
}

async function fetchAllData(): Promise<string> {
  try {
    const dataSubDer = await fetchData(url_sub_sing_der);
    const dataSubDie = await fetchData(url_sub_sing_die);
    const dataSubDas = await fetchData(url_sub_sing_das);
    const dataAdj = await fetchData(url_adj);
    const dataRegelmVerb = await fetchData(url_regelm_verb);
    const dataUnregelmVerb = await fetchData(url_unregelm_verb);

    const allData = dataSubDer + dataSubDie + dataSubDas + dataAdj + dataRegelmVerb + dataUnregelmVerb;

    return allData;
  } catch (error) {
    throw error;
  }
}

function toArray(words: string): string[] {
  const wordsArray = words.split('\n')
      .filter((word) => word.trim().length > 0 && !word.includes("[Bearbeiten]"));//es gibt Einträge wie "A[Bearbeiten] - Z[Bearbeiten] (werden entfernt)
  console.log("wordsArray Length:" + wordsArray.length)//überprüfen wie viele Wörter. Angeblich: 30.336
  return wordsArray;
}

function modeWordLength(mode: string): [number, number] {
  let min = 1;
  let max = 99; // 99 soll "unendlich" bedeuten

  switch (mode) {
    case 'easy': // kein min gesetzt, da schon 1
      max = 5;
      break;
    case 'medium':
      min = 6;
      max = 10;
      break;
    case 'hard': // kein max gesetzt, da "unendlich"
      min = 11;
      break;
    default:
      break;
  }
  return [min, max];
}

function toRandomWords(wordsArray: string[], amount: number, mode: string): string {
  let words = '';
  for (let i = 0; i < amount; i) {
    const random = Math.floor(Math.random() * (wordsArray.length - 1));
    const word = wordsArray[random];
    console.log("word: " + word + " length: " + word.length + " mode: " + mode + " min: " + modeWordLength(mode)[0] + " max: " + modeWordLength(mode)[1]);
    if (word.length >= modeWordLength(mode)[0] && word.length <= modeWordLength(mode)[1]) {
      words = words + ' ' + word;
      i++; // nur wenn Wortlänge passt, wird i erhöht
    }
  }
  return words;
}

export async function getRandomWords(amount:number, mode:string) {
  const allData = await fetchAllData();
  const words = toRandomWords(toArray(allData), amount, mode);
  return words.trim();//entfernt Leerzeichen vom Anfang und Ende (nur Anfang war Problem)
}