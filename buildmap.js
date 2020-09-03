const fs = require('fs')

function buildMap() {
	let texto = ''
	for (let i = 0; i < 50; i++) {
		const rand = () => (Math.random() * 4992) - 2560
		texto +=
			`Crafty.e('Brush').attr({ x: ${rand()}, y: ${rand()} });\n` +
			`Crafty.e('Stone').attr({ x: ${rand()}, y: ${rand()} });\n`
	}
	return texto
}

const code =
	`function spawnaMap(map) {
	switch (map) {
		case 1:
			${buildMap()}
			break;
		case 2:
			${buildMap()}
			break;
		case 3:
			${buildMap()}
			break;
		case 4:
			${buildMap()}
			break;
	}
}`

fs.writeFile('static/game/js/map.js', code, () => {
	console.log('Gravou saporra!!!!')
})