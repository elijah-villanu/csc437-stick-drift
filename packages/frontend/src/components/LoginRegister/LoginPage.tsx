import { HeaderNav } from "../Header";
import { Link,useNavigate } from "react-router";
import '../styles.css'
import '../tokens.css'
import React from "react";
import { useActionState,useEffect } from "react";

interface ILoginPageProps{
    isRegistering:boolean;
    addToken:(tok:string) => void
}

export function LoginPage(props: ILoginPageProps) {
    const usernameInputId = React.useId();
    const passwordInputId = React.useId();

    const navigate = useNavigate();

    function errorMessage(status: number) {
        if (status === 201) {
            return "Successfully created account"
        } else if (status === 400) {
            return "Missing username or password"
        } else if (status === 409) {
            return "Username already taken"
        } else if (status === 401) {
            return "Incorrect Username or password"
        } else if (status === 200) {
            return "Successful Login"
        }
        return "";
    }


    // isPending is true until the inner function is resolved
    // result comes from the inner function's return, use for status codes
    const [result, submitAction, isPending] = useActionState(
        async (previousState: { status: number, token: string | null }, formData: FormData) => {

            // Need to cast as string
            const username = formData.get("username") as string;
            const pass = formData.get("password") as string;

            console.log(previousState)

            // Will get both registration and login
            const response = await fetch(`auth/${props.isRegistering ? "register" : "login"}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password: pass }),
            });

            let token: string | null = null;
            if (response.status < 400) {
                token = await response.text();
            }
            return { status: response.status, token };
        },
        { status: -1, token: null }
    );


    useEffect(() => {
        if(result.token){
            // Token setter in App.tsx, backend sends token on success
            props.addToken(result.token)
            navigate("/forums")
        }
    },[result.token,props,navigate])



    return (
        <div className="login-page">
            <HeaderNav />
            <form className="login-page-form" action={submitAction}>
                {props.isRegistering ? <h1>Register</h1> : <h1>Login</h1>}
                <label htmlFor={usernameInputId}>Username</label>
                <input id={usernameInputId} required={true} name="username" disabled={isPending} />

                <label htmlFor={passwordInputId}>Password</label>
                <input id={passwordInputId} type="password" required={true} name="password" disabled={isPending} />

                <input type="submit" value="Submit" style={{ color: "black" }} />
                {!props.isRegistering && <Link to={"/register"}>Don't have an account? Register Here!</Link>}
                {result.status >= 400 && <h2 style={{ color: "red" }} aria-live="polite">{errorMessage(result.status)}</h2>}
            </form>
        </div>
    )
}
