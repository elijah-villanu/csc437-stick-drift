import { HeaderNav } from "../Header";
import '../styles.css'
import '../tokens.css'


export function LoginPage(){
    return (
        <div className="login-page">
            <HeaderNav/>
            <h1>LOGIN</h1>
            <form className="login-page-form">
                <label >Username</label>
                <input  required={true} name="username" />

                <label >Password</label>
                <input type="password" required={true} name="password"  />

                <input type="submit" value="Submit" />
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