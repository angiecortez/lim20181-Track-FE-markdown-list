const mdLinks = require('/index.js');

// jest.setTimeout(10000);

test('deberia retornar un arreglo de objetos con [{href, text, file, status, ok}] para la opción --validate ', () => {
  const options = {
    validate: true,
    stats: false,
  }
  return mdLinks('ANGIE.md', options).then((response) => {
  expect(response).toEqual([
    {
      url: 'https://jestjs.io/',
      text: 'Jest',
      file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/test/files/cortez.md',
      status: 200,
      ok: true
    },
    {
      url: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/test/files/cortez.md',
      status: 200,
      ok: true
    },
    {
      url: 'https://angie.com',
      text: 'angie',
      file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/test/files/cortez.md',
      status: 0,
      ok: false
    }
  ])
})
})

// test('deberia retornar total: 3, uniq : 3, broken : 1 para --stats --validate', () => {
//   const options = {
//     validate: true,
//     stats: true,
//   };
//   return mdLinks('files/', options).then((response) => {
//   expect(response).toEqual([
//     {
//       total: 3,
//       uniq: 3,
//       broken: 1
//     }]);
//   };
// };
//
// test('deberia retornar total: 3, uniq : 3 para --stats', () => {
//   const options = {
//     validate: false,
//     stats: true,
//   };
//   return mdLinks('files/', options).then((response) => {
//   expect(response).toEqual([
//     {
//       total: 3,
//       uniq: 3,
//     }])
//   }
// }
