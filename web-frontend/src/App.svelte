<script>
  import { onMount } from 'svelte';
  import CodeEditor from './lib/CodeEditor.svelte';
  import OutputDisplay from './lib/OutputDisplay.svelte';
  import { fetchLanguages, runCode } from './utils/api.js';
  import { getTemplate, getDefaultCode, getMode } from './utils/templates.js';
  import './styles/main.css';

  let languages = [];
  let selectedLanguage = 'python3';
  let selectedTheme = 'default';
  let code = '';
  let editorMode = 'python';
  let loading = true;
  let running = false;

  // Output state
  let stdout = '';
  let stderr = '';
  let error = '';

  let editor;

  const themes = [
    'default',
    '3024-day',
    '3024-night',
    'blackboard',
    'darcula',
    'dracula',
    'eclipse',
    'elegant',
    'erlang-dark',
    'idea',
    'isotope',
    'lucario',
    'material',
    'monokai',
    'solarized',
  ];

  onMount(async () => {
    try {
      languages = await fetchLanguages();
      if (languages.length > 0) {
        selectedLanguage = languages[0];
        updateLanguage(selectedLanguage);
      }
    } catch (err) {
      error = `Failed to load languages: ${err.message}`;
      languages = ['python3']; // Fallback
      selectedLanguage = 'python3';
      updateLanguage(selectedLanguage);
    } finally {
      loading = false;
    }
  });

  function updateLanguage(lang) {
    const template = getTemplate(lang);
    code = template.code;
    editorMode = template.mode;
  }

  function handleLanguageChange(event) {
    selectedLanguage = event.target.value;
    updateLanguage(selectedLanguage);
  }

  function handleThemeChange(event) {
    selectedTheme = event.target.value;
  }

  async function handleSubmit() {
    if (running) return;

    running = true;
    stdout = '';
    stderr = '';
    error = '';

    try {
      const currentCode = editor.getValue();
      const result = await runCode(currentCode, selectedLanguage);
      stdout = result.stdout;
      stderr = result.stderr;
      error = result.error;
    } catch (err) {
      error = `Request failed: ${err.message}`;
    } finally {
      running = false;
    }
  }
</script>

<div class="app-container">
  <div id="wrapper">
    <h1>codecanvas</h1>

    {#if loading}
      <div class="loading">Loading...</div>
    {:else}
      <div class="selectors">
        <select id="lang-select" bind:value={selectedLanguage} on:change={handleLanguageChange}>
          {#each languages as lang}
            <option value={lang}>{lang}</option>
          {/each}
        </select>

        <select id="theme-select" bind:value={selectedTheme} on:change={handleThemeChange}>
          {#each themes as theme}
            <option value={theme}>{theme}</option>
          {/each}
        </select>
      </div>

      <CodeEditor
        bind:this={editor}
        bind:value={code}
        mode={editorMode}
        theme={selectedTheme}
      />

      <button id="submit-btn" on:click={handleSubmit} disabled={running}>
        {running ? 'Running...' : 'Submit'}
      </button>

      <OutputDisplay {stdout} {stderr} {error} />

      <footer>
        codecanvas project. <a href="https://github.com/camerondurham/codecanvas">source code</a>
      </footer>
    {/if}
  </div>
</div>

<style>
  .app-container {
    min-height: 100vh;
  }

  .loading {
    text-align: center;
    padding: 20px;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
