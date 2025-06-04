import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/validators";
import type { SignupData } from "@/lib/validators";



type SignUpProps = {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpForm = ({ setShowPopup }: SignUpProps) => {
  // const dispatch = useAppDispatch();
  // const [err, setErr] = useState<string | null>(null);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignupData) {
    // try {
    //   dispatch(registerUser(values)).then((result) => {
    //     if (result?.meta?.requestStatus === "rejected") {
    //       setErr("Failed to Log In. Please try again.");
    //     } else {
    //       setShowPopup(true);
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    //   //setErr(error || "Failed to Log In. Please try again.");
    // }
    setShowPopup(false)
    console.log("Form submitted with values:", values);
  }
  return (
    <>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username </FormLabel>
                <FormControl>
                  <Input placeholder="Alex" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email </FormLabel>
                <FormControl>
                  <Input placeholder="alex@gmail.com" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-12 w-full rounded-full text-md cursor-pointer bg-gray-800 "
          >
            Sign Up
          </Button>
        </form>
      </Form>
      {/* {err && <p>{err}</p>} */}
      </>
  )
}

export default SignUpForm