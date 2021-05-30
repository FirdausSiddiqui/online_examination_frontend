import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const card = (props) => {
  const style = {
    width: '30rem',
    height: '15rem',
    padding: '3rem',
    borderStyle: 'hidden',
    marginTop: '6rem'
  };
  return (
    <div className="card d-inline-block" style={style}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.content}</p>
        <Link to={props.link} class="btn btn-primary">
          {props.type}
        </Link>
      </div>
    </div>
  );
};

export default card;
