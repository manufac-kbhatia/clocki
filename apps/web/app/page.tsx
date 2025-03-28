import {
  IconBeach,
  IconCalendarClock,
  IconClock,
  IconFaceMask,
  IconHome,
  IconRobot,
  IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8 sm:space-y-16">
      {/* Header */}
      <div className="flex justify-between items-center p-4 sm:p-8">
        <div className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-0">Cloki</div>
        <div className="hidden sm:flex gap-8 lg:gap-14 text-base lg:text-xl mb-4 sm:mb-0">
          <div>Features</div>
          <div>Pricing</div>
          <div>Demo</div>
        </div>
        <div className="flex  gap-3 sm:gap-5 text-base sm:text-xl font-semibold">
          <Link
            href="http://localhost:5173/register"
            className="bg-violet-200 p-2 rounded-sm text-center"
          >
            <div className="text-primaryPurple">Sign in</div>
          </Link>
          <Link
            href="http://localhost:5173/register"
            className="bg-primaryPurple p-2 rounded-sm text-center"
          >
            <div className="text-white">Sign up free</div>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10 font-semibold flex flex-col items-center px-4">
        <div className="text-base sm:text-2xl text-primaryPurple bg-violet-200 text-center w-fit mx-auto p-2 sm:p-4 rounded-full">
          Free for 5 Users. One Rate Beyond
        </div>
        <div className="text-4xl sm:text-6xl lg:text-7xl font-bold text-center">
          Stop overpaying for time tracking!
        </div>
        <div className="text-base sm:text-2xl text-center max-w-2xl">
          Setup your organisation with Cloki, manage your data and start tracking instantly
        </div>
        <Link
          href="http://localhost:5173/register"
          className="text-xl sm:text-3xl bg-primaryPurple p-3 sm:p-4 rounded-md"
        >
          <div className="text-white">Start for free</div>
        </Link>
      </div>

      {/* Dashboard Image */}
      <Image
        src="/dashboard.png"
        alt="dashboard"
        width={1100}
        height={1000}
        className="rounded-2xl mx-auto w-full max-w-6xl px-4"
      />

      {/* Features */}
      <div className="max-w-7xl mx-auto space-y-8 font-semibold mt-16 sm:mt-36 flex flex-col items-center px-4">
        <div className="text-base sm:text-2xl text-primaryPurple bg-violet-200 text-center w-fit mx-auto p-2 sm:p-4 rounded-full">
          Features
        </div>
        <div className="text-4xl sm:text-6xl font-bold text-center">Simplify time tracking</div>
        <div className="text-base sm:text-lg text-center text-neutral-400 max-w-4xl">
          Simplify time tracking: Effortlessly manage absences, remote work, logged hours, and team
          performance while focusing on growing your business. Use AI to help you with your daily
          tasks — ask about employees, teams, projects, or clients, send emails directly via AI, and
          easily approve or reject leave requests with AI-powered assistance.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
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
            <div key={index} className="shadow-lg rounded-2xl p-5 flex flex-col gap-5">
              <div className="flex gap-4 items-center text-xl sm:text-2xl font-bold">
                {feature.icon}
                <div className="text-2xl sm:text-3xl">{feature.title}</div>
              </div>
              <div className="text-base sm:text-2xl font-[400]">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How Cloki Works Section */}
      <section className="max-w-7xl mx-auto mt-16 sm:mt-36 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-6xl font-bold text-gray-900 mb-4">How Cloki Works</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our simple setup process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Create your account",
                description:
                  "Invite team members and set up departments, roles, and permissions in just a few clicks.",
              },
              {
                number: "2",
                title: "Setup your organisation",
                description: "Setup of organisation by submitting details",
              },
              {
                number: "3",
                title: "Start Tracking",
                description:
                  "Your team can immediately begin logging hours and requesting time off through our intuitive interface once you add and invite them.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-violet-200 text-primaryPurple w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-base sm:text-2xl">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-primaryPurple rounded-2xl p-8 sm:p-16 text-center">
            <h2 className="text-4xl sm:text-8xl font-bold text-white mb-4 sm:mb-6">Try it out</h2>
            <p className="text-base sm:text-2xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto">
              Join thousands of businesses that have streamlined their time management with Cloki.
            </p>
            <Link
              href="http://localhost:5173/register"
              className="text-base sm:text-3xl bg-violet-200 p-3 sm:p-4 rounded-md border-2 border-violet-200"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primaryPurple text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <IconClock className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-lg sm:text-xl font-bold">Cloki</span>
              </div>
              <p className="text-sm sm:text-base text-white">
                Simplifying time tracking for growing businesses around the world.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Enterprise"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Guides", "API Reference", "Blog"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Privacy Policy"],
              },
            ].map((section, index) => (
              <div key={index} className="col-span-1 sm:col-span-1">
                <h3 className="text-base sm:text-lg font-bold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="text-xs sm:text-base text-gray-400 hover:text-white transition"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-base text-gray-400">
            <p>© {new Date().getFullYear()} Cloki. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
