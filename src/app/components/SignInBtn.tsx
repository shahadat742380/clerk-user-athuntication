"use client";
import { SignInButton } from "@clerk/nextjs";

const SignInBtn = () => {
  return (
    <div >
      <button className="py-2 px-5 bg-blue-400 rounded-md text-white ">
        <SignInButton />
      </button>
    </div>
  );
};

export default SignInBtn;
