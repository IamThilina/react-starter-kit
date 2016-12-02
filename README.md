## Educate Lanka Foundation WebDev 

### Documentation

  * **General**
    - [React Style Guide](./docs/react-style-guide.md)
    - [How to configure text editors and IDEs](./docs/how-to-configure-text-editors.md)
  * **Questions**
    - [Which module bundler should I use?](https://github.com/kriasoft/react-starter-kit/issues/3)
    - [Which Flux implementation should I use?](https://github.com/kriasoft/react-starter-kit/issues/22)
  * **Recipes**
    - [How to Implement Routing and Navigation](./docs/recipes/how-to-implement-routing.md)
    - [How to Integrate Disqus](./docs/recipes/how-to-integrate-disqus.md)

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
│   ├── /api/                   # Front End API
│   ├── /components/            # React components
    ├── /config                 # All the configuration files
│   ├── /constants/             # Constants (action types etc.)
│   ├── /core/                  # Core components (Flux dispatcher, base classes, utilities)
│   ├── /decorators/            # Higher-order React components
│   ├── /frisby/                # API end-point test specs
│   ├── /__tests__/             # jest test files
│   ├── /models/                # data models (db entities)
│   ├── /public/                # Static files which are copied into the /build/public folder
│   ├── /services/              # Falcor service modules
│   ├── /stores/                # Stores contain the application state and logic
│   ├── /utils/                 # Utility classes and functions(Falcor router)
│   ├── /app.js                 # Client-side startup script
│   ├── /config.js              # Global application settings
│   ├── /routes.js              # Universal (isomorphic) application routes
│   └── /server.js              # Server-side startup script
├── /tools/                     # Build automation scripts and utilities
│   ├── /lib/                   # Library for utility snippets
│   ├── /build.js               # Builds the project from source to output (build) folder
│   ├── /bundle.js              # Bundles the web resources into package(s) through Webpack
│   ├── /clean.js               # Cleans up the output (build) folder
│   ├── /webpack.config.js      # Configurations for client-side and server-side bundles
│   ├── /copy.js                # Copies static files to output (build) folder
│   ├── /deploy.js              # Deploys your web application
│   ├── /serve.js               # Launches the Node.js/Express web server
│   └── /start.js               # Launches the development web server with "live reload"
│── package.json                # The list of 3rd party libraries and utilities
└── preprocessor.js             # ES6 transpiler settings for Jest
```

### Getting Started

Just clone the repo and start developing:

```shell
$ git clone -o ELFWebDev  -b develop --single-branch \https://github.com/educatelanka/elf-leapset-web.git ELF
$ cd ELF
$ npm install                   # Install Node.js components listed in ./package.json
$ npm start                     # Compile and launch
```

### How to Build

```shell
$ npm run build                 # or, `npm run build -- --release`
```

By default, it builds in *debug* mode. If you need to build in release
mode, just add a `-- --release` flag. This will optimize the output bundle for
production.

### How to Run

```shell
$ npm start                     # or, `npm start -- --release`
```

This will start a light-weight development server with "live reload" and
synchronized browsing across multiple devices and browsers.

### How to Update

You can always fetch and merge recent changes from this repo back into
your own project: 

```shell
$ git checkout develop
$ git add .
$ git commit -m "[ELF-(no)] - Commit Message"
$ git pull ELFWebDev develop
$ git push ELFWebDev develop
$ npm install
```

### Webpack Configurations
As we are developing a multi page web app all React components for **one page** should bundle as **one**.

If you are creating a **new page** also add `NewPage.entry.js` file to the current page directory and do following.

```javascript
import globalEntry from './../globalEntry';
import NewPage from './NewPage';
import React from 'react';

globalEntry(<NewPage />);
```
Next add this entry to `webpack.config.js` under `tools` directory.

```javascript
...
entry: {
    ...
    home: './src/components/HomePage/HomePage.entry.js',
    newpage: './src/components/NewPage/NewPage.entry.js',
    ...
  },
```

This will generate `newpage.entry.chunk.js` in build directory.
Finally we want to tell the page to load this **js** file when the page is served from the server. Add following to the end of `NewPage.js`

```javascript
render() {
    return (
      <div>
        ...

        <script src="/newpage.entry.chunk.js"></script>
      </div>
    );
  }
```

 > This is the multi page web app approach suggested by webpack.
 <https://webpack.github.io/docs/optimization.html#multi-page-app>



### How to Deploy

```shell
$ npm run deploy                # or, `npm run deploy -- --production`
```

For more information see `tools/deploy.js`.


### How to Unit Test

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```

Test any javascript module by creating a file at `__tests__/` directory. Append `-test.js` to the filename and [Jest](https://facebook.github.io/jest/) will do the rest.

### How to Test API

Run API tests powered by [Frisby Js](http://frisbyjs.com/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ cd frisby
$ jasmine-node test_spec.js
```

Test any API end point by creating a file at `frisby/` directory. Append `_spec.js` to the filename
### Team

  * [Mirunaaliny S Iyer](mailto:msomasunthara@leapset.com)
  * [Dinidu de Silva](mailto:dinidu@leapset.com)
  * [Thisara Amaradasa](mailto:thisara@leapset.com)
  * [Roshan Wettesinghe](mailto:roshanw@leapset.com)
  * [Chinthaka Gamage](mailto:chinthakag@leapset.com)
  * [Asanka Hettiarachchi](mailto:asankah@leapset.com)
  * [Sasitha Sonnadara](mailto:sasithas@leapset.com)
  * [Sudaraka Abeywardena](mailto:sudarakaa@leapset.com)

