import React from 'react';
import Table from 'react-simpletable';
import local from './local.json';
import 'react-simpletable/dist/index.css';

const AppExample = () =>
  <main style={{ margin: '0 auto', maxWidth: 800 }}>
    <h2>Local data by property</h2>
    Table component renders an array from data property, sort on 
    header click and select on row click
    <pre>
      <code>
        {`
<Table data={local.data} onRowClick={(d, i) => alert(i + ': ' + JSON.stringify(d))}>
  <Table.Col name="_id" header="#" />
  <Table.Col name="name" />
</Table>

`}
      </code>
    </pre>
    <Table data={local.data} onRowClick={(d, i) => alert(i + ': ' + JSON.stringify(d))}>
      <Table.Col name="_id" header="#" />
      <Table.Col name="name" />
    </Table>

    <footer style={{ fontSize: '.8em', borderTop: '1px solid #ccc', marginTop: '10em' }}>
      <p>Source code at <a href="https://github.com/hesenger/react-simpletable/tree/main/example" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
    </footer>
  </main>;

export default AppExample;
