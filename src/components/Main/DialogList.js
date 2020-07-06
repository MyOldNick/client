import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import defaultImg from "../../img/mopsik-shchenok-photo-e899.jpg";

const DialogList = (props) => {
  return (
    <div>
      {props.dialogs.map((el) => (
        <Container
          key={el._id}
          style={{ height: "80px" }}
          className="shadow-sm mt-4"
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
