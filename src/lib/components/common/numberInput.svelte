<script lang="ts">
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['input'] & { maxLength?: number; onInput?: (x: number) => void };

	let { maxLength, onInput, ...rest }: Props = $props();

	function handleChange(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		const { value } = e.currentTarget;
		if (value.length === maxLength) return;
		onInput && onInput(+value);
	}
</script>

<input
	{...rest}
	type="number"
	class={clsx(
		'h-[64px] rounded border-4 border-zinc-700 text-4xl [appearance:textfield] focus:border-zinc-900  focus:ring-zinc-900  active:border-zinc-900 active:ring-zinc-900 dark:bg-zinc-900 dark:text-yellow-50 dark:focus:ring-yellow-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
		rest.class
	)}
	oninput={handleChange}
/>
