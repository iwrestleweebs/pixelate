<script lang="ts">
	import { set } from '$lib/utils/storage';
	import { Image } from 'image-js';

	type Props = { image: Image; resizeMultiplier: number };
	let { image, resizeMultiplier }: Props = $props();

	let resizedImage = $derived(image.resize({ factor: resizeMultiplier }).toDataURL());

	$effect(() => set('resize-multiplier', resizeMultiplier.toString()));
</script>

<img src={resizedImage} alt="resized" />
