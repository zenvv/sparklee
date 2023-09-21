import { auth, db, provider } from "@/config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { AiOutlineGoogle } from "react-icons/ai";

function LoginGoogle() {
  const { toast } = useToast();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)
      .then((res) => {
        const cred = GoogleAuthProvider.credentialFromResult(res);

        const token = cred?.accessToken;
        // The signed-in user info.
        const user = res.user;
      })
      .catch((err) => {
        console.log(err);
      });
    toast({
      title: "heyy, you've signed-in!",
      description: "welcome to sparklee =)",
    });
  };

  return (
    <Button
      variant="black"
      size="lg"
      className="flex items-center w-full gap-4 font-bold"
      onClick={signIn}
    >
      <AiOutlineGoogle />
      Login with Google
    </Button>
  );
}

export default LoginGoogle;
