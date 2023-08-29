const texts = [
	{ text: ">" },
	{ text: "A curious software company" },
	{ text: "Curious Fox Oy" },
	{ text: "Professional web and software development" },
	{ text: "info@curiousfox.fi", href: "mailto:info@curiousfox.fi" }
];
let interval;
let textIndex = 0;
let charIndex = 0;

function getPrefix(href) {
  return href ? '<a href=' + href + '>' : '';
}

function getPostfix(href) {
	return href ? '</a>' : '';
}

function typeWriter() {
  const output = document.getElementById("text");
  let text = texts[textIndex].text;
  let href = texts[textIndex].href;
  output.innerHTML = getPrefix(href) + text.substring(0, charIndex) + getPostfix(href);
  charIndex++;
  if (charIndex > text.length) {
	clearInterval(interval);
	charIndex = 0;
	textIndex++;
	if (textIndex >= texts.length) {
		textIndex = 0;
	}
	const sleep = setTimeout(() => {
		output.innerHTML = '';
		interval = setInterval(typeWriter, 60);
	}, 5000);
  }
}

interval = setInterval(typeWriter, 60);
