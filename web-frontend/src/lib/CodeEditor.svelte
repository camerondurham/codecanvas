<script>
  import { onMount, onDestroy } from 'svelte';
  import CodeMirror from 'codemirror';

  // Import CodeMirror CSS
  import 'codemirror/lib/codemirror.css';

  // Import modes
  import 'codemirror/mode/python/python';
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/mode/clike/clike';
  import 'codemirror/mode/go/go';
  import 'codemirror/mode/shell/shell';
  import 'codemirror/mode/rust/rust';

  // Import themes
  import 'codemirror/theme/material.css';
  import 'codemirror/theme/3024-day.css';
  import 'codemirror/theme/3024-night.css';
  import 'codemirror/theme/blackboard.css';
  import 'codemirror/theme/darcula.css';
  import 'codemirror/theme/dracula.css';
  import 'codemirror/theme/eclipse.css';
  import 'codemirror/theme/elegant.css';
  import 'codemirror/theme/erlang-dark.css';
  import 'codemirror/theme/idea.css';
  import 'codemirror/theme/isotope.css';
  import 'codemirror/theme/lucario.css';
  import 'codemirror/theme/monokai.css';
  import 'codemirror/theme/solarized.css';

  export let value = '';
  export let mode = 'python';
  export let theme = 'default';

  let editorElement;
  let editor;

  onMount(() => {
    editor = CodeMirror.fromTextArea(editorElement, {
      mode: mode,
      theme: theme,
      lineNumbers: true,
      indentWithTabs: true,
      smartIndent: false,
      autofocus: true,
      value: value,
    });

    editor.setValue(value);

    editor.on('change', () => {
      value = editor.getValue();
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.toTextArea();
    }
  });

  // React to mode changes
  $: if (editor && mode) {
    editor.setOption('mode', mode);
  }

  // React to theme changes
  $: if (editor && theme) {
    editor.setOption('theme', theme);
  }

  // React to value changes from parent
  $: if (editor && value !== editor.getValue()) {
    editor.setValue(value);
  }

  // Export getValue method for parent components
  export function getValue() {
    return editor ? editor.getValue() : value;
  }

  export function setValue(newValue) {
    value = newValue;
    if (editor) {
      editor.setValue(newValue);
    }
  }
</script>

<textarea bind:this={editorElement} id="code"></textarea>

<style>
  textarea {
    width: 100%;
    height: 450px;
  }
</style>
