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
- **Ícone de câmera do header, versão final** (`src/components/BrandCameraIcon.astro`): câmera de segurança em **CSS puro** (divs em camadas: `.mount-top`/`.mount-vertical`, `.camera-shell` com `.camera-top`/`.camera-bottom`, `.lens-dark`, `.iris`, `.highlight`), não SVG. Passou por duas versões antes desta (uma redução de uma peça de demonstração em 720px, depois um design recalibrado pelo próprio usuário especificamente pra ~50px de ícone) — só a versão final foi commitada, as intermediárias nunca existiram em nenhum checkpoint. Tamanho **fixo em 50px** (não fluido/`clamp()`) — decisão deliberada, ver comentário no topo do componente. Reflexo (`.highlight`) segue o cursor com inércia (lerp) quando há mouse real (`hover:hover` e `pointer:fine`); sem mouse real (touch), escaneia o ambiente sozinho com o mesmo lerp, seguindo uma sequência de pontos-alvo com pausas variáveis (padrão orgânico, sem repetição óbvia); sob `prefers-reduced-motion`, nenhum dos dois modos anima (reflexo centrado, estático); piscada em intervalos aleatórios roda em qualquer modo; `requestAnimationFrame` para de se reagendar sob `prefers-reduced-motion` (não só congela o resultado visual).
- **Header sticky**: `position:sticky; top:0;` funcionando, mais dois bugs de header resolvidos nesta série de sessões — (a) largura do header inconsistente entre páginas, causa raiz era a ausência de `scrollbar-gutter:stable` em `html` (scrollbar vertical presente/ausente conforme a altura de cada página mudava a largura disponível em ~15-17px); (b) sticky não colava de fato, causa raiz era `overflow-x:hidden` em `html` **e** `body` virando um contexto de overflow próprio do body (quebra o scrollport de referência do cálculo de sticky) — a proteção contra overflow horizontal foi movida pra `main` (irmão do header na árvore, não ancestral). `z-index:40` no header, `z-index:50` no `.noise-overlay` (precisa continuar cobrindo a faixa do header).
- Auditoria completa contra a lista de padrões proibidos (ver "Regras de design" abaixo) e correções: `box-shadow` decorativo removido de `.card:hover` (troca por `translateY(-3px)` + `border-color: var(--accent)`) e de `.mock-window`; três `mock-dot` estilo traffic-light removidos de `.mock-window` (lidos como "janela de terminal decorativa" genérica) e o texto do placeholder deixado explícito ("Screenshot real do Hub, ainda não capturada"); check mark (✓) em `privacidade.astro` trocado por dot simples (mesmo padrão de `.pill-dot`/`.changelog-entry__dot`/`.compat-dot`); travessões em toda cópia visível ao usuário corrigidos (index, como-funciona, baixar, sobre, privacidade, footer — comentários de código mantidos como estavam). Nenhuma outra violação da lista encontrada.
- `npm run build` limpo, confirmado repetidas vezes ao longo da série de sessões (última vez após o fix de header sticky).

### 2. Ainda não iniciado / não validado

- **Nenhum teste visual em navegador real foi feito ainda** em toda essa série de sessões (sem acesso à extensão Chrome — usuário recusou por segurança, decisão mantida). Isso cobre em particular: o ícone da câmera em 50px (camadas simplificadas por raciocínio de código, não confirmadas visualmente), o menu hambúrguer mobile com o header agora sticky (z-index/posição do dropdown relativo ao header), e o comportamento de sticky em si. Usuário precisa validar rodando `npm run dev` manualmente antes de considerar essa frente fechada.
- Screenshots reais do Hub (Modo Hub, grid de câmeras) — `.mock-window` em `index.astro` é o placeholder já pronto pra receber isso.
- Roadmap real (baseado em `../camguard-hub/docs/ARQUITETURA.md`/`PLANO_DE_ATAQUE.md`).
- Links de download reais — não existem ainda, Fase 8 do Hub (empacotamento) não começou.
- Lista de câmeras compatíveis como documento formal (hoje só existe como rascunho extraído do mockup — removida de `como-funciona.astro` nesta sessão, texto preservado no bullet abaixo sobre o bloco de abertura removido).
- História pessoal (Sobre) — o texto atual é rascunho do mockup; só o usuário pode escrever a versão final.
- **Isenção de responsabilidade (disclaimer)** sobre dano colateral de hardware do usuário: bateria inchando/explodindo, tela quebrando por causa de bateria inchada, dano por exposição a chuva/calor em celulares reaproveitados como câmera. **Decisão atualizada** (substitui a ideia anterior de página nova e dedicada): vai virar uma seção própria dentro da reformulação de `/privacidade` (que também vai ser renomeada de "Privacidade e segurança" pra "Termos de Uso e Privacidade" — trabalho ainda não iniciado). **Lembrete obrigatório pra quando essa reformulação for feita**: a seção do aviso de bateria precisa ter `id="bateria"` exatamente — `como-funciona.astro` (aba Documentação, entradas "O que fica local e o que sai da sua rede" e "Cuidados com bateria em uso contínuo") já linka pra `/privacidade#bateria` antecipando isso; sem esse id exato o link fica morto.
- **Formato do conteúdo dos tutoriais** (GIF/vídeo/screenshots) ainda não decidido pelo usuário. **Atualização**: a "Página de Tutoriais" deixou de ser uma página nova em aberto — virou a aba "Tutoriais" dentro de `como-funciona.astro` (rota mantida, nome de exibição agora "Tutoriais e documentação", ver seção "Sessão em andamento" mais abaixo), já com os 12 tutoriais escritos e um placeholder reservado (`.tutorial-gif`) em cada um. O que falta é só o conteúdo real desses placeholders: vídeo gravado pelo usuário, vídeo gerado por IA, GIFs curtos sem som, ou texto + screenshots — nenhuma dessas opções decidida ainda.
- **Bloco de abertura removido de `como-funciona.astro`** (a página agora começa direto nas abas, sem nenhum eyebrow/h1/diagrama/lista acima delas) — **planejado para reaproveitar em outro lugar (Início, ou uma seção própria) futuramente**, ainda sem data/decisão de onde exatamente. Não é conteúdo perdido, só realocado. Estrutura e texto exatos removidos, pra não se perder:
  ```
  eyebrow: "COMO FUNCIONA"
  h1: "Do celular na gaveta ao painel na sua tela"

  // Diagrama de fluxo (3 caixas + 2 setas), ícones em SVG inline (não lib de ícones):
  flow = [
    { label: "Celular / câmera IP", sub: "app Android ou RTSP", ícone: retângulo vertical com um traço embaixo (celular) },
    { label: "Hub", sub: "Windows / Linux, na sua casa", ícone: retângulo com duas linhas + um ponto (janela/painel), caixa central destacada (borda accent) },
    { label: "Você", sub: "painel na rede local", ícone: círculo + arco (pessoa) },
  ]
  // ordem visual: [Celular/câmera IP] → [Hub, destacado] → [Você]

  // Lista "Câmeras compatíveis" (h2 + 3 itens, cada um com dot + título + descrição):
  compatible = [
    { title: "Android 7.0+", desc: "Via app CamGuard Camera, instalado como APK." },
    { title: "Câmeras IP com RTSP", desc: "Padrão ONVIF, a maioria das câmeras IP genéricas." },
    { title: "Câmeras USB", desc: "Webcams e capturadoras ligadas direto no Hub." },
  ]
  ```
  Nota sobre a lista de câmeras compatíveis: já era marcada como PLACEHOLDER extraído do mockup mesmo antes desta remoção (ver bullet "Lista de câmeras compatíveis como documento formal" acima) — isso não mudou, só o lugar onde vai reaparecer ainda não foi decidido.

> Nota de conexão entre projetos (registro, não decisão): o aviso sobre risco de explosão de bateria em uso 24/7 no carregador pode fazer sentido aparecer tanto na página de disclaimer acima quanto na tela de consentimento obrigatória do produto (pendência já registrada no CLAUDE.md do `camguard-hub`). Onde exatamente esse aviso deve viver ainda está em aberto, não resolvido.

### 3. Próximos passos

1. Usuário valida visualmente no navegador (item 2 acima) — sticky, dropdown mobile, ícone em 50px.
2. Usuário revisa a lista de commits locais e autoriza (ou não) o push pro `origin/main`.

## Bug real resolvido — overflow non-visible em qualquer elemento da árvore pode criar scroll interno indesejado — nunca usar overflow-x:hidden para conter sangramento visual, usar clip-path (REFERÊNCIA DEFINITIVA, não re-investigar)

**Esta investigação levou 4 rodadas até a causa raiz real — documentado aqui com destaque alto pra nunca repetir o processo.**

- **Sintoma**: página com duas barras de rolagem (uma do documento, uma dentro de um elemento específico da árvore). Scroll travando/"correndo atrás" da posição real, especificamente ao recarregar a página no meio do scroll (nunca reproduzia recarregando do topo).
- **Causa raiz real** (só identificada corretamente na 4ª tentativa): pela **CSS Overflow Module Level 3**, declarar `overflow-x` com qualquer valor non-visible **sem declarar `overflow-y`** faz o navegador computar `overflow-y` automaticamente como `auto` — mesmo que `overflow-y` nunca tenha sido escrito em lugar nenhum, e mesmo em elementos que **não são item de flex/grid**. Não é (só) o problema de "tamanho mínimo automático zero" do Flexbox — essa foi a primeira hipótese testada e só parcialmente correta (explicava compressão em item de flex, não o bug em blocos comuns).
- **Consequência**: **qualquer** elemento com `overflow-x:hidden` na árvore vira candidato real a scroll container. E o navegador conta no `scrollHeight` desse elemento até conteúdo posicionado de forma absoluta com offset negativo, fora do fluxo normal (ex.: os glow-blob de `GlowBackground.astro`, que sangram de propósito pra fora da section via `bottom:-50px`) — mesmo esse conteúdo nunca afetando `clientHeight`/layout normal do ancestral, ele infla o `scrollHeight` assim que qualquer ancestral ganha overflow non-visible em qualquer eixo.
- **Tentativas que NÃO resolveram** (documentadas pra não repetir):
  1. Mover `overflow-x:hidden` de `html`/`body` pra `main` (resolveu o bug do `position:sticky` do header, mas não este).
  2. `flex: 1 0 auto` em `main` (resolveu um problema real de compressão do item de flex, mas não era a causa deste bug).
  3. Mover `overflow-x:hidden` de `main` pra um wrapper interno (`.overflow-guard`), supondo que um bloco comum (não item de flex) nunca vira scroll container — **falso**: blocos comuns também são afetados pela regra de `overflow-y` computado, e ainda assim contam o sangramento do glow-blob no próprio `scrollHeight`.
  4. Tentar declarar `overflow-y: visible` explicitamente ao lado de `overflow-x: hidden` — **falso também**: a regra da spec olha o valor computado, não se foi escrito à mão ou herdado por omissão; não existe combinação de `overflow-x`/`overflow-y` que preserve os dois em `visible` computado se um deles for non-visible.
- **CORREÇÃO DEFINITIVA**: nunca usar `overflow-x:hidden`/`overflow:hidden` pra conter sangramento visual decorativo (ex. glow-blob com offset negativo). Usar `clip-path: inset(0)` no lugar — recorta visualmente do mesmo jeito (é só uma operação de pintura), mas nunca interage com o algoritmo de overflow/scroll do navegador, eliminando essa classe inteira de bug pela raiz. Aplicado em `.overflow-guard` (`global.css`, wrapper dentro de `<main>` em `Layout.astro`).
- **REGRA PARA QUALQUER TRABALHO FUTURO**: se precisar recortar/conter algo que vaza visualmente da caixa de um elemento, a primeira escolha é sempre `clip-path`, nunca `overflow:hidden` — a menos que scroll real seja genuinamente desejado naquele elemento.

## Bug real resolvido — CSS escopado do Astro não se aplica a elementos criados via JS em runtime (REFERÊNCIA DEFINITIVA, não re-investigar)

**CSS escopado do Astro (`data-astro-cid-*`) NUNCA se aplica a elementos criados via `document.createElement()` em runtime** — o atributo de escopo só é injetado em elementos presentes no template estático do componente (a marcação `.astro` em si), nunca em nós montados depois, via JS. Regras CSS escritas pra esses elementos existem de verdade no bundle final (aparecem normal em "view source" do CSS gerado, `grep` encontra elas sem problema), mas nunca casam com nada — **silenciosamente, sem erro nenhum no console**, o elemento só cai no default do navegador pra aquela tag.

**Sintoma real que expôs isso** (`SectionRail.astro`): dots/itens da lista do rail apareciam como texto solto desalinhado (posições horizontais diferentes por item, sem retângulo de fundo nenhum) mesmo com o CSS "correto" já escrito e presente no arquivo gerado. Medido de verdade no navegador (Playwright + `getComputedStyle`), não por leitura de código: os elementos `<a class="rail-dot-link">` (criados via `document.createElement("a")` no `<script>` do componente) saíam com `display:inline`, `width:auto`, `overflow:visible` — nenhuma das regras de `.rail-dot-link` no CSS estava sendo aplicada.

**"Confirmar que a regra existe no CSS gerado" NÃO é prova de que ela se aplica.** Isso já tinha enganado uma investigação nesta mesma sessão (o bug do scroll duplicado passou por 3 "confirmações via CSS" antes da causa raiz real aparecer) — esta é a mesma categoria de erro, mecanismo diferente. A única prova real de que uma regra CSS está de fato afetando um elemento é medir o elemento no DOM renderizado (`getComputedStyle`, `getBoundingClientRect`), nunca só grepar o arquivo/bundle.

**CORREÇÃO**: usar `:global(seletor)` (mecanismo nativo do Astro pra sair do escopo automático) em qualquer regra CSS de um componente `.astro` que precise atingir elementos gerados via JS. Elementos escritos direto no template do componente continuam escopados normalmente (não precisam de `:global()`) — só os montados em runtime exigem isso. Aplicado em `SectionRail.astro`: `.section-rail`/`.rail-toggle`/`.rail-sheet` (estáticos no template) ficaram escopados normalmente; `.rail-item`/`.rail-dot-link`/`.rail-dot`/`.rail-label`/`.rail-sheet-link` (todos criados via `document.createElement`) tiveram que virar `:global(.rail-item)`, `:global(.rail-dot-link)` etc.

**REGRA PARA QUALQUER TRABALHO FUTURO**: qualquer componente `.astro` que monta parte do próprio DOM via JS (`document.createElement`, `innerHTML`, etc.) precisa envolver em `:global()` toda regra CSS escopada que deveria atingir esses elementos — decidir isso ANTES de escrever o CSS, não descobrir depois por um bug visual difícil de diagnosticar. E, de forma mais geral: nunca declarar uma correção de CSS "confirmada" só por ela aparecer no arquivo/bundle gerado — confirmar sempre por medição no DOM real (`getComputedStyle`/`getBoundingClientRect`, via DevTools ou Playwright).

## Bug real resolvido — scroll-spy nunca ativa o último item de uma lista curta, se não sobrar página suficiente abaixo dele (REFERÊNCIA DEFINITIVA, não re-investigar)

**Sintoma**: no `SectionRail.astro`, rolar manualmente até o fim absoluto da página (ou clicar no último dot) não marcava o último item da lista como ativo — o destaque ficava preso no penúltimo, mesmo com o scroll já no máximo possível.

**Causa raiz, confirmada por medição (Playwright)**: o critério de seção ativa (ver seção acima sobre critério por posição do topo, não por área visível) depende do título da seção cruzar uma linha de referência (`headerHeight() + 16`). Se a ÚLTIMA seção da lista atual for curta o suficiente (ex. aba "Documentação", entradas sem GIF, bem mais baixas que os tutoriais), pode não sobrar espaço de página abaixo dela pra esse cruzamento acontecer — o documento bate no `scrollHeight` máximo antes do título dela alcançar a linha. Medido de verdade: na aba Documentação, com o scroll no máximo absoluto (`scrollY + innerHeight === scrollHeight`), o topo do último item ("Resolvendo problemas comuns") ainda estava a ~518px, bem acima do limiar de 107px — nunca cruzava, por mais que se rolasse.

**CORREÇÃO**: tratar "documento já rolado até o fim" (`window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2`, com pequena tolerância) como caso especial que força o ÚLTIMO item da lista atual como ativo, ignorando o critério normal de "topo cruzou a linha" só nesse caso. Genérico por design (baseado em "o documento bateu no fim", não no conteúdo de nenhuma seção específica) — reaparece em qualquer lista futura cujo último item seja curto, não só na Documentação de hoje. Verificado tanto no listener de scroll (rolagem manual) quanto explicitamente logo após o clique programático (`scrollToSection()` seguido de `updateActive()`), sem depender só do evento de scroll disparar a tempo.

**REGRA PARA QUALQUER TRABALHO FUTURO**: qualquer implementação de scroll-spy baseada em "o topo cruzou uma linha" precisa desse caso especial de fim de documento — sem ele, o último item de qualquer lista cujo último elemento seja mais curto que a distância entre a linha de referência e o rodapé da página nunca ativa, por mais que se role.

## O que é

Site de apresentação/distribuição do CamGuard Hub (projeto irmão, privado, em `../camguard-hub`). Estático, Astro puro (sem React/Vue), deploy planejado no Netlify. 5 páginas: Início (`/`), Tutoriais e documentação (`/como-funciona` — rota mantida, nome de exibição mudou), Baixar (`/baixar`), Privacidade e segurança (`/privacidade`), Sobre (`/sobre`).

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
