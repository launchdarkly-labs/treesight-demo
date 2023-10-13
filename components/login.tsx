import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLDClient } from "launchdarkly-react-client-sdk"

// @ts-ignore
export function Login({ setIsSignedIn }: { setIsSignedIn: (value: boolean) => void }) {
    const ldclient = useLDClient();

    function handleLogin() {
        updateLDContext({ key: 1, name: 'unsound-tine', priceLevel: 'Enterprise' });
        setIsSignedIn(true);
      }
    
      function updateLDContext(updates: any) {
        const context = ldclient?.getContext();
        Object.assign(context.user, updates);
        ldclient?.identify(context);
      }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xl" variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mx-auto"><img src="/logo.png" /></DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4 mx-auto">
            <img src="/calvin.png" className="rounded-full mx-auto" />
          </div>
          <div className="mx-auto">
          <p className="pt-4 text-2xl font-bold items-center">Hello, Calvin!</p>
          </div>
        </div>
        <DialogFooter className="mx-auto">
          <Button onClick={()=>handleLogin()} className="bg-green-700 text-white font-bold text-xl" type="submit">Sign In with SSO</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
