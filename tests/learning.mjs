import assert from 'node:assert/strict';
import {allLessons} from '../src/course.js';
import {checkpoints, inspectExercise, experiencePoints, streakDays, localDateKey} from '../src/learning.js';
import {runtimeCheckedLessons} from '../src/runtime-check.js';
assert.equal(Object.keys(checkpoints).length,29);
assert.equal(new Set(Object.keys(checkpoints)).size,29);
for(const lesson of allLessons){
 const q=checkpoints[lesson.id];
 assert(q && q.prompt.includes('?'),`Quiz ausente: ${lesson.id}`);
 assert.equal(q.choices.length,3);
 assert(q.answer>=0&&q.answer<3);
 assert.equal(inspectExercise(lesson,{[lesson.language==='ts'?'ts':'js']:lesson.starter.js}).passed,false,`Starter aprovado sem alterações: ${lesson.id}`);
}
assert.equal(experiencePoints(['a','a'],['a','b'],['c']), 85);
assert.equal(streakDays([localDateKey()],new Date()),1);
assert.equal(streakDays([],new Date()),0);
assert(runtimeCheckedLessons.has('primeiros-passos'));
assert(runtimeCheckedLessons.has('formularios'));
console.log('OK — 29 quizzes, checkpoints, XP, sequência e avaliação do código inicial.');
