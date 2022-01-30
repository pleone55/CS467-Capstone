import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/auth/Register";
import PrivateRoute from "./components/routes/PrivateRoute";
import ContactUs from "./components/pages/ContactUs";
import Login from "./components/auth/Login";
import ManageAccount from "./components/pages/ManageAccount";
import EditProfile from "./components/pages/EditProfile";
import QuizList from "./components/pages/QuizList";
import QuizDashboard from "./components/pages/QuizDashboard";
import Dashboard from "./components/layouts/Dashboard";
import Navigation from "./components/layouts/Navigation";
import GreetContext from "./context/NavText/GreetContext";

import AuthState from "./context/auth/AuthState";
import QuizState from "./context/quiz/QuizState";

function App() {
	const [greeting, setGreeting] = useState("Welcome");
	const value = { greeting, setGreeting };
	return (
		<AuthState>
			<QuizState>
				<GreetContext.Provider value={value}>
					<BrowserRouter>
						<Fragment>
							<div className="container">
								<Routes>
									<Route path="/register" element={<Register />} />
									<Route path="/login" element={<Login />} />
									<Route
										path="/"
										element={<PrivateRoute component={Navigation} />}
									/>
									<Route
										index
										element={<PrivateRoute component={Dashboard} />}
									/>
									<Route
										path="/account"
										element={<PrivateRoute component={ManageAccount} />}
									/>
									<Route
										path="/editprofile"
										element={<PrivateRoute component={EditProfile} />}
									/>
									<Route
										path="/quizlist"
										element={<PrivateRoute component={QuizList} />}
									/>
									<Route
										path="contact"
										element={<PrivateRoute component={ContactUs} />}
									/>
									<Route
										path="temp"
										element={<PrivateRoute component={QuizDashboard} />}
									/>
								</Routes>
							</div>
						</Fragment>
					</BrowserRouter>
				</GreetContext.Provider>
			</QuizState>
		</AuthState>
	);
}

export default App;
