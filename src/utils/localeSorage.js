export function getLocale(key) {
	return JSON.parse(localStorage.getItem(key));
}

export function setLocale(key, item) {
	localStorage.setItem(key, JSON.stringify(item));
}
