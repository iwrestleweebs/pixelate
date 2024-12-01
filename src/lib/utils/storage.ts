export const storageKeys = [
	'uploaded-image',
	'x-size',
	'y-size',
	'pixelated-image',
	'colorized-image',
	'palette',
	'resize-multiplier',
	'theme'
] as const;
export type StorageKeys = (typeof storageKeys)[number];

const BASE = 'pixelate-';

export function set(k: StorageKeys, value: string) {
	localStorage.setItem(BASE + k, value);
}

export function get(k: StorageKeys) {
	return localStorage.getItem(BASE + k);
}

export function clear() {
	storageKeys.forEach((k) => localStorage.removeItem(k));
}
