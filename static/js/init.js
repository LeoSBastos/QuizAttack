$(document).ready(function(){
	if(localStorage.token) location.href = "/game"
	$('.dropdown-trigger').dropdown({
		hover: true,
		coverTrigger: false
	});

	$('.sidenav').sidenav();
	$('.parallax').parallax();

	if (localStorage.token) {
		if(localStorage.admin){
			$('#questmenu').show()
		}
		else{
			$('#questmenu').hide()
		}
		$('#menu1').hide()
		$('#menu2').show()
	}
	else {
		$('#questmenu').hide()
		$('#menu1').show()
		$('#menu2').hide()
	}
});
