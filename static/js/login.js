$('#form-login').submit(function (e) {
	const data = $(this).serialize()
	axios.post('/players/login', data)
	.then(response => {
		localStorage.token = response.data.token
		localStorage.admin = response.data.admin
		location.href = '/game'
	})
	.catch((err) => {
		alert(err.response ? err.response.data : err.message)
	})
	e.preventDefault()
})
