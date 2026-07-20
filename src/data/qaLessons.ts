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
  { id: 3, name: "Forja da Automação", description: "Estratégia, Ferramentas e Prática de Automação", icon: "⚙️" },
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
      "QA atua no processo inteiro — revisão de requisitos, design, código e deploy — para prevenir defeitos antes que eles aconteçam, não só 'caçar bugs' no final. É essa visão de prevenção, e não só de detecção, que empresas esperam de um QA em entrevistas.",
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
      "O teste de regressão revalida funcionalidades que já funcionavam sempre que o código muda, evitando que uma nova entrega quebre algo antigo. É provavelmente o tipo de teste que você mais vai rodar no dia a dia, manual ou automatizado.",
    icon: "🔁",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Bug",
    prompt: "Qual termo descreve um comportamento do sistema que diverge do que era esperado pela especificação?",
    acceptedAnswers: ["bug", "defeito", "defect"],
    placeholder: "Digite o termo...",
    explanation:
      "Bug (ou defeito) é qualquer desvio entre o comportamento esperado — definido pela especificação ou pelo bom senso do usuário — e o comportamento real do sistema. Saber articular esse desvio com clareza é a base de um bom relatório de bug.",
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
      "'Resolved/Fixed' indica que a correção foi feita e aguarda a validação do QA antes de virar 'Closed'. Esse fluxo (New → In Progress → Resolved → Closed, com Reopened se a correção falhar) é praticamente idêntico em Jira, Azure DevOps e qualquer ferramenta de bug tracking do mercado.",
    icon: "🔄",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Scrum",
    prompt: "Qual metodologia ágil organiza o trabalho em sprints, dailies e um product backlog?",
    acceptedAnswers: ["scrum"],
    placeholder: "Nome da metodologia...",
    explanation:
      "Scrum é o framework ágil mais usado no mercado, com sprints, daily meetings, backlog e retrospectivas. Como QA, você participa ativamente dessas cerimônias — inclusive ajudando a refinar critérios de aceite antes da sprint começar.",
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
      "Testes não-funcionais avaliam atributos como performance, segurança, usabilidade e escalabilidade — não o comportamento funcional direto. Muita gente esquece deles no dia a dia, mas são frequentemente o que separa um QA júnior de um QA pleno.",
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
      "Um bom QA pensa como quem quer 'break' o sistema — testar caminhos alternativos, dados inválidos e cenários extremos, não só o 'caminho feliz'. Essa mentalidade crítica e curiosa é exatamente o que recrutadores tentam identificar em entrevistas comportamentais.",
    icon: "🧠",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Smoke Test",
    prompt:
      "Depois de um novo deploy, qual teste rápido e superficial verifica se as funcionalidades mais críticas do sistema funcionam antes de liberar um ciclo de testes mais completo?",
    acceptedAnswers: ["smoke test", "teste de fumaca"],
    placeholder: "Digite o termo...",
    hint: "O nome vem de ligar um equipamento e ver se sai fumaça antes de testar tudo o resto.",
    explanation:
      "Smoke test é um checklist mínimo (login funciona, a página abre, a API responde) para decidir se vale a pena investir tempo testando aquela build a fundo. É comum rodar smoke tests automatizados logo após cada deploy, inclusive em produção.",
    icon: "💨",
    phase: 1,
  },
  {
    kind: "quiz",
    title: "Sanity Test",
    prompt:
      "O time corrigiu um bug específico no cálculo de frete. Qual tipo de teste, focado e rápido, você faz para confirmar que aquela correção específica funcionou, sem testar o sistema inteiro de novo?",
    options: ["Teste de Regressão completo", "Sanity Test", "Teste de Carga", "Teste Exploratório"],
    correct: 1,
    explanation:
      "Sanity test é uma verificação estreita, focada em uma função específica que acabou de mudar — mais restrito que um smoke test (que cobre o sistema todo) e muito mais rápido que uma regressão completa. É o teste que responde 'essa correção específica resolveu o problema?'.",
    icon: "🎯",
    phase: 1,
  },
  {
    kind: "type-answer",
    title: "Teste Exploratório",
    prompt:
      "Qual abordagem de teste não usa casos de teste pré-escritos: o QA explora a aplicação aprendendo, projetando e executando testes ao mesmo tempo, guiado pela própria experiência e curiosidade?",
    acceptedAnswers: ["teste exploratorio", "exploratory testing"],
    placeholder: "Digite o termo...",
    hint: "Não segue um roteiro fixo — você 'explora' a aplicação como um usuário curioso.",
    explanation:
      "Teste exploratório combina aprender sobre a aplicação, projetar testes e executá-los ao mesmo tempo, sem um roteiro fixo. É extremamente valioso para achar bugs que casos de teste escritos não preveem, e continua sendo uma habilidade muito valorizada mesmo em times altamente automatizados.",
    icon: "🔦",
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
      "Um caso de teste descreve pré-condições, passos, dados de entrada e o resultado esperado para um cenário específico. Escrever casos de teste claros é uma das primeiras entregas que se espera de um QA júnior.",
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
      "A Análise de Valor Limite testa os limites de uma faixa válida — onde erros de 'off-by-one' (usar <= no lugar de <, por exemplo) costumam aparecer. Combinar essa técnica com Particionamento de Equivalência é a base de qualquer design de caso de teste eficiente.",
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
      "O Particionamento de Equivalência agrupa entradas que devem se comportar da mesma forma, testando apenas um representante de cada grupo — isso reduz drasticamente a quantidade de casos de teste sem perder cobertura real. É a técnica que evita ter que testar 'todos os números possíveis' de um campo.",
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
      "Testes caixa-preta validam entradas e saídas do ponto de vista do usuário, sem olhar a estrutura interna do código — é a abordagem padrão da maioria dos QAs. O oposto é a caixa-branca, que exige conhecer e testar a lógica interna do código.",
    icon: "⬛",
    phase: 2,
  },
  {
    kind: "quiz",
    title: "Caixa Branca",
    prompt: "Diferente do teste caixa-preta, o que caracteriza um teste de caixa-branca (white-box)?",
    options: [
      "Avalia a estrutura interna do código, como caminhos lógicos e condições",
      "Só pode ser feito manualmente",
      "É sempre mais lento que caixa-preta",
      "Ignora completamente o comportamento do sistema",
    ],
    correct: 0,
    explanation:
      "Testes caixa-branca exigem conhecer a implementação interna — são a base dos testes unitários, geralmente escritos pelos próprios desenvolvedores. QAs de automação frequentemente trabalham na fronteira entre os dois mundos, especialmente ao revisar cobertura de testes unitários.",
    icon: "⬜",
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
      "Sem o resultado obtido/atual, quem lê o bug não sabe qual foi o comportamento incorreto observado — e sem passos claros, ninguém consegue reproduzir e corrigir. Um bom bug report também inclui ambiente (navegador, versão, dados usados) e evidência (print, vídeo, log).",
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
      "Um bug que bloqueia a funcionalidade principal do sistema para todos os usuários é crítico/bloqueador. Severidade mede o IMPACTO técnico do bug no sistema — é fácil confundir com prioridade, que mede a URGÊNCIA de corrigir, e são conceitos independentes.",
    icon: "🚨",
    phase: 2,
  },
  {
    kind: "quiz",
    title: "Prioridade vs Severidade",
    prompt:
      "Um erro de ortografia aparece no rodapé do site, visível para milhões de usuários. É tecnicamente trivial (severidade baixa), mas a empresa quer corrigir hoje mesmo por questão de imagem. O que isso ilustra?",
    options: [
      "Severidade e prioridade são a mesma coisa",
      "Um bug pode ter severidade baixa e prioridade alta ao mesmo tempo",
      "Bugs de severidade baixa nunca devem ser corrigidos",
      "Prioridade é definida apenas pelo QA",
    ],
    correct: 1,
    explanation:
      "Severidade mede o impacto técnico do bug (o quão quebrado o sistema fica); prioridade mede a urgência de negócio para corrigi-lo. Elas nem sempre andam juntas — saber explicar essa diferença é uma das perguntas mais clássicas em entrevistas de QA.",
    icon: "⚖️",
    phase: 2,
  },
  {
    kind: "type-answer",
    title: "Teste Ponta a Ponta",
    prompt:
      "Qual termo descreve testar o sistema simulando a jornada completa do usuário, do início ao fim de um fluxo real?",
    acceptedAnswers: ["teste end to end", "end to end", "e2e", "teste ponta a ponta", "ponta a ponta"],
    placeholder: "Digite o termo...",
    explanation:
      "Testes E2E (end-to-end) validam o fluxo completo do usuário, muitas vezes atravessando várias camadas do sistema (UI, API, banco de dados). Eles dão muita confiança, mas são mais lentos e caros de manter — por isso ficam no topo, e não na base, da Pirâmide de Testes.",
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
      "A base da pirâmide (testes unitários) deve concentrar o maior volume: são rápidos, baratos e isolados, então dá pra ter milhares deles rodando em segundos. Testes de integração ficam no meio, e E2E no topo — mais lentos e caros de manter, por isso mais escassos.",
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
      "O Page Object Model isola os seletores e as ações de cada tela em uma classe própria — se um botão muda de lugar, você corrige em um só arquivo em vez de em dezenas de testes. É o padrão mais citado em vagas de QA Automation, então vale praticar de verdade, não só saber o nome.",
    icon: "📦",
    phase: 3,
  },
  {
    kind: "quiz",
    title: "Ferramentas de Automação",
    prompt: "Qual das opções abaixo NÃO é uma ferramenta de automação de testes usada no mercado?",
    options: ["Playwright", "Cypress", "Selenium", "Microsoft Word"],
    correct: 3,
    explanation:
      "Playwright e Cypress são as ferramentas mais modernas e requisitadas hoje (rápidas, com auto-wait embutido); Selenium continua sendo o mais usado historicamente e ainda aparece em muitas vagas, principalmente em Java. Word não serve para nenhum desses propósitos.",
    icon: "🧰",
    phase: 3,
  },
  {
    kind: "code-write",
    title: "Localizando Elementos (Selenium)",
    prompt:
      "Em Selenium WebDriver (Java), escreva o código que localiza um elemento pelo id \"login-button\" e clica nele.",
    requiredTokens: ["driver.findelement(", "by.id(", "\"login-button\"", ".click()"],
    sampleSolution: 'driver.findElement(By.id("login-button")).click();',
    hint: 'Estrutura: driver.findElement(By.id("...")).click();',
    explanation:
      "By.id() é geralmente o localizador mais estável, pois ids costumam ser únicos e não mudam com o layout. Evite seletores frágeis baseados em texto visível ou posição na tela, que quebram a cada pequena mudança visual.",
    icon: "🎯",
    phase: 3,
  },
  {
    kind: "code-write",
    title: "Localizando Elementos (Playwright)",
    prompt: "Em Playwright, escreva o código que localiza um elemento pelo texto \"Entrar\" e clica nele.",
    requiredTokens: ["page.getbytext(", "\"entrar\"", ".click()"],
    sampleSolution: 'await page.getByText("Entrar").click();',
    hint: "Playwright tem locators semânticos como getByText, getByRole, getByLabel.",
    explanation:
      "Playwright incentiva locators baseados em como o USUÁRIO enxerga a tela (texto, role, label) em vez de seletores CSS frágeis — isso deixa os testes mais resistentes a mudanças de estilo e mais parecidos com como um humano realmente interage com a página.",
    icon: "🎭",
    phase: 3,
  },
  {
    kind: "type-answer",
    title: "Espera Explícita",
    prompt:
      "Qual técnica evita testes flaky ao esperar uma condição específica acontecer (ex: elemento ficar visível) em vez de usar um Thread.sleep() fixo?",
    acceptedAnswers: ["explicit wait", "espera explicita", "wait explicito"],
    placeholder: "Digite o termo...",
    hint: "É o oposto de simplesmente 'esperar um tempo fixo e torcer'.",
    explanation:
      "Explicit waits (como WebDriverWait em Selenium, ou o auto-wait nativo do Playwright/Cypress) esperam uma condição real acontecer, com um timeout máximo — muito mais confiável e rápido que um sleep fixo, que ou espera tempo demais ou de menos.",
    icon: "⏳",
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
      "Testes 'flaky' são instáveis, geralmente por dependerem de tempo (esperas fixas em vez de esperas inteligentes), ordem de execução entre testes, ou dados que mudam entre execuções. Diagnosticar a causa de flakiness é uma das habilidades mais valorizadas em times de automação.",
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
      "Automação acelera a regressão e libera tempo do QA para testes exploratórios e de maior valor — mas não elimina o QA nem garante zero bugs, e escrever/manter os testes também tem custo. Um erro comum de QA iniciante é achar que 'tudo deveria ser automatizado'; a resposta certa quase sempre é 'depende do ROI'.",
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
      "CI (Continuous Integration) roda build e testes automaticamente a cada mudança, detectando problemas o mais cedo possível — antes de chegarem em produção. Ter seus testes automatizados rodando no pipeline, e não só na sua máquina, é o que transforma automação em valor real para o time.",
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
    explanation:
      "Maven (assim como Gradle) gerencia dependências externas e o ciclo de build (compilar, testar, empacotar) em projetos Java — é praticamente garantido que você vai usar um dos dois em qualquer vaga Java/QA Java.",
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
    explanation:
      "@Test marca um método como um caso de teste que o JUnit deve executar automaticamente. Sem essa anotação, o método é só um método comum e o JUnit o ignora completamente.",
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
    explanation:
      "assertEquals(esperado, obtido) falha o teste se os dois valores forem diferentes — sempre nessa ordem, para as mensagens de erro fazerem sentido. Trocar a ordem é um erro comum de quem está começando.",
    icon: "🧪",
    phase: 4,
  },
  {
    kind: "type-answer",
    title: "Setup por Teste",
    prompt: "Qual anotação do JUnit 5 executa um método antes de CADA teste da classe?",
    acceptedAnswers: ["@beforeeach", "beforeeach"],
    placeholder: "@BeforeEach",
    explanation:
      "@BeforeEach roda antes de CADA método de teste, ideal para preparar dados ou estado comum e evitar que um teste 'vaze' estado para o próximo. Existe também @BeforeAll, que roda uma única vez antes de todos os testes da classe.",
    icon: "🔧",
    phase: 4,
  },
  {
    kind: "quiz",
    title: "Assertions Fluentes",
    prompt: "Qual biblioteca é comumente combinada com JUnit em Java para deixar as verificações mais legíveis e fluentes?",
    options: ["Log4j", "AssertJ", "Jackson", "Lombok"],
    correct: 1,
    explanation:
      "AssertJ (assim como Hamcrest) oferece assertions fluentes e encadeáveis, como assertThat(idade).isGreaterThan(18) — muito mais legível que comparar valores manualmente. Vale a pena aprender pelo menos uma biblioteca dessas, pois aparece em praticamente todo projeto Java sério.",
    icon: "💬",
    phase: 4,
  },
  {
    kind: "code-fill",
    title: "Criando um Mock (Mockito)",
    prompt: "Complete o código Mockito que cria um mock (dublê) de uma interface UserRepository:",
    codeBefore: "UserRepository mockRepo = ",
    codeAfter: "(UserRepository.class);",
    acceptedAnswers: ["mock", "mockito.mock"],
    placeholder: "Mockito.mock",
    hint: "É um método estático da classe Mockito.",
    explanation:
      "Mockito.mock(UserRepository.class) cria uma versão 'falsa' da dependência, que você configura para retornar valores específicos com when(...).thenReturn(...). Isso isola o código testado de dependências reais como banco de dados ou APIs externas — essencial para testes unitários rápidos e confiáveis.",
    icon: "🃏",
    phase: 4,
  },
  {
    kind: "type-answer",
    title: "Comando Maven",
    prompt: "Qual comando Maven executa a suíte de testes de um projeto Java?",
    acceptedAnswers: ["mvn test"],
    placeholder: "mvn ...",
    explanation:
      "'mvn test' compila o projeto e executa todos os testes configurados, imprimindo quantos passaram/falharam. É o comando que você roda localmente antes do push, e também o que o pipeline de CI executa automaticamente.",
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
    explanation:
      "GET é um método idempotente e seguro (não altera dados no servidor), usado para ler recursos — por isso navegadores fazem cache de respostas GET e é seguro repeti-las.",
    icon: "🌐",
    phase: 5,
  },
  {
    kind: "type-answer",
    title: "Status 404",
    prompt: "Qual código de status HTTP indica que o recurso solicitado não foi encontrado?",
    acceptedAnswers: ["404"],
    placeholder: "Código...",
    explanation:
      "404 Not Found indica que o servidor não encontrou o recurso pedido na URL. É diferente de 401 (não autenticado) e 403 (autenticado mas sem permissão) — confundir esses três é um erro comum, então vale decorar a diferença.",
    icon: "🔍",
    phase: 5,
  },
  {
    kind: "quiz",
    title: "Formato de Dados",
    prompt: "Qual formato de dado é o mais comum em APIs REST modernas?",
    options: ["XML", "JSON", "CSV", "YAML"],
    correct: 1,
    explanation:
      "JSON é leve, legível por humanos e nativamente compatível com JavaScript — por isso é o formato padrão de fato em APIs REST modernas, tendo praticamente substituído o XML no dia a dia.",
    icon: "📄",
    phase: 5,
  },
  {
    kind: "type-answer",
    title: "Header Content-Type",
    prompt: "Qual header HTTP informa o tipo de conteúdo enviado no corpo da requisição, ex: application/json?",
    acceptedAnswers: ["content-type", "content type"],
    placeholder: "Nome do header...",
    explanation:
      "Content-Type diz ao servidor (ou cliente) como interpretar o corpo da requisição/resposta. Enviar o Content-Type errado é uma causa clássica de erro 415 (Unsupported Media Type) em testes de API.",
    icon: "🏷️",
    phase: 5,
  },
  {
    kind: "quiz",
    title: "Status 201",
    prompt: "Qual código de status indica sucesso na criação de um novo recurso via POST?",
    options: ["200 OK", "201 Created", "204 No Content", "400 Bad Request"],
    correct: 1,
    explanation:
      "201 Created confirma que um novo recurso foi criado com sucesso — e por convenção, a resposta costuma incluir um header Location apontando para a URL do recurso recém-criado.",
    icon: "📊",
    phase: 5,
  },
  {
    kind: "type-answer",
    title: "Verbo DELETE",
    prompt: "Qual verbo HTTP é usado para remover um recurso existente?",
    acceptedAnswers: ["delete"],
    placeholder: "Verbo HTTP...",
    explanation:
      "DELETE solicita a remoção do recurso identificado pela URL. É idempotente por definição — deletar o mesmo recurso duas vezes deve ter o mesmo efeito final (recurso ausente), mesmo que a segunda chamada retorne 404.",
    icon: "🗑️",
    phase: 5,
  },
  {
    kind: "type-answer",
    title: "Postman",
    prompt:
      "Qual é a ferramenta mais usada no mercado para testar APIs manualmente antes (ou em paralelo) de automatizá-las, com interface gráfica para montar requisições e organizar coleções?",
    acceptedAnswers: ["postman"],
    placeholder: "Nome da ferramenta...",
    explanation:
      "Postman é praticamente universal para explorar e documentar APIs manualmente — muitos times de QA usam para investigar o comportamento de um endpoint antes de escrever a automação em REST Assured. Insomnia é uma alternativa popular com o mesmo propósito.",
    icon: "📮",
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
    explanation:
      "REST Assured é a biblioteca Java de referência para testes de API, com uma DSL fluente que lê quase como português. É praticamente item obrigatório em vagas de QA Automation Java.",
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
    explanation:
      "O bloco .then() é onde ficam as validações (asserções) da resposta HTTP. A estrutura given (prepara) / when (executa) / then (valida) segue o mesmo padrão Arrange-Act-Assert usado em qualquer teste automatizado, não só em API.",
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
      'given().when().get("/api/users/1").then().statusCode(200); faz a requisição e garante que o servidor respondeu com sucesso. Esse é o esqueleto que você vai repetir, com variações, em praticamente todo teste REST Assured que escrever.',
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
      '.body("name", equalTo("Reinaldo")) usa JSON Path para navegar até o campo "name" e o matcher equalTo do Hamcrest para comparar o valor. Você pode encadear vários .body(...) na mesma chamada para validar múltiplos campos de uma vez.',
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
      "No POST, o corpo e o Content-Type vão no given(), a chamada .post(\"...\") no when(), e o status 201 confirma a criação do recurso. Em projetos reais, normalmente você serializa um objeto Java para JSON automaticamente em vez de escrever a string à mão.",
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
    explanation:
      '.extract().path("id") lê o JSON Path "id" da resposta e retorna o valor já convertido no tipo esperado. Isso é essencial para testes encadeados: criar um recurso, extrair o id gerado, e usá-lo nas chamadas seguintes (GET, PUT, DELETE) do mesmo cenário.',
    icon: "📤",
    phase: 6,
  },
  {
    kind: "code-write",
    title: "Autenticação com Bearer Token",
    prompt:
      "A maioria das APIs reais exige autenticação. Escreva o código REST Assured que faz um GET em \"/api/profile\" enviando um header Authorization com um Bearer token (variável 'token') e validando status 200.",
    requiredTokens: [".header(", "\"authorization\"", "bearer", ".get(", "statuscode(200"],
    sampleSolution:
      'given()\n    .header("Authorization", "Bearer " + token)\n    .when()\n    .get("/api/profile")\n    .then()\n    .statusCode(200);',
    hint: 'Use .header("Authorization", "Bearer " + token) no given().',
    explanation:
      "Bearer tokens (geralmente JWT) são o esquema de autenticação mais comum em APIs REST modernas. REST Assured também tem atalhos como .auth().oauth2(token), mas montar o header manualmente funciona sempre e ajuda a entender o que está acontecendo por baixo dos panos.",
    icon: "🔑",
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
    explanation:
      "RestAssured.baseURI = \"https://api.exemplo.com\"; centraliza a URL base para todos os testes, geralmente configurado uma vez em um método @BeforeAll. Isso evita repetir a URL completa em cada teste e facilita trocar de ambiente (dev/staging/produção).",
    icon: "🌍",
    phase: 6,
  },
  {
    kind: "quiz",
    title: "Validação de Schema",
    prompt:
      "Além de validar campos individuais, qual abordagem do REST Assured garante que a resposta inteira segue uma estrutura esperada (tipos, campos obrigatórios), útil para pegar mudanças inesperadas no contrato da API?",
    options: [
      "matchesJsonSchemaInClasspath()",
      "equalTo()",
      "containsString()",
      "hasSize()",
    ],
    correct: 0,
    explanation:
      'body(matchesJsonSchemaInClasspath("user-schema.json")) valida a resposta contra um JSON Schema completo, pegando quebras de contrato (campo que sumiu, tipo que mudou) que testes campo-a-campo poderiam não cobrir. É uma técnica avançada muito valorizada em times que fazem testes de contrato entre serviços.',
    icon: "📐",
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
      "RequestSpecification centraliza configurações repetidas (baseURI, headers, autenticação) para evitar duplicação entre dezenas de testes. Em um projeto real, é raríssimo configurar tudo manualmente em cada teste — você monta essa especificação uma vez e reutiliza.",
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
    explanation:
      "Workflows do GitHub Actions são arquivos YAML dentro da pasta .github/workflows, cada um definindo gatilhos (push, PR) e uma sequência de jobs/steps. É uma das ferramentas de CI/CD mais usadas hoje, junto com GitLab CI e Jenkins.",
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
    explanation:
      "Allure Report gera relatórios interativos com histórico, passos e evidências (até screenshots) da execução dos testes — muito mais útil para debugar falhas do que só ver 'passou/falhou' no terminal do CI.",
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
    explanation:
      "Rodar testes a cada PR detecta problemas antes de chegarem à branch principal, reduzindo drasticamente o custo da correção — é muito mais barato corrigir um bug antes do merge do que depois de estar em produção.",
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
    explanation:
      "Gherkin é a linguagem estruturada do Cucumber (Given/When/Then, ou Dado/Quando/Então), permitindo que pessoas de negócio, QA e devs leiam e até escrevam os cenários juntos, sem precisar programar.",
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
    explanation:
      "'Dado' (Given) descreve o contexto/estado inicial antes da ação do cenário — a mesma lógica do given() do REST Assured, só que em linguagem natural. O padrão Arrange-Act-Assert aparece disfarçado em quase toda ferramenta de teste que você vai usar.",
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
    explanation:
      "Execução paralela distribui os testes entre múltiplos workers/threads/máquinas, reduzindo o tempo total do pipeline de horas para minutos em suítes grandes — essencial para não travar o time inteiro esperando o CI terminar antes do merge.",
    icon: "⚡",
    phase: 7,
  },
  {
    kind: "type-answer",
    title: "Simulando Serviços (WireMock)",
    prompt:
      "Se a API que você testa depende de um serviço de pagamento externo instável ou lento, qual tipo de ferramenta você usa para simular as respostas desse serviço, criando um 'servidor falso' controlado durante os testes?",
    acceptedAnswers: ["wiremock", "mock server", "mock de api"],
    placeholder: "Nome da ferramenta/técnica...",
    hint: "É o equivalente, para chamadas HTTP inteiras, do que Mockito faz para objetos Java.",
    explanation:
      "WireMock (e ferramentas parecidas como MockServer) simulam um serviço HTTP externo, permitindo testar sua API isoladamente e de forma determinística, sem depender de serviços de terceiros no ar. É peça-chave em arquiteturas de microsserviços, onde testar 'tudo integrado' o tempo todo é caro e lento.",
    icon: "🕸️",
    phase: 7,
  },
  {
    kind: "quiz",
    title: "Portfólio de QA",
    prompt: "Você está se preparando para entrevistas de QA júnior. O que mais fortalece seu portfólio na prática?",
    options: [
      "Decorar definições de memória sem nunca ter testado nada",
      "Ter um repositório público no GitHub com testes automatizados reais rodando em um pipeline de CI",
      "Esperar o primeiro emprego para só então aprender a programar",
      "Focar só em teoria e nunca usar ferramentas como Postman ou REST Assured",
    ],
    correct: 1,
    explanation:
      "Um repositório público com testes de verdade (mesmo simples) rodando em CI mostra na prática o que dezenas de certificados não mostram: que você sabe aplicar o que aprendeu. Comece pequeno — automatize alguns cenários de uma API pública gratuita e documente as decisões que você tomou.",
    icon: "💼",
    phase: 7,
  },
];

export const getExercisesByPhase = (phaseId: number): QaExercise[] =>
  qaExercises.filter((exercise) => exercise.phase === phaseId);

export const getCurrentQaPhase = (exerciseIndex: number): QaPhase => {
  const exercise = qaExercises[exerciseIndex];
  return qaPhases.find((phase) => phase.id === exercise?.phase) || qaPhases[0];
};
