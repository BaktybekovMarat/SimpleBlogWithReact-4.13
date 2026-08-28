import { useState } from "react"

export default function SignIn(){

    const [value, setValue] = useState({
        email: '',
        password: ''
    })
    return <>
    <form className="email-pass-form" onSubmit="">
        <h1>Sign In</h1>
        <input type="email" name="email" value={value.email} placeholder="Username" required autoFocus/>
         <input type="password" name="password" value={value.password} placeholder="Password" required 
        />
         <button >Sing in</button>
    </form>
    </>
}