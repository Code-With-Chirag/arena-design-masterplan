
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Navbar from '@/components/Navbar';
import ChallengeCard from '@/components/ChallengeCard';
import Footer from '@/components/Footer';

// Mock data for challenges
const challengesData = [
  {
    id: "1",
    title: "Autonomous AI Assistant for Marketing Teams",
    sponsor: "MarketGenius Inc.",
    description: "Build an AI that can generate marketing copy, analyze campaign performance, and suggest improvements.",
    deadline: "2025-06-15",
    status: "active",
    difficulty: "Intermediate",
    logo: "https://placehold.co/50",
    prize: "$5,000",
    category: "NLP"
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
    prize: "$8,000",
    category: "Computer Vision"
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
    prize: "$3,000",
    category: "Data Analysis"
  },
  {
    id: "4",
    title: "Sentiment Analysis for Customer Feedback",
    sponsor: "FeedbackPro",
    description: "Build a model that accurately categorizes and analyzes customer feedback from multiple channels.",
    deadline: "2025-07-15",
    status: "active",
    difficulty: "Intermediate",
    logo: "https://placehold.co/50",
    prize: "$4,500",
    category: "NLP"
  },
  {
    id: "5",
    title: "Fraud Detection System",
    sponsor: "SecureFinance",
    description: "Develop an AI system that can identify potentially fraudulent transactions in real-time.",
    deadline: "2025-08-01",
    status: "active",
    difficulty: "Advanced",
    logo: "https://placehold.co/50",
    prize: "$10,000",
    category: "Data Analysis"
  },
  {
    id: "6",
    title: "Automated Document Classification",
    sponsor: "DocuOrganize",
    description: "Create an algorithm that can categorize and organize documents based on their content.",
    deadline: "2025-07-10",
    status: "active",
    difficulty: "Beginner",
    logo: "https://placehold.co/50",
    prize: "$2,500",
    category: "NLP"
  }
];

const categories = ["All", "NLP", "Computer Vision", "Data Analysis"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const Challenges = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  // Filter challenges based on selected filters
  const filteredChallenges = challengesData.filter(challenge => {
    const matchesCategory = categoryFilter === "All" || challenge.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "All" || challenge.difficulty === difficultyFilter;
    return matchesCategory && matchesDifficulty;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore AI Challenges</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Browse all active challenges and find the perfect opportunity to showcase your AI skills.
            </p>
          </div>
        </section>
        
        {/* Filters Section */}
        <section className="bg-white py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-end">
              <div className="w-full md:w-48">
                <Select onValueChange={setCategoryFilter} defaultValue={categoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-48">
                <Select onValueChange={setDifficultyFilter} defaultValue={difficultyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
        
        {/* Challenges Grid */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {filteredChallenges.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map(challenge => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">No challenges match your current filters.</h3>
                <button 
                  onClick={() => {
                    setCategoryFilter("All");
                    setDifficultyFilter("All");
                  }}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
