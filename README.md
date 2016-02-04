# react-responsive-link

A link component that:

- doesn't have the 300ms tap delay on mobile (even if the zoom is not fixed).
- if you need to scroll the page and happen to grab a link when you start swiping, the action of the link will not be triggered (just as it is expected on mobile).
- it is not either tap or click. That is, you can use it on a hibrid device that has both touch and mouse and it'll react appropriately to clicks and taps.

This is similar to what [Fastclick](https://github.com/ftlabs/fastclick) does, implemented as a React component.
Note that on browsers that did [remove the click delay](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away) this responsive link is going to be slightly slower than the native <a> link because of the extra code involved.
Way faster than 300ms though!

Hopefully soon no browser will need this trick.

## Installation

```
npm i @terebentina/react-responsive-link -S
```

## Usage

```javascript
var Link = require('@terebentina/react-responsive-link');

<Link onClickTap={this.doSomething}>click or tap me</Link>
```

The more complete example below is using ES6 and the class syntax but, obviously, you can use ES5 and regular `React.createClass()` as well.

```javascript
import React from 'react';
import Link from '@terebentina/react-responsive-link';

class MyComponent extends React.Component {
  doSomething(e) {
    e.preventDefault();
    console.log('you clicked or tapped me!');
  }

  render() {
    return (
      <div>
        This is some text
        <Link onClickTap={this.doSomething}>click or tap me</Link>
      </div>
    );
  }
}
```

## Properties

You can pass any prop to the link but the following props are "special":
- `onClickTap` the function to execute when the link is clicked or tapped. The function is passed the event as the first parameter.
- `href` can be used instead of `onClickTap` if you need to specify an url to go to. Note that `href` is not very friendly with react-router! See the example below if you want to use this together with react-router

## Usage with react-router

You need to follow the [Navigating Outside of Components](https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/NavigatingOutsideOfComponents.md) guide from react-router.
Once you create that `history.js` module you can make use of it for your responsive links:

```javascript
import React from 'react';
import Link from '@terebentina/react-responsive-link';
import history from './history';

class MyComponent extends React.Component {
  goToLink(e) {
    e.preventDefault();
    history.replaceState(null, '/some/path');
  }

  render() {
    return (
      <div>
        Click the link to
        <Link onClickTap={this.goToLink}>navigate with react-router</Link>
      </div>
    );
  }
}

```

## License

[The MIT License](./LICENSE)

Copyright (c) 2016 Dan Caragea
