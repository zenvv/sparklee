import { auth, db, gitProvider, provider } from "@/config/firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { AiOutlineGithub } from "react-icons/ai";

export default function LoginGithub() {
  const { toast } = useToast();

  const signIn = async () => {
    const result = await signInWithPopup(auth, gitProvider)
      .then((res) => {
        const creds = GithubAuthProvider.credentialFromResult(res);
        const token = creds?.accessToken;

        const user = res.user;

        toast({
          title: "heyy, you've signed-in!",
          description: "welcome to sparklee =)",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GithubAuthProvider.credentialFromError(error);

        console.log(error);
      });
  };

  return (
    <Button
      variant="black"
      size="lg"
      className="flex items-center w-full gap-4 font-bold"
      onClick={signIn}
    >
      <AiOutlineGithub />
      Login with Github
    </Button>
  );
}
