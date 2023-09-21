import Image from "next/image";
import { Inter } from "next/font/google";
import { MessageCard } from "@/components/messagecard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { Login } from "@/components/login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const ldclient = useLDClient();

  const [showMessage, setShowMessage] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const { messaging } = useFlags();

  function handleLogout() {
    updateLDContext({ key: 0, name: "anonymous", priceLevel: "FreeTier" });
    setIsSignedIn(false);
  }

  function updateLDContext(updates: any) {
    const context = ldclient?.getContext();
    Object.assign(context.user, updates);
    ldclient?.identify(context);
  }

  return (
    <main
      className={`relative flex h-screen flex-col items-center ${inter.className}`}
    >
      <div className="h-16 bg-slate-900 w-full flex items-center justify-between">
        <div className="p-4">
          <Image
            src="/logo.png"
            width="40"
            height="40"
            alt="treesight logo"
            className=""
          />
        </div>
        <div className="p-4">
          {isSignedIn ? (
            <Button
              onClick={() => {
                handleLogout();
              }}
              className="bg-green-700 text-white font-bold text-xl"
              type="submit"
            >
              Sign Out
            </Button>
          ) : (
            <Login setIsSignedIn={setIsSignedIn} />
          )}
        </div>
      </div>
      <div>
        <div className="mx-auto items-center flex">
          <Image
            src="/treesight.png"
            width="400"
            height="400"
            alt="treesight logo"
            className="mx-auto pb-8"
          />
        </div>
        <p className="text-6xl text-center text-slate-200 font-light pb-10 w-3/4 mx-auto">
          Education for <span className=" font-bold">Engineering Teams</span>{" "}
          and <span className="font-bold">Technology</span> Leaders
        </p>
        <p className="text-center text-xl w-2/3 mx-auto">
          Treesight provides an enterprise learning platform to serve all your
          education needs. A single platform to grow, educate, and iterate.
        </p>
      </div>

      <div className="flex gap-4 w-2/3 pt-8">
        <Card className="w-1/4 h-auto flex flex-col justify-between p-4">
          <CardHeader className="items-center pb-10 flex flex-col justify-between h-1/2">
            <CardTitle className="">
              Expand Your Course Creation Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-1/2">
            <p className="text-md text-muted-foreground">
              Treesight provides a simple, yet powerful course creation tool
              that allows you to create courses in minutes.
            </p>
          </CardContent>
        </Card>
        <Card className="w-1/4 h-auto flex flex-col justify-between p-4">
          <CardHeader className="items-center pb-10 flex flex-col justify-between h-1/2">
            <CardTitle>Integrate into your existing knowledge base</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-1/2">
            <p className="text-md text-muted-foreground">
              Treesight integrates with your existing knowledge base to provide
              a seamless learning experience.
            </p>
          </CardContent>
        </Card>
        <Card className="w-1/4 h-auto flex flex-col justify-between p-4">
          <CardHeader className="items-center pb-10 flex flex-col justify-between h-1/2">
            <CardTitle>Regain your nights and weekends</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-1/2">
            <p className="text-md text-muted-foreground">
              You shouldn't have to spend all weekend creating a course.
              Treesight frees you from night and weekend work by accelerating
              development.
            </p>
          </CardContent>
        </Card>
        <Card className="w-1/4 h-auto flex flex-col justify-between p-4">
          <CardHeader className="items-center pb-10 flex flex-col justify-between h-1/2">
            <CardTitle>
              Curate, Measure, and Accelerate Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-1/2 ">
            <p className="text-md text-muted-foreground">
              Treesight enables end to end management of your learning
              experience across organizations, teams, and individuals. Track and
              grow your teams faster.
            </p>
          </CardContent>
        </Card>
      </div>

      {messaging && (
        <div>
          {showMessage ? (
            <MessageCard
              setShowMessage={setShowMessage}
              className="absolute top-20 right-5"
            />
          ) : (
            <Button
              className=" absolute bottom-5 right-5 bg-green-700 text-white shadow-2xl"
              onClick={() => setShowMessage(true)}
            >
              New Messages!
            </Button>
          )}
        </div>
      )}
    </main>
  );
}
