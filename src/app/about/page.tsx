import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const values = [
  { title: "Structured for clarity", description: "Every listing is organized for quick scanning, so visitors can compare operators and make confident next steps." },
  { title: "Built for discovery", description: "Categories, location context, and supporting content types make browsing smoother from the first visit." },
  { title: "Designed for trust", description: "Clean layout, clear information hierarchy, and consistent formatting help buyers and browsers feel at ease." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a business listing platform for discovering services, companies, and local opportunities with structured browsing.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/listings">Browse Listings</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A directory-first surface for brands, buyers, and browsers.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} organizes business listings so visitors can compare operators, read context quickly,
              and move to contact or classified follow-ups without noisy feeds.
            </p>
            <p className="text-sm text-muted-foreground">
              Articles, visuals, profiles, and resources stay available as supporting lanes
              — useful when you need depth, but never competing with the core listing rhythm.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
