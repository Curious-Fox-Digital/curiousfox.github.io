const texts = [
	{ text: "Curious Fox Oy" },
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
  const output = document.getElementById("writer");
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
		output.textContent = '';
		interval = setInterval(typeWriter, 60);
	}, 5000);
  }
}

interval = setInterval(typeWriter, 60+(Math.random()*25));
