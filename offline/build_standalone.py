from pathlib import Path
import re
root = Path(__file__).parent
src = root.parent / 'src'
contracts = (src/'lesson-contracts.js').read_text()
guard = (src/'preview-guard.js').read_text()
course = (src/'course.js').read_text().replace("import { lessonContracts } from './lesson-contracts.js';",'')
preview = (src/'preview.js').read_text()
learning = (src/'learning.js').read_text()
runtime = (src/'runtime-check.js').read_text().replace("import { contractLessonIds } from './lesson-contracts.js';",'')
assessment = (src/'lesson-assessment.js').read_text()
study = (src/'study-tools.js').read_text()
missions = (src/'missions.js').read_text()
mission_runner = (src/'mission-runner.js').read_text()
app = (root/'source'/'app.js').read_text()
workspace_ui = (root/'source'/'workspace-ui.js').read_text()
frontend_ui = (root/'source'/'frontend-ui.js').read_text()
frontend_curriculum = (src/'frontend-curriculum.js').read_text()
frontend_starters = (src/'frontend-starters.js').read_text()
# Insere a interface antes da inicialização do app, preservando todas as rotas existentes.
assert app.rstrip().endswith('render();')
app = app.rstrip()[:-len('render();')] + '\n' + workspace_ui + '\n' + frontend_ui + '\nrender();\n'
workspace_engine = re.sub(r'^export (const|function) (WORKSPACE_MAX_FILES|WORKSPACE_MAX_FILE_BYTES|WORKSPACE_MAX_TOTAL_BYTES|WORKSPACE_EXTENSIONS|workspacePath|validateWorkspace|createWorkspace|workspaceAdd|workspaceRename|workspaceDelete|workspaceAddFolder|workspaceRewriteImports|buildWorkspacePreview|workspaceZip|archiveTextFiles)\b', r'\1 \2', (src/'workspace-engine.js').read_text(), flags=re.M)
css = (src/'styles.css').read_text()
css = re.sub(r'^@import[^\n]*\n?', '', css, count=1)
css += '\n' + (root/'source'/'offline-extra.css').read_text()
css += '\n' + (src/'workspace.css').read_text()
css += '\n' + (root/'source'/'study.css').read_text()
css += '\n' + (root/'source'/'mission.css').read_text()
css += '\n' + (root/'source'/'workspace-v8.css').read_text()
css += '\n' + (root/'source'/'frontend-v9.css').read_text()
js = re.sub(r'^export (const|function) (frontendTracks|frontendLessons|findFrontendTrack|findFrontendLesson|frontendTrackProgress)\b',r'\1 \2',frontend_curriculum,flags=re.M) + '\n' + re.sub(r'^export function (frontendStarterFiles|frontendWorkspaceStarter)\b',r'function \1',frontend_starters,flags=re.M) + '\n' + guard.replace('export function ','function ') + '\n' + contracts.replace('export const ','const ').replace('export function ','function ') + '\n' + course.replace('export const ', 'const ') + '\n' + learning.replace("import { runtimeCheckedLessons } from './runtime-check.js';",'').replace('export const ', 'const ').replace('export function ', 'function ') + '\n' + runtime.replace('export const ', 'const ') + '\n' + assessment.replace('export const ', 'const ').replace('export function ','function ') + '\n' + preview.replace("import { assessLessonBehavior } from './lesson-assessment.js';",'').replace('export function ','function ') + '\n' + study.replace('export const ','const ').replace('export function ','function ') + '\n' + missions.replace('export const ','const ') + '\n' + mission_runner.replace('export function ','function ') + '\n' + workspace_engine + '\n' + app
# Never close the host <script> when embedded JavaScript strings mention it.
js = re.sub(r'</script', r'<\\/script', js, flags=re.I)
html = '''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f7f7f5"><meta name="description" content="DevLab - Curso prático de JavaScript e TypeScript com editor e prévia."><title>DevLab · Aprenda construindo</title><style>''' + css + '''</style></head><body><div id="root"></div><script>''' + js + '''</script></body></html>'''
(root/'index.html').write_text(html, encoding='utf-8')
print(f'Escrito {root/"index.html"} ({len(html):,} caracteres)')
