import NavBar from "../../NavBar/navbar";

function PublicProfile() {
    const [profile, setProfile] = useState(null);
    const { profileId } = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await client.findUserById(profileId);
                if (profileData.dob) {
                    const dobDate = new Date(profileData.dob);
                    profileData.dob = dobDate.toLocaleDateString('en-US');
                }
                setProfile(profileData);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfile();
    }, [profileId]);

    return (
        <div>
            <NavBar/>
            <h1>Public Profile Information</h1>
        </div>
    );
}

export default PublicInfo;