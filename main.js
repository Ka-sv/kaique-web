// Inicializa o EmailJS com sua Public Key
emailjs.init('kG1SzftrHS569fekq'); // Substitua pela sua Public Key

// Função que salva os dados no localStorage
function salvarDadosNoLocalStorage() {
    const nomeSobrenome = document.getElementById('nomesobrenome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;
    const contato = document.querySelector('input[name="contato"]:checked').value;
    const horarioPreferido = document.getElementById('horario-preferido').value;
    const novidades = document.querySelector('input[name="novidades"]').checked;

    const dadosFormulario = {
        nomeSobrenome,
        email,
        telefone,
        mensagem,
        contato,
        horarioPreferido,
        novidades
    };

    // Salvar os dados no localStorage
    localStorage.setItem('dadosFormulario', JSON.stringify(dadosFormulario));

    // Chama a função para enviar os dados por email
    enviarPorEmail(dadosFormulario);
}

// Função que envia os dados do formulário por email usando EmailJS
function enviarPorEmail(dados) {
    // Integração com EmailJS
    emailjs.send('service_ernp0bn', 'template_ww5k2nf', {
        nome: dados.nomeSobrenome,
        email: dados.email,
        telefone: dados.telefone,
        mensagem: dados.mensagem,
        contato: dados.contato,
        horarioPreferido: dados.horarioPreferido,
        novidades: dados.novidades ? 'Sim' : 'Não'
    }).then(function(response) {
        console.log('Email enviado com sucesso!', response.status, response.text);
    }, function(error) {
        console.log('Falha ao enviar o email.', error);
    });
}

// Evento para salvar os dados no localStorage e enviar o email ao submeter o formulário
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio normal do formulário
    salvarDadosNoLocalStorage();  // Salva no localStorage e envia o email
});

// Recuperar os dados do localStorage ao carregar a página
window.onload = function() {
    const dadosSalvos = localStorage.getItem('dadosFormulario');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        document.getElementById('nomesobrenome').value = dados.nomeSobrenome;
        document.getElementById('email').value = dados.email;
        document.getElementById('telefone').value = dados.telefone;
        document.getElementById('mensagem').value = dados.mensagem;
        document.querySelector(`input[name="contato"][value="${dados.contato}"]`).checked = true;
        document.getElementById('horario-preferido').value = dados.horarioPreferido;
        document.querySelector('input[name="novidades"]').checked = dados.novidades;
    }
}
