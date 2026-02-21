# Treeviz

[![Known Vulnerabilities](https://snyk.io/test/github/dwyl/hapi-auth-jwt2/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dwyl/hapi-auth-jwt2?targetFile=package.json)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

This javascript module aims at providing an easy interface in order to represent tree diagrams on screen with the ability to handle dynamic data flows. The data format must be JSON.

![](https://i.imgur.com/vyB2Erg.gif)

## Installation

With npm :

```Bash
npm install treeviz
```

and then you can use it with :

```JavaScript
import {Treeviz} from 'treeviz';
```

Or download this zip repository in the Github Release section and link the dist/treeviz.js file in your page directly : `<script src="./dist/index.js><script>`

## Development


```bash
npm run dev
```


#### Vanilla JavaScript NEW

To build .js bundles for vanilla JavaScript usage:

```bash
npm run build
```

This generates:
- `dist/treeviz.js` - ES module format
- `dist/treeviz.iife.js` - Vanilla JS bundle for `<script>` tag usage

1. Link in your HTML

```html
<script src="dist/treeviz.iife.js"></script>
```

2. Use in your JavaScript

```html
<div id="tree" style="height:700px; width:900px"></div>

<script>
  var data = [
    { id: 1, text_1: "Father", father: null },
    { id: 2, text_1: "Child A", father: 1 },
  ];

  var myTree = Treeviz.create({
    htmlId: "tree",
    idKey: "id",
    hasFlatData: true,
    relationnalField: "father",
  });

  myTree.refresh(data);
</script>
```

#### Alternative: esbuild

If you prefer using esbuild directly:

```bash
npx esbuild src/index.ts --bundle --outfile=dist/bundle.js --platform=browser --format=iife --global-name=Treeviz --keep-names
```


#### Vanilla JavaScript

```HTML
// Define a tree element where dimensions are mandatory
<div id="tree" style="height:700px; width:900px"></div>

<script>
// Define a dataset
var data = [
  { id: 1, text_1: "Father", father: null },
  { id: 2, text_1: "Child A", father: 1 },
  { id: 3, text_1: "Child B", father: 1 },
  { id: 4, text_1: "Subchild C", father: 2 }
];

// Define and configure a tree object
var myTree = Treeviz.create({
  htmlId: "tree",
  idKey: "id",
  hasFlatData: true,
  nodeColor: (nodeData) => "grey",
  relationnalField: "father",
});

// Display the tree based on the data
myTree.refresh(data);
</script>
```

To update the tree visually you will just have to pass new data to the `refresh` method like this :

```JS
myTree.refresh(data);
myTree.refresh(data_update1);
myTree.refresh(data_update2);
```

The tree will be clever enough to updates only the part of the trees that have been added or removed in the dataset, and so it won't redraw the entire tree.

[Treeviz Example](https://codepen.io/pierrecapo/pen/MPbBdv)

#### Hierarchical data case :

```js
var hierarchical_data_example = {
  name: "Mom",
  qty: 10,
  children: [
    { name: "Son A", qty: 3 },
    { name: "Son B", qty: 7 },
  ],
};

var myTree = Treeviz.create({
  htmlId: "tree",
  idKey: "name",
  hasFlatData: false,
  relationnalField: "children",
});

myTree.refresh(hierarchical_data_example);
```

## API

The big part of the API is configuring the tree before passing data to it :

```JS
Treeviz.create(config);
```

The table below lists all the avalaible key that the config object can have

| Key                        | Type                                          | Default                 | Definition                                                                                                                                                                         |
| -------------------------- | --------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `htmlId`                   | string (Required)                             |                         | The HTML id tag on the page where the tree should be drawn. It must have a width and an height specified                                                                           |
| `idKey`                    | string                                        | "id"                    | The key in a data item representing the unique identifier of a node                                                                                                                |
| `relationnalField`         | string                                        | "father"                | In case of flat dataset, usually the relationnal field between each node is the field representing the father of the node, linking it to the id of the field. (See example below). |
| `hasFlatData`              | boolean                                       | true                    | Specify whether the data passed to the tree is flat or already hierarchical                                                                                                        |
| `hasPan`                   | boolean                                       | false                   | Toggle the ability to pan the tree                                                                                                                                                 |
| `hasZoom`                  | boolean                                       | false                   | Toggle the ability to zoom the tree                                                                                                                                                |
| `nodeWidth`                | number                                        | 160                     | Width of a node in px                                                                                                                                                              |
| `nodeHeight`               | number                                        | 100                     | Height of a node in px                                                                                                                                                             |
| `linkColor`                | function                                      | (node: NodeData) => "#ffcc80" | Color of the link                                                                                                                                                                  |
| `linkWidth`                | function                                      | (node: NodeData) => 10        | Width of the link                                                                                                                                                                  |
| `linkShape`                | "quadraticBeziers" \| "orthogonal" \| "curve" | "quadraticBeziers"      | Shape of the link                                                                                                                                                                  |
| `linkLabel`                | ILinkLabel<T>                                 | undefined               | Configuration for labels displayed on connection lines. Contains `render` function, `color`, and `fontSize` properties                                                             |
| `renderNode`               | function                                      | (node: NodeData) => null      | HTML template for every node                                                                                                                                                       |
| `isHorizontal`             | boolean                                       | true                    | Direction of the tree. If true, the tree expands from left to right. If false, it goes from top to bottom                                                                          |
| `onNodeClick`              | function                                      | (node: NodeData) => null      | Function handling the event when someone click on it                                                                                                                               |
| `onNodeMouseEnter`         | function                                      | (node: NodeData) => null      | Function handling the event when someone hover a node                                                                                                                              |
| `onNodeMouseLeave`         | function                                      | (node: NodeData) => null      | Function handling the event when the mouse pointer leaves a node                                                                                                                   |
| `mainAxisNodeSpacing`      | number or "auto"                              | 300                     | Set the distance in pixels between two depths in the tree. If the value is `auto` it will automatically display the tree to fit the size of the container.                         |
| `secondaryAxisNodeSpacing` | number                                        | 1.25                    | Set the distance between nodes in the same level as a coefficient of node dimensions. Recommended to have the value superior to 1                                                  |
| `marginTop`                | number                                        | 1.25                    | Set the margin between the SVG element and the tree                                                                                                                                |
| `marginBottom`             | number                                        | 1.25                    | Set the margin between the SVG element and the tree                                                                                                                                |
| `marginLeft`               | number                                        | 1.25                    | Set the margin between the SVG element and the tree                                                                                                                                |
| `marginRight`              | number                                        | 1.25                    | Set the margin between the SVG element and the tree                                                                                                                                |
| `duration`              | number                                        | 600                    | The duration of the animation transition between layouts                                                                                                                                |
| `data`              | any                                        |                     | Needed for Typescript projects only to type the `NodeData` argument                                                                                                                                |

And then, we have the `NodeData` type that is passed as callback of some functions:
`
type NodeData {
  data: // the data of each item
  settings: // the settings object
}
`

### Link Labels Configuration

You can display labels on the connection lines between nodes using the `linkLabel` configuration:

```js
var myTree = Treeviz.create({
  htmlId: "tree",
  idKey: "id",
  hasFlatData: true,
  relationnalField: "father",
  linkLabel: {
    render: (parent, child) => {
      // Return plain text to display on the connection line
      return "is child";
      // You can use parent and child data for dynamic labels:
      // return child.data.name + " is child";
    },
    color: "#455A64",      // Label text color (optional)
    fontSize: 11           // Label font size in px (optional)
  }
});
```

The `render` function receives parent and child `NodeData` objects, allowing you to create dynamic labels based on node properties. Returns plain text only (HTML is not supported in SVG text elements).

## Testing

The project uses [Vitest](https://vitest.dev/) for unit and integration testing with jsdom for DOM simulation and coverage reporting.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Open Vitest UI dashboard (interactive)
npm run test:ui
```

### Test Structure

Tests are organized in `tests/` folder:

- **`tests/unit/`** - Unit tests for individual functions and utilities
  - `utils.test.ts` - Tests for `setNodeLocation()` function
  - `core-utils.test.ts` - Tests for `getAreaSize()` and `RefreshQueue` class
  - `node-ancestors.test.ts` - Tests for `getFirstDisplayedAncestor()` hierarchy traversal
  - `prepare-data.test.ts` - Tests for data preparation and configuration validation

- **`tests/integration/`** - Integration tests for API and configuration
  - `treeviz-api.test.ts` - Tests for configuration validation, data variations, and layout configurations

### Test Coverage

Coverage reports are generated in the `coverage/` directory after running `npm run test:coverage`. The HTML report provides detailed coverage information for all source files.

## Contributing

- Clone the repo.
- Run `npm install`.
- Run `npm run dev`, then you can edit the files in the `./src` folder and the `./example/index.html` file.
- **Run `npm test` to verify your changes pass all tests** before submitting a pull request.
- To publish (admin rights), run `npm run build && npm publish`.

## Credits

This module is based on d3 library, credit to all the contributors of this project.

## License

MIT
