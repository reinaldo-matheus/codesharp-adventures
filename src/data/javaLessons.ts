// ============================================================
// Trilha Java - fundamentos, orientação a objetos, coleções e
// streams modernas, exceções, testes (JUnit/Mockito) e APIs REST
// com Spring Boot.
// ============================================================

export type JavaExerciseKind = "quiz" | "type-answer" | "code-fill" | "code-write";

interface BaseExercise {
  title: string;
  prompt: string;
  explanation: string;
  icon: string;
  phase: number;
  hint?: string;
}

export interface QuizExercise extends BaseExercise {
  kind: "quiz";
  options: string[];
  correct: number;
}

export interface TypeAnswerExercise extends BaseExercise {
  kind: "type-answer";
  acceptedAnswers: string[];
  placeholder?: string;
}

export interface CodeFillExercise extends BaseExercise {
  kind: "code-fill";
  codeBefore: string;
  codeAfter: string;
  acceptedAnswers: string[];
  placeholder?: string;
}

export interface CodeWriteExercise extends BaseExercise {
  kind: "code-write";
  starterCode?: string;
  requiredTokens: string[];
  forbiddenTokens?: string[];
  sampleSolution: string;
}

export type JavaExercise = QuizExercise | TypeAnswerExercise | CodeFillExercise | CodeWriteExercise;

export interface JavaPhase {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export const javaPhases: JavaPhase[] = [
  { id: 1, name: "Vila do Aprendiz Java", description: "Fundamentos da Linguagem", icon: "☕" },
  { id: 2, name: "Academia da Orientação a Objetos", description: "Classes, Herança e Interfaces", icon: "🏛️" },
  { id: 3, name: "Forja das Coleções & Streams", description: "Collections, Generics e Java Moderno", icon: "⚙️" },
  { id: 4, name: "Torre das Exceções", description: "Tratamento de Erros", icon: "🗼" },
  { id: 5, name: "Oficina de Testes", description: "JUnit, Mockito e TDD", icon: "🧪" },
  { id: 6, name: "Cavernas da API Spring Boot", description: "APIs REST e Injeção de Dependência", icon: "🌱" },
  { id: 7, name: "Pico do Deploy", description: "Docker e CI/CD", icon: "🚀" },
];

export const javaExercises: JavaExercise[] = [
  // ============ FASE 1: VILA DO APRENDIZ JAVA (Fundamentos) ============
  {
    kind: "quiz",
    title: "Tipagem do Java",
    prompt: "Java é uma linguagem de tipagem ESTÁTICA e FORTE. O que isso significa na prática?",
    options: [
      "O tipo de cada variável é verificado em tempo de compilação, antes mesmo do programa rodar",
      "O tipo das variáveis só existe em tempo de execução",
      "Você nunca precisa declarar o tipo de uma variável",
      "Não é possível ter erros de tipo em Java",
    ],
    correct: 0,
    explanation:
      "Tipagem estática significa que o compilador (javac) verifica os tipos ANTES do programa rodar, pegando muitos erros cedo. É uma das razões do Java ser tão usado em sistemas corporativos grandes, onde erros em produção custam caro.",
    icon: "☕",
    phase: 1,
  },
  {
    kind: "code-fill",
    title: "Declarando um Inteiro",
    prompt: "Complete a declaração de uma variável inteira chamada idade com valor 25:",
    codeBefore: "",
    codeAfter: " idade = 25;",
    acceptedAnswers: ["int"],
    placeholder: "int",
    hint: "Tipo primitivo para números inteiros.",
    explanation:
      "int é o tipo primitivo mais comum para números inteiros em Java, ocupando 32 bits. Para números muito grandes, existe long (64 bits).",
    icon: "🔢",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Tipo para Texto",
    prompt: "Qual é o tipo (classe) usado para representar texto em Java?",
    acceptedAnswers: ["string", "java.lang.string"],
    placeholder: "Digite o tipo...",
    explanation:
      "String representa texto em Java. Diferente dos tipos primitivos (int, boolean...), String é uma classe — mas o Java trata literais de texto de forma especial para deixar o uso natural, como em String nome = \"Ana\";.",
    icon: "📝",
    phase: 1,
  },
  {
    kind: "code-write",
    title: "Condicional if/else",
    prompt:
      "Escreva um bloco if/else que imprime \"Maior de idade\" se a variável idade for maior ou igual a 18, ou \"Menor de idade\" caso contrário.",
    requiredTokens: ["if(idade>=18", "system.out.println", "else"],
    sampleSolution:
      'if (idade >= 18) {\n    System.out.println("Maior de idade");\n} else {\n    System.out.println("Menor de idade");\n}',
    hint: "Estrutura: if (condição) { ... } else { ... }",
    explanation:
      "O bloco if/else executa um caminho ou outro dependendo da condição booleana. Sempre use chaves {} mesmo para um comando só — evita bugs clássicos quando alguém adiciona uma segunda linha depois sem perceber que ela ficou fora do if.",
    icon: "🔀",
    phase: 1,
  },
  {
    kind: "quiz",
    title: "Loop for",
    prompt: "Qual loop é ideal quando você sabe exatamente quantas vezes quer repetir algo?",
    options: ["while", "for", "do-while", "if"],
    correct: 1,
    explanation:
      "O for é ideal quando o número de repetições é conhecido de antemão, como percorrer os índices de 0 a 9. while e do-while são melhores quando a condição de parada depende de algo que só se sabe em tempo de execução.",
    icon: "🔄",
    phase: 1,
  },
  {
    kind: "code-write",
    title: "Escrevendo um For",
    prompt: "Escreva um loop for que imprime os números de 1 a 5 (inclusive).",
    requiredTokens: ["for(", "i=1", "i<=5", "i++", "system.out.println"],
    sampleSolution: "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}",
    hint: "Estrutura: for (int i = 1; i <= 5; i++) { ... }",
    explanation:
      "O for tem três partes separadas por ; : inicialização, condição de continuação e incremento. Um erro clássico de iniciante é usar < em vez de <= e deixar de fora o último valor do intervalo.",
    icon: "🔁",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Concatenação de Strings",
    prompt: "Qual operador é usado para concatenar (juntar) duas strings em Java?",
    acceptedAnswers: ["+"],
    placeholder: "Digite o operador...",
    explanation:
      "O operador + concatena strings em Java, o mesmo símbolo usado para soma — o Java decide o comportamento pelo tipo dos operandos. Para concatenações complexas ou em loops, StringBuilder é mais eficiente que + repetido.",
    icon: "🔗",
    phase: 1,
  },

  // ============ FASE 2: ACADEMIA DA ORIENTAÇÃO A OBJETOS ============
  {
    kind: "type-answer",
    title: "Declarando uma Classe",
    prompt: "Qual palavra-chave declara uma classe em Java?",
    acceptedAnswers: ["class"],
    placeholder: "Digite a palavra-chave...",
    explanation:
      "class define um novo tipo de objeto em Java. Por convenção, o nome da classe começa com letra maiúscula (PascalCase) e o arquivo .java deve ter o mesmo nome da classe pública.",
    icon: "🏛️",
    phase: 2,
  },
  {
    kind: "code-write",
    title: "Construtor",
    prompt:
      "Escreva um construtor público para a classe Pessoa que recebe um parâmetro String nome e atribui ao atributo this.nome.",
    requiredTokens: ["public pessoa(", "string nome", "this.nome=nome"],
    sampleSolution: "public Pessoa(String nome) {\n    this.nome = nome;\n}",
    hint: "O construtor tem o mesmo nome da classe e não tem tipo de retorno.",
    explanation:
      "this.nome = nome; distingue o atributo da classe (this.nome) do parâmetro recebido (nome), que têm o mesmo nome de propósito. Construtores inicializam o estado do objeto assim que ele é criado com 'new'.",
    icon: "🔨",
    phase: 2,
  },
  {
    kind: "quiz",
    title: "Encapsulamento",
    prompt: "Qual modificador de acesso torna um atributo visível APENAS dentro da própria classe?",
    options: ["public", "protected", "private", "default"],
    correct: 2,
    explanation:
      "private restringe o acesso à própria classe — a base do encapsulamento. Prática recomendada: atributos private + métodos públicos getters/setters para controlar como o estado é lido e alterado.",
    icon: "🔒",
    phase: 2,
  },
  {
    kind: "code-fill",
    title: "Herança",
    prompt: "Complete a declaração para a classe Cachorro herdar de Animal:",
    codeBefore: "public class Cachorro ",
    codeAfter: " Animal {\n    // ...\n}",
    acceptedAnswers: ["extends"],
    placeholder: "extends",
    explanation:
      "extends estabelece herança em Java — Cachorro herda todos os atributos e métodos públicos/protegidos de Animal. Diferente de outras linguagens, Java só permite herança simples (uma única superclasse), embora permita implementar várias interfaces.",
    icon: "🧬",
    phase: 2,
  },
  {
    kind: "type-answer",
    title: "Sobrescrita de Método",
    prompt: "Qual anotação (opcional, mas recomendada) indica que um método está sobrescrevendo um método da superclasse?",
    acceptedAnswers: ["@override", "override"],
    placeholder: "Digite a anotação...",
    explanation:
      "@Override avisa o compilador da sua intenção — se o método não existir de fato na superclasse (por um erro de digitação, por exemplo), o compilador acusa erro em vez de você descobrir um bug silencioso depois.",
    icon: "🎭",
    phase: 2,
  },
  {
    kind: "quiz",
    title: "Interface vs Classe Abstrata",
    prompt: "Qual é a principal diferença prática entre uma interface e uma classe abstrata em Java?",
    options: [
      "Uma classe pode implementar várias interfaces, mas só pode estender uma única classe (abstrata ou não)",
      "Interfaces podem ter construtores",
      "Classes abstratas não podem ter métodos",
      "Interfaces são mais lentas que classes abstratas",
    ],
    correct: 0,
    explanation:
      "Java só permite herança simples de classes, mas permite implementar múltiplas interfaces — por isso interfaces são tão usadas para definir 'contratos' de comportamento sem travar a hierarquia de herança. Desde o Java 8, interfaces também podem ter métodos default com implementação.",
    icon: "📋",
    phase: 2,
  },
  {
    kind: "code-write",
    title: "Implementando uma Interface",
    prompt:
      "Dada a interface 'interface Pagavel { double calcularValor(); }', escreva a declaração de uma classe Boleto que implementa essa interface (não precisa implementar o método).",
    requiredTokens: ["class boleto", "implements pagavel"],
    sampleSolution: "public class Boleto implements Pagavel {\n    // ...\n}",
    hint: "Use a palavra-chave implements.",
    explanation:
      "implements conecta uma classe a uma interface, assumindo o compromisso de implementar todos os métodos abstratos dela. Se a classe não implementar algum método, o compilador acusa erro — é assim que Java garante que o 'contrato' da interface seja cumprido.",
    icon: "🧩",
    phase: 2,
  },

  // ============ FASE 3: FORJA DAS COLEÇÕES & STREAMS ============
  {
    kind: "type-answer",
    title: "Interface List",
    prompt: "Qual interface do Java Collections Framework representa uma coleção ORDENADA que permite elementos duplicados?",
    acceptedAnswers: ["list"],
    placeholder: "Digite a interface...",
    explanation:
      "List (implementada por ArrayList, LinkedList, etc.) mantém a ordem de inserção e permite duplicatas. É a coleção mais usada no dia a dia — quando em dúvida sobre qual usar, List costuma ser um bom ponto de partida.",
    icon: "📚",
    phase: 3,
  },
  {
    kind: "quiz",
    title: "Interface Set",
    prompt: "Qual interface garante que NÃO existam elementos duplicados em uma coleção?",
    options: ["List", "Set", "Map", "Queue"],
    correct: 1,
    explanation:
      "Set (implementada por HashSet, TreeSet, etc.) rejeita duplicatas automaticamente. É útil quando você só se importa se um elemento existe ou não, sem repetição — como um conjunto de IDs já processados.",
    icon: "🎯",
    phase: 3,
  },
  {
    kind: "code-write",
    title: "Criando uma Lista",
    prompt: "Declare e crie uma lista de Strings chamada 'nomes', já adicionando o elemento \"Ana\".",
    requiredTokens: ["list<string>nomes", "newarraylist<>()", 'nomes.add("ana")'],
    sampleSolution: 'List<String> nomes = new ArrayList<>();\nnomes.add("Ana");',
    hint: "List<String> nomes = new ArrayList<>();",
    explanation:
      "O tipo declarado é a interface (List), mas o objeto criado é a implementação concreta (ArrayList) — isso é 'programar para a interface', uma boa prática que facilita trocar a implementação depois sem quebrar o resto do código.",
    icon: "📦",
    phase: 3,
  },
  {
    kind: "type-answer",
    title: "Map",
    prompt: "Qual estrutura de dados armazena pares chave-valor, como \"nome\" apontando para \"Ana\"?",
    acceptedAnswers: ["map", "hashmap"],
    placeholder: "Digite a estrutura...",
    explanation:
      "Map (implementada por HashMap, TreeMap, etc.) associa uma chave única a um valor — o equivalente Java de um dicionário. Diferente de List e Set, Map não estende a interface Collection, mas ainda faz parte do Collections Framework.",
    icon: "🗺️",
    phase: 3,
  },
  {
    kind: "code-write",
    title: "Expressão Lambda",
    prompt:
      "Escreva uma expressão lambda, atribuída à variável 'quadrado' do tipo Function<Integer, Integer>, que recebe um número x e retorna x ao quadrado.",
    requiredTokens: ["function<integer,integer>quadrado", "x->x*x"],
    sampleSolution: "Function<Integer, Integer> quadrado = x -> x * x;",
    hint: "Sintaxe: parametro -> expressao",
    explanation:
      "Lambdas (Java 8+) permitem escrever funções como valores, sem precisar criar uma classe inteira só para implementar uma interface funcional. É a base da Stream API e deixou o Java bem mais expressivo para código funcional.",
    icon: "λ",
    phase: 3,
  },
  {
    kind: "code-write",
    title: "Filtrando com Streams",
    prompt:
      "Dada a lista 'numeros' (List<Integer>), use a Stream API para filtrar apenas os números pares, multiplicar cada um por 2, e coletar o resultado em uma nova lista chamada 'resultado'.",
    requiredTokens: ["numeros.stream()", ".filter(", "%2==0", ".map(", ".collect(collectors.tolist())"],
    sampleSolution:
      "List<Integer> resultado = numeros.stream()\n    .filter(n -> n % 2 == 0)\n    .map(n -> n * 2)\n    .collect(Collectors.toList());",
    hint: "Estrutura: lista.stream().filter(...).map(...).collect(Collectors.toList());",
    explanation:
      "A Stream API processa coleções de forma declarativa — você descreve O QUE quer (filtrar pares, dobrar) em vez de escrever loops manuais com o COMO. É o estilo idiomático de Java moderno (8+) e aparece constantemente em código de produção e em entrevistas técnicas.",
    icon: "🌊",
    phase: 3,
  },
  {
    kind: "type-answer",
    title: "Generics",
    prompt:
      "Qual recurso do Java permite que uma classe ou método funcione com diferentes tipos de forma type-safe, como em List<String> ou List<Integer>?",
    acceptedAnswers: ["generics", "generico", "genericos"],
    placeholder: "Digite o termo...",
    explanation:
      "Generics garantem segurança de tipo em tempo de compilação — List<String> só aceita Strings, evitando ClassCastException em tempo de execução. Antes do Java 5 (que introduziu generics), era preciso fazer casts manuais perigosos.",
    icon: "🧬",
    phase: 3,
  },

  // ============ FASE 4: TORRE DAS EXCEÇÕES ============
  {
    kind: "quiz",
    title: "try/catch",
    prompt: "Qual bloco captura e trata uma exceção lançada durante a execução de um código?",
    options: ["if/else", "try/catch", "for/while", "switch/case"],
    correct: 1,
    explanation:
      "try/catch executa o código arriscado dentro do try e captura exceções específicas no catch, evitando que o programa quebre inesperadamente.",
    icon: "🛡️",
    phase: 4,
  },
  {
    kind: "type-answer",
    title: "Bloco finally",
    prompt:
      "Qual bloco, opcional após try/catch, sempre executa — tenha ocorrido exceção ou não — geralmente usado para liberar recursos como arquivos ou conexões?",
    acceptedAnswers: ["finally"],
    placeholder: "Digite o bloco...",
    explanation:
      "finally executa sempre, mesmo se houver um return dentro do try ou catch — por isso é o lugar certo para fechar recursos como conexões de banco ou arquivos abertos.",
    icon: "🔚",
    phase: 4,
  },
  {
    kind: "quiz",
    title: "Checked vs Unchecked",
    prompt: "Qual é a diferença entre exceções checked e unchecked em Java?",
    options: [
      "Checked exceptions devem ser declaradas ou tratadas explicitamente (ex: IOException); unchecked (RuntimeException) não precisam",
      "Não existe diferença real",
      "Unchecked exceptions são sempre mais graves",
      "Checked exceptions só existem em testes",
    ],
    correct: 0,
    explanation:
      "Exceptions checked (como IOException) forçam o compilador a exigir tratamento (try/catch ou throws) — o Java te obriga a pensar no que pode dar errado. RuntimeException (unchecked) não exige isso, e costuma indicar erros de programação, como NullPointerException.",
    icon: "⚠️",
    phase: 4,
  },
  {
    kind: "code-write",
    title: "Lançando uma Exceção",
    prompt: "Escreva uma linha que lança (throw) uma nova IllegalArgumentException com a mensagem \"Idade inválida\".",
    requiredTokens: ["throw", "newillegalargumentexception(", '"idade invalida"'],
    sampleSolution: 'throw new IllegalArgumentException("Idade inválida");',
    hint: 'Estrutura: throw new NomeDaExcecao("mensagem");',
    explanation:
      "throw lança uma exceção manualmente quando seu código detecta um estado inválido. IllegalArgumentException é a exceção padrão do Java para 'argumento recebido não faz sentido' — prefira exceções específicas já existentes a criar uma customizada quando não é necessário.",
    icon: "🚨",
    phase: 4,
  },
  {
    kind: "type-answer",
    title: "Try-with-Resources",
    prompt:
      "Qual recurso do Java (desde a versão 7) fecha automaticamente recursos como arquivos e conexões ao final do bloco try, sem precisar de finally manual?",
    acceptedAnswers: ["try-with-resources", "try with resources"],
    placeholder: "Digite o termo...",
    explanation:
      "try-with-resources fecha automaticamente qualquer recurso que implemente AutoCloseable assim que o bloco try termina (com ou sem exceção). É a forma moderna e recomendada de trabalhar com arquivos, conexões de banco e streams, eliminando uma fonte clássica de vazamento de recursos.",
    icon: "🔐",
    phase: 4,
  },

  // ============ FASE 5: OFICINA DE TESTES ============
  {
    kind: "code-fill",
    title: "Anotação @Test",
    prompt: "Complete a anotação JUnit 5 que marca um método como teste:",
    codeBefore: "@",
    codeAfter: "\npublic void deveSomarDoisNumeros() {\n    // ...\n}",
    acceptedAnswers: ["test"],
    placeholder: "Test",
    explanation:
      "@Test é a anotação central do JUnit — sem ela, o método é ignorado pelo executor de testes, mesmo que comece com 'test' no nome (diferente de frameworks mais antigos).",
    icon: "✅",
    phase: 5,
  },
  {
    kind: "code-write",
    title: "Escrevendo um Assert",
    prompt: "Escreva uma assertiva JUnit que verifica se o resultado do método soma(2, 3) é igual a 5.",
    requiredTokens: ["assertequals(5", "soma(2,3)"],
    sampleSolution: "assertEquals(5, soma(2, 3));",
    hint: "assertEquals(esperado, obtido);",
    explanation:
      "assertEquals(esperado, obtido) é a assertiva mais usada em testes unitários — compara o valor que você espera com o que o código realmente retornou.",
    icon: "🧪",
    phase: 5,
  },
  {
    kind: "quiz",
    title: "Ciclo do TDD",
    prompt: "No ciclo TDD (Test-Driven Development), qual é a ordem correta dos passos?",
    options: [
      "Escrever o código, depois o teste, depois refatorar",
      "Escrever um teste que falha (red), fazer o código mínimo para passar (green), depois refatorar",
      "Escrever toda a aplicação e só depois pensar em testes",
      "Refatorar primeiro, testar depois",
    ],
    correct: 1,
    explanation:
      "TDD segue o ciclo Red-Green-Refactor: primeiro um teste que falha (porque o código ainda não existe), depois o código mínimo para passar, depois melhorar o código com a segurança dos testes. Nem todo time pratica TDD à risca, mas entender o ciclo ajuda a escrever testes melhores de qualquer forma.",
    icon: "🔴",
    phase: 5,
  },
  {
    kind: "code-fill",
    title: "Mockito: when/thenReturn",
    prompt: "Complete o código Mockito que configura o mock para retornar 'usuarioFalso' quando buscarPorId(1) for chamado:",
    codeBefore: "when(repositorio.buscarPorId(1)).",
    codeAfter: "(usuarioFalso);",
    acceptedAnswers: ["thenreturn"],
    placeholder: "thenReturn",
    explanation:
      "when(...).thenReturn(...) configura o comportamento de um mock — 'quando esse método for chamado com esses argumentos, retorne este valor'. Isso permite testar sua lógica isoladamente, sem depender de um banco de dados real.",
    icon: "🃏",
    phase: 5,
  },
  {
    kind: "type-answer",
    title: "Gerenciador de Build",
    prompt:
      "Além do Maven, qual outro gerenciador de build/dependências é muito usado em projetos Java modernos, com sintaxe baseada em Groovy/Kotlin?",
    acceptedAnswers: ["gradle"],
    placeholder: "Digite o nome...",
    explanation:
      "Gradle costuma ser mais flexível e rápido que Maven (usa cache incremental), e é o padrão em projetos Android. Maven ainda domina em ambientes corporativos mais tradicionais — vale conhecer os dois.",
    icon: "🐘",
    phase: 5,
  },
  {
    kind: "quiz",
    title: "Cobertura de Testes",
    prompt: "O que 'Code Coverage' (cobertura de testes) mede?",
    options: [
      "A velocidade de execução dos testes",
      "A porcentagem do código-fonte que é executada pelos testes",
      "A quantidade de bugs em produção",
      "O número de desenvolvedores no time",
    ],
    correct: 1,
    explanation:
      "Code Coverage mostra quanto do código é exercitado pelos testes automatizados — mas 100% de cobertura não significa ausência de bugs, só que as linhas foram executadas, não que foram testadas com todos os cenários possíveis. É uma métrica útil, mas perigosa se tratada como objetivo único.",
    icon: "📈",
    phase: 5,
  },

  // ============ FASE 6: CAVERNAS DA API SPRING BOOT ============
  {
    kind: "type-answer",
    title: "Framework Spring Boot",
    prompt:
      "Qual é o framework Java mais usado no mercado para construir APIs REST e aplicações corporativas, com forte injeção de dependência?",
    acceptedAnswers: ["spring boot", "spring"],
    placeholder: "Digite o nome...",
    explanation:
      "Spring Boot simplifica drasticamente a configuração do Spring Framework, permitindo subir uma API REST funcional em minutos. É hoje o framework Java mais requisitado em vagas de backend.",
    icon: "🌱",
    phase: 6,
  },
  {
    kind: "code-fill",
    title: "@RestController",
    prompt: "Complete a anotação Spring que marca uma classe como um controller REST (retorna JSON diretamente, sem views):",
    codeBefore: "@",
    codeAfter: "\npublic class UsuarioController {\n    // ...\n}",
    acceptedAnswers: ["restcontroller"],
    placeholder: "RestController",
    explanation:
      "@RestController combina @Controller + @ResponseBody, fazendo os métodos retornarem os dados diretamente serializados como JSON, em vez de procurar uma página HTML para renderizar.",
    icon: "🎮",
    phase: 6,
  },
  {
    kind: "code-fill",
    title: "@GetMapping",
    prompt: "Complete a anotação que mapeia esse método para responder requisições GET em /usuarios/{id}:",
    codeBefore: "@",
    codeAfter: '("/usuarios/{id}")\npublic Usuario buscar(@PathVariable Long id) {\n    // ...\n}',
    acceptedAnswers: ["getmapping"],
    placeholder: "GetMapping",
    explanation:
      "@GetMapping(\"/usuarios/{id}\") conecta uma URL e o verbo HTTP GET a esse método Java. @PathVariable extrai o {id} da URL e injeta como parâmetro do método.",
    icon: "🔗",
    phase: 6,
  },
  {
    kind: "quiz",
    title: "Injeção de Dependência",
    prompt: "Qual é o principal benefício da Injeção de Dependência (usada extensivamente pelo Spring)?",
    options: [
      "Deixa o código mais lento",
      "Baixo acoplamento e maior testabilidade, já que dependências podem ser trocadas por mocks nos testes",
      "Elimina a necessidade de interfaces",
      "Só funciona com banco de dados",
    ],
    correct: 1,
    explanation:
      "Com DI, uma classe recebe suas dependências prontas (geralmente via construtor) em vez de criá-las ela mesma — isso facilita muito trocar a implementação real por um mock durante os testes, e reduz o acoplamento entre as camadas.",
    icon: "💉",
    phase: 6,
  },
  {
    kind: "code-write",
    title: "POST com Corpo JSON",
    prompt:
      "Escreva a assinatura de um método Spring que responde a um POST em \"/usuarios\", recebendo o corpo da requisição como um objeto Usuario (use @PostMapping e @RequestBody).",
    requiredTokens: ['@postmapping("/usuarios")', "@requestbody usuario"],
    sampleSolution: '@PostMapping("/usuarios")\npublic Usuario criar(@RequestBody Usuario usuario) {\n    // ...\n}',
    hint: "@RequestBody diz ao Spring para converter o JSON do corpo da requisição em um objeto Java.",
    explanation:
      "@RequestBody instrui o Spring a desserializar automaticamente o JSON recebido no corpo da requisição para um objeto Usuario, usando Jackson por baixo dos panos — você não precisa fazer esse parsing manualmente.",
    icon: "📮",
    phase: 6,
  },
  {
    kind: "type-answer",
    title: "Configuração Externa",
    prompt:
      "Qual arquivo de configuração padrão do Spring Boot guarda propriedades como porta do servidor e URL do banco de dados?",
    acceptedAnswers: ["application.properties", "application.yml", "application.yaml"],
    placeholder: "Nome do arquivo...",
    explanation:
      "application.properties (ou o equivalente application.yml) centraliza configurações externas à aplicação, permitindo trocar valores entre ambientes (dev/produção) sem recompilar o código.",
    icon: "⚙️",
    phase: 6,
  },

  // ============ FASE 7: PICO DO DEPLOY (Docker e CI/CD) ============
  {
    kind: "quiz",
    title: "Imagem Docker",
    prompt: "O que é uma imagem Docker?",
    options: [
      "Um arquivo de configuração de rede",
      "Um pacote imutável com tudo que a aplicação precisa para rodar (código, dependências, runtime)",
      "Um tipo de banco de dados",
      "Um serviço de hospedagem gratuito",
    ],
    correct: 1,
    explanation:
      "Uma imagem Docker empacota a aplicação e tudo que ela precisa (JDK, dependências, configs) em uma unidade imutável e portátil, que roda de forma idêntica em qualquer máquina com Docker instalado — resolvendo o clássico 'na minha máquina funciona'.",
    icon: "🐳",
    phase: 7,
  },
  {
    kind: "code-fill",
    title: "Dockerfile: FROM",
    prompt: "Complete a instrução do Dockerfile que define a imagem base (nesse caso, um JDK 21):",
    codeBefore: "",
    codeAfter: " eclipse-temurin:21-jdk",
    acceptedAnswers: ["from"],
    placeholder: "FROM",
    explanation:
      "FROM define a imagem base sobre a qual sua imagem será construída — nesse caso, uma imagem oficial já com o Java 21 instalado, evitando reinstalar tudo do zero.",
    icon: "📄",
    phase: 7,
  },
  {
    kind: "type-answer",
    title: "Empacotando com Maven",
    prompt: "Qual comando Maven compila, testa e empacota a aplicação em um arquivo .jar, pronto para deploy?",
    acceptedAnswers: ["mvn package"],
    placeholder: "mvn ...",
    explanation:
      "mvn package roda todo o ciclo (compilar, testar) e gera o artefato final (.jar ou .war) em target/. Se algum teste falhar, o build para — é assim que o Maven te impede de empacotar código quebrado.",
    icon: "📦",
    phase: 7,
  },
  {
    kind: "quiz",
    title: "CI/CD",
    prompt: "O que significa CI/CD?",
    options: [
      "Code Integration / Code Deployment",
      "Continuous Integration / Continuous Delivery (ou Deployment)",
      "Container Image / Container Deploy",
      "Class Interface / Class Definition",
    ],
    correct: 1,
    explanation:
      "CI automatiza build e testes a cada mudança; CD automatiza a entrega (Delivery, até um passo antes de produção) ou o deploy (Deployment, direto em produção) dessa mudança. Juntos, eliminam boa parte do trabalho manual e do risco de releases.",
    icon: "🔄",
    phase: 7,
  },
  {
    kind: "quiz",
    title: "Segredos em Variáveis de Ambiente",
    prompt: "Por que armazenar segredos (senha de banco, chave de API) em variáveis de ambiente em vez de direto no código-fonte?",
    options: [
      "Deixa a aplicação mais rápida",
      "Evita que o segredo fique exposto no controle de versão (Git) e permite trocar valores por ambiente sem recompilar",
      "É a única forma de o Java ler texto",
      "Variáveis de ambiente são criptografadas automaticamente",
    ],
    correct: 1,
    explanation:
      "Segredos no código-fonte acabam versionados no Git para sempre (mesmo que você delete depois, continuam no histórico) e são iguais em todos os ambientes. Variáveis de ambiente resolvem os dois problemas de uma vez.",
    icon: "🔐",
    phase: 7,
  },
  {
    kind: "type-answer",
    title: "Health Check",
    prompt:
      "Qual tipo de endpoint uma aplicação expõe (ex: /actuator/health no Spring Boot) para que ferramentas de monitoramento e orquestradores saibam se ela está funcionando corretamente?",
    acceptedAnswers: ["health check", "healthcheck"],
    placeholder: "Digite o termo...",
    explanation:
      "Health checks permitem que load balancers e orquestradores (como Kubernetes) parem de enviar tráfego para uma instância que não está saudável, e reiniciem automaticamente instâncias com problema. O Spring Boot Actuator expõe isso pronto, sem você precisar implementar do zero.",
    icon: "💚",
    phase: 7,
  },
];

export const getExercisesByPhase = (phaseId: number): JavaExercise[] =>
  javaExercises.filter((exercise) => exercise.phase === phaseId);

export const getCurrentJavaPhase = (exerciseIndex: number): JavaPhase => {
  const exercise = javaExercises[exerciseIndex];
  return javaPhases.find((phase) => phase.id === exercise?.phase) || javaPhases[0];
};
