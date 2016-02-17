angular-select2 examples
========================

**proof of concept:** dynamically disable select2 options using
`angular-select2`

Setup
-----

    git clone https://github.com/pfraces-poc/angular-select2-examples
    cd angular-select2-examples
    npm run setup

Tasks
-----

    npm run <task>

  * **setup:** install all required dependencies
  * **upgrade:** update all installed dependencies
  * **lint:** static analysis of JavaScript sources and unit tests
  * **test:** run available unit tests
  * **build:** generate a `dist/` directory with the compiled app
  * **server:** launch a server providing the app at `dist/`
  * **live:** `build` and `server`

Notes
-----

### How to install `angular-select2`

    bower install angular-select2

Install the sources

```html
<link href="bower_components/select2/select2.css" rel="stylesheet">

<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/select2/select2.js"></script>

<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-select2/dist/angular-select2.js"></script>
```

**Note:** Remember to include `jquery` before `angular` for better integration
between the frameworks

Add `rt.select2` to your app dependencies

```js
angular.module('app', [
  'rt.select2'
]);
```

Customize styles

```css
.select2-container { width: 50%; }
```

### `angular-select2` usage

`<select2>` directive ...

  * Must be an element (not attribute)
  * Must have an `ng-model`  attribute
  * Must have defined its data source in one of the following ways:
      * synchronous: `s2-options` attribute
      * async: `query` method in the options provided to `select2`

**Using `<s2-options>`**

```html
<body ng-app="app" ng-controller="ctrl">
  <select2 ng-model="model" s2-options="item.id as item.name for item in items"></select2>
</body>
```

```js
angular.module('app', ['rt.select2'])
.controller('ctrl', function ($scope) {
  $scope.items = [
    {
      id: 'F',
      name: 'Foo'
    },
    {
      id: 'B',
      name: 'Bar'
    }
  ];
});
```

**Using `query` method**

```html
<body ng-app="app" ng-controller="ctrl">
  <select2 ng-model="model" options="queryOptions"></select2>
</body>
```

```js
angular.module('app', ['rt.select2'])
.controller('ctrl', function ($scope, $timeout) {
  $scope.queryOptions = {
    query: function (query) {
      $timeout(function () {
        query.callback({
          results: [
            { id: 'F', text: 'Foo' },
            { id: 'B', text: 'Bar' }
          ]
        });
      }, 1000);
    }
  };
});
```

**Note:** Data passed to `query` method has to have the same format shown above:

```json
{
  "results": [
    {
      "id": "",
      "text": ""
    }
  ]
}
```
