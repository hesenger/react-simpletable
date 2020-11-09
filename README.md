# react-simpletable

> Simple table component to render json data from local or remote

[![NPM](https://img.shields.io/npm/v/@hesenger/react-simpletable.svg)](https://www.npmjs.com/package/@hesenger/react-simpletable)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

SimpleTable comes with support to:
- Local data
- Remote data
- Themes

[See live examples here](https://hesenger.com/react-simpletable).

All size of projects need powerfull and customizable components, but data
driven software usually have many CRUDS to simple manage data in single tables, 
in this case, productivity comes to be a good partner, and a simple declarative 
component to list local or remote data is a must.

In this cases `react-simpletable` is a fast option to show users data and let them 
select wich they want to change/delete.


## Install

```bash
npm i @hesenger/react-simpletable
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
