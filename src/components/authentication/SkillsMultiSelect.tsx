
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandItem } from "@/components/ui/command"
import { CheckIcon } from "lucide-react"
import { FormControl } from "@/components/ui/form"
// import { cn } from "@/lib/utils"

const allSkills = ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind"]

export function SkillsMultiSelect({ value, onChange }: {
  value: string[],
  onChange: (value: string[]) => void
}) {
  const [open, setOpen] = useState(false)

  const toggleSkill = (skill: string) => {
    if (value.includes(skill)) {
      onChange(value.filter(s => s !== skill))
    } else {
      onChange([...value, skill])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant="outline" className="w-full justify-start">
            {value.length > 0 ? value.join(", ") : "Select skills"}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          {allSkills.map(skill => (
            <CommandItem
              key={skill}
              onSelect={() => toggleSkill(skill)}
              className="flex justify-between"
            >
              {skill}
              {value.includes(skill) && <CheckIcon className="h-4 w-4 text-primary" />}
            </CommandItem>
          ))}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
