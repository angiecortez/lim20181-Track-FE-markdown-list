const mdLinks = require('/index.js')
describe('mdLinks', () => {
  let options = {
    validate: false,
    stat: false
  }
  it('deberia exponer una funcion mdLinks en un objeto global', () => {
    assert.isFunction(mdLinks)
  });
  it('deberia sacar 35 links deL archivo README.md con la función mdLinks --validate', () => {
   mdLinks('README.md', {validate:true})
     .then(response=> console.log(response))
     .catch(err => console.log(err));
  })
  it('deberia sacar 4 links de la carpeta src', () => {
   mdLinks('README.md', {validate:true})
     .then(response=> console.log(response))
     .catch(err => console.log(err));

  })
});
