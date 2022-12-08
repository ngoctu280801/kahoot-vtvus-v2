/* eslint-disable react/function-component-definition */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TableStyles = styled.div`
  /* overflow-x: auto; */
  background-color: white;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 15%) 0px 1px 4px 0px;
  table {
    width: 100%;
  }
  thead {
    background-color: #f7f7f8;
  }
  th,
  td {
    vertical-align: middle;
  }
  th {
    padding: 20px 30px;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
  }
  td {
    padding: 15px 30px;
  }
  tbody {
  }
`;
const Table = ({ children }) => {
  return (
    <TableStyles>
      <table>{children}</table>
    </TableStyles>
  );
};
Table.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Table;
