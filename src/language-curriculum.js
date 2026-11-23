import { phpLessons } from './php-curriculum.js';
import { extendedPythonLessons, extendedJavaLessons, guidedSqlLessons, extendedJavaScriptLessons, extendedTypeScriptLessons } from './extended-language-curriculum.js';
/** Aulas autorais: execução Python, Java e PHP no ambiente local (sem fingir que executam no navegador). */
const guidedLanguageLessonFactory=(id,title,goal,theory,example,question,choices,answer,explanation,task,checks,docs)=>({id,title,goal,theory,example,question,choices,answer,explanation,task,checks,docs});
export const guidedLanguageLessons={
 php:phpLessons,
 sql:guidedSqlLessons,
 javascript: extendedJavaScriptLessons,
 typescript: extendedTypeScriptLessons,
 python:[
  guidedLanguageLessonFactory('py-intro','Variáveis e tipos','Identificar tipos e imprimir informações sem concatenar tudo.',
   ['Python organiza instruções por linhas e usa indentação significativa. int, float, str e bool são tipos comuns; as variáveis não exigem declaração prévia do tipo.','Use f-strings para montar mensagens legíveis. Execute o arquivo com python main.py no terminal e observe erros, sem tentar memorizar cada comando.'],
   'nome = "Ada"\npontos = 12\nativo = True\nprint(f"{nome}: {pontos} pontos")',
   'Qual valor representa um booleano verdadeiro em Python?',['true','True','"true"'],1,'Em Python, os literais booleanos são True e False.',
   'Crie um arquivo perfil.py com nome, idade e um booleano estudando. Imprima uma mensagem usando f-string.',
   ['Execute o arquivo no terminal.','Use int, str e bool em variáveis distintas.','Modifique uma entrada e confirme a saída.'],'https://docs.python.org/3/tutorial/introduction.html'),
  guidedLanguageLessonFactory('py-decisions','Condições e repetições','Escrever regras claras e laços que terminam.',
   ['if, elif e else definem caminhos conforme condições. O bloco é marcado pela indentação; misturar espaços pode resultar em erro.','for percorre coleções ou intervalos produzidos por range. while repete enquanto a condição for verdadeira: garanta uma condição de término.'],
   'notas = [6, 8, 10]\nfor nota in notas:\n    if nota >= 7:\n        print("Aprovada:", nota)',
   'Qual estrutura percorre cada elemento de uma lista?',['for nota in notas:','if nota in notas:','return notas'],0,'for item in colecao percorre os elementos em sequência.',
   'Calcule quantas notas são maiores ou iguais a 7 e imprima o total.',
   ['Teste com lista vazia.','Teste uma lista com todas as notas abaixo de 7.','Explique por que o laço termina.'],'https://docs.python.org/3/tutorial/controlflow.html'),
  guidedLanguageLessonFactory('py-data','Listas e dicionários','Modelar coleções sem repetir variáveis.',
   ['Listas preservam a ordem e permitem acessar elementos por índice. Dicionários relacionam chaves a valores: são adequados para representar uma tarefa com título e estado.','Evite modificar uma coleção dentro de uma iteração sem pensar no resultado. Quando necessário, produza uma lista filtrada e mantenha o dado original intacto.'],
   'tarefas = [{"titulo": "Estudar", "feito": False}, {"titulo": "Testar", "feito": True}]\npendentes = [t for t in tarefas if not t["feito"]]\nprint(pendentes)',
   'Qual expressão cria uma lista filtrada?',['[t for t in tarefas if not t["feito"]]','{t: tarefas}','tarefas = True'],0,'Uma compreensão de lista produz uma nova coleção filtrada.',
   'Crie três tarefas com dicionários e retorne apenas os títulos pendentes.',
   ['Preserve a ordem original.','Não modifique a lista original.','Teste uma lista sem tarefas pendentes.'],'https://docs.python.org/3/tutorial/datastructures.html'),
  guidedLanguageLessonFactory('py-functions','Funções e exceções','Separar cálculo de interface e tratar entradas inválidas.',
   ['def define funções e return devolve um resultado. Funções pequenas, com entradas e saídas claras, são mais fáceis de testar.','ValueError pode representar uma entrada inválida. Use try/except quando for possível tomar uma decisão útil sobre o erro; não esconda problemas com except sem tratamento.'],
   'def percentual(parte, total):\n    if total <= 0:\n        raise ValueError("total deve ser positivo")\n    return round(parte / total * 100, 2)',
   'O que uma função usa para devolver um resultado ao chamador?',['print','return','pass'],1,'return devolve o valor; print apenas escreve na saída.',
   'Escreva uma função calcular_media(notas) que rejeite listas vazias com ValueError.',
   ['Teste três médias conhecidas.','Teste lista vazia.','Evite print dentro da função de cálculo.'],'https://docs.python.org/3/tutorial/errors.html'),
  guidedLanguageLessonFactory('py-test','Arquivos, módulos e testes','Construir e testar uma pequena aplicação executável.',
   ['Separe regras em um módulo e testes em outro. A biblioteca pathlib lida com caminhos; arquivos de texto exigem encoding apropriado.','O módulo unittest oferece asserções. Um teste deve verificar o comportamento esperado e casos-limite, não apenas conferir que o script não gerou erros.'],
   'import unittest\n\ndef dobrar(valor):\n    return valor * 2\n\nclass Testes(unittest.TestCase):\n    def test_dobrar(self):\n        self.assertEqual(dobrar(4), 8)',
   'Qual comando executa a descoberta de testes unittest?',['python -m unittest discover','python import all','python run tests'],0,'O comando unittest discover encontra testes seguindo o padrão do módulo.',
   'Crie um pequeno gerenciador de tarefas em memória com três testes e um README para executar.',
   ['Teste um fluxo válido e um inválido.','Inclua comando de execução no README.','Execute o conjunto completo de testes.'],'https://docs.python.org/3/library/unittest.html'),
  ...extendedPythonLessons
 ],
 java:[
  guidedLanguageLessonFactory('java-intro','JDK, tipos e método main','Compilar e executar uma classe Java básica.',
   ['Java usa classes e tipos explícitos para muitas declarações. O JDK oferece o compilador javac e o comando java para executar programas.','O método main é um ponto de entrada comum. Strings são objetos e números inteiros usam int, enquanto boolean representa verdadeiro ou falso.'],
   'public class Main {\n    public static void main(String[] args) {\n        String nome = "Ada";\n        int pontos = 12;\n        System.out.println(nome + ": " + pontos);\n    }\n}',
   'Qual comando normalmente compila Main.java?',['node Main.java','javac Main.java','python Main.java'],1,'javac transforma o código Java em bytecode.',
   'Crie Main.java com nome, idade e uma mensagem, compile e execute pelo terminal.',
   ['Verifique java -version e javac -version.','Compile sem erros.','Altere um valor e execute novamente.'],'https://dev.java/learn/getting-started/'),
  guidedLanguageLessonFactory('java-control','Condições e loops','Implementar decisões e repetições com casos-limite.',
   ['if/else decide qual bloco executar. Comparações booleanas usam == para tipos primitivos; strings devem ser comparadas pelo conteúdo com equals.','for percorre intervalos e coleções. Evite loops que não alteram o contador e use nomes que expressem sua intenção.'],
   "public class Main {\n    public static void main(String[] args) {\n        int[] notas = {6, 8, 10};\n        int aprovadas = 0;\n        for (int nota : notas) {\n            if (nota >= 7) aprovadas++;\n        }\n        System.out.println(aprovadas);\n    }\n}",
   'Como comparar conteúdo de duas Strings Java?',['textoA == textoB','textoA.equals(textoB)','textoA = textoB'],1,'equals compara conteúdo; == em objetos compara referências.',
   'Conte notas acima de 7 e diferencie intervalo fechado de aberto.',
   ['Teste zero elementos.','Teste limites 6, 7 e 8.','Explique diferença entre == e equals em String.'],'https://dev.java/learn/language-basics/'),
  guidedLanguageLessonFactory('java-objects','Classes, objetos e encapsulamento','Modelar uma tarefa com comportamento consistente.',
   ['Uma classe combina estado e comportamento. Um objeto é uma instância com valores próprios. Encapsulamento protege invariantes, em vez de expor todos os campos livremente.','Um construtor pode validar argumentos. Prefira métodos de intenção como concluir() a alterar campos arbitrariamente em todo o sistema.'],
   "class Tarefa {\n    private final String titulo;\n    private boolean concluida;\n    Tarefa(String titulo) {\n        if (titulo == null || titulo.isBlank()) throw new IllegalArgumentException();\n        this.titulo = titulo;\n    }\n    void concluir() { concluida = true; }\n    boolean estaConcluida() { return concluida; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Tarefa tarefa = new Tarefa(\"Estudar\");\n        tarefa.concluir();\n        System.out.println(tarefa.estaConcluida());\n    }\n}",
   'O que impede alteração direta de um campo por outras classes?',['private','public','static'],0,'private restringe acesso direto ao campo a sua própria classe.',
   'Implemente uma classe Tarefa com validação de título e método concluir().',
   ['Rejeite título vazio.','Use campos privados.','Crie duas tarefas independentes para testar estado.'],'https://dev.java/learn/classes-objects/'),
  guidedLanguageLessonFactory('java-collections','Listas, generics e exceções','Trabalhar com coleções de maneira tipada.',
   ['List<T> representa uma sequência de elementos do tipo T. Generics ajudam a encontrar erros durante a compilação e reduzem conversões inseguras.','Exceções devem comunicar problemas que o chamador consegue tratar. Para recursos que precisam ser fechados, use try-with-resources.'],
   "import java.util.List;\nimport java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> titulos = new ArrayList<>();\n        titulos.add(\"Estudar\");\n        for (String titulo : titulos) System.out.println(titulo);\n    }\n}",
   'Qual tipo representa uma lista de textos com generics?',['List<String>','List<int, String>','String[]<>'],0,'List<String> informa ao compilador o tipo de cada elemento.',
   'Implemente um catálogo de tarefas com List<Tarefa> e operações de adicionar e listar.',
   ['Use generics.','Teste lista vazia.','Não retorne coleções internas mutáveis sem necessidade.'],'https://dev.java/learn/api/collections-framework/'),
  guidedLanguageLessonFactory('java-tests','Organização e testes','Verificar comportamento e documentar uma pequena aplicação.',
   ['Organize classes de domínio sem depender diretamente da apresentação. Testes focam entradas, saídas e invariantes. O JUnit é uma opção comum, instalada via build tool como Maven ou Gradle.','Uma compilação bem-sucedida não garante o resultado certo. Teste títulos inválidos, mudanças de estado e itens ausentes, e documente como executar o projeto.'],
   'import static org.junit.jupiter.api.Assertions.*;\nimport org.junit.jupiter.api.Test;\nclass TarefaTest {\n    @Test void rejeitaTituloVazio() {\n        assertThrows(IllegalArgumentException.class, () -> new Tarefa(""));\n    }\n}',
   'Qual ferramenta é usada para escrever testes automatizados Java?',['JUnit','HTML','JSON'],0,'JUnit é uma biblioteca de testes usada em projetos Java.',
   'Crie testes para a classe Tarefa e registre no README os comandos Maven ou Gradle do seu projeto.',
   ['Cubra entrada inválida.','Teste criação e conclusão.','Execute testes no terminal e corrija as falhas.'],'https://junit.org/junit5/docs/current/user-guide/'),
  ...extendedJavaLessons
 ]
};

// A ordem de navegação é por nível de aprofundamento, preservando todos os IDs e os dados salvos.
const guidedLevel = lesson => lesson.level || (lesson.id==='py-test'||lesson.id==='java-tests'?'Intermediário':'Fundamentos');
const guidedRank = {Fundamentos:0,Intermediário:1,Avançado:2};
for (const languageId of ['python','java','sql','typescript','javascript']) {
 guidedLanguageLessons[languageId].sort((left,right)=>guidedRank[guidedLevel(left)]-guidedRank[guidedLevel(right)]);
}

export const findGuidedLesson = id => Object.values(guidedLanguageLessons).flat().find(l=>l.id===id);
export const guidedLessonsFor = id => guidedLanguageLessons[id]||[];
