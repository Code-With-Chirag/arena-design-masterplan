
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BrainCircuit, Trophy, Building2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ChallengeCard from '@/components/ChallengeCard';
import Footer from '@/components/Footer';

const featuredChallenges = [
  {
    id: "1",
    title: "Autonomous AI Assistant for Marketing Teams",
    sponsor: "MarketGenius Inc.",
    description: "Build an AI that can generate marketing copy, analyze campaign performance, and suggest improvements.",
    deadline: "2025-06-15",
    status: "active",
    difficulty: "Intermediate",
    logo: "https://placehold.co/50",
    prize: "$5,000"
  },
  {
    id: "2",
    title: "Healthcare Diagnostic Image Analysis",
    sponsor: "MediTech Solutions",
    description: "Develop an algorithm to identify anomalies in medical imaging with high accuracy.",
    deadline: "2025-07-01",
    status: "active",
    difficulty: "Advanced",
    logo: "https://placehold.co/50",
    prize: "$8,000"
  },
  {
    id: "3",
    title: "Smart Energy Consumption Predictor",
    sponsor: "EcoFuture",
    description: "Create a model that predicts energy usage patterns to help optimize consumption.",
    deadline: "2025-06-30",
    status: "active",
    difficulty: "Beginner",
    logo: "https://placehold.co/50",
    prize: "$3,000"
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Showcase Your AI Skills. Compete. Get Noticed.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Join challenges, build impactful AI solutions, and connect with innovative companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-100">
                I'm a Builder
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                I'm a Sponsor
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How EliteArena Works</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Builders */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BrainCircuit className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Builders</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Trophy className="w-5 h-5 text-indigo-600 mt-0.5 mr-2" />
                  <span>Participate in real-world AI challenges</span>
                </li>
                <li className="flex items-start">
                  <Trophy className="w-5 h-5 text-indigo-600 mt-0.5 mr-2" />
                  <span>Build your portfolio with innovative solutions</span>
                </li>
                <li className="flex items-start">
                  <Trophy className="w-5 h-5 text-indigo-600 mt-0.5 mr-2" />
                  <span>Get recognized by leading industry sponsors</span>
                </li>
              </ul>
              <Link to="/challenges">
                <Button className="w-full">
                  Explore Challenges <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            {/* For Sponsors */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-sm">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Sponsors</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Trophy className="w-5 h-5 text-purple-600 mt-0.5 mr-2" />
                  <span>Post challenges to find innovative AI solutions</span>
                </li>
                <li className="flex items-start">
                  <Trophy className="w-5 h-5 text-purple-600 mt-0.5 mr-2" />
                  <span>Access a global pool of talented AI builders</span>
                </li>
                <li className="flex items-start">
                  <Trophy className="w-5 h-5 text-purple-600 mt-0.5 mr-2" />
                  <span>Discover cutting-edge approaches to your challenges</span>
                </li>
              </ul>
              <Link to="/sponsors">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Learn About Sponsoring <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Challenges Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Challenges</h2>
            <Link to="/challenges" className="mt-4 md:mt-0 text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
              View All Challenges <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join EliteArena?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
            Start your journey today by signing up as a Builder to compete in challenges or as a Sponsor to discover innovative AI solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-100">
              Sign Up as a Builder
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Sign Up as a Sponsor
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
