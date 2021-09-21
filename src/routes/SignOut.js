import React from "react";
import { useEffect } from "react/cjs/react.development";
import { authService } from "../fBase";

const SignOut = () => {
    useEffect(() => {
        authService.signOut();
    }, [])
    return (
        <div>로그아웃</div>
    )
}

export default SignOut;