'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState, StateEffect } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { rust } from '@codemirror/lang-rust';
import { go } from '@codemirror/lang-go';
import { StreamLanguage } from '@codemirror/language';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { ViewUpdate } from '@codemirror/view';
// Using only the core themes that are guaranteed to work
import styles from './CodeEditor.module.css';
import { CodeEditorProps, SupportedLanguage, SupportedTheme } from './types';

// Language mode mapping
const getLanguageExtension = (language: string) => {
  const normalizedLang = language.toLowerCase();
  
  switch (normalizedLang) {
    case 'python':
    case 'python3':
      return python();
    case 'javascript':
    case 'js':
    case 'node':
    case 'nodejs':
      return javascript();
    case 'c++':
    case 'cpp':
    case 'c++11':
      return cpp();
    case 'rust':
      return rust();
    case 'go':
    case 'golang':
      return go();
    case 'bash':
    case 'sh':
      return StreamLanguage.define(shell);
    default:
      return python(); // Default to Python
  }
};

// Theme mapping with core themes
const getThemeExtension = (themeName: string) => {
  switch (themeName.toLowerCase()) {
    case 'onedark':
    case 'one-dark':
    case 'dark':
      return oneDark;
    case 'light':
    case 'default':
    default:
      return []; // Default light theme (no extension needed)
  }
};

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language, theme }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Handle value changes from parent
  const updateEditorValue = useCallback((newValue: string) => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== newValue) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: newValue
        }
      });
    }
  }, []);

  // Initialize editor
  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        getLanguageExtension(language),
        getThemeExtension(theme),
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            onChange(newValue);
          }
        }),
        EditorView.theme({
          '&': {
            height: '400px',
            fontSize: '14px',
            fontFamily: '"IBM Plex Mono", "Fira Code", "Consolas", monospace'
          },
          '.cm-content': {
            padding: '12px',
            minHeight: '400px'
          },
          '.cm-focused': {
            outline: 'none'
          },
          '.cm-editor': {
            borderRadius: '6px'
          },
          '.cm-scroller': {
            fontFamily: '"IBM Plex Mono", "Fira Code", "Consolas", monospace'
          }
        }),
        EditorView.lineWrapping
      ]
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current
    });

    viewRef.current = view;

    // Auto-focus the editor
    setTimeout(() => {
      view.focus();
    }, 100);

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [language, onChange, theme, value]); // Only run on mount

  // Update language and theme when they change
  useEffect(() => {
    if (viewRef.current) {
      // Create new state with updated extensions
      const newState = EditorState.create({
        doc: viewRef.current.state.doc,
        extensions: [
          basicSetup,
          getLanguageExtension(language),
          getThemeExtension(theme),
          EditorView.updateListener.of((update: ViewUpdate) => {
            if (update.docChanged) {
              const newValue = update.state.doc.toString();
              onChange(newValue);
            }
          }),
          EditorView.theme({
            '&': {
              height: '400px',
              fontSize: '14px',
              fontFamily: '"IBM Plex Mono", "Fira Code", "Consolas", monospace'
            },
            '.cm-content': {
              padding: '12px',
              minHeight: '400px'
            },
            '.cm-focused': {
              outline: 'none'
            },
            '.cm-editor': {
              borderRadius: '6px'
            },
            '.cm-scroller': {
              fontFamily: '"IBM Plex Mono", "Fira Code", "Consolas", monospace'
            }
          }),
          EditorView.lineWrapping
        ]
      });
      
      viewRef.current.setState(newState);
    }
  }, [language, theme, onChange]);

  // Update value when it changes externally
  useEffect(() => {
    updateEditorValue(value);
  }, [value, updateEditorValue]);

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorWrapper} ref={editorRef} />
    </div>
  );
};

export default CodeEditor;