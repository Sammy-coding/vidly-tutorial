import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (column, item) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { data, column } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {column.map((column) => (
              <td key={item._id + (column.path || column.key)}>
                {this.renderCell(column, item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
