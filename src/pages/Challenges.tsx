
import React, { useState, useEffect } from 'react';
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
import { useChallenges } from '@/context/ChallengeContext';



const categories = ["All", "NLP", "Computer Vision", "Data Analysis"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const Challenges = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const { allChallenges, createdChallenges } = useChallenges();

  // Log challenges on component mount for debugging
  useEffect(() => {
    console.log('All challenges in Challenges component:', allChallenges);
    console.log('Created challenges in Challenges component:', createdChallenges);
  }, [allChallenges, createdChallenges]);
  
  // Log challenges on component mount for debugging
  useEffect(() => {
    console.log('All challenges in Challenges component:', allChallenges);
    console.log('Created challenges in Challenges component:', createdChallenges);
  }, [allChallenges, createdChallenges]);


  
  // Filter challenges based on selected filters
  const filteredChallenges = allChallenges.filter(challenge => {
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
                <div className="flex flex-col items-center mt-4 space-y-4">
                  <button 
                    onClick={() => {
                      setCategoryFilter("All");
                      setDifficultyFilter("All");
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Clear filters
                  </button>
                  
                  <button
                    onClick={() => {
                      // Force reload the page to refresh challenges from Supabase
                      window.location.reload();
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Refresh Challenges
                  </button>
                </div>
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
