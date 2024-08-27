import React from "react";

const Regresar = ({ link }) => {
  return (
    <a href={link}>
      <i className="fa fa-arrow-left regresar-btn-login" aria-hidden="true">
        Regresar
      </i>
    </a>
  );
};

export default Regresar;
