import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkillsMultiSelect } from "./SkillsMultiSelect";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

type SignUpProps = {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpForm = ({ setShowPopup }: SignUpProps) => {
  const [err, setErr] = useState<string | null>(null);
  const signup = useAuthStore((state) => state.signup);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "manager",
      skills: [],
      seniority: "junior", // Assuming seniority is optional and defaults to 'junior'
      maxCapacity: 50, // Assuming maxCapacity is optional
      department: "",
    },
  });

  // Watch the 'role' field value
  const selectedRole = useWatch({
    control: form.control,
    name: "role",
  });

  async function onSubmit(values: SignupData) {
    try {
      await signup(values);
      console.log("Signup successful:", values);
      setShowPopup(true);
    } catch (error: any) {
      setErr(error || "Failed to log in. Please try again.");
    }
    console.log("Form submitted with values:", values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
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
                    <Input
                      placeholder="alex@gmail.com"
                      {...field}
                      type="email"
                    />
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
                    <Input
                      placeholder="••••••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="engineer">Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {selectedRole === "engineer" && (
              <>
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <SkillsMultiSelect
                        value={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seniority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seniority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a seniority level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="mid">Mid</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Capacity</FormLabel>
                      <FormControl>
                        <Input placeholder="100" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Engineering" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <Button
            type="submit"
            className="h-12 w-2/4 rounded-full text-md cursor-pointer bg-gray-800 "
          >
            Sign Up
          </Button>
        </form>
      </Form>
      {err && <p>{err}</p>}
    </>
  );
};

export default SignUpForm