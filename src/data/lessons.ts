export interface Lesson {
  title: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  icon: string;
}

export const lessons: Lesson[] = [
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
  },
  {
    title: "Condicionais",
    question: 'Complete:\nif (_____) { Console.WriteLine("Ok"); }',
    options: ["true", '"true"', "= true"],
    correct: 0,
    explanation: "Condições precisam ser booleanas, não strings.",
    icon: "🛡️",
  },
  {
    title: "Loops",
    question:
      "Qual loop é ideal quando você sabe exatamente quantas vezes quer repetir?",
    options: ["while", "foreach", "for"],
    correct: 2,
    explanation: "Use for quando a quantidade de repetições é conhecida.",
    icon: "🔄",
  },
  {
    title: "Métodos",
    question: "Qual é a forma correta de declarar um método em C#?",
    options: ["function Soma() {}", "void Soma() {}", "method Soma() {}"],
    correct: 1,
    explanation: "Em C#, métodos usam tipo de retorno (void, int, string…).",
    icon: "🎯",
  },
  {
    title: "Classes",
    question: "Qual palavra-chave usamos para criar uma classe?",
    options: ["struct", "object", "class"],
    correct: 2,
    explanation: "A palavra-chave class define uma classe.",
    icon: "🏰",
  },
  {
    title: "Construtores",
    question: "Qual é a função de um construtor?",
    options: ["Destruir objetos", "Inicializar o objeto", "Criar métodos"],
    correct: 1,
    explanation: "Construtores inicializam o estado do objeto.",
    icon: "🔨",
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
  },
  {
    title: "LINQ",
    question: "Qual método LINQ filtra elementos de uma coleção?",
    options: ["Select()", "Where()", "OrderBy()"],
    correct: 1,
    explanation: "Where() filtra elementos com base em uma condição.",
    icon: "🔮",
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
  },
  {
    title: "Exceções",
    question: "Qual bloco usamos para tratar erros?",
    options: ["catch", "try/catch", "error"],
    correct: 1,
    explanation: "try/catch captura exceções e evita que a app quebre.",
    icon: "🛡️",
  },
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
  },
  {
    title: "ASP.NET",
    question: "Qual tipo de projeto usamos para criar APIs?",
    options: ["Console App", "Class Library", "ASP.NET Web API"],
    correct: 2,
    explanation: "ASP.NET Web API é o template ideal para APIs.",
    icon: "🌐",
  },
];
