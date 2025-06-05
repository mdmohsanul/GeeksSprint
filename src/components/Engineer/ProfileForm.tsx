import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useAuthStore } from "@/store/useAuthStore"

const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  department: z.string().min(1),
  seniority: z.enum(["junior", "mid", "senior"]),
  maxCapacity: z.coerce.number().min(1),
  skills: z.string().optional(), // comma-separated
})

type ProfileFormData = z.infer<typeof profileSchema>

type ProfileUpdateFormProps = {
  engineer: {
    _id: string 
    name: string
    email: string
    department?: string | undefined
    role: string
    seniority?: "junior" | "mid" | "senior"
    maxCapacity?: number
    skills: string[]
  }
}


const ProfileUpdateForm = ({ engineer }: ProfileUpdateFormProps) => {
    console.log(engineer)
    const updateProfile = useAuthStore((state) => state.updateProfile)
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: engineer.name,
      email: engineer.email,
      department: engineer.department,
      seniority: engineer.seniority,
      maxCapacity: engineer.maxCapacity,
      skills: engineer?.skills.join(", "),
    },
  })

  const onSubmit = (data: ProfileFormData) => {
    const updated = {
      ...data,
      skills: data.skills?.split(",").map(skill => skill.trim()) || [],
    }
    console.log("Updated Profile:", updated)
    updateProfile(engineer?._id, updated)
    // TODO: Call API or dispatch Redux action
  }

  return (
    <div className="w-full mx-auto ">
  <Card>
   
    <CardContent>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="pb-2">Name</Label>
            <Input {...form.register("name")} />
          </div>

          <div>
            <Label className="pb-2">Email</Label>
            <Input value={engineer.email} disabled />
          </div>

          <div>
            <Label className="pb-2">Department</Label>
            <Input {...form.register("department")} />
          </div>

          <div>
            <Label className="pb-2">Seniority</Label>
            <select
              {...form.register("seniority")}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div>
            <Label className="pb-2">Max Capacity (hrs/week)</Label>
            <Input type="number" {...form.register("maxCapacity")} />
          </div>
<div >
            <Label className="pb-2">Role (readonly)</Label>
            <Input value={engineer.role} disabled />
          </div>
          <div className="col-span-2">
            <Label className="pb-2">Skills (comma-separated)</Label>
            <Textarea rows={2} {...form.register("skills")} />
          </div>

          
        </div>

        <div className="">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>

  )
}

export default ProfileUpdateForm
