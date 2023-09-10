import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { cn } from '@/lib/utils'

import React from "react";

const defaultImage = 'https://github.com/shadcn.png'

export default function UserAvatar({ className, image = defaultImage, fullName, email }: { className?: string, image?: string, fullName: string, email: string }) {
  return (
    <div className={cn(className, "flex flex-row items-center")}>
      <Avatar className="outline outline-1 outline-gray-400">
        <AvatarImage src={image} />
        <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="ml-3">
        <p className="text-lg font-semibold">{fullName}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  )
}



