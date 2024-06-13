# Notification center

Notification center is the new way to display notifications in MGDIS products.

Considering notifications as:

- an information alert
- an error alert
- a warning alert
- a success alert

## Why?

Because of the iframes we had to display notifications in the window and close by the origin action was. In some case the notification is not directly visible, we have to scroll to see it for example.

We had to add `mg-alert` in almost every form.

It has some concistency issues.

## How?

The idea is to load the library on every frontend projects, if it's loaded in the top window it will listen to messages, so even if you are running your project localy, the notification will be displayed.

The library display notifications using [mg-alert](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-alert--mg-alert) from [mg-components](http://core.pages.mgdis.fr/core-ui/core-ui/).

### Include the lib

If you just need to listen to messages to display notifications:

```TS
import { NotificationCenter } from '@mgdis/notification-center';
new NotificationCenter();
```

To send messages:

```TS
import { NotificationCenter } from '@mgdis/notification-center';
const notif = new NotificationCenter();

// Default (minimum) message
notif.postMessage({
  content: 'Message notification'
});
```

Here is the full arguments list:

- **content:** The notification you want to display. HTML content will be sanitized.
- **variant:** Set the alert variant type.  
  Default `'info'`, can also be `'danger'`, `'success'`, `'warning'`.
- **delay:** Define the number of second the alert will be displayed.  
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

#### UMD

Please note that some repositories may not support ES modules, which are a modern standard for organizing and sharing JavaScript code.  
In such cases, it may be necessary to use a UMD (Universal Module Definition) build of the library instead. UMD is a format that is compatible with both modern ES modules and older module systems like CommonJS and AMD.

To use a UMD build, simply include the appropriate script tag or import statement in your project.

The exposed global variable name is `NotificationCenterModule`.

## Possible improvements

- Add mg-details in notification.
- Add button or link in notification.
- Loading message.
- Add possibility to define notification zone:
  - top-left, top, top-right, bottom-right, bottom, bottom-left
  - x,y spacing
- Add confirmation modale.
