import React from 'react';
import Table from 'react-simpletable';
import local from './local.json';
import 'react-simpletable/dist/index.css';
import flat from './flat.png';
import material from './material.png';

const RemoteTable = () => {
  return <>
    <h2>Table from remote data</h2>
    <p>This is example from use of url property for table load data with
      a remote request (using fetch api) and automatically control pagination.</p>

      <pre><code>{`
<Table url="https://api.instantwebtools.net/v1/passenger">
    <Table.Col name="_id" header="#" />
    <Table.Col name="name" header="Name" />
    <Table.Col name="trips" header="Trips" />
    <Table.Col header="Last flight" format={obj => (obj.airline[0] || obj.airline).name} />
</Table>
    `}
    </code></pre>

    <Table url="https://api.instantwebtools.net/v1/passenger">
      <Table.Col name="_id" header="#" />
      <Table.Col name="name" header="Name" />
      <Table.Col name="trips" header="Trips" />
      <Table.Col header="Last flight" format={obj => (obj.airline[0] || obj.airline).name} />
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

    <pre><code>{`
<Table data={data} onSelect={row => setCurrent(row)}>
    <Table.Col name="_id" header="#" />
    <Table.Col name="name" header="Name" />
    <Table.Col name="trips" header="Trips" />
    <Table.Col header="Last flight" format={obj => (obj.airline[0] || obj.airline).name} />
</Table>
    `}
    </code></pre>

    <Table data={data} onSelect={row => setCurrent(row)}>
      <Table.Col name="_id" header="#" />
      <Table.Col name="name" header="Name" />
      <Table.Col name="trips" header="Trips" />
      <Table.Col header="Last flight" format={obj => (obj.airline[0] || obj.airline).name} />
    </Table>
    <p style={{ border: '1px solid #c8e1ff', backgroundColor: '#f1f8ff' }}>
      <span style={{fontWeight: 'bold'}}>Current selection:</span> {JSON.stringify(current)}
    </p>
  </>;
}

const Themes = () => {
  return <>
    <h2>Themes</h2>
    <p>Simples tables have 2 builtin themes: material (default) and flat. To change just set theme property.</p>
    <pre><code>{`
<Table data={data} theme={Table.FlatTheme}>
    <Table.Col name="_id" header="#" />
    <Table.Col name="name" header="Name" />
    <Table.Col name="trips" header="Trips" />
    <Table.Col header="Last flight" format={obj => (obj.airline[0] || obj.airline).name} />
</Table>
    `}
    </code></pre>
    <table>
      <tr>
        <td style={{maxWidth: '50%'}}><img style={{width: '100%'}} src={flat} alt="SimpleTable with flat theme" /></td>
        <td style={{maxWidth: '50%'}}><img style={{width: '100%'}} src={material} alt="SimpleTable with material theme" /></td>
      </tr>
    </table>
  </>
}

const App = () =>
  <main style={{ margin: '0 auto', maxWidth: 800 }}>
    <h1>react-simpletable examples</h1>
    <p>This is a list of simple examples of using react-simpletable.</p>
    <p>Projected hosted at <a href="https://github.com/hesenger/react-simpletable" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>

    <LocalTable />

    <RemoteTable />

    <Themes />

    <footer style={{ fontSize: '.8em', borderTop: '1px solid #ccc', marginTop: '10em' }}>
      <p>Examples avaiable in <a href="https://github.com/hesenger/react-simpletable/tree/main/example" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
    </footer>
  </main>;

export default App;
