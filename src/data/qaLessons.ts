// ============================================================
// Trilha QA - conteúdo da trilha alternativa de Quality Assurance
// Fundamentos de QA, Test Design, Automação de Testes e testes
// de API com REST Assured (Java).
// ============================================================

export type QaExerciseKind = "quiz" | "type-answer" | "code-fill" | "code-write";

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

export type QaExercise = QuizExercise | TypeAnswerExercise | CodeFillExercise | CodeWriteExercise;

export interface QaPhase {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export const qaPhases: QaPhase[] = [
  { id: 1, name: "Vila do Aprendiz QA", description: "Fundamentos de Qualidade de Software", icon: "🛡️" },
  { id: 2, name: "Academia dos Casos de Teste", description: "Test Design e Bug Report", icon: "📋" },
  { id: 3, name: "Forja da Automação", description: "Estratégia e Ferramentas de Automação", icon: "⚙️" },
  { id: 4, name: "Oficina Java & JUnit", description: "Base para Automação de API", icon: "☕" },
  { id: 5, name: "Cavernas da API", description: "Fundamentos de API REST", icon: "🌐" },
  { id: 6, name: "Santuário REST Assured", description: "Automação de Testes de API", icon: "🧪" },
  { id: 7, name: "Torre CI/CD", description: "Integração Contínua e Relatórios", icon: "🚀" },
];

export const qaExercises: QaExercise[] = [
  // ============ FASE 1: VILA DO APRENDIZ QA (Fundamentos) ============
  {
    kind: "quiz",
    title: "O que é QA?",
    prompt: "O que significa, na prática, o trabalho de QA (Quality Assurance)?",
    options: [
      "Garantir a qualidade do processo de desenvolvimento para prevenir defeitos",
      "Corrigir bugs no lugar do time de desenvolvimento",
      "Escrever apenas a documentação do produto",
      "Testar manualmente cada linha de código antes de ser escrita",
    ],
    correct: 0,
    explanation:
      "QA foca em prevenir defeitos atuando no processo inteiro (requisitos, design, código, deploy), não apenas em 'caçar bugs' no final.",
    icon: "🛡️",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Teste de Regressão",
    prompt:
      "Como se chama o tipo de teste que garante que uma funcionalidade que já funcionava continua funcionando após novas alterações no código?",
    acceptedAnswers: ["teste de regressao", "regressao", "teste regressivo"],
    placeholder: "Digite o termo em português...",
    hint: "Pense em 'voltar a quebrar algo que já funcionava'.",
    explanation:
      "O teste de regressão revalida funcionalidades existentes sempre que o código muda, evitando que uma nova entrega quebre algo antigo.",
    icon: "🔁",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Bug",
    prompt: "Qual termo descreve um comportamento do sistema que diverge do que era esperado pela especificação?",
    acceptedAnswers: ["bug", "defeito", "defect"],
    placeholder: "Digite o termo...",
    explanation: "Bug (ou defeito) é qualquer desvio entre o comportamento esperado e o comportamento real do sistema.",
    icon: "🐛",
    phase: 1,
  },
  {
    kind: "quiz",
    title: "Ciclo de Vida do Bug",
    prompt:
      "Depois que o dev corrige um bug e a correção é entregue, qual status o bug geralmente recebe até o QA validar a correção?",
    options: ["New", "Resolved / Fixed", "Closed", "Won't Fix"],
    correct: 1,
    explanation:
      "'Resolved/Fixed' indica que a correção foi feita e aguarda a validação do QA antes de ser marcada como 'Closed'.",
    icon: "🔄",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Scrum",
    prompt: "Qual metodologia ágil organiza o trabalho em sprints, dailies e um product backlog?",
    acceptedAnswers: ["scrum"],
    placeholder: "Nome da metodologia...",
    explanation: "Scrum é o framework ágil mais usado no mercado, com sprints, daily meetings, backlog e retrospectivas.",
    icon: "🏃",
    phase: 1,
  },
  {
    kind: "quiz",
    title: "Funcional vs Não-Funcional",
    prompt: "Qual das opções abaixo é um exemplo de teste NÃO-funcional?",
    options: [
      "Verificar se o login aceita usuário e senha corretos",
      "Verificar se a aplicação suporta 1000 usuários simultâneos sem degradar",
      "Verificar se o cálculo do carrinho soma os valores corretamente",
      "Verificar se o campo e-mail é obrigatório",
    ],
    correct: 1,
    explanation:
      "Testes não-funcionais avaliam atributos como performance, segurança e usabilidade, não o comportamento funcional direto.",
    icon: "⚡",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Mindset de QA",
    prompt:
      "Qual palavra em inglês resume a mentalidade de QA de 'quebrar' o sistema propositalmente para encontrar falhas antes do usuário?",
    acceptedAnswers: ["break", "breaking"],
    placeholder: "Digite a palavra em inglês...",
    hint: "É o oposto de 'construir' (build).",
    explanation:
      "Um bom QA pensa como quem quer 'break' o sistema — testar caminhos alternativos, dados inválidos e cenários extremos.",
    icon: "🧠",
    phase: 1,
  },

  // ============ FASE 2: ACADEMIA DOS CASOS DE TESTE ============
  {
    kind: "quiz",
    title: "Caso de Teste",
    prompt: "O que é um caso de teste (test case)?",
    options: [
      "Um conjunto de passos, dados de entrada e resultado esperado para validar um cenário específico",
      "Um relatório final de todos os bugs encontrados",
      "Um script que só pode ser executado automaticamente",
      "A lista de tarefas do sprint",
    ],
    correct: 0,
    explanation:
      "Um caso de teste descreve pré-condições, passos, dados de entrada e o resultado esperado para um cenário específico.",
    icon: "📋",
    phase: 2,
  },
  {
    kind: "type-answer",
    title: "Análise de Valor Limite",
    prompt:
      "Qual técnica de teste foca em validar os valores exatamente nas bordas de um intervalo válido? Ex: para idade mínima 18, testar 17, 18 e 19.",
    acceptedAnswers: ["analise de valor limite", "valor limite", "boundary value analysis", "bva"],
    placeholder: "Nome da técnica...",
    explanation:
      "A Análise de Valor Limite (Boundary Value Analysis) testa os limites de uma faixa, onde erros de 'off-by-one' costumam aparecer.",
    icon: "📐",
    phase: 2,
  },
  {
    kind: "type-answer",
    title: "Particionamento de Equivalência",
    prompt:
      "Qual técnica divide os dados de entrada em grupos (partições) representativos, válidos e inválidos, para reduzir a quantidade de casos de teste sem perder cobertura?",
    acceptedAnswers: ["particionamento de equivalencia", "equivalence partitioning"],
    placeholder: "Nome da técnica...",
    explanation:
      "O Particionamento de Equivalência agrupa entradas que devem se comportar da mesma forma, testando um representante de cada grupo.",
    icon: "🧩",
    phase: 2,
  },
  {
    kind: "quiz",
    title: "Caixa Preta",
    prompt: "O que caracteriza um teste de caixa-preta (black-box)?",
    options: [
      "Avalia o comportamento externo do sistema, sem conhecer a implementação interna",
      "Exige acesso total ao código-fonte",
      "Só pode ser feito por desenvolvedores",
      "Testa exclusivamente performance",
    ],
    correct: 0,
    explanation:
      "Testes caixa-preta validam entradas e saídas do ponto de vista do usuário, sem olhar a estrutura interna do código.",
    icon: "⬛",
    phase: 2,
  },
  {
    kind: "type-answer",
    title: "Bug Report",
    prompt:
      "Um bom relatório de bug deve conter passos para reproduzir, resultado esperado e resultado ______ (o que de fato aconteceu).",
    acceptedAnswers: ["obtido", "atual", "real"],
    placeholder: "Complete a frase...",
    explanation:
      "Sem o resultado obtido/atual, quem lê o bug não sabe qual foi o comportamento incorreto observado.",
    icon: "📝",
    phase: 2,
  },
  {
    kind: "quiz",
    title: "Severidade de Bugs",
    prompt: "Qual severidade você atribuiria a um bug que impede completamente o login de todos os usuários?",
    options: ["Trivial", "Menor", "Crítico / Bloqueador", "Cosmético"],
    correct: 2,
    explanation:
      "Um bug que bloqueia a funcionalidade principal do sistema para todos os usuários é crítico/bloqueador (blocker).",
    icon: "🚨",
    phase: 2,
  },
  {
    kind: "type-answer",
    title: "Teste Ponta a Ponta",
    prompt:
      "Qual termo descreve testar o sistema simulando a jornada completa do usuário, do início ao fim de um fluxo real?",
    acceptedAnswers: ["teste end to end", "end to end", "e2e", "teste ponta a ponta", "ponta a ponta"],
    placeholder: "Digite o termo...",
    explanation: "Testes E2E (end-to-end) validam o fluxo completo, muitas vezes atravessando várias camadas do sistema.",
    icon: "🏁",
    phase: 2,
  },

  // ============ FASE 3: FORJA DA AUTOMAÇÃO ============
  {
    kind: "quiz",
    title: "Pirâmide de Testes",
    prompt: "Na Pirâmide de Testes, qual camada deve concentrar a MAIOR quantidade de testes?",
    options: ["Testes E2E (interface)", "Testes de Integração", "Testes Unitários", "Testes manuais exploratórios"],
    correct: 2,
    explanation:
      "A base da pirâmide (testes unitários) deve ter o maior volume: são rápidos, baratos e isolados. E2E deve ser o topo, mais escasso.",
    icon: "🔺",
    phase: 3,
  },
  {
    kind: "type-answer",
    title: "Page Object Model",
    prompt:
      "Qual padrão de design organiza a automação separando os elementos da UI da lógica dos testes, muito usado com Selenium e Playwright?",
    acceptedAnswers: ["page object model", "pom", "page object"],
    placeholder: "Nome do padrão...",
    explanation:
      "O Page Object Model isola seletores e ações de cada tela em uma classe própria, deixando os testes mais legíveis e fáceis de manter.",
    icon: "📦",
    phase: 3,
  },
  {
    kind: "quiz",
    title: "Ferramentas de Automação",
    prompt: "Qual das opções abaixo NÃO é uma ferramenta de automação de testes usada no mercado?",
    options: ["Playwright", "Cypress", "Selenium", "Microsoft Word"],
    correct: 3,
    explanation: "Playwright, Cypress e Selenium são ferramentas modernas de automação de testes web. Word não é.",
    icon: "🧰",
    phase: 3,
  },
  {
    kind: "type-answer",
    title: "Testes Flaky",
    prompt:
      "Como se chamam os testes automatizados que ora passam, ora falham, sem que o código testado tenha mudado?",
    acceptedAnswers: ["flaky", "teste flaky", "flaky test", "testes flaky"],
    placeholder: "Digite o termo em inglês...",
    hint: "É um termo em inglês que também se usa em português.",
    explanation:
      "Testes 'flaky' são instáveis, geralmente por dependerem de tempo, ordem de execução ou dados não controlados.",
    icon: "🎲",
    phase: 3,
  },
  {
    kind: "quiz",
    title: "Por que Automatizar?",
    prompt: "Qual é o benefício mais realista de automatizar testes de regressão?",
    options: [
      "Elimina 100% a necessidade de testes manuais",
      "Permite execução rápida, repetida e consistente com menor esforço humano",
      "Garante que o sistema nunca terá bugs",
      "Substitui totalmente o papel do QA",
    ],
    correct: 1,
    explanation:
      "Automação acelera a regressão e libera tempo do QA para testes exploratórios e de maior valor — não elimina o QA nem garante zero bugs.",
    icon: "🤖",
    phase: 3,
  },
  {
    kind: "type-answer",
    title: "Integração Contínua",
    prompt: "Como se chama a prática de rodar os testes automatizados a cada push/Pull Request dentro de um pipeline?",
    acceptedAnswers: ["integracao continua", "ci", "continuous integration"],
    placeholder: "Digite o termo (ou sigla)...",
    explanation:
      "CI (Continuous Integration) roda build e testes automaticamente a cada mudança, detectando problemas o mais cedo possível.",
    icon: "🔗",
    phase: 3,
  },

  // ============ FASE 4: OFICINA JAVA & JUNIT (base para REST Assured) ============
  {
    kind: "quiz",
    title: "Gerenciador de Dependências",
    prompt: "Qual ferramenta é amplamente usada para gerenciar dependências e build em projetos Java de automação (como REST Assured)?",
    options: ["npm", "Maven", "pip", "NuGet"],
    correct: 1,
    explanation: "Maven (assim como Gradle) gerencia dependências e o ciclo de build em projetos Java.",
    icon: "📦",
    phase: 4,
  },
  {
    kind: "code-fill",
    title: "Anotação de Teste JUnit 5",
    prompt: "Complete a anotação do JUnit 5 que marca um método como um teste executável:",
    codeBefore: "@",
    codeAfter: "\npublic void deveValidarLogin() {\n    // ...\n}",
    acceptedAnswers: ["test", "@test"],
    placeholder: "Test",
    explanation: "@Test marca um método como um caso de teste que o JUnit deve executar.",
    icon: "✅",
    phase: 4,
  },
  {
    kind: "code-write",
    title: "Assertivas com JUnit",
    prompt:
      "Escreva uma linha de código Java que verifica, usando JUnit, se a variável 'statusCode' é igual a 200.",
    starterCode: "",
    requiredTokens: ["assertequals(200", "statuscode"],
    sampleSolution: "assertEquals(200, statusCode);",
    hint: "Use o método assertEquals(esperado, obtido).",
    explanation: "assertEquals(200, statusCode) falha o teste se o valor obtido for diferente do esperado (200).",
    icon: "🧪",
    phase: 4,
  },
  {
    kind: "type-answer",
    title: "Setup por Teste",
    prompt: "Qual anotação do JUnit 5 executa um método antes de CADA teste da classe?",
    acceptedAnswers: ["@beforeeach", "beforeeach"],
    placeholder: "@BeforeEach",
    explanation: "@BeforeEach roda antes de todo método de teste, ideal para preparar dados/estado comum.",
    icon: "🔧",
    phase: 4,
  },
  {
    kind: "quiz",
    title: "Assertions Fluentes",
    prompt: "Qual biblioteca é comumente combinada com JUnit em Java para deixar as verificações mais legíveis e fluentes?",
    options: ["Log4j", "AssertJ", "Jackson", "Lombok"],
    correct: 1,
    explanation: "AssertJ (assim como Hamcrest) oferece assertions fluentes, ex: assertThat(x).isEqualTo(y).",
    icon: "💬",
    phase: 4,
  },
  {
    kind: "type-answer",
    title: "Comando Maven",
    prompt: "Qual comando Maven executa a suíte de testes de um projeto Java?",
    acceptedAnswers: ["mvn test"],
    placeholder: "mvn ...",
    explanation: "'mvn test' compila o projeto e executa todos os testes configurados.",
    icon: "⚙️",
    phase: 4,
  },

  // ============ FASE 5: CAVERNAS DA API REST (Fundamentos) ============
  {
    kind: "quiz",
    title: "Verbo GET",
    prompt: "Qual verbo HTTP é usado para buscar dados sem alterá-los no servidor?",
    options: ["GET", "POST", "DELETE", "PUT"],
    correct: 0,
    explanation: "GET é um método idempotente e seguro, usado para ler recursos sem efeitos colaterais.",
    icon: "🌐",
    phase: 5,
  },
  {
    kind: "type-answer",
    title: "Status 404",
    prompt: "Qual código de status HTTP indica que o recurso solicitado não foi encontrado?",
    acceptedAnswers: ["404"],
    placeholder: "Código...",
    explanation: "404 Not Found indica que o servidor não encontrou o recurso pedido na URL.",
    icon: "🔍",
    phase: 5,
  },
  {
    kind: "quiz",
    title: "Formato de Dados",
    prompt: "Qual formato de dado é o mais comum em APIs REST modernas?",
    options: ["XML", "JSON", "CSV", "YAML"],
    correct: 1,
    explanation: "JSON é leve, legível e o formato padrão de fato em APIs REST atuais.",
    icon: "📄",
    phase: 5,
  },
  {
    kind: "type-answer",
    title: "Header Content-Type",
    prompt: "Qual header HTTP informa o tipo de conteúdo enviado no corpo da requisição, ex: application/json?",
    acceptedAnswers: ["content-type", "content type"],
    placeholder: "Nome do header...",
    explanation: "Content-Type diz ao servidor (ou cliente) como interpretar o corpo da requisição/resposta.",
    icon: "🏷️",
    phase: 5,
  },
  {
    kind: "quiz",
    title: "Status 201",
    prompt: "Qual código de status indica sucesso na criação de um novo recurso via POST?",
    options: ["200 OK", "201 Created", "204 No Content", "400 Bad Request"],
    correct: 1,
    explanation: "201 Created confirma que um novo recurso foi criado com sucesso no servidor.",
    icon: "📊",
    phase: 5,
  },
  {
    kind: "type-answer",
    title: "Verbo DELETE",
    prompt: "Qual verbo HTTP é usado para remover um recurso existente?",
    acceptedAnswers: ["delete"],
    placeholder: "Verbo HTTP...",
    explanation: "DELETE solicita a remoção do recurso identificado pela URL.",
    icon: "🗑️",
    phase: 5,
  },

  // ============ FASE 6: SANTUÁRIO REST ASSURED (na prática) ============
  {
    kind: "type-answer",
    title: "REST Assured",
    prompt:
      "Qual é o nome da biblioteca Java mais usada no mercado para automatizar testes de API REST, com sintaxe fluente given/when/then?",
    acceptedAnswers: ["rest assured", "restassured"],
    placeholder: "Nome da biblioteca...",
    explanation: "REST Assured é a biblioteca Java de referência para testes de API, com DSL fluente e legível.",
    icon: "🧪",
    phase: 6,
  },
  {
    kind: "code-fill",
    title: "Sintaxe Given/When/Then",
    prompt: "Complete a sintaxe fluente do REST Assured para validar o status code de uma resposta:",
    codeBefore: 'given()\n    .when()\n    .get("/users")\n    .',
    codeAfter: "()\n    .statusCode(200);",
    acceptedAnswers: ["then"],
    placeholder: "then",
    explanation: "O bloco .then() é onde ficam as validações (asserções) da resposta HTTP.",
    icon: "🔗",
    phase: 6,
  },
  {
    kind: "code-write",
    title: "Seu Primeiro GET",
    prompt:
      'Escreva o código REST Assured completo para fazer um GET em "/api/users/1" e validar que o status code da resposta é 200.',
    requiredTokens: ["given(", ".when(", ".get(", ".then(", "statuscode(200"],
    sampleSolution: 'given()\n    .when()\n    .get("/api/users/1")\n    .then()\n    .statusCode(200);',
    hint: "Estrutura: given().when().get(\"...\").then().statusCode(...);",
    explanation:
      'given().when().get("/api/users/1").then().statusCode(200); faz a requisição e garante que o servidor respondeu com sucesso.',
    icon: "🚀",
    phase: 6,
  },
  {
    kind: "code-write",
    title: "Validando o Corpo da Resposta",
    prompt:
      'Agora valide também que o campo "name" do JSON de resposta é igual a "Reinaldo". Use .body(...) com o matcher equalTo do Hamcrest.',
    requiredTokens: [".body(", "equalto(", '"name"'],
    sampleSolution:
      'given()\n    .when()\n    .get("/api/users/1")\n    .then()\n    .statusCode(200)\n    .body("name", equalTo("Reinaldo"));',
    hint: 'Use .body("name", equalTo("Reinaldo")) dentro do .then().',
    explanation:
      '.body("name", equalTo("Reinaldo")) usa JSON Path para navegar até o campo "name" e o matcher equalTo para comparar o valor.',
    icon: "🔎",
    phase: 6,
  },
  {
    kind: "code-write",
    title: "Testando um POST",
    prompt:
      'Escreva um POST para "/api/users" enviando o corpo JSON {"name":"Ana"} e validando que o status code retornado é 201.',
    requiredTokens: [".contenttype(", ".body(", ".post(", "statuscode(201"],
    sampleSolution:
      'given()\n    .contentType(ContentType.JSON)\n    .body("{\\"name\\":\\"Ana\\"}")\n    .when()\n    .post("/api/users")\n    .then()\n    .statusCode(201);',
    hint: "Defina o Content-Type, envie o body no given() e chame .post(\"...\") no when().",
    explanation:
      "No POST, o corpo e o Content-Type vão no given(), a chamada .post(\"...\") no when(), e o status 201 confirma a criação do recurso.",
    icon: "📮",
    phase: 6,
  },
  {
    kind: "code-fill",
    title: "Extraindo Valores da Resposta",
    prompt: "Complete o código para extrair o valor do campo \"id\" da resposta e guardá-lo em uma variável int:",
    codeBefore: 'int id = given()\n    .when()\n    .get("/api/users/1")\n    .then()\n    .extract()\n    .',
    codeAfter: '("id");',
    acceptedAnswers: ["path"],
    placeholder: "path",
    explanation: '.extract().path("id") lê o JSON Path "id" da resposta e retorna o valor já convertido no tipo esperado.',
    icon: "📤",
    phase: 6,
  },
  {
    kind: "type-answer",
    title: "Base URI",
    prompt:
      "Qual propriedade estática do RestAssured configuramos para definir a URL base usada em todas as chamadas, evitando repeti-la em cada teste?",
    acceptedAnswers: ["baseuri", "restassured.baseuri"],
    placeholder: "RestAssured...",
    hint: "É uma propriedade estática, escrita em maiúsculas na primeira parte: RestAssured.____",
    explanation: "RestAssured.baseURI = \"https://api.exemplo.com\"; centraliza a URL base para todos os testes.",
    icon: "🌍",
    phase: 6,
  },
  {
    kind: "quiz",
    title: "Request Specification",
    prompt: "Qual é a vantagem de usar uma RequestSpecification no REST Assured?",
    options: [
      "Deixa o código mais lento e verboso",
      "Permite reaproveitar configurações comuns (headers, baseURI, auth) entre vários testes",
      "Substitui completamente o JUnit",
      "Só funciona com respostas em XML",
    ],
    correct: 1,
    explanation:
      "RequestSpecification centraliza configurações repetidas (baseURI, headers, autenticação) para evitar duplicação entre testes.",
    icon: "📑",
    phase: 6,
  },

  // ============ FASE 7: TORRE CI/CD (Integração Contínua e Relatórios) ============
  {
    kind: "quiz",
    title: "GitHub Actions",
    prompt: "Onde ficam definidos os workflows do GitHub Actions dentro de um repositório?",
    options: [".github/workflows", "src/ci", "package.json", "Dockerfile"],
    correct: 0,
    explanation: "Workflows do GitHub Actions são arquivos YAML dentro da pasta .github/workflows.",
    icon: "⚙️",
    phase: 7,
  },
  {
    kind: "type-answer",
    title: "Relatórios de Teste",
    prompt:
      "Qual ferramenta é muito usada no mercado para gerar relatórios visuais e ricos da execução de testes (unitários e de API)?",
    acceptedAnswers: ["allure"],
    placeholder: "Nome da ferramenta...",
    explanation: "Allure Report gera relatórios interativos com histórico, passos e evidências de execução dos testes.",
    icon: "📈",
    phase: 7,
  },
  {
    kind: "quiz",
    title: "Testes no Pipeline",
    prompt: "Qual é o benefício de rodar testes automatizados em pipelines de CI a cada Pull Request?",
    options: [
      "Detectar regressões cedo, antes do merge para a branch principal",
      "Substituir o versionamento de código",
      "Aumentar artificialmente o tempo de deploy",
      "Eliminar totalmente a necessidade de testes manuais",
    ],
    correct: 0,
    explanation: "Rodar testes a cada PR detecta problemas antes de chegarem à branch principal, reduzindo o custo da correção.",
    icon: "🔀",
    phase: 7,
  },
  {
    kind: "type-answer",
    title: "Linguagem do BDD",
    prompt:
      "No BDD (Behavior Driven Development) com Cucumber, qual linguagem usamos para escrever cenários legíveis por humanos, com palavras-chave como Dado/Quando/Então?",
    acceptedAnswers: ["gherkin"],
    placeholder: "Nome da linguagem...",
    explanation: "Gherkin é a linguagem estruturada do Cucumber, permitindo que negócio e QA leiam os cenários de teste.",
    icon: "🥒",
    phase: 7,
  },
  {
    kind: "code-fill",
    title: "Cenário Gherkin",
    prompt: "Complete a palavra-chave do Gherkin que abre um cenário descrevendo o contexto inicial:",
    codeBefore: '',
    codeAfter: ' que o usuário está autenticado\nQuando ele acessa "/perfil"\nEntão o sistema retorna status 200',
    acceptedAnswers: ["dado", "given"],
    placeholder: "Dado",
    explanation: "'Dado' (Given) descreve o contexto/estado inicial antes da ação do cenário.",
    icon: "🥒",
    phase: 7,
  },
  {
    kind: "quiz",
    title: "Execução Paralela",
    prompt: "Qual prática ajuda a reduzir o tempo total de execução de uma suíte grande de testes automatizados em pipelines?",
    options: [
      "Rodar todos os testes sempre em sequência",
      "Executar os testes em paralelo",
      "Remover todos os testes da suíte",
      "Rodar a suíte apenas uma vez por semana",
    ],
    correct: 1,
    explanation: "Execução paralela distribui os testes entre múltiplos workers/threads, reduzindo o tempo total do pipeline.",
    icon: "⚡",
    phase: 7,
  },
];

export const getExercisesByPhase = (phaseId: number): QaExercise[] =>
  qaExercises.filter((exercise) => exercise.phase === phaseId);

export const getCurrentQaPhase = (exerciseIndex: number): QaPhase => {
  const exercise = qaExercises[exerciseIndex];
  return qaPhases.find((phase) => phase.id === exercise?.phase) || qaPhases[0];
};
