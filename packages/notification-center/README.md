# Notification center

Notification center is the new way to display notifications in MGDIS products.

Considering notifications as :

- an information message
- an error message
- a warning message
- a success message

## Why?

Because of the iframes we had to display notifications in the window and close by the origin action was. In some case the notification is not directly visible, we have to scroll to see it for example.

We had to add `mg-message` in almost every form.

It has some concistency issues.

## How?

The idea is to load the library on every frontend projects, if it's loaded in the top window it will listen to messages, so even if you are running your project localy, the notification will be displayed.

The library display notifications using [mg-message](http://core.pages.mgdis.fr/core-ui/core-ui/?path=/story/molecules-mg-message--mg-message) from [mg-components](http://core.pages.mgdis.fr/core-ui/core-ui/).

### Include the lib

If you just need to listen to messages to display notifications:

```TS
import { NotificationCenter } from '@mgdis/notification-center';
new NotificationCenter();
```

To send messages :

```TS
import { NotificationCenter } from '@mgdis/notification-center';
const notif = new NotificationCenter();

// Default (minimum) message
notif.postMessage({
  content: 'Message notification'
});
```

Here is the full arguments list:

- **content:** The message you want to display. HTML content will be sanitized.
- **variant:** Set the message variant type.  
  Default `'info'`, can also be `'danger'`, `'success'`, `'warning'`.
- **delay:** Define the number of second the message will be displayed.  
   Default values correspond to the expected behavior so these values should only be changed if it has been explicitly requested.

  - For `'info'`, `'danger'` and `'warning'` variants, default value is `undefined`.
  - For `'success'` variant default value is `5`. Can be set to `undefined` by setting its value to `0`.

  Minimum value is `3`.

- **context:** Previous notification using the same context value will be removed.  
  Default: `undefined`

```TS
// Possibilities
notif.postMessage({
  content: 'Message notification',
  variant: 'danger',
  delay: 10
  context: 'form-context-id',
});
```

## Possible improvements

- Add mg-details in message.
- Add button or link in message.
- Loading message.
- Add possibility to define message zone:
  - top-left, top, top-right, bottom-right, bottom, bottom-left
  - x,y spacing
- Add confirmation modale.
