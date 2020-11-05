import React from 'react'
import styles from './styles.module.css'

export default class Table extends React.Component {
  state = { selected: null, selectedIndex: -1, page: 1, size: 25 };

  componentDidMount() {
    this.loadRemoteData();
  }

  loadRemoteData(newPage) {
    if (!this.props.url)
      return;

    const page = newPage || this.state.page;
    const state = { ...this.state, page };
    this.setState(state);

    fetch(this.formatUrl(this.props.url, state))
      .then(resp => this.parseRemote(resp, state));
  }

  formatUrl(url, state) {
    const res = new URL(url);
    res.searchParams.set('page', state.page - 1);
    res.searchParams.set('size', state.size);

    return res;
  }

  parseRemote(resp, state) {
    resp.json()
      .then(t => this.setState({ data: t.data, total: t.totalPages, page: state.page }));
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
        {this.props.url && <tfoot>
          <tr>
            <th colSpan={this.props.children?.length || 1}>
              <button type="button" onClick={() => this.loadRemoteData(1)}>&lt;&lt;</button>
              <button type="button" onClick={() => this.loadRemoteData(Math.max(1, this.state.page - 1))}>&lt;</button>
              <input type="text" value={this.state.page}
                onChange={e => this.setState({ page: e.target.value })}
                onBlur={() => this.loadRemoteData()}
                onKeyDown={e => e.key === 'Enter' && this.loadRemoteData(e.target.value)}
              />
                /
              <input type="text" value={this.state.total || 0} readOnly />
              <button type="button" onClick={() => this.loadRemoteData(Math.min(this.state.total, this.state.page + 1))}>&gt;</button>
              <button type="button" onClick={() => this.loadRemoteData(this.state.total)}>&gt;&gt;</button>
            </th>
          </tr>
        </tfoot>}
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
