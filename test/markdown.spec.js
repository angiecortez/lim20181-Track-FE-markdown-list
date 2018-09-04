const mdLinks = require('../index.js');

jest.setTimeout(15000);
test('deberia retornar un arreglo de objetos con [{href, text, file, status, ok}] para la opción --validate ', () => {
  const options = {
    validate: true,
    stats: false,
  }
  return mdLinks('test/ANGIE.md', options).then((response) => {
  expect(response).toEqual([
    {
      href: 'https://jestjs.io/',
      text: 'Jest',
      file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/test/ANGIE.md',
      status: 200,
      ok: true
    },
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/test/ANGIE.md',
      status: 200,
      ok: true
    },
    {
      href: 'https://angie.com',
      text: 'angie',
      file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/test/ANGIE.md',
      status: 0,
      ok: false
    }
  ])
})
})

test('deberia retornar total: 3, uniq : 3, broken : 1 para --stats --validate', () => {
  const options = {
    validate: true,
    stat: true,
  };
    return mdLinks('test/ANGIE.md', options).then((response) => {
      // console.log(response);
    expect(response).toEqual([
      {
        total: 3,
        uniq: 3,
        broken: 1
      }
    ]);
  });
});

test('deberia retornar total: 3, uniq : 3 para --stat', () => {
  const options = {
    validate: false,
    stat: true,
  };
  return mdLinks('test/ANGIE.md', options).then((response) => {
  expect(response).toEqual([
    {
      total: 3,
      uniq: 3,
    }
  ])
  });
})

test('deberia retornar un arreglo de objetos con [{href, text, file, status, ok}] para la opción --validate ', () => {
  const options = {
    validate: false,
    stats: false,
  }
  return mdLinks('test/ANGIE.md', options).then((response) => {
  expect(response).toEqual([
    {
      href: 'https://jestjs.io/',
      text: 'Jest',
      file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/test/ANGIE.md',
    },
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/test/ANGIE.md',
    },
    {
      href: 'https://angie.com',
      text: 'angie',
      file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/test/ANGIE.md',
    }
  ])
})
})
