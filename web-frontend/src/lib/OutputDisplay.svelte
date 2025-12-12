<script>
  export let stdout = '';
  export let stderr = '';
  export let error = '';
</script>

<div class="output" id="output-field">
  {#if stdout || stderr || error}
    <div class="field box" id="stdout-field">
      <pre>Stdout: {stdout || 'none'}</pre>
    </div>
    <div class="field box" id="stderr-field">
      <pre>Stderr: {stderr || 'none'}</pre>
    </div>
    <div class="field box" id="err-field">
      <pre>Error: {error || 'none'}</pre>
    </div>
  {/if}
</div>

<style>
  .output {
    width: 100%;
    margin-top: 10px;
  }

  .field {
    border-radius: 10px;
    margin: 10px 0;
    text-align: left;
    padding: 10px;
    font-size: 14px;
  }

  .box {
    width: 100%;
  }

  pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
