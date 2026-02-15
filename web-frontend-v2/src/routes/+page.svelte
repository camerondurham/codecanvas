<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

	type LanguagesResponse = {
		languages: string[];
	};

	type RunResponse = {
		stdout: string;
		stderr: string;
		error: string;
	};

	const apiBaseUrl = env.PUBLIC_API_BASE_URL || 'http://localhost:10100';

	let languages: string[] = [];
	let selectedLanguage = 'bash';
	let source = 'echo hello-from-sveltekit';
	let stdout = '';
	let stderr = '';
	let runtimeError = '';
	let loadError = '';
	let loadingLanguages = true;
	let running = false;

	const runCode = async () => {
		runtimeError = '';
		stdout = '';
		stderr = '';
		running = true;

		try {
			const response = await fetch(`${apiBaseUrl}/api/v1/run`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					language: selectedLanguage,
					source
				})
			});

			const data = (await response.json()) as RunResponse | { error: string };

			if (!response.ok) {
				runtimeError = 'error' in data ? data.error : `request failed: ${response.status}`;
				return;
			}

			const runData = data as RunResponse;
			stdout = runData.stdout || '';
			stderr = runData.stderr || '';
			runtimeError = runData.error || '';
		} catch (err) {
			runtimeError = err instanceof Error ? err.message : 'unknown request error';
		} finally {
			running = false;
		}
	};

	const loadLanguages = async () => {
		loadError = '';
		loadingLanguages = true;
		try {
			const response = await fetch(`${apiBaseUrl}/api/v1/languages`);
			const data = (await response.json()) as LanguagesResponse;
			languages = data.languages || [];
			if (languages.length > 0 && !languages.includes(selectedLanguage)) {
				selectedLanguage = languages[0];
			}
		} catch (err) {
			loadError = err instanceof Error ? err.message : 'unknown request error';
		} finally {
			loadingLanguages = false;
		}
	};

	onMount(() => {
		void loadLanguages();
	});
</script>

<main class="page-shell">
	<section class="panel">
		<header>
			<p class="kicker">CodeCanvas</p>
			<h1>Sandbox Runner</h1>
		</header>

		<div class="controls">
			<label for="language">Language</label>
			<select
				id="language"
				data-testid="language-select"
				bind:value={selectedLanguage}
				disabled={loadingLanguages || languages.length === 0}
			>
				{#if loadingLanguages}
					<option>loading...</option>
				{:else if languages.length === 0}
					<option>none available</option>
				{:else}
					{#each languages as language}
						<option value={language}>{language}</option>
					{/each}
				{/if}
			</select>

				<button
					class="run-button"
					data-testid="run-button"
					onclick={runCode}
					disabled={running || loadingLanguages}
				>
					{running ? 'Running...' : 'Run'}
				</button>
			</div>

			<label for="source" class="editor-label">Source</label>
			<textarea id="source" data-testid="source-input" bind:value={source} spellcheck="false"></textarea>

		{#if loadError}
			<p class="error">Languages request failed: {loadError}</p>
		{/if}

		<section class="output-grid">
			<article>
				<h2>Stdout</h2>
					<pre data-testid="stdout-output">{stdout}</pre>
				</article>
				<article>
					<h2>Stderr</h2>
					<pre data-testid="stderr-output">{stderr}</pre>
				</article>
				<article>
					<h2>Error</h2>
					<pre data-testid="error-output">{runtimeError}</pre>
				</article>
		</section>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
		background:
			radial-gradient(circle at 18% 20%, #fbd786 0%, transparent 38%),
			radial-gradient(circle at 86% 10%, #f7797d 0%, transparent 40%),
			linear-gradient(160deg, #fff8ef 0%, #f4f1de 56%, #ede7d5 100%);
		color: #1f2937;
	}

	.page-shell {
		min-height: 100vh;
		padding: 2rem 1rem;
	}

	.panel {
		margin: 0 auto;
		max-width: 920px;
		padding: 1.5rem;
		border: 2px solid #1f2937;
		background: #fffaf0;
		box-shadow: 8px 8px 0 #1f2937;
	}

	.kicker {
		margin: 0;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: #b45309;
	}

	h1 {
		margin: 0.2rem 0 0;
		font-size: clamp(1.5rem, 2.8vw, 2rem);
	}

	.controls {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.7rem;
		align-items: end;
		margin-top: 1rem;
	}

	label {
		font-size: 0.88rem;
		font-weight: 600;
	}

	select,
	textarea,
	button {
		font: inherit;
		border: 2px solid #1f2937;
		border-radius: 0.5rem;
	}

	select,
	textarea {
		padding: 0.6rem;
		background: #fff;
	}

	.run-button {
		padding: 0.6rem 1rem;
		background: #1f2937;
		color: #fff;
		cursor: pointer;
	}

	.run-button:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	.editor-label {
		display: inline-block;
		margin-top: 1rem;
	}

	textarea {
		width: 100%;
		min-height: 220px;
		resize: vertical;
	}

	.output-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
		margin-top: 1rem;
	}

	article {
		background: #fff;
		border: 2px solid #1f2937;
		border-radius: 0.6rem;
		padding: 0.6rem;
	}

	h2 {
		margin: 0;
		font-size: 0.88rem;
	}

	pre {
		margin: 0.5rem 0 0;
		white-space: pre-wrap;
		word-break: break-word;
		min-height: 88px;
	}

	.error {
		margin: 0.8rem 0 0;
		color: #991b1b;
		font-weight: 600;
	}

	@media (max-width: 820px) {
		.output-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
