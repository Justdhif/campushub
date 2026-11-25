import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const STACK_ITEMS = [
  { label: "Next.js + TypeScript", detail: "App Router & strict type safety" },
  { label: "Tailwind CSS v4", detail: "Design tokens & utility styling" },
  { label: "shadcn/ui", detail: "Base UI primitives in @/components/ui" },
  { label: "Clean Architecture", detail: "domain, application, infrastructure, presentation" },
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <Card>
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between gap-4">
            <Image
              className="h-5 w-[100px] dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <Badge variant="secondary">Ready</Badge>
          </div>
          <CardTitle className="text-2xl">NEXOLOUS PIERCER</CardTitle>
          <CardDescription>
            Configured with Next.js TypeScript, Tailwind CSS, shadcn/ui, and Clean Architecture.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-3 pt-2 sm:grid-cols-2">
          {STACK_ITEMS.map((item) => (
            <div key={item.label} className="rounded-lg border p-3">
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </CardContent>

        <CardFooter className="gap-3">
          <Button
            nativeButton={false}
            render={<Link href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" />}
          >
            Next.js Docs
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="https://ui.shadcn.com/docs" target="_blank" rel="noopener noreferrer" />}
          >
            shadcn/ui Docs
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
