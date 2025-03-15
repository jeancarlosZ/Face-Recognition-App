import { useState } from "react";

const Register = ({ loadUser, onRouteChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("Name is required");
  const [emailError, setEmailError] = useState("Email is required");
  const [passwordError, setPasswordError] = useState("Password is required");

  const onNameChange = (event) => {
    const nameValue = event.target.value;
    setName(nameValue);

    if (nameValue.trim() === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  }

  // Regular expression for basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if (emailValue.trim() === "") {
      setEmailError("Email is required");
    } else if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }

  // Minimum length and regular expression for password
  const minLength = 8;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;

  const onPasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);

    if (passwordValue.trim() === "") {
      setPasswordError("Password is required");
    } else if (passwordValue.length < minLength) {
      setPasswordError(`Password must be at least ${minLength} characters`);
    } else if (!passwordRegex.test(passwordValue)) {
      setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    } else {
      setPasswordError("");
    }
  }

  const onSubmitSignIn = () => {
    if (!nameError && !emailError && !passwordError) {
      fetch("http://localhost:3000/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            loadUser(user);
            onRouteChange("home");
          } else {
            alert("Email already has an account with us.");
            setName("");
            setEmail("");
            setPassword("");
            setNameError("Name is required");
            setEmailError("Email is required");
            setPasswordError("Password is required");
          }
        })
    }
  }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input
                className="f6 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                value={name}
                placeholder="Please enter name"
                onChange={onNameChange}
              />
            </div>
            {nameError && <p style={{ color: "red" }}>{nameError}</p>}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="f6 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                value={email}
                placeholder="Please enter email"
                onChange={onEmailChange}
              />
            </div>
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="f6 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                value={password}
                placeholder="Please enter password"
                onChange={onPasswordChange}
              />
            </div>
            {passwordError && (
              <ul>
                <li style={{ color: password.length >= minLength ? "green" : "red" }}>
                  Minimum {minLength} characters
                </li>
                <li style={{ color: /[a-z]/.test(password) ? "green" : "red" }}>
                  Contains at least one lowercase letter
                </li>
                <li style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>
                  Contains at least one uppercase letter
                </li>
                <li style={{ color: /\d/.test(password) ? "green" : "red" }}>
                  Contains at least one number
                </li>
                <li style={{ color: /[!@#$%^&*]/.test(password) ? "green" : "red" }}>
                  Contains at least one special character from !@#$%^&*
                </li>
              </ul>
            )}
          </fieldset>
          <div>
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  )
}

export default Register;