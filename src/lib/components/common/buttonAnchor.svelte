<script lang="ts">
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['a'] & { disabled?: boolean; variant?: Variant };

	let { children, disabled, variant = 'primary', ...rest }: Props = $props();
</script>

<a
	{...rest}
	class={clsx(
		'flex items-center justify-center rounded px-4 py-4 ',
		variant == 'outlined'
			? 'border-4 border-zinc-700 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900'
			: 'bg-zinc-700 text-4xl text-white hover:bg-zinc-900',
		rest.class,
		disabled && 'pointer-events-none bg-zinc-500'
	)}
>
	{@render children?.()}
</a>
