
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample FAQ data
const FAQData = [
  {
    category: "Shopping",
    questions: [
      {
        question: "How do I search for products?",
        answer: "You can use the search bar at the top of the page to search for products by keyword, category, or seller name. You can also browse products by category using our navigation menu."
      },
      {
        question: "Can I negotiate prices with sellers?",
        answer: "Yes, many sellers are open to price negotiations. You can contact the seller directly through the product page to discuss the price."
      },
      {
        question: "How do I pay for items?",
        answer: "YetuMarket supports various payment methods including mobile money, bank transfers, and cash on delivery depending on the seller's preferences."
      },
      {
        question: "What is your return policy?",
        answer: "Return policies vary by seller. Please check the individual product listings for specific return information. Generally, you should contact the seller within 48 hours of receiving the item if you wish to return it."
      },
    ]
  },
  {
    category: "Account",
    questions: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign in' button at the top right of the page, then select 'Sign up'. Fill out the registration form with your details and submit."
      },
      {
        question: "How can I reset my password?",
        answer: "If you forgot your password, you can reset it by clicking on 'Sign in', then 'Forgot password?'. You'll receive an email with instructions to reset your password."
      },
      {
        question: "Can I have both buyer and seller accounts?",
        answer: "Yes, you can both buy and sell on YetuMarket with the same account. Once logged in, you can access selling features from your account dashboard."
      },
    ]
  },
  {
    category: "Selling",
    questions: [
      {
        question: "How do I list an item for sale?",
        answer: "To sell an item, log into your account, click on 'Sell' in the navigation menu, and fill out the product listing form with all required information including photos, description, and price."
      },
      {
        question: "What are the fees for selling on YetuMarket?",
        answer: "YetuMarket charges a small commission fee of 3% on successfully completed sales. There are no listing fees or monthly subscription fees."
      },
      {
        question: "How do I handle shipping?",
        answer: "As a seller, you're responsible for arranging shipping or delivery. You can offer various shipping methods and specify the shipping costs in your listing."
      },
    ]
  },
  {
    category: "Safety & Security",
    questions: [
      {
        question: "How does YetuMarket protect my personal information?",
        answer: "YetuMarket uses industry-standard security measures to protect your personal information. We never share your contact details with third parties without your consent."
      },
      {
        question: "What should I do if I suspect a fraudulent listing?",
        answer: "If you encounter a suspicious listing or user, please report it immediately using the 'Report' button on the listing or by contacting our customer support team."
      },
      {
        question: "How can I ensure safe transactions?",
        answer: "We recommend meeting in public places for in-person transactions, inspecting items before payment, and using secure payment methods. Avoid wire transfers to unknown individuals."
      },
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filteredFAQs = searchQuery.trim() 
    ? FAQData.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : FAQData;
  
  const displayFAQs = activeCategory 
    ? filteredFAQs.filter(category => category.category === activeCategory)
    : filteredFAQs;
  
  return (
    <div className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <nav className="flex items-center space-x-1">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Frequently Asked Questions</span>
          </nav>
        </div>
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help?</h1>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Find answers to frequently asked questions about using YetuMarket, from account management to buying and selling on our platform.
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search FAQs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Categories and FAQs */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Categories */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-lg mb-4 px-2">Categories</h2>
              <div className="space-y-1">
                <Button
                  variant={activeCategory === null ? "default" : "ghost"}
                  className={`w-full justify-start ${activeCategory === null ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  onClick={() => setActiveCategory(null)}
                >
                  All Categories
                </Button>
                {FAQData.map((category) => (
                  <Button
                    key={category.category}
                    variant={activeCategory === category.category ? "default" : "ghost"}
                    className={`w-full justify-start ${activeCategory === category.category ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => setActiveCategory(category.category)}
                  >
                    {category.category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {displayFAQs.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try using different keywords or browse by category</p>
                </div>
              ) : (
                displayFAQs.map((category, index) => (
                  <div key={category.category} className={index > 0 ? "mt-8" : ""}>
                    <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((item, qIndex) => (
                        <AccordionItem key={qIndex} value={`${category.category}-${qIndex}`} className="border rounded-md">
                          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pt-1 pb-3 text-gray-600">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              )}
              
              {/* Contact Support */}
              <div className="mt-12 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">Can't find what you're looking for?</h3>
                <p className="mb-4 text-gray-600">Our support team is here to help with any questions you may have.</p>
                <Button>Contact Support</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
