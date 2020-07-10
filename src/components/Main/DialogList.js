import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import defaultImg from "../../img/mopsik-shchenok-photo-e899.jpg";

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
          onClick={() => props.selectActive(el._id, el.message)} //передаем те сообщения и диалог, которые нам нужно отобразить
        >
          <Row className="pt-1">
            <Col xs={2} className="pt-3 ">
              <Image src={defaultImg} roundedCircle width="50px" />
            </Col>
            <Col className="ml-3 pt-1">
              {el.users.map((el) =>
                el.name === props.user ? undefined : (
                  <h5 key={el._id} className="mt-2">
                    {el.name}
                  </h5>
                )
              )}
              {el.message.length > 0 ? (
                <p style={{ color: "gray" }}>
                  {el.message[el.message.length - 1].author === props.user
                    ? "Вы"
                    : el.message[el.message.length - 1].author}
                  : {el.message[el.message.length - 1].text.substring(0, 20)}
                </p>
              ) : <p style={{ color: "gray" }}>*сообщений нет*</p>}
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default DialogList;
