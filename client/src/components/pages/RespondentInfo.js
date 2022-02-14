import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useRespondent, respondentInfo, clearErrors } from '../../context/respondent/RespondentState';

const RespondentInfo = props => {
    const [respondentState, respondentDispatch] = useRespondent();
    const { error, respondent } = respondentState;
    const { userId, quizId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(error) {
            console.log(error);
        }
    }, [error, respondentDispatch]);

    const [responInfo, setResponInfo] = useState({
        firstName: '',
        lastName: '',
        school: '',
        dateOfBirth: '',
        email: ''
    });

    const { firstName, lastName, school, dateOfBirth } = responInfo;

    const onChange = e => setResponInfo({ ...responInfo, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        respondentInfo(respondentDispatch, {
            firstName,
            lastName,
            school,
            dateOfBirth,
        }, userId, quizId);

        setTimeout(() => navigate(`/user/${userId}/quiz/${quizId}`), 3000);
    }

    return (
        <Fragment>
            <Container>
                <Row className='mt-5'>
                    <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
                        <h1 className='shadow-sm p-3 text-center rounded' style={{ color: 'black' }}>Register Quiz</h1>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor='firstName'>First Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='firstName' 
                                    placeholder='First Name' 
                                    value={firstName} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='lastName' 
                                    placeholder='Last Name' 
                                    value={lastName} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='School'>School</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='school' 
                                    placeholder='School' 
                                    value={school} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='dateOfBirth'>Date Of Birth</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='dateOfBirth' 
                                    placeholder='Date of Birth' 
                                    value={dateOfBirth} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Button variant='warning btn-block' type='submit' style={{ 'marginTop': '2rem'}}>Sign Up</Button>
                            <div style={{ 'marginTop': '0.5rem'}}>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default RespondentInfo