import "./editProfile.css";

function EditProfile() {
    //const [account, setAccount] = useState(null);
    const [account, setAccount] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        role: "PERSONAL", // or whatever the default role should be
    });
    const navigate = useNavigate();

    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };

    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };
    
    const save = async () => {
        await client.updateUser(account);
        navigate(`/Profile`);
    };
    
    return (
        <div>
            <div className="profile-content mt-4">
                <h4>Profile</h4>
                <div className="profile-edit-form">
                    <div className="mt-3">
                        {account && (
                            <div className="form-container">
                                <div className="form-floating mb-3">
                                    <input id="username" 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Username"
                                        value={account.username}
                                        onChange={(e) => setAccount({...account, username: e.target.value})}/>
                                    <label for="username">Username</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input id="password" 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Password"
                                        value={account.password}
                                        onChange={(e) => setAccount({...account, password: e.target.value})}/>
                                    <label for="password">Password</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input id="firstName" 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="First Name"
                                        value={account.firstName}
                                        onChange={(e) => setAccount({...account, firstName: e.target.value})}/>
                                    <label for="firstName">First Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input id="lastName" 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Last Name"
                                        value={account.lastName}
                                        onChange={(e) => setAccount({...account, lastName: e.target.value})}/>
                                    <label for="lastName">Last Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input id="email" 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Email"
                                        value={account.email}
                                        onChange={(e) => setAccount({ ...account, email: e.target.value })}/>
                                    <label for="email">Email</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input id="dob" 
                                        type="date" 
                                        className="form-control" 
                                        placeholder="Birthday"
                                        value={account.dob}
                                        onChange={(e) => setAccount({ ...account, dob: e.target.value })}/>
                                    <label for="dob">Birthday</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <select className="form-select" 
                                        id="accountUser" 
                                        placeholder="Select Account Usage"
                                        onChange={(e) => setAccount({ ...account, role: e.target.value })}>
                                        <option value="PERSONAL">Personal</option>
                                        <option value="TRAINER">Trainer</option>
                                    </select>
                                    <label for="accountUser">Select Account Usage:</label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;