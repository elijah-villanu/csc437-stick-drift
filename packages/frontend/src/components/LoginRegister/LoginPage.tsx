import { HeaderNav } from "../Header";
import { Link } from "react-router";
import '../styles.css'
import '../tokens.css'
import React from "react";



export function LoginPage(props: { isRegistering: boolean }) {
    const usernameInputId = React.useId();
    const passwordInputId = React.useId();

    return (
        <div className="login-page">
            <HeaderNav />
            <form className="login-page-form">
                {props.isRegistering ? <h1>Register Here</h1> : <h1>Login</h1>}
                <label htmlFor={usernameInputId}>Username</label>
                <input id={usernameInputId} required={true} name="username" />

                <label htmlFor={passwordInputId}>Password</label>
                <input id={passwordInputId}type="password" required={true} name="password" />

                <input type="submit" value="Submit" style={{ color: "black" }} />
                {!props.isRegistering && <Link to={"/register"}>Don't have an account? Register Here!</Link>}
            </form>
        </div>
    )
}

{/* <form className="LoginPage-form">
                <label htmlFor={usernameInputId}>Username</label>
                <input id={usernameInputId} required={true} name="username" disabled={isPending} />

                <label htmlFor={passwordInputId}>Password</label>
                <input id={passwordInputId} type="password" required={true} name="password" disabled={isPending} />

                <input type="submit" value="Submit" disabled={isPending} />
            </form> */}