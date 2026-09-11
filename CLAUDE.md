# CamGuard Site — Estado do Projeto (handoff de contexto)

> Cole este arquivo inteiro como primeira mensagem de um chat novo com o Claude Code para retomar. Site institucional do CamGuard Hub — repositório separado e público, github.com/DevRafaelSM/camguard-site.

## O que é

Site de apresentação/distribuição do CamGuard Hub (projeto irmão, privado, em `../camguard-hub`). Estático, Astro puro (sem React/Vue), deploy planejado no Netlify. 5 páginas: Início (`/`), Como funciona (`/como-funciona`), Baixar (`/baixar`), Privacidade e segurança (`/privacidade`), Sobre (`/sobre`).

## Identidade visual (fonte da verdade: `../camguard-hub/apps/hub/assets/theme.env`)

Tokens em `src/styles/tokens.css`, validados 100% batendo com o Hub real:
- `--bg-window:#111126`, `--bg-sidebar:#17162E`, `--bg-card:#1B1933`, `--bg-titlebar:#090812`, `--bg-input:#18162F`
- `--accent:#FB8C62`, `--accent-soft:#FFAD7E`, `--alert:#E35B4F`, `--warning:#D9935F`, `--info:#7E74C8`
- `--text-primary:#F3DDD1`, `--text-secondary:#D2B5B3`, `--text-tertiary:#B89AA3`, `--text-muted:#A58B99`, `--text-faint:#806E82`
- `--gradient-brand: linear-gradient(135deg, var(--accent), var(--info))` — coral→violeta, sempre via variável, nunca hardcoded
- Fontes: Space Grotesk (títulos/geral), IBM Plex Mono (técnico/labels), via Google Fonts
- Radius: `--radius-sm:3px`, `--radius-md:6px`, `--radius-lg:9px` — mesma escala do Hub, sem exceção

## Decisões de processo importantes

- **Mockup visual foi feito no Claude Design, já aprovado e finalizado** — não voltar a essa ferramenta, estamos em código real agora ("mão na massa").
- **Referências de "site genérico demais"** foram identificadas e corrigidas: evitar ícones em emoji, gradiente sempre aplicado de verdade (não cor sólida), animação de scroll-reveal real (não CSS morto/nunca ativado), texturas/glow de fundo, tratamento visual consistente em TODAS as páginas (não só a home).
- **WebGL/3D via Three.js/agência foi descartado como fora de escopo** (muito trabalho de engenharia especializada para o contexto solo/hobby do projeto) — a diferenciação visual vem de recriar a boot/loading screen real do Hub como intro do site (o mascote-companion também foi cogitado nesse momento, mas depois descartado — ver seção própria abaixo).
- **Mascote 3D via Meshy AI foi cogitado e adiado** (não descartado, só não é prioridade agora) — ideia registrada para o futuro se quiserem revisitar.

## Intro (boot screen real recriada)

`src/components/Intro.astro` — fiel à composição real de `loading_screen.dart` do Hub (que é ESTÁTICA no app real, sem animação de entrada — a animação da intro do site é uma interpretação nova, não cópia, já que não havia nada a copiar). Fundo `loading-screen-image.png` (cover) + overlay preto 55%, bloco central (PRIVATE SECURITY HUB / CAMGUARD branco puro / divisor), rodapé (PRIVATE BY DESIGN ↔ FREE TO USE), 4 passos reais extraídos do app (CONECTANDO AO HUB LOCAL → CARREGANDO CÂMERAS E EVENTOS → CARREGANDO INTEGRAÇÕES → PREPARANDO INTERFACE), barra animada suavemente (~900ms/passo), fade ao final revelando a home. `sessionStorage` garante que toca só uma vez por sessão de navegador.

## Mascote-companion (descartado)

Sistema de mascote-companion (poses+falas reativas a gatilhos de navegação) foi prototipado e depois DESCARTADO por decisão do usuário — refinamento necessário para ficar bom (poses, timing, falas, comportamento) era desproporcional ao valor agregado nesta fase. Não reintroduzir sem justificativa nova. A intro (boot screen recriada) continua sendo o diferencial visual principal do site.

## Status exato — o que está feito vs. pendente

**✅ Funcional e testado (build limpo, 5 páginas, sem erro):**
- Scaffold Astro completo, tokens de design, layout com nav/footer, intro completa.

**❌ NÃO validado ainda:**
- **Nenhum teste visual em navegador foi feito** (a sessão não teve acesso à extensão Chrome, usuário recusou por segurança — decisão correta). Usuário precisa rodar `npm run dev`, abrir `http://localhost:4321` manualmente, e confirmar: intro tocando bonito, transição funcionando.

**Conteúdo real (Fase 6, não iniciada):**
- Texto de cada página, screenshots reais do Hub (Modo Hub, grid de câmeras), roadmap real (baseado em `../camguard-hub/docs/ARQUITETURA.md`/`PLANO_DE_ATAQUE.md`), disclaimer legal sério (uso pessoal, sem garantia — é produto de segurança residencial), links de download (não existem ainda, Fase 8 do Hub — empacotamento — não começou).
- Lista de câmeras compatíveis: ainda não existe como documento formal.
- História pessoal (Sobre): só o usuário pode escrever.

## Repositório

`https://github.com/DevRafaelSM/camguard-site` (público, main). Separado deliberadamente do `camguard-hub` (privado, código fechado) — nunca misturar os dois em um só repo.

## Estilo de trabalho (herdado do camguard-hub, mesmas regras)

Mudanças de código via Claude Code, prompts preparados no chat, revisão antes de aplicar. Diagnóstico antes de mudança grande. Nunca aceitar "está no arquivo"/"mostrado acima" sem ver o texto literal completo antes de aprovar um commit. Testar de verdade antes de considerar algo fechado — build limpo não é suficiente sozinho.
