# material-shell

[![Published on npm](https://img.shields.io/npm/v/material-shell.svg?logo=npm)](https://www.npmjs.com/package/material-shell)

Shell element for material app.

Its utility revolves around these principles:

- It should be the first script/element to be fetched to avoid FOUC (in non-SSR environment)
- The element loads default material styles (tokens)
  - or load the tokens saved in `material-theme` local storage if it exists.
- Your app can be slotted inside the element.
- The element shows a circular progress by default, you can use helper functions to toggle loading/showing content.

[Playground Demo](https://lit.dev/playground/#gist=968e1e293ae512a70beddd516a85885c)

## Usage

### Install

```
npm add -D material-shell
```

### Importing element

`index.html`:

```html
<head>
	<script src="./node_modules/material-shell/material-shell.js"></script>
</head>
<body>
	<material-shell></material-shell>
</body>
```

Notes:

- _Update `src` to wherever the script is located, it should be included during your building process_
- _The script is minified for fast loading_
- _You can load this script from a CDN_

### Slot your app

By default `<material-shell>` element will show a circular progress in the middle of the screen, _even if you slot a content_:

`index.html`:

```html
<material-shell>
	<my-material-app-or-whatever></my-material-app-or-whatever>
</material-shell>
```

When your content is ready you can send an event to instruct the shell to show content:

```js
// Somewhere in your app when content is ready
myApp.dispatchEvent(
	new Event('material-loading-off', {composed: true, bubbles: true})
);
```

But that's tedious, instead you can use a helper function:

```js
import {materialShellLoadingOff} from 'material-shell';

// Somewhere in your app...
materialShellLoadingOff.call(this);
```

_(There is also `materialShellLoadingOn` in case you want to hide the content again)_

## License

MIT License
