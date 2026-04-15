# Survival of Choice 🧟‍♂️🎒

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue)
![Linguagem](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Plataforma](https://img.shields.io/badge/Browser-Native-orange)
![Licença](https://img.shields.io/badge/Licença-MIT-green)

Bem-vindo ao **Survival of Choice**, um jogo de sobrevivência em texto baseado inteiramente em escolhas lógicas e mecânicas de risco e recompensa. Sobreviva por 10 dias em um mundo devastado por um apocalipse zumbi, gerencie seus recursos vitais e tome decisões difíceis para garantir seu resgate!

---

## 📑 Tabela de Conteúdos
1. [História e Narrativa](#-história-e-narrativa)
2. [Objetivos do Jogo](#-objetivos-do-jogo)
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
4. [Pré-requisitos de Sistema](#-pré-requisitos-de-sistema)
5. [Instalação e Execução](#-instalação-e-execução)
6. [Troubleshooting (Problemas Comuns)](#-troubleshooting-problemas-comuns)
7. [Como Jogar](#-como-jogar)
8. [Contribuição](#-contribuição)
9. [Licença](#-licença)

---

## 📖 História e Narrativa

### Ambientação
O ano é atual, mas o mundo como conhecemos acabou. Um surto viral sem precedentes se espalhou globalmente em questão de dias, transformando a maior parte da população em criaturas irracionais e violentas. A sociedade civil entrou em colapso: as ruas estão infestadas, saqueadores dominam as áreas abandonadas, o suprimento de energia está falhando e a comida se tornou a moeda mais valiosa do novo mundo. 

### O Personagem Principal
Você joga como um(a) sobrevivente comum, isolado(a) em sua própria casa. Você não é um super soldado, apenas alguém tentando resistir à catástrofe. Seu estoque inicial é escasso e as decisões que você tomarão ditarão se você verá o amanhecer do dia seguinte.

### A Jornada (Os 10 Dias)
A narrativa se desdobra ao longo de 10 dias de puro terror psicológico e sobrevivência tática:
- **Dias 1 a 3**: O início do caos, o silêncio perturbador das ruas e os primeiros encontros com infectados e outros sobreviventes desesperados.
- **Dias 4 a 6**: Desafios ambientais severos, como tempestades torrenciais, exploração em áreas de alto risco (supermercado) e a constante ameaça de doenças.
- **Dias 7 a 9**: A ameaça escala drasticamente. Saqueadores humanos começam a patrulhar sua área, cães mutantes caçam nas sombras e uma horda colossal varre as ruas.
- **Dia 10 (O Resgate)**: O exército anuncia a extração final no telhado do hospital central. A cartada final para sobreviver à mutação mais mortal já vista.

---

## 🎯 Objetivos do Jogo

O objetivo principal é simples: **Sobreviver até o resgate no 10º dia**.
Para isso, você deve equilibrar cuidadosamente as seguintes métricas do seu inventário:
- ❤️ **Vida (0 a 10)**: Zera e o jogo acaba.
- 🍗 **Fome (0 a 5)**: Ficar sem comida causará perda constante de vida e energia.
- 💧 **Sede (0 a 5)**: Ficar sem água é letal rapidamente.
- 🔫 **Balas e 🔪 Durabilidade da Arma**: Necessários para enfrentar os horrores lá fora sem sofrer dano letal.
- 💊 **Remédios e 🩹 Kits Médicos**: Itens cruciais para curar infecções e restaurar grandes quantidades de vida.

---

## 💻 Tecnologias Utilizadas

- **TypeScript**: Para tipagem forte e construção da lógica sequencial orientada a módulos.
- **HTML5**: Estrutura base de inicialização no navegador.
- **JavaScript (ES6 Modules)**: Transpilado do TS para executar o jogo nativamente via interface de `alert` e `prompt`.

---

## ⚙️ Pré-requisitos de Sistema

Antes de começar, certifique-se de ter os seguintes softwares instalados na sua máquina:
1. [Node.js e npm](https://nodejs.org/pt-br/) (necessário para o compilador TypeScript).
2. [TypeScript](https://www.typescriptlang.org/) instalado globalmente (ou localmente no projeto).
3. Editor de código [Visual Studio Code (VS Code)](https://code.visualstudio.com/).
4. Extensão do VS Code: **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** (de Ritwick Dey).

---

## 🚀 Instalação e Execução

Siga este passo a passo para compilar e rodar o projeto localmente com o Live Server:

### Passo 1: Clonar/Acessar o Repositório
Abra o terminal na pasta onde deseja ter o projeto e clone-o (se aplicável), ou navegue até a pasta existente:
```bash
cd "c:\..."
```

### Passo 2: Instalar Dependências e Compilar o TypeScript
Se for a primeira vez rodando, garanta que o TypeScript está transpilando os arquivos para JavaScript:
```bash
# Compilar o código TypeScript em tempo real (Watch mode)
npx tsc -w
```
*(Deixe este terminal rodando em segundo plano para que qualquer alteração no `.ts` seja refletida instantaneamente na pasta `dist/`)*

### Passo 3: Iniciar o Live Server
1. Abra o VS Code na pasta raiz do projeto.
2. No explorador de arquivos à esquerda, localize e clique no arquivo `index.html`.
3. Com o arquivo aberto, **clique com o botão direito** no código fonte e selecione a opção **"Open with Live Server"** (ou use o atalho `Alt + L, Alt + O`).
4. Seu navegador padrão será aberto automaticamente (geralmente em `http://127.0.0.1:5500/index.html`) e o jogo será iniciado de imediato via `alert`.

---

## 🛠️ Troubleshooting (Problemas Comuns)

Caso o jogo não inicie ou algo dê errado, verifique as soluções abaixo:

- **Erro "Module not found" no Console (F12)**: 
  - *Motivo*: O arquivo `index.html` está tentando buscar arquivos JS que não foram gerados.
  - *Solução*: Certifique-se de que você rodou o comando de compilação `tsc` ou `npx tsc` e que os arquivos `.js` foram gerados corretamente na pasta `/dist/`.
- **O Live Server não está atualizando as mudanças**:
  - *Motivo*: O Live Server observa mudanças em arquivos estáticos (HTML/JS/CSS). Se o TS não compilar, o JS não muda.
  - *Solução*: Verifique se o terminal com `tsc -w` está rodando e não apresentou erros de sintaxe (linhas vermelhas).
- **O jogo entrou em loop infinito e o navegador travou**:
  - *Motivo*: Devido à natureza síncrona do `prompt` e `while` no JavaScript, o navegador congela se não houver condição de saída (`break`).
  - *Solução*: Feche a aba travada. Se as opções apresentarem bug (ex: você digita "7" e ele não reage), o código pode não estar tratando essa exceção. Corrija o TypeScript e abra o Live Server novamente. Sempre utilize apenas os números apresentados nos menus (1 a 6).

---

## 🎮 Como Jogar

Toda a interação do jogo ocorre nativamente através dos diálogos do próprio navegador:
1. Leia os avisos com atenção (`alert`), eles informam o status de seus recursos e eventos da história.
2. Quando um menu aparecer (`prompt`), digite o **número correspondente** à ação que deseja tomar e pressione `Enter` (ou clique em OK).
3. Seja estratégico: "Explorar" gasta mais energia (fome/sede), mas é a única forma de repor recursos escassos. Evite combates desnecessários se sua vida estiver baixa!

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:
1. Faça um Fork do projeto.
2. Crie uma branch para a sua feature (`git checkout -b feature/NovaMecanica`).
3. Faça o commit das suas alterações (`git commit -m 'Adiciona novo inimigo ao dia 5'`).
4. Faça o push para a branch (`git push origin feature/NovaMecanica`).
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
*Desenvolvido para testar habilidades de lógica sequencial e gestão de estados em TypeScript.*
