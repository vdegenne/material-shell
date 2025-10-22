import materialDefault from './material.css' with {type: 'css'}
import globalStyles from './globals.css' with {type: 'css'}

export async function applyMaterialStyles(defaultMaterialStyles?: CSSStyleSheet) {
	if (!defaultMaterialStyles) {
		defaultMaterialStyles = materialDefault
	}
	let materialSheet: CSSStyleSheet
	const savedTheme = localStorage.getItem('material-theme')
	if (savedTheme) {
		materialSheet = new CSSStyleSheet()
		materialSheet.replaceSync(savedTheme)
	} else {
		// Default Material Theme
		materialSheet = defaultMaterialStyles
	}
	document.adoptedStyleSheets.push(materialSheet)
	window['material-theme'] = materialSheet

	// Global styles
	document.adoptedStyleSheets.push(globalStyles)
}
