import React from 'react'
import material from './css/material.css'
import flat from './css/flat.css'

function TableHeaderOrderIcon(props) {
  const table = React.useContext(Table.Context);
  const order = table.state.order || '';
  const theme = table.props.theme;

  const arr = [props.name, props.name + ' desc'];

  switch(arr.indexOf(order)) {
    case 0: return <span className={theme.order}></span>
    case 1: return <span className={theme.order + ' ' + theme.desc}></span>
  }
  
  return null
}

function TableHeaderColumn(props) {
  const table = React.useContext(Table.Context);
  return <th onClick={() => table.onHeaderClick({ name: props.name })}>
    {props.header || ' '} 
    <TableHeaderOrderIcon name={props.name} />
  </th>
}

function TableHeader() {
  const table = React.useContext(Table.Context);
  return <thead>
    <tr>
      {React.Children.map(table.props.children, c => <TableHeaderColumn {...c.props} />)}
    </tr>
  </thead>
}

function TableBodyColumn(props) {
  return <td>
    {(props.rowData || {})[props.name] || ''}
  </td>
}

function TableBodyRow(props) {
  const table = React.useContext(Table.Context);
  return <tr className={props.selected && table.props.theme.active || ""} onClick={() => table.onRowClick({ rowData: props.rowData, index: props.index })}>
    {React.Children.map(table.props.children, c => React.cloneElement(c, { ...c.props, rowData: props.rowData }))}
  </tr>
}

function TableBody() {
  const table = React.useContext(Table.Context);

  return <tbody>
    {table.state.data.map((rd, i) =>
      <TableBodyRow key={i} rowData={rd} index={i} selected={i === table.state.selectedIndex} />
    )}
  </tbody>
}

function TableFooter() {
  const table = React.useContext(Table.Context);
  return <tfoot>
    <tr>
      <td colSpan={table.props.children.count}></td>
    </tr>
  </tfoot>
}

export default class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      order: ''
    }
  }

  onHeaderClick({ name }) {
    this.setState(state => {
      const data = state.data.sort((a, b) => a[name] > b[name] ? 1 : -1)

      return { order: state.order === name ? name + ' desc' : name, data }
    })
  }
  
  getOrderClassName(name) {
    return this.state.order.indexOf('')
  }

  onRowClick({ rowData, index }) {
    this.setState({ selectedIndex: index, selected: rowData });
    this.props.onRowClick(rowData, index);
  }

  render() {
    return <div className={this.props.theme.simpletable}>
      <Table.Context.Provider value={this}>
        <table>
          <TableHeader />

          <TableBody />

          <TableFooter />
        </table>
      </Table.Context.Provider>
    </div>
  }
}

Table.defaultProps = {
  theme: material,
  data: [],
  onRowClick: function() {}
}

Table.Context = React.createContext();

Table.Col = TableBodyColumn
Table.FlatTheme = flat;
Table.MaterialTheme = material;
