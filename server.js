const userForm = document.getElementById('userForm');

// CRIAR USUÁRIO
userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const idade = document.getElementById('idade').value;
  const profissao = document.getElementById('profissao').value;

  const userData = {
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
  .then(data => {
    console.log('Success:', data);
    alert('Usuário cadastrado com sucesso!');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Erro ao cadastrar usuário');
  });
});


// PROCURAR

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const userId = document.getElementById('userId').value;

  fetch(`http://localhost:3000/users/${userId}`)
    .then(response => {  
      if (!response.ok) {
        throw new Error('Usuário não encontrado');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('updateNome').value = data.nome;
      document.getElementById('updateSobrenome').value = data.sobrenome;
      document.getElementById('updateIdade').value = data.idade;
      document.getElementById('updateProfissao').value = data.profissao;
      updateForm.style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Erro ao buscar usuário');
    });
});

// UPDATE FORM

const updateForm = document.getElementById('updateForm');

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

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

  fetch(`http://localhost:3000/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao alterar usuário');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    alert('Usuário alterado com sucesso!');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Erro ao alterar usuário');
  });
});

// TABELA

function fetchUsers() {
  fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
      const usersTableBody = document.querySelector('#usersTable tbody');
      usersTableBody.innerHTML = '';
      data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.nome}</td>
          <td>${user.sobrenome}</td>
          <td>${user.idade}</td>
          <td>${user.profissao}</td>
        `;
        usersTableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

fetchUsers();