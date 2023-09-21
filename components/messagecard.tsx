import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const notifications = [
  {
    title: "Our Galaxy Program has been Released!",
    description: "1 hour ago",
  },
  {
    title: "New course authoring platform released!",
    description: "7 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "12 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function MessageCard({ className, setShowMessage, ...props }: CardProps & { setShowMessage: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Card className={cn("w-[380px] h-5/6", className)} {...props}>
      <CardHeader>
        <CardTitle><span className="text-green-700">Treesight</span> Messaging</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Silence Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Mute all notifications. 
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setShowMessage(false)} className="w-full">
          Close Notification
        </Button>
      </CardFooter>
    </Card>
  )
}
