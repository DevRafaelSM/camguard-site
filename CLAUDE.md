# CamGuard Site — Estado do Projeto (handoff de contexto)

> Cole este arquivo inteiro como primeira mensagem de um chat novo com o Claude Code para retomar. Site institucional do CamGuard Hub — repositório separado e público, github.com/DevRafaelSM/camguard-site.

## Sessão em andamento — retomar daqui

**Confirmado via `git log`/`git status` nesta sessão:** todo o trabalho que antes estava acumulado no working tree sem checkpoint (múltiplas sessões) foi organizado em commits, em lotes coerentes por natureza da mudança:

- `abd0feb` — feat: migra conteúdo real da Fase 6 (5 páginas) + unifica container responsivo (inclui `GlowBackground.astro` já na forma final, sem overflow:hidden indevido)
- `6978b88` — feat: substitui logo por ícone de câmera CSS animado, remove lanterna
- `d253229` — fix: header sticky (largura consistente via scrollbar-gutter, position:sticky corrigido)
- (docs) — atualização deste arquivo

Nada foi enviado pro remoto ainda (`origin/main`) — os commits acima estão só localmente até o usuário revisar e autorizar o push.

Esta seção é a **única fonte de verdade** sobre o que está feito vs. pendente no projeto. Não existe uma seção "Status exato" separada mais abaixo no arquivo — havia duas seções competindo pra contar a mesma coisa de formas diferentes, e a outra ficou desatualizada por várias sessões sem que a divergência fosse notada. Ao atualizar o progresso do projeto, editar só aqui.

### 1. Trabalho feito e commitado

- Fix do modo git de `CLAUDE.md` (era symlink inválido apontando pro próprio conteúdo como "caminho", virou arquivo regular) — commits `1c4017d`/`4cfd101`.
- Migração de conteúdo da Fase 6: as 5 páginas reais escritas a partir do mockup (antes era scaffold vazio).
- Responsividade obrigatória 300px–4K aplicada em toda a base: `.container` único (1100px, `padding-inline` fluido) substituindo `.page-shell`/`.page-shell--wide` divergentes (960px vs. 1100px) e o `.hero` que não tinha container nenhum, `clamp()` em tipografia/paddings, `auto-fit`/`minmax` em grids de 2 colunas, menu hambúrguer abaixo de 768px.
- Fix do glow-blob cortado na borda (dois `overflow:hidden` indevidos removidos: `.glow-bg` em `GlowBackground.astro` e `.hero` em `index.astro`) — esse estado "quebrado" nunca chegou a ser commitado, então não existe um commit de fix separado pra ele; foi corrigido antes da migração de Fase 6 chegar a um checkpoint.
- Tokens de easing/duração (`--ease-standard`, `--duration-fast/base/slow` em `tokens.css`) aplicados a todas as transições existentes (nav, botão, reveal, intro) + hover novo em cards/botão + abertura suave do menu mobile.
- Efeito "lanterna" na seleção de texto (v1 e v2) e o logo em imagem (`public/images/logo.png`, copiado do Hub) foram removidos por completo — nenhum dos dois chegou a ser commitado em nenhum momento (ambos untracked/nunca staged), então não há commit de remoção correspondente; mencionados aqui só como contexto histórico.
- **Ícone de câmera do header, versão final** (`src/components/BrandCameraIcon.astro`): câmera de segurança em **CSS puro** (divs em camadas: `.mount-top`/`.mount-vertical`, `.camera-shell` com `.camera-top`/`.camera-bottom`, `.lens-dark`, `.iris`, `.highlight`), não SVG. Passou por duas versões antes desta (uma redução de uma peça de demonstração em 720px, depois um design recalibrado pelo próprio usuário especificamente pra ~50px de ícone) — só a versão final foi commitada, as intermediárias nunca existiram em nenhum checkpoint. Tamanho **fixo em 50px** (não fluido/`clamp()`) — decisão deliberada, ver comentário no topo do componente. Reflexo (`.highlight`) segue o cursor com inércia (lerp), guardado por `(hover:hover) and (pointer:fine)` sem fallback via `pointerdown` (touch = reflexo centrado, estático); piscada em intervalos aleatórios; `requestAnimationFrame` para de se reagendar sob `prefers-reduced-motion` (não só congela o resultado visual).
- **Header sticky**: `position:sticky; top:0;` funcionando, mais dois bugs de header resolvidos nesta série de sessões — (a) largura do header inconsistente entre páginas, causa raiz era a ausência de `scrollbar-gutter:stable` em `html` (scrollbar vertical presente/ausente conforme a altura de cada página mudava a largura disponível em ~15-17px); (b) sticky não colava de fato, causa raiz era `overflow-x:hidden` em `html` **e** `body` virando um contexto de overflow próprio do body (quebra o scrollport de referência do cálculo de sticky) — a proteção contra overflow horizontal foi movida pra `main` (irmão do header na árvore, não ancestral). `z-index:40` no header, `z-index:50` no `.noise-overlay` (precisa continuar cobrindo a faixa do header).
- Auditoria completa contra a lista de padrões proibidos (ver "Regras de design" abaixo) e correções: `box-shadow` decorativo removido de `.card:hover` (troca por `translateY(-3px)` + `border-color: var(--accent)`) e de `.mock-window`; três `mock-dot` estilo traffic-light removidos de `.mock-window` (lidos como "janela de terminal decorativa" genérica) e o texto do placeholder deixado explícito ("Screenshot real do Hub, ainda não capturada"); check mark (✓) em `privacidade.astro` trocado por dot simples (mesmo padrão de `.pill-dot`/`.changelog-entry__dot`/`.compat-dot`); travessões em toda cópia visível ao usuário corrigidos (index, como-funciona, baixar, sobre, privacidade, footer — comentários de código mantidos como estavam). Nenhuma outra violação da lista encontrada.
- `npm run build` limpo, confirmado repetidas vezes ao longo da série de sessões (última vez após o fix de header sticky).

### 2. Ainda não iniciado / não validado

- **Nenhum teste visual em navegador real foi feito ainda** em toda essa série de sessões (sem acesso à extensão Chrome — usuário recusou por segurança, decisão mantida). Isso cobre em particular: o ícone da câmera em 50px (camadas simplificadas por raciocínio de código, não confirmadas visualmente), o menu hambúrguer mobile com o header agora sticky (z-index/posição do dropdown relativo ao header), e o comportamento de sticky em si. Usuário precisa validar rodando `npm run dev` manualmente antes de considerar essa frente fechada.
- Screenshots reais do Hub (Modo Hub, grid de câmeras) — `.mock-window` em `index.astro` é o placeholder já pronto pra receber isso.
- Roadmap real (baseado em `../camguard-hub/docs/ARQUITETURA.md`/`PLANO_DE_ATAQUE.md`).
- Links de download reais — não existem ainda, Fase 8 do Hub (empacotamento) não começou.
- Lista de câmeras compatíveis como documento formal (hoje só existe como rascunho extraído do mockup, em `como-funciona.astro`).
- História pessoal (Sobre) — o texto atual é rascunho do mockup; só o usuário pode escrever a versão final.

### 3. Próximos passos

1. Usuário valida visualmente no navegador (item 2 acima) — sticky, dropdown mobile, ícone em 50px.
2. Usuário revisa a lista de commits locais e autoriza (ou não) o push pro `origin/main`.

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
- Ícone do header: câmera de segurança em CSS puro (`BrandCameraIcon.astro`, ver seção "Sessão em andamento" acima) — não é mais um logo em imagem nem SVG, nunca reintroduzir `public/images/logo.png` sem decisão nova. Paleta de cores dessa peça é própria (não usa os tokens acima), decisão de design deliberada do usuário.

## Responsividade (requisito obrigatório do projeto)

O site precisa funcionar corretamente de **300px** (smartphones bem estreitos) até **2560px+** (4K/ultra-wide) — faixa bem mais ampla que o padrão comum (a maioria dos projetos para em ~320-360px de mínimo). Isso não é nice-to-have, é restrição obrigatória: qualquer UI nova daqui pra frente precisa ser testada nesse intervalo inteiro antes de ser considerada pronta.

Breakpoints documentados em `src/styles/tokens.css` (300/480/768/1024/1440/1920/2560px — usar esses valores, não inventar números soltos). Técnicas já aplicadas em toda a base existente:
- `clamp()` em tipografia de headline/hero e em paddings de seção (nunca `px` fixo puro nesses casos).
- `repeat(auto-fit, minmax(min(Npx, 100%), 1fr))` em grids de 2 colunas, em vez de `1fr 1fr` fixo + breakpoint manual — se reorganiza sozinho.
- `min(Npx, 100%)` em `min-width` de itens flex, pra nunca forçar largura maior que o container tem.
- Menu hambúrguer no nav abaixo de 768px (medido: logo + 5 links precisam de ~740px numa linha só pra caber).
- `GlowBackground` e o bloco central da `Intro` (wordmark/taglines/progresso) também escalam via `clamp()`, com teto pra não crescer demais em telas enormes onde o layout já é limitado por `max-width`.

## Decisões de processo importantes

- **Mockup visual foi feito no Claude Design, já aprovado e finalizado** — não voltar a essa ferramenta, estamos em código real agora ("mão na massa").
- **Referências de "site genérico demais"** foram identificadas e corrigidas: evitar ícones em emoji, gradiente sempre aplicado de verdade (não cor sólida), animação de scroll-reveal real (não CSS morto/nunca ativado), texturas/glow de fundo, tratamento visual consistente em TODAS as páginas (não só a home).
- **WebGL/3D via Three.js/agência foi descartado como fora de escopo** (muito trabalho de engenharia especializada para o contexto solo/hobby do projeto) — a diferenciação visual vem de recriar a boot/loading screen real do Hub como intro do site (o mascote-companion também foi cogitado nesse momento, mas depois descartado — ver seção própria abaixo).
- **Mascote 3D via Meshy AI foi cogitado e adiado** (não descartado, só não é prioridade agora) — ideia registrada para o futuro se quiserem revisitar.

## Regras de design — NUNCA usar / SEMPRE ter — REFERÊNCIA DEFINITIVA (não re-investigar)

Lista fechada nesta sessão. **Qualquer sessão futura deve seguir isto diretamente** — o objetivo declarado é o site nunca parecer "gerado por IA genérica"/vibe-code. Antes de adicionar qualquer elemento visual novo, confrontar contra esta lista primeiro, sem precisar re-perguntar ao usuário.

**BANIDOS, nunca usar:**
- Ícones do Lucide ou qualquer biblioteca de ícones genérica (sem dependência de ícones no `package.json`, de propósito). Ícones em geral só onde forem estritamente necessários — prefira tipografia/layout pra comunicar, não decoração icônica.
- Fundo branco puro.
- Cor arco-íris.
- Sombras (`box-shadow` decorativo) — qualquer elevação/destaque vem de translação, cor de borda ou opacidade, nunca sombra. (`.card:hover` e `.mock-window` violavam isso, corrigido nesta sessão — ver "Sessão em andamento".)
- Três cards de funcionalidade em fileira.
- Liquid glass (efeito de vidro fosco/blur translúcido tipo iOS).
- Travessões (—) em prosa/copy visível ao usuário — usar pontuação normal (vírgula, ponto, dois pontos), frases mais diretas. Não se aplica a comentários de código (esses seguem o estilo de sempre do projeto, com travessões livremente).
- Fontes Inter/Geist — mantém-se Space Grotesk (geral/títulos) + IBM Plex Mono (técnico/labels), já definidas em `tokens.css`.
- Faixa colorida na lateral esquerda de cards/blocos.
- Depoimentos falsos/genéricos.
- Bento grids.
- Janela de terminal/browser decorativa genérica (dots de traffic-light tipo macOS, chrome de navegador fake) — diferente de um mockup real do produto, que é permitido (ver PERMITIDO abaixo).
- A construção retórica "Não é X, é Y" em qualquer copy.
- Marcadores de lista com ícone de check mark (✓).
- Três planos de preço.
- Cantos muito arredondados — a escala `--radius-sm/md/lg` (3/6/9px) já garante isso, manter.
- Orbes radiais decorativos genéricos — diferente dos `glow-blob` de marca já existentes em `GlowBackground.astro`, que usam as cores reais da identidade (`--accent`/`--info`); não adicionar orbes coloridos aleatórios novos.
- Grades de pontinhos de fundo.
- Ícone de brilho/estrelinha (✨ ou equivalente em SVG).
- Setas animadas (ex. CTA com seta pulsando/balançando). Seta estática indicando um fluxo/processo real (ex. `.flow-arrow` em `como-funciona.astro`) não é isso — é rótulo de diagrama, não decoração de CTA.
- Cores pastéis básicas.

**Interpretação confirmada das duas exceções "sem X" (não são banidos, são exigidos — o contrário do que a redação sugere à primeira vista):**
- O site DEVE ter estados de carregamento cuidados (skeleton loaders) onde houver conteúdo assíncrono real. Hoje o site é estático, sem nenhum carregamento assíncrono real (a intro não é async data, é uma animação fixa) — não force um skeleton artificial só pra ter um. Reavaliar se/quando algo assíncrono de verdade existir (ex. status ao vivo do Hub).
- O site DEVE manter os Termos de uso e a Política de privacidade/segurança já existentes em `/privacidade` — não remover nem esvaziar esse conteúdo, é sério e específico (produto de vigilância residencial). Editar só pontuação/travessões é ok; nunca cortar substância jurídica.

**PERMITIDO/desejado, pra não confundir com os banidos:**
- Uma demonstração REAL do produto (screenshot real do Hub, não mockup genérico de browser/terminal decorativo) é bem-vinda — o oposto de "nenhuma demonstração real" é o que queremos. `.mock-window` em `index.astro` é o espaço reservado exatamente pra essa screenshot real (Fase 6 de conteúdo, ainda não capturada) — texto e tratamento já ajustados nesta sessão pra não ficar ambíguo com decoração genérica.
- Animações de hover em si não são banidas — só sem sombra decorativa e sem os outros clichês listados (ex. `.btn:hover`/`.card:hover` com `translateY`, `.site-nav a:hover` mudando cor).

## Intro (boot screen real recriada)

`src/components/Intro.astro` — fiel à composição real de `loading_screen.dart` do Hub (que é ESTÁTICA no app real, sem animação de entrada — a animação da intro do site é uma interpretação nova, não cópia, já que não havia nada a copiar). Fundo `loading-screen-image.png` (cover) + overlay preto 55%, bloco central (PRIVATE SECURITY HUB / CAMGUARD branco puro / divisor), rodapé (PRIVATE BY DESIGN ↔ FREE TO USE), 4 passos reais extraídos do app (CONECTANDO AO HUB LOCAL → CARREGANDO CÂMERAS E EVENTOS → CARREGANDO INTEGRAÇÕES → PREPARANDO INTERFACE), barra animada suavemente (~900ms/passo), fade ao final revelando a home. `sessionStorage` garante que toca só uma vez por sessão de navegador.

## Mascote-companion (descartado)

Sistema de mascote-companion (poses+falas reativas a gatilhos de navegação) foi prototipado e depois DESCARTADO por decisão do usuário — refinamento necessário para ficar bom (poses, timing, falas, comportamento) era desproporcional ao valor agregado nesta fase. Não reintroduzir sem justificativa nova. A intro (boot screen recriada) continua sendo o diferencial visual principal do site.

## Repositório

`https://github.com/DevRafaelSM/camguard-site` (público, main). Separado deliberadamente do `camguard-hub` (privado, código fechado) — nunca misturar os dois em um só repo.

## Estilo de trabalho (herdado do camguard-hub, mesmas regras)

Mudanças de código via Claude Code, prompts preparados no chat, revisão antes de aplicar. Diagnóstico antes de mudança grande. Nunca aceitar "está no arquivo"/"mostrado acima" sem ver o texto literal completo antes de aprovar um commit. Testar de verdade antes de considerar algo fechado — build limpo não é suficiente sozinho.
