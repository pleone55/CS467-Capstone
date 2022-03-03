import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
import AlertModal from "../Alerts/AlertModal";
import { useAuth } from "../../context/auth/AuthState";

import { useQuizzes, getQuiz, updateQuiz } from "../../context/quiz/QuizState";

function QuizSend() {
	const [quizState, quizDispatch] = useQuizzes();
	const { quiz, error } = quizState;
	const { quiz_id } = useParams();

	useEffect(() => {
		getQuiz(quizDispatch, quiz_id);
	}, [quizDispatch, quiz_id]);

	// alert modal
	const [displayModal, setDisplayModal] = useState(false);
	const [modalMessage, setModalMessage] = useState();

	const showModal = () => {
		if (eAddress.emailText.length > 0) {
			setModalMessage(
				"Are you sure you want to cancel? You will lose all data you have entered."
			);
			setDisplayModal(true);
		} else {
			navigate("/quizlist");
		}
	};

	const hideModal = () => {
		setDisplayModal(false);
	};

	const onConfirm = () => {
		hideModal();
		navigate("/quizlist");
	};

	const [authState] = useAuth();
	const { user } = authState;

	//collect all email addresses as a single string
	const [eAddress, setEmail] = useState({
		emailText: "",
	});

	const navigate = useNavigate();

	function getEmail(event) {
		const { name, value } = event.target;
		setEmail({
			[name]: value,
		});
	}

	function onSubmit(event) {
		event.preventDefault();
		let emailList = eAddress.emailText.split(",").map((email) => email.trim());
		let totalSent = emailList.length;
		var decTotalSent = function () {
			totalSent--;
		};
		let emailSubject = "You are invited to take a quiz"; //set subject and context
		let emailContext = "Test email"; //we can modify the text later

		if (emailList[0] === "") {
			alert("Please enter at least one email address");
		} else {
			// This is to send email to employer
			emailList[emailList.length] = user.email;
            console.log(emailList);
			for (let i = 0; i < emailList.length; i++) {
				//axios to send data to backend to send out emails
				if (validator.isEmail(emailList[i])) {
					//if the email is true, send out email
					axios({
						method: "POST",
						url: `http://localhost:7000/send/${quiz_id}`, //we might need to change url for actual url for backend
						data: {
							name: emailSubject, //set data
							email: emailList[i],
							messageHtml: emailContext,
						},
					}).then((response) => {
						// sending result
						if (response.data.msg === "success") {
							//alert("Email sent, awesome!");            //since looping, it is annoying
						} else if (response.data.msg === "fail") {
							decTotalSent();
							alert(`Oops, something went wrong with ${emailList[i]}.`);
						}
					});
				} else {
					decTotalSent();
					alert(
						`${emailList[i]} is not a valid email. Quiz will not be sent to this address.`
					);
				}
			}

			// this needs to wait for total Sent to increase and finsih ideally but it takes too long,
			// so right now it's decrementing assuming less errors happen, but in case there are hundreds,
			// this needs to be handled in another way.
			setTimeout(function () {
				if (quiz) {
					let emailCount;
					if (quiz.totalEmailsSent) {
						let newTotalEmails = quiz.totalEmailsSent + totalSent;
						emailCount = { totalEmailsSent: newTotalEmails };
					} else {
						emailCount = { totalEmailsSent: totalSent };
					}
					updateQuiz(quizDispatch, quiz_id, emailCount);
					if (error) {
						// add toast
						console.log(error);
					} else {
						console.log("db updated");
						alert(
							"Emails have been sent successfully. You will be redirected to dashboard."
						);
						navigate("/");
					}
				}
				// need error toast
			}, 2000);
		}
	}

	return (
		<div>
			<Container
				style={{ marginTop: 70, marginBottom: 15, textAlign: "center" }}
			>
				<span className="mb-0 h3">Send quiz</span> <br />
				<br />
				<p>
					Provide an email address you want to send the quiz to. {<br />} In
					case you need to send to multiple email addresses, please separate with
					',' symbol.{" "}
				</p>
				<div style={{ width: "50%", margin: "auto" }}>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Control
								as="textarea"
								rows={6}
								name="emailText"
								value={eAddress.emailText}
								onChange={getEmail}
							/>
						</Form.Group>
						<Button variant="danger" className="mx-3" onClick={showModal}>
							Cancel
						</Button>{" "}
						<Button variant="warning" onClick={onSubmit}>
							Send
						</Button>
					</Form>
				</div>
			</Container>
			<AlertModal
				showModal={displayModal}
				confirmModal={onConfirm}
				hideModal={hideModal}
				message={modalMessage}
			/>
		</div>
	);
}
export default QuizSend;
