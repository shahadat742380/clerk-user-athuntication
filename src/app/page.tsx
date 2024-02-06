import SignInBtn from "./components/SignInBtn";
import { UserButton, UserProfile, currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";

export default async function Home() {
  const user: User | null = await currentUser();
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="">
        <h1 className="text-3xl font-semibold text-center py-10 text-blue-500">
          Clerk Authentication
        </h1>
        <div className="flex items-center">
          {!!user ? (
            <>
              <UserProfile />
              <UserButton />
            </>
          ) : (
            <SignInBtn />
            )}
        </div>
      </div>
    </main>
  );
}
