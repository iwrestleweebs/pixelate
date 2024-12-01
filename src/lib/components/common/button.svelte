<script module lang="ts">
	export type ButtonProps = HTMLButtonAttributes & { variant?: Variant };
</script>

<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { children, variant = 'primary', ...rest }: ButtonProps = $props();
</script>

<button
	{...rest}
	class={clsx(
		'flex h-20 items-center justify-center rounded px-4 text-4xl',
		variant == 'outlined'
			? 'border-4 border-zinc-700 text-zinc-700 transition-all hover:border-zinc-900 hover:text-zinc-900 disabled:border-zinc-500  disabled:text-zinc-500  dark:text-zinc-700 dark:hover:border-yellow-100 dark:hover:text-yellow-100'
			: 'bg-zinc-700 text-white transition-all hover:bg-zinc-900 disabled:bg-zinc-500 disabled:hover:bg-zinc-500  dark:bg-yellow-50 dark:text-zinc-800 dark:hover:bg-yellow-100',

		rest.class
	)}
>
	{@render children?.()}
</button>
