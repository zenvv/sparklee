/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auth } from "@/config/firebase";

import { Edit } from "lucide-react";

function ProfileSettings() {
  const user = auth.currentUser;

  return (
    <div className="w-full py-2">
      <Card className="w-full overflow-hidden rounded-lg dark">
        <CardContent className="flex flex-col items-center justify-start w-full p-6 border-t">
          <div className="relative flex items-center justify-center gap-8">
            <Avatar className="w-32 h-32 border rounded-full">
              <AvatarFallback>🦎</AvatarFallback>
              <AvatarImage src={user?.photoURL || ""} />
            </Avatar>
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-3xl font-bold">
                {user?.displayName || "user"}
              </h1>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileSettings;
