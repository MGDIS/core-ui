import './style.scss';
import { NotificationCenter } from '@mgdis/notification-center';
import { defineCustomElements } from '@mgdis/mg-components/loader';

defineCustomElements();
Object.defineProperty(window, 'NotificationCenter', { value: new NotificationCenter() });

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Vanilla App</h1>
    <p>The purpose of this application is to ensure the integration of mg-components and styles into a vanilla app.</p>
    <h2>Modal</h2>
    <mg-button type="button" id="open-modal">
      <mg-icon icon="check-circle-outline"></mg-icon>Open modal
    </mg-button>
    <mg-modal modal-title="Modal" close-button hidden>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </mg-modal>
    <h2>Notification</h2>
    <mg-form>
      <mg-input-textarea identifier="notification-content" label="Content" required></mg-input-textarea>
      <mg-input-select identifier="notification-variant" label="Variant" placeholder-hide></mg-input-select>
      <mg-input-numeric identifier="notification-delay" label="Delay" type="integer" mg-width="2"> seconds</mg-input-numeric>
      <mg-input-text identifier="notification-context" label="Context"></mg-input-text>
      <mg-button id="form-submit" class="mg-l-group-elements mg-l-group-elements--align-right" slot="actions">
        <mg-icon icon="comment-outline"></mg-icon>Display notification
      </mg-button>
    <mg-form>
  </div>
`;

// modal
const openModalBtn = document.getElementById('open-modal');
const modal = document.querySelector('mg-modal');

openModalBtn.addEventListener('click', () => {
  modal.hidden = false;
});

// form
const form = document.querySelector('mg-form');
const selectVariant = document.querySelector('[identifier="notification-variant"]');
const formSubmitBtn = document.getElementById('form-submit');

const variants = ['success', 'info', 'warning', 'danger'];
selectVariant.items = variants;
selectVariant.value = variants[0];

form.addEventListener('form-valid', e => {
  formSubmitBtn.disabled = !e.detail;
});

form.addEventListener('form-submit', () => {
  const notification = {
    content: document.querySelector('[identifier="notification-content"]').value,
    variant: document.querySelector('[identifier="notification-variant"]').value,
    delay: document.querySelector('[identifier="notification-delay"]').value,
    context: document.querySelector('[identifier="notification-context"]').value,
  };
  window.NotificationCenter.postMessage(notification);
});
