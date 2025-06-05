import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store/useAuthStore";

const ProfilePage = () => {
    const { user } = useAuthStore((state) => state);
  const engineer = user

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">{engineer?.name}</h2>
          <p className="text-sm text-muted-foreground">{engineer?.email}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium capitalize">{engineer?.role}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{engineer?.department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Seniority</p>
              <p className="font-medium capitalize">{engineer?.seniority}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Capacity</p>
              <p className="font-medium">{engineer?.maxCapacity} hrs/week</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground mb-1">Skills</p>
            <div className="flex flex-wrap gap-2">
              {engineer?.skills?.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
