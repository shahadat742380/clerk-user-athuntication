"use client"

import { SignOutButton } from "@clerk/nextjs";

const SignOutBtn = () => {
    return (
        <div className="py-2 px-5 bg-blue-400 rounded-md text-white ">
            <SignOutButton />
        </div>
    );
};

export default SignOutBtn;