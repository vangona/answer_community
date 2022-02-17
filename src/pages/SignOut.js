import { useEffect } from "react";
import { authService } from "utils/fBase";

const SignOut = () => {
    useEffect(() => {
        authService.signOut();
    }, [])
    return (
        "Signout"
    )
}

export default SignOut;