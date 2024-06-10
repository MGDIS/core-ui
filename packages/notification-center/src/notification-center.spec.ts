import { NotificationCenter } from './notification-center';

describe('Notification center', () => {
  let notifsCenter;
  beforeEach(() => {
    jest.spyOn(window.customElements, 'whenDefined').mockImplementation(() => Promise.resolve());
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    // Clean jsdom
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  it('Should log a warningwhile mg-component is loading', () => {
    const spyConsole = jest.spyOn(console, 'warn');

    notifsCenter = new NotificationCenter();

    expect(notifsCenter).toBeDefined();
    expect(spyConsole).toHaveBeenCalledWith('Waiting for mg-components to load.');
  });

  it('Should throw an error when cannot access parent', () => {
    const spyConsole = jest.spyOn(console, 'error');
    const spyWindowParent = jest.spyOn(window, 'parent', 'get').mockImplementationOnce(() => {
      throw new Error('non');
    });

    notifsCenter = new NotificationCenter();

    expect(notifsCenter).toBeDefined();
    expect(spyWindowParent).toHaveBeenCalled();
    expect(spyConsole.mock.calls[0]?.[0]).toEqual('Different hosts between iframes:');
  });

  it('Should throw an error when parent document is undefined', () => {
    const spyConsole = jest.spyOn(console, 'error');
    const spyWindowParent = jest.spyOn(window, 'parent', 'get').mockImplementationOnce(() => ({}) as Window);

    notifsCenter = new NotificationCenter();

    expect(notifsCenter).toBeDefined();
    expect(spyWindowParent).toHaveBeenCalled();
    expect(spyConsole.mock.calls[0]?.[0]).toEqual('Different hosts between iframes:');
  });

  it('Should not display notification when component is not defined', () => {
    const spyConsole = jest.spyOn(console, 'error');
    notifsCenter = new NotificationCenter();
    // When the notification event was propagated, the notification component was not available in the registry.
    window.dispatchEvent(new MessageEvent('message', { data: { content: 'Default example', appId: 'mg-notification-center' } }));
    expect(spyConsole).toHaveBeenCalledWith("notification-center won't work properly.");
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  describe.each(['mg-alert', 'mg-message'])('defined custom elements %s', tagName => {
    beforeEach(() => {
      jest.spyOn(window.customElements, 'get').mockImplementation(value => value === tagName);
      notifsCenter = new NotificationCenter();
      expect(notifsCenter).toBeDefined();
    });

    it.each([true, false])('Should init the lib with event: %s', withEvent => {
      if (withEvent) {
        // Trigger DOM ready event
        window.dispatchEvent(new Event('DOMContentLoaded'));
      }
      expect(document.head.innerHTML).toContain('<style>#mg-notification-center');
      expect(document.getElementById('mg-notification-center')).not.toBeNull();
    });

    it.each([
      { content: 'Default example' },
      { content: 'Danger variant', variant: 'danger' },
      { content: 'Warning variant', variant: 'warning' },
      { content: 'Success variant', variant: 'success' },
      { content: 'With delay', delay: 5 },
      { content: 'With context', context: 'blu' },
      { content: 'Success variant without delay', variant: 'success', delay: 0 },
    ])('Should display a notification %s', eventData => {
      window.dispatchEvent(new MessageEvent('message', { data: { ...eventData, appId: 'mg-notification-center' } }));
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('Should remove unsafe or unknown html', () => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: {
            content: `<p>Content with unsafe or unknown html</p>
<script>alert("blu")<script>
<not-tag>not a tag</not-tag>`,
            appId: 'mg-notification-center',
          },
        }),
      );
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('Should post a message', () => {
      const notificationData = { content: 'Default example' };
      const spyPostMessage = jest.spyOn(window, 'postMessage');
      notifsCenter.postMessage(notificationData);
      expect(spyPostMessage).toHaveBeenCalledWith({ ...notificationData, appId: 'mg-notification-center' }, 'http://localhost');
    });

    it('Should remove previous message with same context', () => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: {
            content: 'First message with context',
            context: 'blu',
            appId: 'mg-notification-center',
          },
        }),
      );
      expect(document.body.innerHTML).toMatchSnapshot();
      window.dispatchEvent(
        new MessageEvent('message', {
          data: {
            content: 'Second message with same context',
            context: 'blu',
            appId: 'mg-notification-center',
          },
        }),
      );
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('Should remove message on close', () => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: {
            content: 'Message to close',
            appId: 'mg-notification-center',
          },
        }),
      );
      expect(document.body.innerHTML).toMatchSnapshot();
      const notificationElement = document.querySelector(tagName);
      notificationElement?.dispatchEvent(new CustomEvent('component-hide', { bubbles: true }));
      expect(document.body.innerHTML).toMatchSnapshot();
    });
  });

  it('Should fake iframe', () => {
    const spyWindowSelf = jest.spyOn(window, 'self', 'get').mockImplementationOnce(jest.fn());
    const spyWindowParent = jest.spyOn(window, 'parent', 'get').mockImplementation(() => window);
    jest.spyOn(window.customElements, 'get').mockImplementation(() => 'mg-alert');

    notifsCenter = new NotificationCenter();

    expect(notifsCenter).toBeDefined();
    // Check 3 times if it's an iframe
    expect(spyWindowSelf).toHaveBeenCalledTimes(3);
    expect(spyWindowParent).toHaveBeenCalledTimes(3);
  });
});
