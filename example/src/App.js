import React from 'react';
import Table from 'react-simpletable';
import 'react-simpletable/dist/index.css';
import local from './local.json';

const RemoteTable = () => {
  return <>
    <h2>Table from remote data</h2>
    <p>This is example from use of url property for table load data with
      a remote request (using fetch api) and automatically control pagination.</p>

    <Table url="https://api.instantwebtools.net/v1/passenger">
      <Table.Col name="_id" header="#" />
      <Table.Col name="name" header="Name" />
      <Table.Col name="trips" header="Trips" />
      <Table.Col header="Last flight"
        format={obj => (obj.airline[0] || obj.airline).name} />
    </Table>
  </>;
}

const LocalTable = () => {
  const [current, setCurrent] = React.useState();
  const data = local.data;

  return <>
    <h2>Table from local data</h2>
    <p>This is example from use of data property for fill table
      and onSelect event.</p>

    <Table data={data} onSelect={row => setCurrent(row)}>
      <Table.Col name="_id" header="#" />
      <Table.Col name="name" header="Name" />
      <Table.Col name="trips" header="Trips" />
      <Table.Col header="Last flight"
        format={obj => (obj.airline[0] || obj.airline).name} />
    </Table>
    <p>
      Current selection: {JSON.stringify(current)}
    </p>
  </>;
}

const App = () =>
  <main style={{ margin: '0 auto', width: 800 }}>
    <h1>react-simpletable examples</h1>
    <p>This is a list of simple examples of using react-simpletable.</p>

    <LocalTable />

    <RemoteTable />
    <footer style={{ fontSize: '.8em', borderTop: '1px solid #ccc', marginTop: '10em' }}>
      <p>Examples avaiable in <a href="https://github.com/hesenger/react-simpletable/tree/main/example" target="_blank" rel="noreferrer">GitHub</a>
      </p>
    </footer>
  </main>;

export default App;
