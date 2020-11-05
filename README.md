# react-simpletable

Simple and selectable data table component to render json data.

[![NPM](https://img.shields.io/npm/v/react-simpletable.svg)](https://www.npmjs.com/package/react-simpletable)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[See detailed example at /example](example).

![Example table rendering json](docs/example.png)

The default style (gray based) not set `font-face` or `font-size`, this 
will be inherited from your documents defaults. To set colors or other styles 
use .simpletable class like:

```
#root .simpletable tr:nth-child(even) { background-color: #e8f5d7; }
#root .simpletable tr.active { background-color: #fae6aa; }
#root .simpletable tr:hover td, tr.active:hover td { background-color: #d7faaa; }
```

Remember that table is not rendered directly to page, this is inside a `section` tag, 
with css class `simpletable` name.

## Coming soon

In my projects I use tables based on remote fetchs like example, but this is made 
easy simple specifing `url` property. I'm porting this codes to this project. Important
too that the data is paginated, and table render page controls (first, last, next ans previous buttons).

## Install

```bash
npm install --save react-simpletable
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-simpletable';
import 'react-simpletable/dist/index.css';

const App = () => {
  const [data, setData] = React.useState([]);
  const [current, setCurrent] = React.useState();

  if (!data.length)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(data => setData(data));

  return <>
    <Table data={data} onSelect={row => setCurrent(row)}>
      <Table.Col name="id" header="#" />
      <Table.Col name="username" header="Username" />
      <Table.Col name="name" header="Name" />
      <Table.Col name="email" header="E-mail" />
      <Table.Col header="Site" format={obj => <a href={'http://' + obj.website}>{obj.website}</a>} />
    </Table>
    <p>
      Current selection: {JSON.stringify(current)}
    </p>
  </>;
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## License

MIT © [hesenger](https://github.com/hesenger)
