<script lang="ts">
	import { steps as initialSteps } from '$lib/utils/consts';
	import { get } from '$lib/utils/storage';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import clsx from 'clsx';
	import { afterNavigate, onNavigate } from '$app/navigation';

	let history = $state<string[]>([]);
	let steps = $state(initialSteps);
	let navBar = $state<HTMLDivElement | null>(null);

	function getReadiness() {
		if (get('colorized-image')) return 4;
		if (get('pixelated-image')) return 3;
		if (get('x-size') && get('y-size')) return 2;
		if (get('uploaded-image')) return 1;
		return 0;
	}

	function initializeSteps() {
		const readiness = getReadiness();

		const _steps: Step[] = initialSteps.map((s, i) => {
			if ($page.route.id === s.url) {
				return { ...s, state: 'doing' };
			}

			if ($page.route.id && history.includes(s.url)) {
				return { ...s, state: 'done' };
			}

			if (readiness > i) {
				return { ...s, state: 'ready' };
			}

			return { ...s, state: 'not ready' };
		});

		return _steps;
	}

	onMount(() => {
		if ($page.route.id) history = [...history, $page.route.id];
		steps = initializeSteps();
	});

	afterNavigate(() => {
		if ($page.route.id) history = [...history, $page.route.id];
		steps = initializeSteps();
	});

	function handleMobileNavigate(id: string, isSmooth: boolean) {
		if (window.innerWidth >= 768) return;
		if (!navBar) return;

		const stepIndex = initialSteps.findIndex((s) => s.url === id);
		if (stepIndex < 0) return;

		navBar.scrollTo({
			left: stepIndex * 200,
			behavior: isSmooth ? 'smooth' : 'instant'
		});
	}

	onMount(() => {
		if (!$page.route.id) return;
		handleMobileNavigate($page.route.id, false);
	});

	onNavigate((nav) => {
		if (!nav.to?.route.id) return;
		handleMobileNavigate(nav.to.route.id, true);
	});
</script>

<div
	class="h-[112px] overflow-x-scroll border-b-4 border-dashed border-zinc-700 md:overflow-x-hidden"
	bind:this={navBar}
>
	<div class="flex h-full w-[800px] items-center justify-around text-4xl md:w-full">
		{#each steps as step, i}
			<a
				href={step.url}
				class={clsx(
					'hover:text-zing-900 flex basis-[200px] justify-center text-zinc-700 transition-transform md:w-auto md:basis-auto dark:text-yellow-50 dark:hover:text-yellow-100',
					step.state === 'doing'
						? 'md:scale-125'
						: step.state == 'done'
							? 'scale-75'
							: step.state == 'ready'
								? ''
								: 'pointer-events-none hidden line-through md:block'
				)}
			>
				{step.label}
				{#if step.state === 'done'}
					✔
				{/if}
			</a>
		{/each}
	</div>
</div>
