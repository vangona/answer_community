import React, { useEffect } from "react";
import { authService } from "../fBase";

const SignOut = () => {
    useEffect(() => {
        authService.signOut();
    }, [])
    return (
        "Signout"
    )
}

export default SignOut;