$('#form-cadastro').submit(function (e) {
	const data = $(this).serialize()
	axios.post('/players', data)
	.then(() => {
		alert('Cadastrou!')
		location.href = 'login.html'
	})
	.catch((err) => {
		alert(err.response.data)
	})
	e.preventDefault()
})
