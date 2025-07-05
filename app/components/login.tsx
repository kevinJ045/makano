
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import Scriff from "scriff-api";

interface LoginOptions {
  loginFunction?: (username: string, password: string) => any,
  onLogin?: (result: any) => any,
  onError?: (err: any) => any
}
export function Login({
  onError,
  onLogin,
  loginFunction
}: LoginOptions) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitLogin = async () => {
    setLoading(true);
    if (loginFunction) {
      await loginFunction(username, password);
      setLoading(false);
      return;
    }
    fetch(
      `http://localhost:3333/login/${username}?pwd=${password}`,
      {
        method: 'POST'
      }
    ).then((r) => r.json())
      .then(async (r) => {
        setLoading(false);
        if (r.failed) {
          onError?.(r);
          setError("Wrong password or username");
          setTimeout(() => setError(""), 5000);
        } else {
          const username = await fetch(`http://localhost:3333/whoami`, {
            headers: {
              token: r.response.session
            }
          }).then((r) => r.text());
          // onLogin?.({ ...r.response, username });
          // localStorage.setItem('token', r.response.session);

          const frame = document.createElement('iframe');
          frame.src = `http://localhost:3333/login?username=${username}&password=${password}`;

          frame.onload = () => {
            (frame.contentWindow as any)._onload = () => {
              alert('Woah bro');
            }
          }
          
          document.body.appendChild(frame);
        }
      })
      .catch(e => {
        setLoading(false);
        onError?.(e);
        setError(e.messge);
        setTimeout(() => setError(""), 5000);
      });
  }

  return <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Login to Scriff</CardTitle>
      <CardDescription>
        {error ? <span className="text-red-400">{error}</span> : "You need a Scriff account to continue using Labs."}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Password or secret"
              required
            />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex-col gap-2">
      <Button disabled={isLoading} onClick={() => submitLogin()} type="submit" className="w-full space-x-2">
        {isLoading && <Loader2Icon className="animate-spin" />}
        <span>{isLoading ? "Logging in" : "Login"}</span>
      </Button>
    </CardFooter>
  </Card>
}