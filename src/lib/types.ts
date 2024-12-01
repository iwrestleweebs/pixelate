type ColorPalette = Record<string, Record<string, string>>;

type StepState = 'doing' | 'done' | 'ready' | 'not ready';

type Step = {
	url: string;
	label: string;
	state: StepState;
};

type Variant = 'primary' | 'outlined';
