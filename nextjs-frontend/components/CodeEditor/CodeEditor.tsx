import React, { useEffect, useRef } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';
import { 
  defaultHighlightStyle, 
  syntaxHighlighting, 
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap
} from '@codemirror/language';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { go } from '@codemirror/lang-go';
import { rust } from '@codemirror/lang-rust';
import { StreamLanguage } from '@codemirror/language';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { oneDark } from '@codemirror/theme-one-dark';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { getLanguageMode } from '../../lib/utils';
import styles from './CodeEditor.module.css';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  theme: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  theme,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Get language extension based on language mode
  const getLanguageExtension = (languageMode: string) => {
    switch (languageMode) {
      case 'javascript':
        return javascript();
      case 'python':
        return python();
      case 'clike':
        return cpp();
      case 'go':
        return go();
      case 'rust':
        return rust();
      case 'shell':
        return StreamLanguage.define(shell);
      case 'text':
      default:
        return []; // No syntax highlighting for plain text or unknown languages
    }
  };

  // Create custom themes using createTheme
  const materialTheme = createTheme({
    theme: 'dark',
    settings: {
      background: '#263238',
      foreground: '#EEFFFF',
      caret: '#FFCC00',
      selection: '#80CBC440',
      selectionMatch: '#80CBC440',
      lineHighlight: '#00000012',
      gutterBackground: '#263238',
      gutterForeground: '#546E7A',
    },
    styles: [
      { tag: t.comment, color: '#546E7A' },
      { tag: t.variableName, color: '#EEFFFF' },
      { tag: [t.string, t.special(t.brace)], color: '#C3E88D' },
      { tag: t.number, color: '#F78C6C' },
      { tag: t.bool, color: '#FF5370' },
      { tag: t.null, color: '#FF5370' },
      { tag: t.keyword, color: '#C792EA' },
      { tag: t.operator, color: '#89DDFF' },
      { tag: t.className, color: '#FFCB6B' },
      { tag: t.definition(t.typeName), color: '#FFCB6B' },
      { tag: t.typeName, color: '#FFCB6B' },
      { tag: t.angleBracket, color: '#FFCB6B' },
      { tag: t.tagName, color: '#F07178' },
      { tag: t.attributeName, color: '#C792EA' },
    ],
  });

  const draculaTheme = createTheme({
    theme: 'dark',
    settings: {
      background: '#282a36',
      foreground: '#f8f8f2',
      caret: '#f8f8f0',
      selection: '#44475a',
      selectionMatch: '#44475a',
      lineHighlight: '#44475a75',
      gutterBackground: '#282a36',
      gutterForeground: '#6272a4',
    },
    styles: [
      { tag: t.comment, color: '#6272a4' },
      { tag: t.variableName, color: '#f8f8f2' },
      { tag: [t.string, t.special(t.brace)], color: '#f1fa8c' },
      { tag: t.number, color: '#bd93f9' },
      { tag: t.bool, color: '#bd93f9' },
      { tag: t.null, color: '#bd93f9' },
      { tag: t.keyword, color: '#ff79c6' },
      { tag: t.operator, color: '#ff79c6' },
      { tag: t.className, color: '#50fa7b' },
      { tag: t.definition(t.typeName), color: '#50fa7b' },
      { tag: t.typeName, color: '#50fa7b' },
      { tag: t.angleBracket, color: '#f8f8f2' },
      { tag: t.tagName, color: '#ff79c6' },
      { tag: t.attributeName, color: '#50fa7b' },
    ],
  });

  const monokaiTheme = createTheme({
    theme: 'dark',
    settings: {
      background: '#272822',
      foreground: '#f8f8f2',
      caret: '#f8f8f0',
      selection: '#49483e',
      selectionMatch: '#49483e',
      lineHighlight: '#3e3d32',
      gutterBackground: '#272822',
      gutterForeground: '#90908a',
    },
    styles: [
      { tag: t.comment, color: '#75715e' },
      { tag: t.variableName, color: '#f8f8f2' },
      { tag: [t.string, t.special(t.brace)], color: '#e6db74' },
      { tag: t.number, color: '#ae81ff' },
      { tag: t.bool, color: '#ae81ff' },
      { tag: t.null, color: '#ae81ff' },
      { tag: t.keyword, color: '#f92672' },
      { tag: t.operator, color: '#f92672' },
      { tag: t.className, color: '#a6e22e' },
      { tag: t.definition(t.typeName), color: '#a6e22e' },
      { tag: t.typeName, color: '#a6e22e' },
      { tag: t.angleBracket, color: '#f8f8f2' },
      { tag: t.tagName, color: '#f92672' },
      { tag: t.attributeName, color: '#a6e22e' },
    ],
  });

  // Get theme extension
  const getThemeExtension = (themeName: string): Extension => {
    switch (themeName) {
      case '3024-day':
        return []; // Use default light theme
      case '3024-night':
        return oneDark;
      case 'blackboard':
        return oneDark;
      case 'darcula':
        return oneDark; // Use oneDark as similar dark theme
      case 'dracula':
        return draculaTheme;
      case 'eclipse':
        return []; // Use default light theme
      case 'elegant':
        return []; // Use default light theme
      case 'erlang-dark':
        return oneDark;
      case 'idea':
        return []; // Use default light theme
      case 'isotope':
        return oneDark;
      case 'lucario':
        return oneDark;
      case 'material':
        return materialTheme;
      case 'monokai':
        return monokaiTheme;
      case 'solarized':
        return []; // Use default light theme for solarized
      case 'default':
      default:
        return []; // Use default light theme
    }
  };

  // Basic setup extensions (replaces basicSetup from codemirror package)
  const basicExtensions = [
    lineNumbers(),
    highlightActiveLineGutter(),
    history(),
    foldGutter(),
    indentOnInput(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    highlightSelectionMatches(),
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
      ...completionKeymap,
      ...lintKeymap,
    ]),
  ];

  useEffect(() => {
    if (!editorRef.current) return;

    const languageMode = getLanguageMode(language);
    const languageExtension = getLanguageExtension(languageMode);
    const themeExtension = getThemeExtension(theme);

    const extensions = [
      ...basicExtensions,
      languageExtension,
      themeExtension,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const newValue = update.state.doc.toString();
          onChange(newValue);
        }
      }),
      EditorView.theme({
        '&': {
          fontSize: '14px',
          fontFamily: '"IBM Plex Mono", "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
        },
        '.cm-content': {
          padding: '12px',
          minHeight: '300px',
        },
        '.cm-focused': {
          outline: 'none',
        },
        '.cm-editor': {
          borderRadius: '4px',
        },
        '.cm-scroller': {
          fontFamily: 'inherit',
        },
        '.cm-lineNumbers .cm-gutterElement': {
          padding: '0 8px 0 4px',
        },
        '.cm-foldGutter .cm-gutterElement': {
          padding: '0 4px',
        },
      }),
    ];

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    // Clean up existing view
    if (viewRef.current) {
      viewRef.current.destroy();
    }

    // Create new view
    viewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    // Auto-focus the editor
    viewRef.current.focus();

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, theme]); // Re-create editor when language or theme changes

  // Update content when value prop changes externally
  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== value) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value,
        },
      });
      viewRef.current.dispatch(transaction);
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <div ref={editorRef} className={styles.editor} />
    </div>
  );
};

export default CodeEditor;