import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store/useAuthStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import ProfileUpdateForm from "@/components/Engineer/ProfileForm";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

const ProfilePage = () => {
  const { user } = useAuthStore((state) => state);
  const engineer = user;
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCreateClick = () => {
    setDialogOpen(true);
  };
  return (
    <>
      <Header content="Profile" />
      <div className="max-w-5xl mx-auto pt-6 ">
        <div className="mx-7 md:mx-0">
          <BackButton />
          <div className="max-w-2xl mx-auto  ">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">{engineer?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {engineer?.email}
                </p>
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
                    <p className="font-medium capitalize">
                      {engineer?.seniority}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Max Capacity
                    </p>
                    <p className="font-medium">
                      {engineer?.maxCapacity} hrs/week
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
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
                  <Button onClick={handleCreateClick}>
                    <Plus className="w-4 h-4 mr-2" /> Update Profile
                  </Button>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                      </DialogHeader>
                      {engineer && (
                        <ProfileUpdateForm
                          engineer={{
                            ...engineer,
                            _id: engineer._id!,
                            skills: engineer.skills ?? [],
                          }}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage
