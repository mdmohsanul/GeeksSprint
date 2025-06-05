import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle } from "lucide-react";
import type { Engineer } from "@/types/user";

export interface EngineerWithCapacity extends Engineer {
  availableCapacity: number;
  currentLoad: number;
  utilization: string;
  status: "Overloaded" | "Underutilized" | "Optimal";
  role: string;
  seniority: string;
  createdAt: string;
  updatedAt: string;
}
interface EngineerCardProps {
  engineer: EngineerWithCapacity;
}


export default function EngineerCard({ engineer }: EngineerCardProps) {
  const {
    name,
    email,
    role,
    seniority,
    department,
    skills,
    maxCapacity,
    availableCapacity,
   
  } = engineer;
console.log("EngineerCard props:", engineer);
  const allocation = Math.max(
    0,
    Math.min(100, ((maxCapacity - availableCapacity) / maxCapacity) * 100)
  );

  const isOverbooked = availableCapacity < 0;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border p-4 space-y-3 rounded-2xl">
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{name}</h2>
          {isOverbooked && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle size={14} />
              Overbooked
            </Badge>
          )}
        </div>

        <div className="text-sm text-muted-foreground mb-2">{email}</div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <p><strong>Role:</strong> {role}</p>
          <p><strong>Seniority:</strong> {seniority}</p>
          <p><strong>Department:</strong> {department}</p>
          <p><strong>Capacity:</strong> {availableCapacity}/{maxCapacity}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-1">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Allocation</p>
          <Progress value={allocation} />
        </div>
      </CardContent>
    </Card>
  );
}
