import { useLocation, Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function VerificationPending() {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto rounded-full bg-blue-100 p-3 mb-4">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification link to
          </CardDescription>
          <div className="text-center font-medium mt-1">{email}</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground text-sm">
            Click the link in the email to verify your account. If you don't see the email, check your spam folder.
          </p>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = "https://mail.google.com"}
            >
              Open Gmail
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = "https://outlook.live.com"}
            >
              Open Outlook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 