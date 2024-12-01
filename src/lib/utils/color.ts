import chroma from 'chroma-js';
import Image from 'image-js';

export function processHexFile(file: File) {
	return new Promise<string[]>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target?.result?.toString();

			if (!text) {
				reject('no text found in file');
				return;
			}

			const allLines = text.split(/\r\n|\n/);
			const colors = allLines.filter((l) => l).map((a) => `#${a}`);

			resolve(colors);
		};

		reader.readAsText(file);
	});
}

export function processPngFile(file: File) {
	return new Promise<string[]>(async (resolve, reject) => {
		const buffer = await file.arrayBuffer();
		const image = await Image.load(buffer);

		const palette = new Set<string>();
		image.getPixelsArray().forEach((color) => {
			const hex = rgbToHex(color);
			if (!hex) return;
			palette.add(hex);
		});

		resolve([...palette]);
	});
}

export function componentToHex(c: number) {
	var hex = c.toString(16);
	return hex.length == 1 ? '0' + hex : hex;
}

export function rgbToHex(rgb: number[]) {
	if (rgb.length !== 3) {
		console.error('error converting colors');
		return;
	}
	return '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

export function hexToRgb(hex: string) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) {
		console.error("couldn't convert to color array", hex);
		return;
	}
	return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

export function flattenPalette(palette: ColorPalette) {
	const paletteArray: string[] = [];
	Object.entries(palette).forEach(([_, v]) =>
		Object.entries(v).forEach(([_, color]) => paletteArray.push(color))
	);
	return paletteArray;
}

export function findTheShortestDistance(paletteColors: string[], color: string) {
	paletteColors.sort((a, b) => chroma.contrast(a, color) - chroma.contrast(b, color));
	return paletteColors[0];
}

export function importColors(files: FileList) {
	const extensions = ['png', 'hex'];
	if (!files || !files[0]) return;

	const file = files[0];
	const extension = file.name.split('.')[1];

	if (!extension) {
		console.error('there is no extension on this file');
		return;
	}

	if (!extensions.includes(extension)) {
		console.error('not a valid extension');
		return;
	}

	switch (extension) {
		case 'hex':
			return processHexFile(file);
		case 'png':
			return processPngFile(file);
	}
}

export function paletteToHex(palette: string[]) {
	return palette.map((p) => p.slice(1)).join('\n');
}
