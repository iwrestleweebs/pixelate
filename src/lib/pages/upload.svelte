<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/common/button.svelte';
	import Desciption from '$lib/components/desciption.svelte';
	import PageLayout from '$lib/components/layout/pageLayout.svelte';
	import { get, set } from '$lib/utils/storage';

	let input: HTMLInputElement;
	let files: FileList | undefined = $state();
	let loading = $state(false);
	let blob = $state(get('uploaded-image'));

	$effect(() => {
		if (!files || !files[0]) {
			return;
		}

		loading = true;
		const reader = new FileReader();

		reader.addEventListener('load', () => {
			if (typeof reader.result != 'string') {
				console.error("couldn't parse image");
				return;
			}

			set('uploaded-image', reader.result);
			goto('/clip');
		});

		reader.readAsDataURL(files[0]);
	});

	function toggleDarkMode() {
		window.document.documentElement.classList.toggle('dark');
		const isDark = get('theme') === 'dark';
		set('theme', isDark ? 'light' : 'dark');
	}
</script>

<PageLayout>
	{#snippet imageSection()}
		{#if blob}
			<a href="/clip">
				<img src={blob} alt="previous" />
			</a>
		{/if}
	{/snippet}
	{#snippet menu()}
		<div class="flex h-full flex-col justify-between gap-4">
			<Desciption>
				<p>
					You can upload images, clip them, pixelize them and apply your color palettes using this
					tool.
				</p>
				<p>You can go back or forward using the navigation bar above.</p>
				<p>All the data is stored in your computer. That means I can get no data from you!</p>
			</Desciption>
			<div class="flex flex-col gap-4">
				<Button onclick={toggleDarkMode} variant="outlined" class="w-full" disabled={loading}
					>Toggle theme</Button
				>
				<Button onclick={() => input.click()} class="w-full" disabled={loading}>Upload</Button>
				<input accept="image/png, image/jpeg" type="file" hidden bind:this={input} bind:files />
			</div>
		</div>
	{/snippet}
</PageLayout>
