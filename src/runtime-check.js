import { contractLessonIds } from './lesson-contracts.js';
/** Aulas com verificação de comportamento real no iframe isolado. */
export const domCheckedLessons = new Set([
  'primeiros-passos','operadores','debug-console','loops','arrays',
  'dom-basico','eventos','formularios','renderizacao','api-json',
  'storage','acessibilidade'
]);

export const runtimeCheckedLessons = new Set([...domCheckedLessons,...contractLessonIds]);
