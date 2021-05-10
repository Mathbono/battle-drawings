function getStylesheetRules(sheetName, selectorName = null) {
	const rulesList = document.querySelector('link[href*=' + sheetName + ']')
		.sheet.cssRules;
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
	let drawings = document.getElementsByClassName('drawing');
	for (let i = 0; i < drawings.length; i++) {
		drawings[i].addEventListener('mouseenter', () => {
			let numberElement = document.createElement('div');
			let number = document.createTextNode(i + 1);
			numberElement.appendChild(number);
			numberElement.setAttribute('id', 'number');
			const numberElementStyle = getStylesheetRules('main', '#number');
			let drawingRect = drawings[i].getBoundingClientRect();
			numberElementStyle.setProperty(
				'top',
				`${drawingRect.top + window.scrollY}px`
			);
			numberElementStyle.setProperty('left', `${drawingRect.left}px`);
			document.body.insertBefore(
				numberElement,
				document.getElementById('drawings')
			);
		});
		drawings[i].addEventListener('mouseleave', () => {
			try {
				document.getElementById('number').remove();
			} catch (e) {
				return;
			}
		});
	}
}

document.addEventListener('DOMContentLoaded', setPositionNumberOnDrawingHover);
window.addEventListener('scroll', setPositionNumberOnDrawingHover);
window.addEventListener('resize', setPositionNumberOnDrawingHover);

let drawings = document.getElementsByClassName('drawing');
for (let i = 0; i < drawings.length; i++) {
	drawings[i].setAttribute('id', `d${i + 1}`);
}
