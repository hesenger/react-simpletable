import React from 'react';
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

export default App;
