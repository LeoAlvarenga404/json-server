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

    const id = novoID.toString()

    const userData = {
      id: id,
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

  // pega o valor dos inputs do form de alterar e coloca o valor
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

// GET

async function MostrarUsuario() {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  const response = await fetch('http://localhost:3000/users/', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  data.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nome}</td>
      <td>${user.sobrenome}</td>
      <td>${user.idade}</td>
      <td>${user.profissao}</td>
      <td><button onclick='DeletarUsuario(${user.id})'><i class="ph ph-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
  });
}

MostrarUsuario()

async function DeletarUsuario(id) {
  await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(alert('Usuário deletado')).catch(error => {
    console.error('erro:', error)
  })
  ;
}