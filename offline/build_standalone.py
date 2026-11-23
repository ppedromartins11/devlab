from pathlib import Path
import re
import os
import json
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
backend_curriculum = (src/'backend-curriculum.js').read_text()
backend_starters = (src/'backend-starters.js').read_text()
backend_http_lab = (src/'backend-http-lab.js').read_text()
backend_ui = (root/'source'/'backend-ui.js').read_text()
career = (src/'career.js').read_text()
career_ui = (root/'source'/'career-ui.js').read_text()
learning_ui = (root/'source'/'learning-shell.js').read_text()
learning_nav = (src/'learning-navigation.js').read_text().replace('export const ','const ').replace('export function ','function ')
pathways = (src/'learning-pathways.js').read_text().replace('export const ','const ').replace('export function ','function ')
php_curriculum = (src/'php-curriculum.js').read_text().replace('export const ','const ').replace('export function ','function ')
extended_lang_curriculum = (src/'extended-language-curriculum.js').read_text().replace('export const ','const ')
micro_curriculum = (src/'micro-lessons.js').read_text().replace('export const ','const ').replace('export function ','function ')
micro_rulebook = (src/'micro-rulebook.js').read_text().replace('export const ','const ')
micro_coverage = re.sub(r'^import [^\n]*\n', '', (src/'micro-coverage.js').read_text(), flags=re.M).replace('export const ','const ').replace('export function ','function ')
lang_curriculum = (src/'language-curriculum.js').read_text().replace("import { phpLessons } from './php-curriculum.js';",'').replace("import { extendedPythonLessons, extendedJavaLessons, guidedSqlLessons, extendedJavaScriptLessons, extendedTypeScriptLessons } from './extended-language-curriculum.js';",'').replace('export const ','const ').replace('export function ','function ')
pathways_ui = (root/'source'/'pathways-ui.js').read_text()
php_ui = (root/'source'/'php-ui.js').read_text()
micro_ui = (root/'source'/'micro-lessons-ui.js').read_text()
auth_core = (src/'auth-client.js').read_text().replace('export const ', 'const ').replace('export async function ', 'async function ').replace('export function ', 'function ')
auth_ui = (root/'source'/'auth-ui.js').read_text()
auth_config = {
    'url': os.environ.get('DEVLAB_SUPABASE_URL', '').strip(),
    'publishableKey': os.environ.get('DEVLAB_SUPABASE_PUBLISHABLE_KEY', '').strip()
}
if auth_config['publishableKey'].startswith('sb_secret_'):
    raise ValueError('Nunca use chave secreta do Supabase no build frontend.')
auth_config_script = 'window.DEVLAB_AUTH_CONFIG=Object.freeze(' + json.dumps(auth_config).replace('</', '<\\/') + ');'
# Insere a interface antes da inicialização do app, preservando todas as rotas existentes.
assert app.rstrip().endswith('render();')
app = app.rstrip()[:-len('render();')] + '\n' + workspace_ui + '\n' + frontend_ui + '\n' + backend_ui + '\n' + career_ui + '\n' + learning_ui + '\n' + micro_ui + '\n' + pathways_ui + '\n' + php_ui + '\nrender();\n'
workspace_engine = re.sub(r'^export (const|function) (WORKSPACE_MAX_FILES|WORKSPACE_MAX_FILE_BYTES|WORKSPACE_MAX_TOTAL_BYTES|WORKSPACE_EXTENSIONS|workspacePath|validateWorkspace|createWorkspace|workspaceAdd|workspaceRename|workspaceDelete|workspaceAddFolder|workspaceRewriteImports|buildWorkspacePreview|workspaceZip|archiveTextFiles)\b', r'\1 \2', (src/'workspace-engine.js').read_text(), flags=re.M)
css = (src/'styles.css').read_text()
css = re.sub(r'^@import[^\n]*\n?', '', css, count=1)
css += '\n' + (root/'source'/'offline-extra.css').read_text()
css += '\n' + (src/'workspace.css').read_text()
css += '\n' + (root/'source'/'study.css').read_text()
css += '\n' + (root/'source'/'mission.css').read_text()
css += '\n' + (root/'source'/'workspace-v8.css').read_text()
css += '\n' + (root/'source'/'frontend-v9.css').read_text()
css += '\n' + (root/'source'/'backend-v10.css').read_text()
css += '\n' + (root/'source'/'career-v11.css').read_text()
css += '\n' + (root/'source'/'learning-v12.css').read_text()
css += '\n' + (root/'source'/'dark-v13.css').read_text()
css += '\n' + (root/'source'/'pathways-v14.css').read_text()
css += '\n' + (root/'source'/'php-v16.css').read_text()
css += '\n' + (root/'source'/'auth-v18.css').read_text()
css += '\n' + (root/'source'/'micro-v21.css').read_text()
js = learning_nav + '\n' + pathways + '\n' + php_curriculum + '\n' + extended_lang_curriculum + '\n' + lang_curriculum + '\n' + micro_curriculum + '\n' + re.sub(r'^export (const|function) (careerProjects|careerFindProject|careerValidateRecord|careerProgress|careerPortfolioMarkdown|careerPortfolioHtml|gitInitial|gitExecute|gitEdit|gitMilestones)\b',r'\1 \2',career,flags=re.M) + '\n' + re.sub(r'^export (const|function) (backendTracks|backendLessons|findBackendTrack|findBackendLesson|backendTrackProgress)\b',r'\1 \2',backend_curriculum,flags=re.M) + '\n' + backend_starters.replace('export function backendStarterFiles(', 'function backendStarterFiles(') + '\n' + backend_http_lab.replace('export const ','const ').replace('export function ','function ') + '\n' + re.sub(r'^export (const|function) (frontendTracks|frontendLessons|findFrontendTrack|findFrontendLesson|frontendTrackProgress)\b',r'\1 \2',frontend_curriculum,flags=re.M) + '\n' + re.sub(r'^export function (frontendStarterFiles|frontendWorkspaceStarter)\b',r'function \1',frontend_starters,flags=re.M) + '\n' + guard.replace('export function ','function ') + '\n' + contracts.replace('export const ','const ').replace('export function ','function ') + '\n' + course.replace('export const ', 'const ') + '\n' + micro_rulebook + '\n' + micro_coverage + '\n' + learning.replace("import { runtimeCheckedLessons } from './runtime-check.js';",'').replace('export const ', 'const ').replace('export function ', 'function ') + '\n' + runtime.replace('export const ', 'const ') + '\n' + assessment.replace('export const ', 'const ').replace('export function ','function ') + '\n' + preview.replace("import { assessLessonBehavior } from './lesson-assessment.js';",'').replace('export function ','function ') + '\n' + study.replace('export const ','const ').replace('export function ','function ') + '\n' + missions.replace('export const ','const ') + '\n' + mission_runner.replace('export function ','function ') + '\n' + workspace_engine + '\n' + auth_core + '\n' + auth_config_script + '\n' + app + '\n' + auth_ui
# Never close the host <script> when embedded JavaScript strings mention it.
js = re.sub(r'</script', r'<\\/script', js, flags=re.I)
html = '''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0b0d12"><meta name="description" content="DevLab - Cursos práticos de programação, PHP, JavaScript, TypeScript e desenvolvimento web."><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%23101217%22%2F%3E%3Cpath%20d%3D%22M21%2022%2010%2032l11%2010M43%2022l11%2010-11%2010M38%2014%2026%2050%22%20stroke%3D%22%23f5f5fb%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E"><title>DevLab · Aprenda construindo</title><style>''' + css + '''</style></head><body><div id="root"></div><script>''' + js + '''</script></body></html>'''
(root/'index.html').write_text(html, encoding='utf-8')
print(f'Escrito {root/"index.html"} ({len(html):,} caracteres)')
