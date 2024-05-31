// são cada sections
const sectionCadastrar = document.getElementById('cadastrar');
const sectionAlterar = document.getElementById('alterar');
const sectionConsultar = document.getElementById('consultar');

// são os "buttons" do header
const cadastrar = document.querySelector('.cadastrar');
const alterar = document.querySelector('.alterar');
const consultar = document.querySelector('.consultar');

// uma lista de todas as sections
const sections = [sectionCadastrar, sectionAlterar, sectionConsultar];

function trocarSections(mostrarSection) {
  sections.forEach(section => { // percorrendo cada section da lista
    if (section === mostrarSection) {
      section.classList.add('appear');
      section.classList.remove('disappear'); // Se o botão que você clicar for igual a section deseja, adicione "appear" e remove "disappear"
    } else {
      section.classList.add('disappear');
      section.classList.remove('appear'); // já que está percorrendo cada section, os que não forem iguais ao clicado, vão ter a classe "disappear" e remover o "appear"
    }
  });
}

cadastrar.addEventListener('click', () => trocarSections(sectionCadastrar));
alterar.addEventListener('click', () => trocarSections(sectionAlterar));
consultar.addEventListener('click', () => trocarSections(sectionConsultar));
