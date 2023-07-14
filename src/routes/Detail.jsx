import React from "react";
import { connect } from "react-redux";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { actionCreators } from "../store";

const Detail = ({ state, onBtnClick }) => {
  const nav = useNavigate();
  const { id } = useParams();
  const toDo = state.find((toDo) => toDo.id === +id);
  if (typeof toDo === "undefined") nav(-1);
  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>CreateAt: {toDo?.id}</h5>
      <button onClick={() => onBtnClick(id)}>DEL</button>
    </>
  );
};

function mapStateProps(state) {
  return { state };
}

const mapDispatchProps = (dispatch) => {
  return {
    onBtnClick: (id) => {
      dispatch(actionCreators.deleteToDo(id));
    },
  };
};

export default connect(mapStateProps, mapDispatchProps)(Detail);
