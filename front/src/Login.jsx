
function Login() {
    
    return(
        <>
            <form className="border">
                <h3>Login</h3>
                <div>
                    <label>Email</label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;