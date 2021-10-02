import React from "react";
import { useEffect } from "react/cjs/react.development";
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