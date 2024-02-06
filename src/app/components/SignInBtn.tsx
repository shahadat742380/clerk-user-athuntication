"use client";
import { SignInButton } from "@clerk/nextjs";

const SignInBtn = () => {
  return (
    <div >
      <button className="py-2 px-5 bg-blue-300 ">
        <SignInButton />
      </button>
    </div>
  );
};

export default SignInBtn;
