import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
            <h1 className="font-display text-9xl font-bold text-primary">404</h1>
            <h2 className="mt-4 text-2xl font-bold tracking-tight">Page Not Found</h2>
            <p className="mt-4 text-muted-foreground max-w-md">
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
            </p>
            <Link href="/" className="mt-8">
                <Button size="lg">Go Back Home</Button>
            </Link>
        </div>
    );
}
