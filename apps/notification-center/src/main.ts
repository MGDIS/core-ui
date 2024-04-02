import { NotificationCenter } from '@mgdis/notification-center';
import '@mgdis/mg-components/dist/mg-components/mg-components.css';
import '@mgdis/styles/dist/styles.css'; // TODO Added to get few changes at first, next MR should remove it
import '@mgdis/mg-components/dist/components';
import { defineCustomElements } from '@mgdis/mg-components/loader';

defineCustomElements();

const notif = new NotificationCenter();

document.querySelectorAll('mg-button').forEach(button => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  button.addEventListener('click', ({ target }: { target: any }) => {
    const {
      dataset: { variant, delay, context },
    } = target;
    const content = target.dataset.content ?? `message ${variant ?? 'info'} de ${target.closest('body')?.dataset.source}.html`;
    notif.postMessage({
      content,
      variant,
      delay: delay !== undefined ? parseInt(delay, 10) : undefined,
      context,
    });
  });
});
