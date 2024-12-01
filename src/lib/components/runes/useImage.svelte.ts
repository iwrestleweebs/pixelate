import { Image } from 'image-js';
import { get, type StorageKeys } from '$lib/utils/storage';
import { goto } from '$app/navigation';

export type UseImageProps = {
	storageKey: StorageKeys;
	fallback?: string;
};

export function useImage({ storageKey, fallback }: UseImageProps) {
	let blob = $state(get(storageKey));
	let image = $state<Image>();

	$effect(() => {
		if (!blob) {
			fallback && goto(fallback);
			return;
		}
		loadImage(blob);
	});

	async function loadImage(blob: string) {
		image = await Image.load(blob);
	}

	return {
		get image() {
			return image;
		},
		setImage: (i: Image) => {
			image = i;
		},
		get blob() {
			return blob;
		}
	};
}
