// Motor genérico do mascote acompanhante. Não conhece gatilhos específicos -
// quem registra (Companion.astro) decide o que dispara o quê. Assim a Fase 6
// só precisa registrar novos gatilhos/elementos, sem tocar neste arquivo.

const IDLE_POSE = "mascot_sentry";
const DEFAULT_RETURN_DELAY = 4000; // ms até voltar pro estado ocioso

let hideTimer;

function els() {
  return {
    img: document.getElementById("companion-mascot"),
    bubble: document.getElementById("companion-bubble"),
    text: document.getElementById("companion-text"),
  };
}

/** Só troca a imagem da pose, sem mexer no balão (gestos "sem fala"). */
export function setPose(pose) {
  const { img } = els();
  if (img) img.src = `/mascot/${pose}.png`;
}

/** Troca pose + fala do mascote. Volta pro idle sozinho, a menos que returnToIdle: false. */
export function sayPose(pose, message, opts = {}) {
  setPose(pose);
  const { bubble, text } = els();
  if (!bubble || !text) return;

  window.clearTimeout(hideTimer);
  text.textContent = message;
  bubble.hidden = false;
  requestAnimationFrame(() => bubble.classList.add("visible"));

  const returnToIdle = opts.returnToIdle ?? true;
  const duration = opts.duration ?? DEFAULT_RETURN_DELAY;
  if (returnToIdle) {
    hideTimer = window.setTimeout(idle, duration);
  }
}

/** Estado ocioso: esconde o balão e volta a pose padrão. */
export function idle() {
  const { bubble } = els();
  window.clearTimeout(hideTimer);
  if (bubble) {
    bubble.classList.remove("visible");
    window.setTimeout(() => {
      bubble.hidden = true;
    }, 250);
  }
  setPose(IDLE_POSE);
}

/**
 * Gatilhos de scroll: dispara quando um elemento de `selector` entra na tela.
 * `pose`/`message` podem ser string fixa ou função `(el, index) => valor`
 * (necessário quando a pose/fala varia por item, ex. itens de roadmap).
 * `once` (padrão true) faz cada elemento disparar só na primeira vez -
 * o controle é por elemento, não por selector, então vários itens com o
 * mesmo selector (ex. cards de roadmap) disparam de forma independente.
 */
export function registerScrollTriggers(triggers) {
  if (!triggers.length) return;
  const fired = new WeakSet();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const trigger = triggers.find((t) => entry.target.matches(t.selector));
        if (!trigger) return;

        const once = trigger.once ?? true;
        if (once && fired.has(entry.target)) return;
        fired.add(entry.target);

        const index = trigger._els ? trigger._els.indexOf(entry.target) : 0;
        const pose = typeof trigger.pose === "function" ? trigger.pose(entry.target, index) : trigger.pose;
        const message =
          typeof trigger.message === "function" ? trigger.message(entry.target, index) : trigger.message;
        sayPose(pose, message, trigger.opts);

        if (once) observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );

  triggers.forEach((trigger) => {
    const elements = Array.from(document.querySelectorAll(trigger.selector));
    trigger._els = elements;
    elements.forEach((el) => observer.observe(el));
  });
}

/** Gatilhos de clique: dispara ao clicar em qualquer elemento que bata com `selector`. */
export function registerClickTriggers(triggers) {
  triggers.forEach((trigger) => {
    document.querySelectorAll(trigger.selector).forEach((el) => {
      el.addEventListener("click", () => sayPose(trigger.pose, trigger.message, trigger.opts));
    });
  });
}

/**
 * Gatilhos de hover (mouseenter). `pose` pode ser função `(el) => pose` -
 * necessário quando a pose depende da posição do elemento na tela (ex. card
 * à esquerda/direita do companion, que fica fixo no canto inferior direito).
 */
export function registerHoverTriggers(triggers) {
  triggers.forEach((trigger) => {
    document.querySelectorAll(trigger.selector).forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const pose = typeof trigger.pose === "function" ? trigger.pose(el) : trigger.pose;
        sayPose(pose, trigger.message, trigger.opts);
      });
    });
  });
}

/** Gatilhos de hash de URL (ex. #roadmap): dispara ao entrar ou navegar para o hash. */
export function registerHashTriggers(map) {
  function check() {
    const hash = window.location.hash.replace("#", "");
    const trigger = map[hash];
    if (trigger) sayPose(trigger.pose, trigger.message, trigger.opts);
  }
  window.addEventListener("hashchange", check);
  check();
}

/**
 * Dispara uma vez quando `eventName` acontece no document (ex. eventos
 * despachados pela Intro). Sem `message`, só troca a pose (gesto sem fala).
 */
export function onCustomEvent(eventName, pose, message, opts = {}) {
  document.addEventListener(
    eventName,
    () => {
      if (message) sayPose(pose, message, opts);
      else setPose(pose);
    },
    { once: true },
  );
}
