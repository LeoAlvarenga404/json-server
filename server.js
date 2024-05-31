const userForm = document.getElementById('userForm');

// CRIAR USUÁRIO
  async function CadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const idade = document.getElementById('idade').value;
    const profissao = document.getElementById('profissao').value;

    const respostaID = await fetch('http://localhost:3000/users/')
    const data = await respostaID.json()
    const arrayID = data.map(users => users.id)

    var novoID = 1
    if (arrayID.length > 0) {
      novoID = Math.max(...arrayID) + 1
    }

    const outroID = novoID.toString()

    const userData = {
      id: outroID,
      nome: nome,
      sobrenome: sobrenome,
      idade: idade,
      profissao: profissao
    };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(alert('Usuário cadastrado com sucesso!'))
};

// PROCURAR

async function BuscarUsuario() {
  event.preventDefault()
  const userId = document.getElementById('userId').value;
  const response = await fetch(`http://localhost:3000/users/${userId}`);
  const data = await response.json();

  document.getElementById('updateNome').value = data.nome;
  document.getElementById('updateSobrenome').value = data.sobrenome;
  document.getElementById('updateIdade').value = data.idade;
  document.getElementById('updateProfissao').value = data.profissao;

  updateForm.classList.remove('disappear');
  
}


// UPDATE FORM

  async function AlterarUsuario() {
    const userId = document.getElementById('userId').value;
    const nome = document.getElementById('updateNome').value;
    const sobrenome = document.getElementById('updateSobrenome').value;
    const idade = document.getElementById('updateIdade').value;
    const profissao = document.getElementById('updateProfissao').value;

    const userData = {
      nome: nome,
      sobrenome: sobrenome,
      idade: idade,
      profissao: profissao
    };

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(alert('Usuário alterado com sucesso!'))
};

