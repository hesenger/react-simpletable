import React from 'react'
import styles from './styles.module.css'

export default class Table extends React.Component {
  state = { selected: null, selectedIndex: -1, page: 1, size: 25 };

  componentDidMount() {
    this.loadRemoteData();
  }

  loadRemoteData() {
    if (!this.props.url)
      return;
    
    fetch(this.formatUrl(this.props.url, this.state))
      .then(resp => this.parseRemote(resp));
  }

  formatUrl(url, state) {
    const res = new URL(url);
    res.searchParams.set('page', state.page);
    res.searchParams.set('size', state.size);

    return res;
  }

  parseRemote(resp) {
    resp.json()
      .then(t => this.setState({data: t.data}));
  }

  getData() {
    return this.props.data
      ? this.props.data
      : this.state.data
  }

  render() {
    const data = this.getData() || [];
    if (!Array.isArray(data))
      throw 'Property DATA is not an array';

    const onSelect = (obj, i) => {
      this.setState({ selected: obj, selectedIndex: i });
      if (this.props.onSelect)
        this.props.onSelect(obj, i);
    };

    const onHeaderClick = (c, i) => {
      if (this.props.onHeaderClick)
        this.props.onHeaderClick(c.props.name, i);
    };

    return <section className={'simpletable ' + styles.simpletable}>
      <table>
        <thead>
          <tr>
            {React.Children.map(this.props.children, (c, i) =>
              <th onClick={() => onHeaderClick(c, i)}>
                {c.props.header || ' '}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) =>
            <tr key={index} onClick={() => onSelect(obj, index)} className={this.state.selectedIndex === index ? styles.active : null}>
              {React.Children.map(this.props.children, c => React.cloneElement(c, { obj, index }))}
            </tr>
          )}
        </tbody>
      </table>
    </section>;
  }
}

Table.Col = props => {
  const getFromFormat = obj => {
    try {
      return props.format(props.obj, props.index);
    } catch (ex) {
      console.warn('Error format column ' + props.name);
      console.warn(ex);
      return '';
    }
  }

  const val = props.format
    ? getFromFormat()
    : (props.obj || {})[props.name] || '';

  return <td>{val}</td>;
}
