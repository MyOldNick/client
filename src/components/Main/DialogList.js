import React from "react";
import { Container } from "react-bootstrap";

import Dialog from "./Dialog";

const DialogList = (props) => {
  return (
    <div className="mt-3" style={{ height: "450px", overflow: "auto" }}>
      {props.dialogs.map((el) => (
        <Container
          key={el._id}
          style={
            props.active === el._id
              ? {
                  height: "85px",
                  backgroundColor: "#f8f9fa",
                  transition: "0.3s",
                }
              : { height: "85px", transition: "0.3s" }
          }
          onClick={() => props.selectActive(el._id, el.message, el.users)} //передаем те сообщения и диалог, которые нам нужно отобразить
        >
          <Dialog el={el} user={props.user} />
        </Container>
      ))}
    </div>
  );
};

export default DialogList;
