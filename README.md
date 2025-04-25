# 🎓 SynapLearn - TCC SENAI 2025

Sistema de gerenciamento de estudos gamificado com uso de Inteligência Artificial.

---

## 🧠 Objetivo

O projeto tem como foco auxiliar estudantes no gerenciamento de estudos, por meio de sessões cronometradas, relatórios de desempenho, sistema de medalhas e suporte via IA. É uma aplicação web desenvolvida para o Trabalho de Conclusão de Curso (TCC) do SENAI - 2025.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- React
- JavaScript ou TypeScript
- CSS (ou Tailwind, se desejar)

### Back-end
- Node.js
- Express
- Prisma ORM
- MySQL

### Inteligência Artificial (IA)
- Python (FastAPI ou Flask)
- OpenAI / HuggingFace / modelos de ML simples

---

## 🧩 Funcionalidades

- 📚 **Sessões de estudo** com cronômetro e armazenamento no banco
- 🧠 **Chat com IA** para dúvidas
- 📈 **Relatórios de desempenho**
- 🥇 **Sistema de medalhas** por metas concluídas
- 💬 **Envio de mensagens com respostas da IA**
- 🔐 **Sistema de login e cadastro com autenticação JWT**

---

## 🔄 Fluxo Geral

1. Usuário realiza o **login ou cadastro**
2. Pode iniciar uma **sessão de estudo**
3. Ao final, a sessão é salva no banco de dados
4. O usuário pode:
   - Receber **medalhas**
   - Fazer **perguntas** para a IA
   - Visualizar **relatórios inteligentes**

---

## 🧠 IAs Implementadas

| Nome | Função | Linguagem |
|------|--------|-----------|
| IA de dúvidas | Responde perguntas sobre temas diversos | Python |
| IA de sugestões | Recomenda temas a estudar com base nas sessões | Python |
| IA de medalhas | Gera recompensas por conquistas | TS (baseada em regras) |
| IA de sentimento (opcional) | Analisa sentimento das mensagens | Python |
| IA de relatório | Gera relatórios com base nos hábitos | Python |

---

## 🧪 Em desenvolvimento

- Integração total com as IAs
- Sistema de notificações
- Tela de perfil do usuário

---

## 💻 Como rodar o projeto

```bash
git clone https://github.com/GuilhermeCanina/TCC-Senai2025
cd TCC-Senai2025
npm install
npx prisma migrate dev
npm run dev
```

Certifique-se de criar um arquivo .env com sua variável DATABASE_URL.
