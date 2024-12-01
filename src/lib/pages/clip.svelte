<script lang="ts">
	import { goto } from '$app/navigation';
	import { Cropper, type CropperInstance, type CropperDefaultProps } from 'svelte-cropper';
	import { get, set } from '$lib/utils/storage';
	import { useImage } from '$lib/components/runes/useImage.svelte';
	import PageLayout from '$lib/components/layout/pageLayout.svelte';
	import NumberInput from '$lib/components/common/numberInput.svelte';
	import Button from '$lib/components/common/button.svelte';
	import Desciption from '$lib/components/desciption.svelte';

	const INITIAL_X_DIMENSIONS = 32;
	const INITIAL_Y_DIMENSIONS = 32;

	let { blob, image } = $derived(useImage({ storageKey: 'uploaded-image', fallback: '/upload' }));

	let cropper: CropperInstance | null = $state(null);
	let xSize = $state(+(get('x-size') || INITIAL_X_DIMENSIONS));
	let ySize = $state(+(get('y-size') || INITIAL_Y_DIMENSIONS));
	let aspectRatio = $derived(xSize / ySize);

	let loading = $state(false);

	const cropProps: CropperDefaultProps = {
		viewMode: 2,
		dragMode: 'crop',
		rotatable: false,
		// svelte-ignore state_referenced_locally
		initialAspectRatio: aspectRatio
	};

	$effect(() => {
		if (cropper) cropper.setAspectRatio(aspectRatio);
	});

	function handleCrop() {
		if (!cropper) {
			console.error('no cropper');
			return;
		}

		if (!image) {
			console.error('no image');
			return;
		}

		loading = true;
		const { x, y, width, height } = cropper.getData();

		const pixelatedImage = image
			.crop({
				height,
				width,
				x,
				y
			})
			.resize({
				width: xSize,
				height: ySize
			})
			.toDataURL();

		set('x-size', xSize.toString());
		set('y-size', ySize.toString());
		set('pixelated-image', pixelatedImage);

		goto('/palette');
	}
</script>

<PageLayout>
	{#snippet imageSection()}
		{#if blob}
			<Cropper bind:cropper src={blob} cropper_props={cropProps} />
		{/if}
	{/snippet}
	{#snippet menu()}
		<div class="flex h-full flex-col items-center justify-between gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex w-full justify-between gap-4">
					<label class="flex items-center gap-2 text-4xl">
						X:
						<NumberInput
							value={xSize}
							onInput={(n) => (xSize = n)}
							type="number"
							inputmode="numeric"
							pattern="[0-9]*"
							placeholder="X"
							maxLength={3}
							class="w-full"
						/>
					</label>
					<label class="flex items-center gap-2 text-4xl">
						Y:
						<NumberInput
							value={ySize}
							onInput={(n) => (ySize = n)}
							type="number"
							inputmode="numeric"
							pattern="[0-9]*"
							placeholder="Y"
							maxLength={3}
							class="w-full"
						/>
					</label>
				</div>
				<Desciption>
					<p>Set dimensions for your cropped image. Lower numbers = more "pixelized".</p>
					<p>Don't worry about the quality, you can resize your image later.</p>
				</Desciption>
			</div>
			<Button onclick={handleCrop} disabled={loading} class="w-full">Clip</Button>
		</div>
	{/snippet}
</PageLayout>
