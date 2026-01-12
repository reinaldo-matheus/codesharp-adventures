export interface Lesson {
  title: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  icon: string;
  phase: number; // 1 = Floresta (básico), 2 = Biblioteca (intermediário), 3 = Dungeon (avançado), 4 = Castelo (expert)
}

export interface Phase {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export const phases: Phase[] = [
  { id: 1, name: "Floresta dos Iniciantes", description: "Fundamentos de C#", icon: "🌲" },
  { id: 2, name: "Biblioteca Arcana", description: "Estruturas de Dados", icon: "📚" },
  { id: 3, name: "Dungeon das Sombras", description: "Programação Avançada", icon: "🏚️" },
  { id: 4, name: "Castelo do Mestre", description: "Arquitetura e Padrões", icon: "🏰" },
];

export const lessons: Lesson[] = [
  // ============ FASE 1: FLORESTA DOS INICIANTES (Básico) ============
  {
    title: "Variáveis",
    question: "Qual é a forma correta de declarar uma variável inteira em C#?",
    options: [
      'int numero = "10";',
      "int numero = 10;",
      "var numero : int = 10;",
    ],
    correct: 1,
    explanation: "Inteiros usam o tipo int e não levam aspas.",
    icon: "⚔️",
    phase: 1,
  },
  {
    title: "Condicionais",
    question: 'Complete:\nif (_____) { Console.WriteLine("Ok"); }',
    options: ["true", '"true"', "= true"],
    correct: 0,
    explanation: "Condições precisam ser booleanas, não strings.",
    icon: "🛡️",
    phase: 1,
  },
  {
    title: "Loops",
    question:
      "Qual loop é ideal quando você sabe exatamente quantas vezes quer repetir?",
    options: ["while", "foreach", "for"],
    correct: 2,
    explanation: "Use for quando a quantidade de repetições é conhecida.",
    icon: "🔄",
    phase: 1,
  },
  {
    title: "Métodos",
    question: "Qual é a forma correta de declarar um método em C#?",
    options: ["function Soma() {}", "void Soma() {}", "method Soma() {}"],
    correct: 1,
    explanation: "Em C#, métodos usam tipo de retorno (void, int, string…).",
    icon: "🎯",
    phase: 1,
  },
  {
    title: "Strings",
    question: "Como concatenar duas strings em C#?",
    options: [
      'string resultado = str1 + str2;',
      'string resultado = str1 & str2;',
      'string resultado = str1.add(str2);',
    ],
    correct: 0,
    explanation: "O operador + é usado para concatenar strings em C#.",
    icon: "📝",
    phase: 1,
  },

  // ============ FASE 2: BIBLIOTECA ARCANA (Intermediário) ============
  {
    title: "Classes",
    question: "Qual palavra-chave usamos para criar uma classe?",
    options: ["struct", "object", "class"],
    correct: 2,
    explanation: "A palavra-chave class define uma classe.",
    icon: "🏰",
    phase: 2,
  },
  {
    title: "Construtores",
    question: "Qual é a função de um construtor?",
    options: ["Destruir objetos", "Inicializar o objeto", "Criar métodos"],
    correct: 1,
    explanation: "Construtores inicializam o estado do objeto.",
    icon: "🔨",
    phase: 2,
  },
  {
    title: "Listas",
    question: "Qual é a forma correta de criar uma lista de inteiros?",
    options: [
      "List<int> numeros = new List<int>();",
      "int[] numeros = new List();",
      "Array<int> numeros = new Array();",
    ],
    correct: 0,
    explanation: "List<T> é a estrutura correta para listas dinâmicas.",
    icon: "📜",
    phase: 2,
  },
  {
    title: "Propriedades",
    question: "Qual é a sintaxe correta para uma propriedade automática?",
    options: [
      "public int Idade { get; set; }",
      "public int Idade = get, set;",
      "property int Idade { get; set; }",
    ],
    correct: 0,
    explanation: "Propriedades automáticas usam { get; set; } após o tipo.",
    icon: "🔐",
    phase: 2,
  },
  {
    title: "Herança",
    question: "Como uma classe Cachorro herda de Animal?",
    options: [
      "class Cachorro extends Animal",
      "class Cachorro : Animal",
      "class Cachorro inherits Animal",
    ],
    correct: 1,
    explanation: "Em C#, usamos : (dois pontos) para indicar herança.",
    icon: "🧬",
    phase: 2,
  },

  // ============ FASE 3: DUNGEON DAS SOMBRAS (Avançado) ============
  {
    title: "LINQ",
    question: "Qual método LINQ filtra elementos de uma coleção?",
    options: ["Select()", "Where()", "OrderBy()"],
    correct: 1,
    explanation: "Where() filtra elementos com base em uma condição.",
    icon: "🔮",
    phase: 3,
  },
  {
    title: "Async/Await",
    question: "Para que serve o async/await?",
    options: [
      "Executar código mais rápido",
      "Evitar bloqueio da aplicação",
      "Criar threads manualmente",
    ],
    correct: 1,
    explanation:
      "Async evita travar a aplicação enquanto espera algo terminar.",
    icon: "⚡",
    phase: 3,
  },
  {
    title: "Exceções",
    question: "Qual bloco usamos para tratar erros?",
    options: ["catch", "try/catch", "error"],
    correct: 1,
    explanation: "try/catch captura exceções e evita que a app quebre.",
    icon: "🛡️",
    phase: 3,
  },
  {
    title: "Delegates",
    question: "O que é um delegate em C#?",
    options: [
      "Um tipo de variável estática",
      "Uma referência para um método",
      "Um modificador de acesso",
    ],
    correct: 1,
    explanation: "Delegates são ponteiros type-safe para métodos.",
    icon: "🎭",
    phase: 3,
  },
  {
    title: "Interfaces",
    question: "Qual a principal diferença entre interface e classe abstrata?",
    options: [
      "Interfaces podem ter implementação",
      "Classes podem implementar múltiplas interfaces",
      "Interfaces usam a palavra 'abstract'",
    ],
    correct: 1,
    explanation: "C# suporta múltiplas interfaces, mas só uma classe base.",
    icon: "📋",
    phase: 3,
  },

  // ============ FASE 4: CASTELO DO MESTRE (Expert) ============
  {
    title: ".NET CLI",
    question: "Qual comando cria um novo projeto console em .NET?",
    options: [
      "dotnet start console",
      "dotnet new console",
      "dotnet create console",
    ],
    correct: 1,
    explanation: "dotnet new console cria um app de terminal.",
    icon: "💻",
    phase: 4,
  },
  {
    title: "ASP.NET",
    question: "Qual tipo de projeto usamos para criar APIs?",
    options: ["Console App", "Class Library", "ASP.NET Web API"],
    correct: 2,
    explanation: "ASP.NET Web API é o template ideal para APIs.",
    icon: "🌐",
    phase: 4,
  },
  {
    title: "Dependency Injection",
    question: "Qual é o principal benefício da Injeção de Dependência?",
    options: [
      "Código mais rápido",
      "Baixo acoplamento e testabilidade",
      "Menos linhas de código",
    ],
    correct: 1,
    explanation: "DI facilita testes e reduz dependências entre classes.",
    icon: "💉",
    phase: 4,
  },
  {
    title: "Entity Framework",
    question: "O que o Entity Framework Core faz?",
    options: [
      "Gerencia conexões HTTP",
      "Mapeia objetos para banco de dados (ORM)",
      "Cria interfaces gráficas",
    ],
    correct: 1,
    explanation: "EF Core é um ORM que mapeia classes C# para tabelas SQL.",
    icon: "🗃️",
    phase: 4,
  },
  {
    title: "Design Patterns",
    question: "Qual padrão garante que uma classe tenha apenas uma instância?",
    options: ["Factory", "Singleton", "Observer"],
    correct: 1,
    explanation: "Singleton restringe a instanciação a um único objeto.",
    icon: "👑",
    phase: 4,
  },
  {
    title: "SOLID",
    question: "O que significa o 'S' em SOLID?",
    options: [
      "Single Responsibility Principle",
      "Static Method Principle",
      "Simple Code Principle",
    ],
    correct: 0,
    explanation: "Uma classe deve ter apenas uma razão para mudar.",
    icon: "⭐",
    phase: 4,
  },
];

// Helper function to get lessons by phase
export const getLessonsByPhase = (phaseId: number): Lesson[] => {
  return lessons.filter((lesson) => lesson.phase === phaseId);
};

// Helper function to get current phase based on lesson index
export const getCurrentPhase = (lessonIndex: number): Phase => {
  const lesson = lessons[lessonIndex];
  return phases.find((p) => p.id === lesson?.phase) || phases[0];
};
