import React from 'react';
import Table from 'react-simpletable';
import local from './local.json';
import 'react-simpletable/dist/index.css';

const AppExample = () =>
  <main style={{ margin: '0 auto', maxWidth: 800 }}>
    <h2>Empty table</h2>
    <Table>
      <Table.Col name="_id" header="#" />
      <Table.Col name="name" />
    </Table>

    <h2>Local data by property</h2>
    <Table data={local.data}>
      <Table.Col name="_id" header="#" />
      <Table.Col name="name" />
    </Table>

    <h1>react-simpletable examples</h1>
    <p>This is a list of simple examples of using react-simpletable.</p>
    <p>Projected hosted at <a href="https://github.com/hesenger/react-simpletable" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>

    <footer style={{ fontSize: '.8em', borderTop: '1px solid #ccc', marginTop: '10em' }}>
      <p>Source code at <a href="https://github.com/hesenger/react-simpletable/tree/main/example" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
    </footer>
  </main>;

export default AppExample;
