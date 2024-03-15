import { renderAttributes } from '@mgdis/playwright-helpers';
import { MgModal } from '../mg-modal';

export const contents = [null, 'short', 'long'] as const;
export const actions = [true, false] as const;
export type ContentsType = (typeof contents)[number];
export type ActionsType = (typeof actions)[number];
export type SlotType = { content?: ContentsType; action?: ActionsType };
export type MgModalType = Partial<MgModal>;

export const createSlots = ({ content, action }: SlotType): string => {
  let slots = '';
  if (content === 'short') {
    slots += `
    <p slot="content">
      <strong>Strong</strong> content!
    </p>`;
  } else if (content === 'long') {
    slots += `
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia d</p>
    `;
  } else {
    if (content) {
      slots += `
      <div slot="content">
        ${content}
      </div>`;
    }
  }

  if (action) {
    slots += `
   <div slot="actions" class="mg-group-elements mg-group-elements--align-right">
     <mg-button identifier="identifier">Primary</mg-button>
     <mg-button variant="secondary" identifier="identifier">
       Secondary
     </mg-button>
   </div>`;
  }
  return slots;
};

export const createHTML = (args: MgModalType, slots: SlotType = {}): string => {
  const triggerModalId = 'modal-button';
  return `<mg-button id="${triggerModalId}">Open modal</mg-button>
  <mg-modal ${renderAttributes({ modalTitle: 'Modal title', ...args })}>${createSlots(slots)}</mg-modal>
  <script>
    document.getElementById('${triggerModalId}').addEventListener('click', () => {
      const mgModal = document.querySelector('mg-modal');
      mgModal.hide = !mgModal.hide;
    });
  </script>
  `;
};
