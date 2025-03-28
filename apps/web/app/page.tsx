import {
  IconArrowRight,
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
    <div className="space-y-16">
      {/* Header */}
      <div className="flex justify-between items-center p-8">
        <div className="text-5xl font-bold">Cloki</div>
        <div className="flex gap-14 text-xl">
          <div>Features</div>
          <div>Pricing</div>
          <div>Demo</div>
        </div>
        <div className="flex gap-5 text-xl font-semibold">
          <Link href="http://localhost:5173/register" className="bg-violet-200 p-2 rounded-sm">
            <div className="text-primaryPurple">Sign in</div>
          </Link>
          <Link href="http://localhost:5173/register" className="bg-primaryPurple p-2 rounded-sm">
            <div className="text-white">Sign up free</div>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto space-y-10 font-semibold flex flex-col items-center">
        <div className="text-2xl text-primaryPurple bg-violet-200 text-center w-fit mx-auto p-4 rounded-full">
          Free for 5 Users. One Rate Beyond
        </div>
        <div className="text-7xl font-bold">Stop overpaying for time tracking!</div>
        <div className="text-2xl text-center">
          Setup your organisation with Cloki, manage your data and start tracking instantly
        </div>
        <Link
          href="http://localhost:5173/register"
          className="text-3xl bg-primaryPurple p-4 rounded-md"
        >
          <div className="text-white">Start for free</div>
        </Link>
      </div>

      {/* Dasboard Image */}
      <Image
        src="/dashboard.png"
        alt="dashboard"
        width={1100}
        height={1000}
        className="rounded-2xl mx-auto"
      />

      {/* Features */}
      <div className="max-w-7xl mx-auto space-y-8 font-semibold mt-36 flex flex-col items-center">
        <div className="text-2xl text-primaryPurple bg-violet-200 text-center w-fit mx-auto p-4 rounded-full">
          Features
        </div>
        <div className="text-6xl font-bold">Simplify time tracking</div>
        <div className="text-lg text-center text-neutral-400">
          Simplify time tracking: Effortlessly manage absences, remote work, logged hours, and team
          performance while focusing on growing your business. Use AI to help you with your daily
          tasks — ask about employees, teams, projects, or clients, send emails directly via AI, and
          easily approve or reject leave requests with AI-powered assistance.{" "}
        </div>
        <div className="grid grid-cols-3 gap-10">
          <div className="shadow-lg rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex gap-4 items-center text-2xl font-bold">
              <IconCalendarClock size={40} />
              <div className="text-3xl">Time Tracking</div>
            </div>
            <div className="text-2xl font-[400]">
              Simplify time tracking for accurate invoicing and payroll, with detailed timesheets
              and exportable reports.
            </div>
          </div>
          <div className="shadow-lg rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex gap-4 items-center text-2xl font-bold">
              <IconUsers size={40} />
              <div className="text-3xl">Team organization</div>
            </div>
            <div className="text-2xl font-[400]">
              Organize your team into groups, assign roles, and make quick adjustments as projects
              evolve.
            </div>
          </div>
          <div className="shadow-lg rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex gap-4 items-center text-2xl font-bold">
              <IconRobot size={40} />
              <div className="text-3xl">Time Tracking</div>
            </div>
            <div className="text-2xl font-[400]">
              Use AI to manage tasks — find employees, teams, projects, or clients, send emails, and
              handle leave requests effortlessly.
            </div>
          </div>
          <div className="shadow-lg rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex gap-4 items-center text-2xl font-bold">
              <IconHome size={40} />
              <div className="text-3xl">Remote work</div>
            </div>
            <div className="text-2xl font-[400]">Easily manage hybrid teams with insights into who’s working remotely.</div>
          </div>
          <div className="shadow-lg rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex gap-4 items-center text-2xl font-bold">
              <IconFaceMask size={40} />
              <div className="text-3xl">Sick leave tracking</div>
            </div>
            <div className="text-2xl font-[400]">
              Log sick days instantly and notify managers in real-time for better resource planning.
            </div>
          </div>
          <div className="shadow-lg rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex gap-4 items-center text-2xl font-bold">
              <IconBeach size={40} />
              <div className="text-3xl">Time management</div>
            </div>
            <div className="text-2xl font-[400]">
              Track vacation balances, approve leave requests, and plan ahead with clear visibility
              into time off usage.
            </div>
          </div>
        </div>
      </div>

      {/* Right for you section */}
      <section className="max-w-7xl mx-auto mt-36">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">How Cloki Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our simple setup process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-violet-200 text-primaryPurple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Create your account</h3>
              <p className="text-2xl">
                Invite team members and set up departments, roles, and permissions in just a few clicks.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-violet-200 text-primaryPurple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Setup your organisation</h3>
              <p className="text-2xl">
                Setup of organisation by submitting details
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-violet-200 text-primaryPurple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Start Tracking</h3>
              <p className="text-2xl">
                Your team can immediately begin logging hours and requesting time off through our intuitive interface once you add and invite them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primaryPurple rounded-2xl p-16 text-center">
            <h2 className="text-8xl font-bold text-white mb-6">Try it out</h2>
            <p className="text-2xl text-white mb-8 max-w-3xl mx-auto">
              Join thousands of businesses that have streamlined their time management with Cloki.
            </p>
            <Link
          href="http://localhost:5173/register"
          className="text-3xl bg-primaryPurple p-4 rounded-md border-2 border-violet-200"
        >
            Sign up for free
        </Link>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="bg-primaryPurple text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <IconClock className="h-6 w-6" />
                <span className="text-xl font-bold">Cloki</span>
              </div>
              <p className="text-white">Simplifying time tracking for growing businesses around the world.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Cloki. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
