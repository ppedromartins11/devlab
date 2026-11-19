import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_moduleId, label) {
    if (label === 'css' || label === 'scss' || label === 'less') return new CssWorker();
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new HtmlWorker();
    if (label === 'typescript' || label === 'javascript') return new TsWorker();
    return new EditorWorker();
  }
};
loader.config({ monaco });
monaco.editor.defineTheme('devlab-dark', {
  base: 'vs-dark', inherit: true,
  rules: [
    {token:'comment',foreground:'69778E'},
    {token:'keyword',foreground:'C99AFF'},
    {token:'string',foreground:'A6E3A1'},
    {token:'number',foreground:'F6C177'}
  ],
  colors: {
    'editor.background':'#0c111c',
    'editorLineNumber.foreground':'#46526a',
    'editorLineNumber.activeForeground':'#A6B5D1',
    'editorCursor.foreground':'#66E4C4',
    'editor.selectionBackground':'#283D59'
  }
});
