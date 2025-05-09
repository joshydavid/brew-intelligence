import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SignIn({ isMobile = true }) {
  return (
    <form className={cn("grid items-start gap-4", isMobile && "px-4")}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}
