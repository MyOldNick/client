import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import defaultImg from "../../img/mopsik-shchenok-photo-e899.jpg";

const DialogList = (props) => {
  return (
    <div className='mt-3'>
      {props.dialogs.map((el) => (
        <Container
          key={el._id}
          style={props.active === el._id ? { height: "80px", backgroundColor: "#F5F5F5"} : { height: "80px"}}
          className=""
          onClick={() => props.selectActive(el._id, el.message)} //передаем те сообщения и диалог, которые нам нужно отобразить
        >
          <Row className='pt-3'>
            <Col xs={2}>
              <Image src={defaultImg} roundedCircle width="50px" />
            </Col>
            <Col className="text-center mt-2">
              {el.users.map((el) =>
                el.name === props.user ? undefined : (
                  <h5 key={el._id}>{el.name}</h5>
                )
              )}
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default DialogList;
