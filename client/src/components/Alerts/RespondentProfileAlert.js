import React from 'react';
import { Link } from 'react-router-dom';

import { Toast, Row, Col } from 'react-bootstrap';

const RespondentProfileAlert = ({ error, alert, setShowAlert, hashKey, quizId }) => {
    const toggleSetAlert = () => {
        setShowAlert(!alert);
    }

    return (
        <Row>
            <Col md={6} className="mb-2" style={{ 'left': '60%', 'position': 'fixed', 'transform': 'translate(-50%, 0px)', 'zIndex': '9999'}}>
                <Toast show={alert} onClose={toggleSetAlert} bg={error ? 'danger' : 'success'}>
                    <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{error ? 'Error' : 'Success'}</strong>
                    </Toast.Header>
                    {error ? (
                        <Toast.Body>{error}</Toast.Body>
                    ) : (
                        <Toast.Body>
                            Thank you for providing your information. Please click the link below to begin your quiz <br/>
                            <Link style={{ color: 'black', fontSize: 18 }} to={`/takeQuiz/${hashKey}/quiz/${quizId}`}>Begin</Link>
                        </Toast.Body>
                    )}
                </Toast>
            </Col>
        </Row>
    );
};

export default RespondentProfileAlert;
