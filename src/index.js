import React from 'react'
import styles from './styles.module.css'

export default class Table extends React.Component {
  state = { selected: null, selectedIndex: -1 }

  render() {
    const data = this.props.data || [];
    if (!Array.isArray(data))
      throw 'Property DATA is not an array';


    const select = (obj, index) => {
      this.setState({ selected: obj, selectedIndex: index });
      if (this.props.onSelect)
        this.props.onSelect(obj, index);
    };

    const header = (c, i) => {
      if (this.props.onHeaderClick)
        this.props.onHeaderClick(c.props.name, i);
    };

    return <section className={'simpletable ' + styles.simpletable}>
      <table>
        <thead>
          <tr>
            {React.Children.map(this.props.children, (c, i) =>
              <th onClick={() => header(c, i)}>
                {c.props.header || ' '}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) =>
            <tr key={index} onClick={() => select(obj, index)} className={this.state.selectedIndex === index ? styles.active : null}>
              {React.Children.map(this.props.children, c => React.cloneElement(c, { obj, index }))}
            </tr>
          )}
        </tbody>
      </table>
    </section>;
  }
}

Table.Col = props => {
  const val = props.format 
    ? props.format(props.obj, props.index)
    : (props.obj || {})[props.name] || '';
    
  return <td>{val}</td>;
}
