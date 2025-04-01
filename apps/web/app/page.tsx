import { CardContent, Card } from "@/components/ui/card";
import {
  IconBeach,
  IconBrain,
  IconCalendarClock,
  IconChartBar,
  IconClock,
  IconCode,
  IconFaceMask,
  IconHome,
  IconRobot,
  IconServer,
  IconUsers,
  IconWand,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <IconClock className="h-10 w-10 text-primary" />
            <span className="text-4xl font-bold">Cloki</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="bg-primary p-2 rounded-md text-white font-semibold">
              <Link href="https://app-cloki.b-cdn.net">Sign in</Link>
            </button>
            <button className="bg-violet-200 text-primary p-2 rounded-md font-semibold">
              <Link href="https://app-cloki.b-cdn.net">Sign up free</Link>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 ai-grid-bg">
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
              <IconRobot className="h-4 w-4 mr-2" />
              <span>AI-Powered Time Tracking</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Intelligent Time Management for Modern Teams
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              Cloki uses artificial intelligence to transform how your team tracks time, manages
              projects, and optimizes productivity
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-violet-200 text-primary p-2 rounded-md font-semibold shadow-primary shadow-sm">
                <Link
                  href="https://app-cloki.b-cdn.net"
                  className="flex justify-center gap-2 items-center"
                >
                  <IconWand className="h-4 w-4" />
                  Start for free
                </Link>
              </button>
              <button className="p-2 rounded-md shadow-neutral-500 shadow-sm font-semibold">
                <Link href="#demo">Watch demo</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="container py-12 md:py-16">
        <div className="relative rounded-lg border bg-card p-2 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg" />
          <Image
            src="/dashboard.png"
            alt="Cloki AI dashboard"
            width={1200}
            height={800}
            className="rounded-md w-full h-auto relative z-10"
            priority
          />
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-full">
            AI-Powered Dashboard
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20 md:py-28">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
            <IconBrain className="h-4 w-4 mr-2" />
            <span>Smart Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            AI-Enhanced Time Tracking
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Leverage artificial intelligence to transform how you track time, manage teams, and
            boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <IconCalendarClock size={40} />,
              title: "Time Tracking",
              description:
                "Simplify time tracking for accurate invoicing and payroll, with detailed timesheets and exportable reports.",
            },
            {
              icon: <IconUsers size={40} />,
              title: "Team organization",
              description:
                "Organize your team into groups, assign roles, and make quick adjustments as projects evolve.",
            },
            {
              icon: <IconRobot size={40} />,
              title: "AI Assistance",
              description:
                "Use AI to manage tasks — find employees, teams, projects, or clients, send emails, and handle leave requests effortlessly.",
              primary: true,
            },
            {
              icon: <IconHome size={40} />,
              title: "Remote work",
              description: "Easily manage hybrid teams with insights into who's working remotely.",
            },
            {
              icon: <IconFaceMask size={40} />,
              title: "Sick leave tracking",
              description:
                "Log sick days instantly and notify managers in real-time for better resource planning.",
            },
            {
              icon: <IconBeach size={40} />,
              title: "Time management",
              description:
                "Track vacation balances, approve leave requests, and plan ahead with clear visibility into time off usage.",
            },
          ].map((feature, index) => (
            <Card key={index} className={`ai-card ${feature.primary ? "ai-glow" : ""}`}>
              <CardContent className="p-6 flex flex-col gap-4">
                <div
                  className={`p-3 rounded-full w-fit ${feature.primary ? "bg-primary/10" : "bg-muted"}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="bg-muted/50 py-20 md:py-28 ai-grid-bg">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
                <IconCode className="h-4 w-4 mr-2" />
                <span>AI Technology</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Work Smarter with AI Assistance
              </h2>
              <p className="text-xl text-muted-foreground">
                Ask questions in natural language and get instant insights about your team&apos;s
                time, projects, and productivity.
              </p>
              <ul className="space-y-3">
                {[
                  "Generate reports with a simple prompt",
                  "Identify productivity patterns across teams",
                  "Get AI recommendations for resource allocation",
                  "Automate routine time tracking tasks",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 bg-violet-200 text-primary p-2 rounded-md font-semibold shadow-primary shadow-sm">
                Try AI Assistant
              </button>
            </div>
            <div className="relative rounded-lg border bg-card p-2 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg" />
              <div className="relative z-10 bg-card rounded-md p-6 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <IconRobot className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-medium">Cloki AI Assistant</div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">
                      Show me which team members worked the most hours last week
                    </p>
                  </div>

                  <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%]">
                    <p className="text-sm">Here&apos;s the breakdown of hours worked last week:</p>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>1. Sarah Chen: 42.5 hours</li>
                      <li>2. Michael Johnson: 39.2 hours</li>
                      <li>3. David Kim: 38.7 hours</li>
                      <li>4. Emma Wilson: 37.5 hours</li>
                      <li>5. James Taylor: 36.8 hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Cloki Works Section */}
      <section id="how-it-works" className="container py-20 md:py-28">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
            <IconServer className="h-4 w-4 mr-2" />
            <span>Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How Cloki Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Get started in minutes with our simple setup process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              number: "1",
              title: "Create your account",
              description: "Sign up in seconds with your email for free",
              icon: <IconUsers className="h-6 w-6" />,
            },
            {
              number: "2",
              title: "Setup your organisation",
              description: "Create your organisation and add team members based on their roles",
              icon: <IconClock className="h-6 w-6" />,
            },
            {
              number: "3",
              title: "Start Tracking",
              description:
                "Begin logging hours and let AI provide insights to optimize your team's productivity.",
              icon: <IconChartBar className="h-6 w-6" />,
            },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                  {step.number}
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
              <div className="p-3 rounded-full bg-muted mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container py-20 md:py-28">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
            <IconServer className="h-4 w-4 mr-2" />
            <span>Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Start for free, upgrade as your team grows
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border">
            <CardContent className="pt-6">
              <div className="mb-4 text-center">
                <h3 className="text-lg font-medium">Free</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">For up to 5 users</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Basic time tracking",
                  "Team management",
                  "Basic reporting",
                  "Mobile app access",
                  "Email support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 bg-violet-200 text-primary p-2 rounded-md font-semibold shadow-primary shadow-sm">
                Get started
              </button>
            </CardContent>
          </Card>

          <Card className="border-primary shadow-lg relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Most Popular
            </div>
            <CardContent className="pt-6">
              <div className="mb-4 text-center">
                <h3 className="text-lg font-medium">Pro</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold">$5</span>
                  <span className="ml-1 text-muted-foreground">/user/month</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Billed annually</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Everything in Free",
                  "AI-powered insights",
                  "AI Based leaves approval",
                  "Time off management",
                  "Send Emails with help Cloki's AI assistance",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 bg-primary text-white p-2 rounded-md font-semibold shadow-primary shadow-sm">
                Get started
              </button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 md:py-20">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-foreground/90 p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Experience the Future of Time Tracking
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses that have transformed their productivity with Cloki&apos;s
            AI-powered time tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-violet-200 text-primary p-2 rounded-md font-semibold shadow-primary shadow-sm">
              <Link href="https://app-cloki.b-cdn.net">Start for free</Link>
            </button>
            <button className="bg-transparent text-white border-white hover:bg-white/10 p-4 rounded-md ">
              <Link href="#demo">Schedule demo</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16 md:py-20">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
            <IconUsers className="h-4 w-4 mr-2" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Trusted by Teams Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            See what our customers have to say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Cloki's AI assistant has transformed how our team manages time. We've seen a 30% increase in productivity since implementation.",
              author: "Sarah Chen",
              title: "CTO, TechNova",
            },
            {
              quote:
                "The AI-powered insights have given us unprecedented visibility into our project timelines and resource allocation.",
              author: "Michael Johnson",
              title: "Director of Operations, Quantum Solutions",
            },
            {
              quote:
                "From the seamless onboarding to the intuitive AI features, Cloki delivers an exceptional user experience for our entire team.",
              author: "Emma Wilson",
              title: "HR Manager, Innovate Inc.",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="ai-card">
              <CardContent className="p-6 flex flex-col gap-6">
                <div className="text-primary">
                  <svg
                    width="45"
                    height="36"
                    viewBox="0 0 45 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.95 36C9.975 36 6.75 34.65 4.275 31.95C1.425 28.8 0 24.9 0 20.25C0 14.85 1.8 10.2 5.4 6.3C9 2.4 13.725 0.15 19.575 -0.000000298023L21.15 4.05C16.575 4.65 13.05 6.225 10.575 8.775C8.1 11.325 6.75 14.4 6.525 18C7.575 17.1 9 16.65 10.8 16.65C13.05 16.65 14.925 17.475 16.425 19.125C17.925 20.775 18.675 22.8 18.675 25.2C18.675 27.75 17.85 29.85 16.2 31.5C14.55 34.5 12.45 36 13.95 36ZM38.025 36C34.05 36 30.825 34.65 28.35 31.95C25.5 28.8 24.075 24.9 24.075 20.25C24.075 14.85 25.875 10.2 29.475 6.3C33.075 2.4 37.8 0.15 43.65 -0.000000298023L45.225 4.05C40.65 4.65 37.125 6.225 34.65 8.775C32.175 11.325 30.825 14.4 30.6 18C31.65 17.1 33.075 16.65 34.875 16.65C37.125 16.65 39 17.475 40.5 19.125C42 20.775 42.75 22.8 42.75 25.2C42.75 27.75 41.925 29.85 40.275 31.5C38.625 34.5 36.525 36 38.025 36Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p className="text-base">{testimonial.quote}</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <IconClock className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Cloki</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered time tracking for modern teams
              </p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <Link
                    key={social}
                    href={`#${social}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Enterprise", "Security"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Guides", "API Reference", "Blog", "Community"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Privacy Policy", "Terms of Service"],
              },
            ].map((section, index) => (
              <div key={index} className="col-span-1">
                <h3 className="font-medium mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Cloki. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
