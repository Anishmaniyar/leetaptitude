"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/practice";
    }, 800);
  };

  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                placeholder="Alex Coder"
                className="input" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="input" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="input" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button-primary w-full mt-2" disabled={loading}>
              {loading ? "Creating account..." : "Sign up"}
            </button>
            <p className="text-center text-sm text-[var(--text-muted)] mt-4">
              Already have an account? <Link href="/login" className="text-white hover:underline">Login</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
