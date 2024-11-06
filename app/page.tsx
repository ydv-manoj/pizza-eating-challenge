import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pizza, Trophy, Users, Utensils } from 'lucide-react'
import PizzaImage from '../components/images/91c5b5edae8046ce6d335588087a0240.jpg'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto text-center mb-12 relative">
        <div className="absolute top-0 left-0 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl mb-4 text-red-600 drop-shadow-md">
          Pizza Eating Challenge
        </h1>
        <p className="text-2xl text-red-700 mb-8">
          Are you ready to become the ultimate pizza champion?
        </p>
        <div className="relative w-64 mx-auto rounded-md">
          <Image
            src={PizzaImage}
            alt="Delicious Pizza"
            objectFit="contain"
            className="animate-float"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {[
          { title: 'New Challenger', icon: Users, href: '/new-user', description: 'Join the challenge and start your cheesy adventure!' },
          { title: 'Leaderboard', icon: Trophy, href: '/leaderboard', description: 'See who\'s the top pizza eater in town!' },
          { title: 'Manage Players', icon: Utensils, href: '/manage-players', description: 'Order pizzas, log your progress, and track your stats!' },
        ].map((item, index) => (
          <Card key={index} className="w-full bg-white/80 backdrop-blur-sm shadow-lg border-2 border-red-200 hover:border-red-400 transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="bg-red-100/50">
              <CardTitle className="text-xl font-bold text-center flex items-center justify-center text-red-600">
                <item.icon className="mr-2" />
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-center mb-4 text-gray-600">{item.description}</p>
              <Link href={item.href} passHref>
                <Button className="w-full bg-red-500 hover:bg-red-600 transition-colors duration-300">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Button className="bg-red-500 hover:bg-red-600 text-xl py-6 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
          <Pizza className="mr-2 animate-spin-slow" />
          <Link href="/new-user">Start Eating Now!</Link>
        </Button>
      </div>
    </div>
  )
}