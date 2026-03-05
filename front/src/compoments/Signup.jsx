
function Signup() {
    
    return(
        <>
            <form className="border">
                <h3>Sign up</h3>

                <div>
                    <label>Name</label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    />
                </div>

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

                <button type="submit">Create account</button>
            </form>
        </>
    )
}

export default Signup;