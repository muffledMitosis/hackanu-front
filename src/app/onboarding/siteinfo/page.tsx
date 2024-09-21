
'use client';

import * as React from 'react';
import { Input } from "@/components/ui/input";

import { IoCloudUploadOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
type Status = {
  value: string
  label: string
}
 
const statuses: Status[] = [
  {
    value: "<10",
    label: "<10",
  },
  {
    value: "<50",
    label: "<50",
  },
  {
    value: "<100",
    label: "<100",
  },
  {
    value: "<500",
    label: "<500",
  },
  {
    value: "500+",
    label: "500+",
  },
]
 
function ComboboxPopover() {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )
 
  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">No. of Workers</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set number</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change number..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default function SiteInfo() {
  
  const loremText = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi quas unde hic quo rerum ab officia cupiditate sequi eligendi porro consequatur dolore minima, consequuntur esse accusantium eveniet? Earum, dolorum molestias.'

  return (
    <div className="">
      <h1 className="mx-8 my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Tell Us More</h1>


      <div className="w-1/4 relative inset-0 left-1/2 -translate-x-1/2 top-8 p-8 shadow-sm rounded-xl shadow-orange-500">
        <Input type="text" placeholder="Site Name" />
        <div className='mt-4'>
          <ComboboxPopover />
        </div>
        <p>Upload pictures</p>
        <div className='rounded-xl border-2 border-white w-min px-10 py-3 mt-4 cursor-pointer'>
          <IoCloudUploadOutline className='text-3xl'/>
        </div>
      </div>

    </div>
  );
}
