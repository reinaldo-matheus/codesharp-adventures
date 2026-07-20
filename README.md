# 🎮 CodeSharp 

> Aprenda C# e .NET jogando 🎮

O CodeSharp é um **protótipo de plataforma gamificada** inspirado em Duolingo e Mimo, criado para ensinar **C# e .NET** de forma prática, divertida e progressiva.

Aqui você não apenas estuda, você **eleva seu XP de Dev C#**.

O projeto também tem **trilhas alternativas**: **CodeSharp QA**, para quem quer se tornar QA e aprender automação de testes e testes de API com REST Assured, e **CodeSharp Java**, para quem quer aprender Java e Spring Boot do zero.

---

## 🚀 Visão do Projeto

A ideia do CodeSharp é transformar o aprendizado de programação em uma **experiência gamer**, onde cada fase ensina um conceito real usado no mercado.

🎯 Objetivo principal:  
> Tornar o estudo de C# (ou de QA) menos teórico e mais **interativo**.

---

## 🧩 Funcionalidades atuais

- ✅ Sistema de fases
- ✅ Perguntas interativas
- ✅ Feedback imediato
- ✅ Sistema de XP
- ✅ Sistema de níveis
- ✅ Interface simples e responsiva
- ✅ Progresso salvo automaticamente no dispositivo (retoma de onde parou ao voltar)
- ✅ Conta opcional (e-mail/senha) para sincronizar o progresso entre dispositivos
- ✅ Instalável como app no celular (PWA, funciona offline)
- ✅ Conteúdos de:
  - Variáveis
  - Condicionais
  - Loops
  - Métodos
  - Classes
  - Construtores
  - Listas
  - LINQ
  - Async/Await
  - Exceções
  - .NET CLI
  - ASP.NET Web API

---

## 🐛 Trilha alternativa: CodeSharp QA (`/qa`)

Além da trilha de C#, o projeto conta com uma **trilha completa para quem quer se tornar QA**, guiada pela personagem **Égide, Guardiã da Qualidade**. Diferente da trilha de C# (só múltipla escolha), aqui a maioria dos desafios exige que você **digite a resposta ou escreva código de verdade**, para reforçar o aprendizado:

- 🧠 **Resposta curta** — digite o termo/conceito correto (com tentativas e dicas)
- ✍️ **Complete o código** — preencha a lacuna em um trecho de código real
- 💻 **Escreva o código** — escreva a solução em uma área de código, com checklist ao vivo dos requisitos atendidos

Conteúdo da trilha (7 fases, 60 desafios), revisado para preparar quem está começando do zero até o nível de conseguir uma vaga júnior de QA:

1. **Vila do Aprendiz QA** — Fundamentos de Qualidade de Software (QA vs QC, bugs, ciclo de vida, Scrum, smoke/sanity test, teste exploratório)
2. **Academia dos Casos de Teste** — Test Design (casos de teste, técnicas de caixa-preta e caixa-branca, bug report, prioridade vs severidade)
3. **Forja da Automação** — Estratégia, ferramentas e prática de automação (pirâmide de testes, Page Object Model, Selenium/Playwright/Cypress, locators na prática, esperas explícitas, testes flaky, CI)
4. **Oficina Java & JUnit** — Base para automação de API (Maven, JUnit 5, AssertJ, mocks com Mockito)
5. **Cavernas da API** — Fundamentos de API REST (verbos HTTP, status codes, JSON, headers, Postman)
6. **Santuário REST Assured** — Automação de testes de API na prática (given/when/then, GET/POST, JSON Path, Hamcrest, RequestSpecification, autenticação com Bearer Token, validação de JSON Schema)
7. **Torre CI/CD** — Integração contínua e relatórios (GitHub Actions, Allure, BDD/Gherkin/Cucumber, execução paralela, WireMock, portfólio de QA)

Todas as respostas vêm com explicações mais completas, ligando o conceito à prática do dia a dia de QA no mercado. Acesse em `/qa`, ou use o botão de trocar de trilha no topo de cada módulo.

---

## ☕ Trilha alternativa: CodeSharp Java (`/java`)

A trilha mais nova, guiada pelo mascote **Duque, o Mestre Cafeeiro**, ensina Java e Spring Boot do zero até conceitos de deploy, com a mesma filosofia da trilha de QA: a maioria dos desafios exige **digitar a resposta ou escrever código de verdade**, não só marcar alternativas.

Conteúdo da trilha (7 fases, ~44 desafios):

1. **Vila do Aprendiz Java** — Fundamentos da linguagem (variáveis, tipos, condicionais, loops, strings)
2. **Academia da Orientação a Objetos** — Classes, construtores, encapsulamento, herança, interfaces
3. **Forja das Coleções & Streams** — Collections (List/Set/Map), Generics, lambdas e Streams (Java moderno)
4. **Torre das Exceções** — Tratamento de erros (try/catch/finally, checked vs unchecked, try-with-resources)
5. **Oficina de Testes** — JUnit, TDD e mocks com Mockito, Gradle e cobertura de testes
6. **Cavernas da API Spring Boot** — APIs REST com Spring Boot (@RestController, @GetMapping/@PostMapping, @RequestBody, injeção de dependência)
7. **Pico do Deploy** — Docker e CI/CD (Dockerfile, build com Maven, pipelines, variáveis de ambiente, health checks)

Acesse em `/java`, ou use o botão de trocar de trilha no topo de cada módulo.

---

## ☁️ Conta e sincronização na nuvem (opcional)

O jogo funciona 100% sem conta: o progresso fica salvo no `localStorage` do navegador. Criar uma conta (botão "Entrar" no topo de cada trilha) é opcional e serve só para levar o progresso para outros dispositivos.

Isso usa [Supabase](https://supabase.com) (Auth + Postgres) através do `@supabase/supabase-js` **no navegador**, usando apenas a URL do projeto e a chave `anon`/`publishable` — a chave secreta/service-role nunca é usada aqui, pois exporia acesso total ao banco no bundle do cliente. A segurança de cada usuário só ver seu próprio progresso é garantida por Row Level Security no Postgres (veja `supabase/schema.sql`).

Para habilitar em um novo ambiente:

1. Crie um projeto em [supabase.com](https://supabase.com) (ou use um existente).
2. Rode `supabase/schema.sql` no SQL Editor do projeto. O script é idempotente: se você já tinha rodado uma versão anterior (por exemplo, antes da trilha Java existir), rodar de novo é seguro e só atualiza o que mudou.
3. Configure as variáveis de ambiente (`.env.local` localmente, ou nas variáveis de ambiente do Vercel para produção):
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
   (veja `.env.example`). Sem essas variáveis, o app continua funcionando normalmente, só sem o botão de login.

---

## 🛠 Tecnologias usadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **TypeScript**
- React 18 - biblioteca de UI
- Vite - build tool e dev server
- Tailwind CSS - framework de utilitários CSS
- React Router DOM - roteamento
- Radix UI - componentes primitivos acessíveis
- Lucide React - ícones
- Framer Motion (via tailwindcss-animate) - animações
- shadcn/ui - sistema de componentes
- vite-plugin-pwa - app instalável e funcionando offline no celular
- Supabase (Auth + Postgres) - conta opcional e sincronização de progresso na nuvem
- (em breve 👀) **ASP.NET Core** e **Spring Boot** na prática

---

"Um jogo feito de Dev para Dev 🫡🚀"
