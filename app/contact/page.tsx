"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    return (
        <div className="container py-24">
            <div className="mx-auto max-w-2xl space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="font-display text-4xl font-bold tracking-tight">
                        Contact Us
                    </h1>
                    <p className="text-muted-foreground">
                        Have a question? We'd love to hear from you. Send us a message and
                        we'll respond within 24 hours.
                    </p>
                </div>

                <form className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Robinson" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="max@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="How can we help you?"
                            className="min-h-[150px]"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    );
}
