import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import defaultImg from "../../img/mopsik-shchenok-photo-e899.jpg";

const UsersList = (props) => {
  console.log(props)
  return (
    <div style={{ height: "400px", overflow: "auto" }}>
      {props.users.map((el) => (
        <Container
          key={el._id}
          style={{ height: "80px" }}
          className="shadow-sm mt-4" //передаем те сообщения и диалог, которые нам нужно отобразить
          onClick={() => props.createDialog(el)}
        >
          <Row className="pt-3">
            <Col xs={2}>
              <Image src={defaultImg} roundedCircle width="50px" />
            </Col>
            <Col className="text-center mt-2">{<h5>{el.login}</h5>}</Col>
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default UsersList;
