const STEPS = [
  { id: 'bank', icon: 'bi-bank2', title: 'Confirmando con tu banco', subtitle: 'Verificando tu pago PSE' },
  { id: 'response', icon: 'bi-arrow-repeat', title: 'Recibiendo respuesta', subtitle: 'Esperando al banco' },
  { id: 'confirmed', icon: 'bi-check-circle-fill', title: 'Pago confirmado', subtitle: 'Transacción aprobada' }
];

function stepState(index, activeStep) {
  if (activeStep > index) return 'done';
  if (activeStep === index) return 'active';
  return 'pending';
}

function connectorState(index, activeStep) {
  if (activeStep > index + 1) return 'done';
  if (activeStep === index + 1) return 'active';
  if (activeStep > index) return 'done';
  return '';
}

export function renderPaymentTimeline(activeStep = 0) {
  const steps = STEPS.map((step, i) => {
    const state = stepState(i, activeStep);
    const isLast = i === STEPS.length - 1;
    const conn = !isLast ? connectorState(i, activeStep) : '';
    return `
      <li class="timeline-step timeline-step--${state}" data-step="${i}">
        <div class="timeline-step-marker" aria-hidden="true">
          <span class="timeline-step-ring"></span>
          <span class="timeline-step-icon">
            ${state === 'done' ? '<i class="bi bi-check-lg"></i>' : `<i class="bi ${step.icon}"></i>`}
          </span>
        </div>
        ${!isLast ? `<div class="timeline-step-line${conn ? ` timeline-step-line--${conn}` : ''}" aria-hidden="true"></div>` : ''}
        <div class="timeline-step-body">
          <h3 class="timeline-step-title">${step.title}</h3>
          <p class="timeline-step-sub">${step.subtitle}</p>
        </div>
      </li>`;
  }).join('');

  return `
    <div class="payment-timeline-wrap text-center">
      <h1 class="timeline-heading mb-2">Procesando tu pago</h1>
      <p class="text-muted mb-4">No cierres esta ventana</p>
      <ol class="payment-timeline list-unstyled mb-0" aria-live="polite">${steps}</ol>
    </div>`;
}

export function updatePaymentTimeline(container, activeStep) {
  const wrap = container.querySelector('.payment-timeline-wrap');
  if (wrap) {
    wrap.outerHTML = renderPaymentTimeline(activeStep);
  } else {
    container.innerHTML = renderPaymentTimeline(activeStep);
  }
}

export function renderSuccessFlowShell() {
  return `<div class="success-flow" id="success-flow"><div id="payment-timeline-slot"></div></div>`;
}

export async function hideTimelineAndShowSummary(root, summaryHtml) {
  const wrap = root.querySelector('.payment-timeline-wrap');
  if (wrap) {
    wrap.classList.add('payment-timeline-wrap--exit');
    await new Promise(r => setTimeout(r, 480));
  }
  root.innerHTML = `<div class="order-summary-reveal">${summaryHtml}</div>`;
  const reveal = root.querySelector('.order-summary-reveal');
  if (!reveal) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => reveal.classList.add('order-summary-slot--visible'));
  });
}

export const TIMELINE_STEP_COUNT = STEPS.length;
