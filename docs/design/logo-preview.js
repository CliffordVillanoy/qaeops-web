'use strict';
const previewErrors = [];
window.addEventListener('error', (event) => {
  previewErrors.push(event.message || 'A script failed to load.');
  const report = document.getElementById('preview-report');
  if (report) report.textContent += '\nError: ' + previewErrors.at(-1);
});
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.qaeops-nav-logo');
  const link = document.getElementById('preview-logo');
  const report = document.getElementById('preview-report');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => {
    report.textContent = [
      'Preview JavaScript: loaded',
      'Shared animation code: ' + (logo.dataset.blinkReady ? 'loaded' : 'NOT initialized'),
      'Reduced motion: ' + motion.matches,
      'Eye groups: ' + logo.querySelectorAll('.robot-eye-blink').length,
      'Hover/focus triggers received: ' + (logo.dataset.blinkEvents || '0'),
      'State: ' + (logo.dataset.blinkState || 'unavailable'),
      ...previewErrors.map(error => 'Error: ' + error)
    ].join('\n');
  };
  new MutationObserver(update).observe(logo, {attributes: true});
  motion.addEventListener('change', update);
  link.addEventListener('click', event => event.preventDefault());
  document.getElementById('test-blink').addEventListener('click', () => {
    link.dispatchEvent(new PointerEvent('pointerenter', {pointerType: 'mouse'}));
    update();
  });
  update();
});
