import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Search, Users, Zap, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">TaskFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-balance">
            Task Management Made <span className="text-primary">Simple</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Organize your work, track your progress, and achieve your goals with our intuitive task management platform.
            Built for individuals and teams who value simplicity and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Start Managing Tasks
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Sign In to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Everything you need to stay organized</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you manage tasks efficiently and boost your productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Quick Task Creation</CardTitle>
              <CardDescription>
                Create and organize tasks in seconds with our intuitive interface. Add descriptions, set priorities, and
                track progress effortlessly.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <Search className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Smart Search & Filter</CardTitle>
              <CardDescription>
                Find any task instantly with powerful search and filtering options. Filter by status, search by
                keywords, and navigate with ease.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your productivity with detailed statistics and completion rates. See your progress over time and
                stay motivated.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your tasks are protected with enterprise-grade security. Only you can access your personal task list and
                data.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Personal Workspace</CardTitle>
              <CardDescription>
                Create your own personal task management workspace. Organize tasks your way with custom categories and
                priorities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Simple & Effective</CardTitle>
              <CardDescription>
                No complicated features or overwhelming interfaces. Just clean, simple task management that actually
                works.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-y">
        <div className="container mx-auto px-4 py-20 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to get organized?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their productivity with TaskFlow. Start managing your tasks
            better today.
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <CheckCircle className="h-6 w-6 text-primary" />
              <span className="font-semibold">TaskFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 TaskFlow. Built with Next.js and MongoDB.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
