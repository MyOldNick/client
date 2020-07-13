import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import defaultImg from "../../img/mopsik-shchenok-photo-e899.jpg";

const UsersList = (props) => {
  return (
    <div className="mt-3" style={{ height: "450px", overflow: "auto" }}>
      {props.users.map((el) =>
        el._id === props.user.id ? undefined : (
          <Container
            key={el._id}
            style={{ height: "80px" }}
            onClick={() => props.createDialog(el)}
          >
            <Row className="pt-3">
              <Col xs={2}>
                <Image src={`http://ourtelega.northeurope.cloudapp.azure.com:5000/${el.avatar}`} roundedCircle width="50px" height='50px' />
              </Col>
              <Col className="text-center mt-2">{<h5>{el.login}</h5>}</Col>
            </Row>
          </Container>
        )
      )}
    </div>
  );
};

export default UsersList;
