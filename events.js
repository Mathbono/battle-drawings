function getStylesheetRules(sheetName, selectorName = null) {
	const rulesList = document.querySelector(`link[href*=${sheetName}]`).sheet
		.cssRules;
	if (selectorName) {
		for (let rule of rulesList) {
			if (rule.selectorText === selectorName) {
				return rule.style;
			}
		}
	}
	return rulesList;
}

function setPositionNumberOnDrawingHover() {
	let numberElement = document.createElement('div');
	let number = document.createTextNode(this.id.slice(1));
	numberElement.appendChild(number);
	numberElement.setAttribute('id', 'number');
	const numberElementStyle = getStylesheetRules('main', '#number');
	let drawingElementRect = this.getBoundingClientRect();
	numberElementStyle.setProperty(
		'top',
		`${drawingElementRect.top + window.scrollY}px`
	);
	numberElementStyle.setProperty('left', `${drawingElementRect.left}px`);
	document.body.insertBefore(
		numberElement,
		document.getElementById('drawings')
	);
}

function removeNumberOnDrawing() {
	document.getElementById('number').remove();
}

let i = 0;
for (let drawingElement of document.getElementsByClassName('drawing')) {
	i++;
	drawingElement.setAttribute('id', `d${i}`);
	drawingElement.addEventListener(
		'mouseenter',
		setPositionNumberOnDrawingHover
	);
	drawingElement.addEventListener('mouseleave', removeNumberOnDrawing);
}
