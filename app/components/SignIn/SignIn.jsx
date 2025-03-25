import { useState } from "react";

const SignIn = ({ loadUser, onRouteChange, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitSignIn = () => {
    if (!email || email.trim() === "" || !password || password.trim() === "") {
      alert("Email and password are required");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        const { encryptedToken, user } = data;
        setToken(encryptedToken);

        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        } else {
          alert("Invalid credentials");
          setEmail("");
          setPassword("");
        }
      })
  }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email">email</label>
              <input
                className="f6 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                id="email"
                value={email}
                placeholder="Please enter email"
                autoComplete="email"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">password</label>
              <input
                className="f6 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                id="password"
                value={password}
                placeholder="Please enter password"
                onChange={onPasswordChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onSubmitSignIn();
                  }
                }}
              />
            </div>
          </fieldset>
          <div>
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
          </div>
        </div>
      </main>
    </article>
  )
}

export default SignIn;