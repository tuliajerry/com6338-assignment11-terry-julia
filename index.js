const getPoemBtn = document.getElementById('get-poem');
const poemEl = document.getElementById('poem');
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json';

const getJSON = url => fetch(url).then(res => res.json());

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = tag => str => `<${tag}>${str}</${tag}>`;

const makeParagraph = lines => {
  return lines.map((line, index) => {
    return index === lines.length - 1 ? line : `${line}<br>`;
  }).join('');
};

const makePoemHTML = poemData => {
  const poem = poemData[0];
  const titleHTML = makeTag('h2')(poem.title);
  const authorHTML = makeTag('h3')(makeTag('em')(`by ${poem.author}`));
  
  const stanzas = poem.lines.join('\n').split('\n\n');
  const stanzasHTML = stanzas.map(stanza => makeTag('p')(makeParagraph(stanza.split('\n')))).join('');

  return `${titleHTML}${authorHTML}${stanzasHTML}`;
};

getPoemBtn.onclick = async function() {
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL));
};

