const texts = [
	{ text: "A curious software company" },
	{ text: "Curious Fox Oy", href: "mailto:info@curiousfox.fi" },
	{ text: "info@curiousfox.fi", href: "mailto:info@curiousfox.fi" },
	{ text: "Professional software development" },
	{ text: "Mobile | Web | Desktop" },
	{ text: ">" },
	{ text: "Utelias ohjelmistoyritys" },
	{ text: "Curious Fox Oy", href: "mailto:info@curiousfox.fi" },
	{ text: "info@curiousfox.fi", href: "mailto:info@curiousfox.fi" },
	{ text: "Ammattimaista ohjelmistokehitystä" },
	{ text: ">" }
  ];
  
  let textIndex = 0, charIndex = 0, randomInterval, revealInterval;
  const charDelay = 35;
  const clearDelay = 1000;
  const revealCharDelay = 35;
  const revealClearDelay = 3000;
  
  function getPrefix(href) { return href ? `<a href="${href}">` : ""; }
  function getPostfix(href) { return href ? "</a>" : ""; }
  function randomBinaryText(text) { return text.split("").map(c => (c === " " || c === ">") ? c : Math.random() > 0.5 ? "1" : "0").join(""); }
  
  function randomTypeWriter() {
	const output = document.getElementById("text");
	const { text, href } = texts[textIndex];
	output.innerHTML = getPrefix(href) + randomBinaryText(text).substring(0, charIndex) + getPostfix(href);
	if (++charIndex > text.length) {
	  clearInterval(randomInterval);
	  charIndex = 0;
	  setTimeout(() => revealInterval = setInterval(revealTypeWriter, revealCharDelay), clearDelay);
	}
  }
  
  function revealTypeWriter() {
	const output = document.getElementById("text");
	const { text, href } = texts[textIndex];
	output.innerHTML = getPrefix(href) + text.substring(0, charIndex) + randomBinaryText(text.substring(charIndex)) + getPostfix(href);
	if (++charIndex > text.length) {
	  clearInterval(revealInterval);
	  charIndex = 0;
	  if (++textIndex >= texts.length) textIndex = 0;
	  setTimeout(() => {
		document.getElementById("text").innerHTML = "";
		randomInterval = setInterval(randomTypeWriter, charDelay);
	  }, revealClearDelay);
	}
  }
  
  randomInterval = setInterval(randomTypeWriter, charDelay);
