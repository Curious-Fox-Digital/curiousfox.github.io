const texts = [
	{ text: 'Curious Fox Oy' },
	{ text: 'A curious software company\ninfo@curiousfox.fi', href: 'mailto:info@curiousfox.fi' },
	{ text: 'Professional software development\nMobile | Web | Desktop' },
	{ text: '>' },
];

const charDelay = 35, clearDelay = 1000, revealCharDelay = 35, revealClearDelay = 3000;
let textIndex = 0, charIndex = 0, randomInterval, revealInterval;

texts.forEach(item => item.binaryText = item.text.split('\n').map(t => randomBinaryText(t)));

function getPrefix(href) { return href ? `<a href='${href}'>` : ''; }
function getPostfix(href) { return href ? '</a>' : ''; }
function randomBinaryText(text) { return text.split("").map(c => (c === " " || c === ">") ? c : Math.random() > 0.5 ? "1" : "0").join(""); }

function randomTypeWriter() {
	const output = document.getElementById('text');
	const { text, href, binaryText } = texts[textIndex];
	const lines = text.split('\n');
	output.innerHTML = lines.map((_, idx) => getPrefix(href) + binaryText[idx].substring(0, charIndex) + getPostfix(href)).join('<br>');
	if (++charIndex > lines[0].length) {
		clearInterval(randomInterval);
		charIndex = 0;
		setTimeout(() => revealInterval = setInterval(revealTypeWriter, revealCharDelay), lines[0] === '>' ? 0 : clearDelay);
	}
}

function revealTypeWriter() {
	const output = document.getElementById('text');
	const { text, href, binaryText } = texts[textIndex];
	const lines = text.split('\n');
	output.innerHTML = lines.map((_, idx) => getPrefix(href) + lines[idx].substring(0, charIndex) + randomBinaryText(lines[idx].substring(charIndex)) + getPostfix(href)).join('<br>');
	if (++charIndex > lines[0].length) {
		clearInterval(revealInterval);
		charIndex = 0;
		if (++textIndex >= texts.length) { textIndex = 0; }
		setTimeout(() => {
			document.getElementById('text').innerHTML = '';
			randomInterval = setInterval(randomTypeWriter, charDelay);
		}, revealClearDelay);
	}
}

randomInterval = setInterval(randomTypeWriter, charDelay);
