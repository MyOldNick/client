import React from 'react'

import { Spinner, Container } from "react-bootstrap";

export default function Load() {
    return (
        <Container className='w-100 d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
            <Spinner className='mt-5' animation="border" variant="primary" style={{width: '100px', height: '100px'}} />
        </Container>
    )
}
