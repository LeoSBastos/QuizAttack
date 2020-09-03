//if (!localStorage.admin) location.href = "../index.html"

$('#form-questions').submit(function (e) {
	const data = {
		questao: e.target.questao.value,
		tipo: e.target.tipo.value,
		pontuacao: parseInt(e.target.pontuacao.value),
		respostas: [
			{
				resposta: e.target.a.value,
				certa: e.target.right.value == 'a' ? true : false
			},
			{
				resposta: e.target.b.value,
				certa: e.target.right.value == 'b' ? true : false
			},
			{
				resposta: e.target.c.value,
				certa: e.target.right.value == 'c' ? true : false
			},
			{
				resposta: e.target.d.value,
				certa: e.target.right.value == 'd' ? true : false
			},
			{
				resposta: e.target.e.value,
				certa: e.target.right.value == 'e' ? true : false
			}
		]
	}

	axios.post('/perguntas', data)
	.then(response => {
		console.log('Cadastrou saporra', response.data)
	})
	.catch(err => {
		console.log('Deu ruim', err.response.data)
	})

	e.preventDefault()
})

$('#pont').change(function () {
	$('#pont-value').text($(this).val())
})
