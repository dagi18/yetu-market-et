import { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Filter, Search, MapPin, Briefcase, Clock, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Jobs data
const JOBS = [
  {
    id: "j1",
    title: "Sales Manager",
    company: "Ethiopian Trading Company",
    location: "Bole, Addis Ababa",
    type: "Full-time",
    salary: "18,000 - 25,000 ETB per month",
    posted: "Today",
    description: "Leading sales team to achieve company targets and develop client relationships.",
    requirements: "Minimum 3 years experience in sales management, bachelor's degree, fluent in Amharic and English."
  },
  {
    id: "j2",
    title: "Software Developer",
    company: "Tech Solutions Ethiopia",
    location: "Mexico, Addis Ababa",
    type: "Full-time",
    salary: "30,000 - 45,000 ETB per month",
    posted: "Yesterday",
    description: "Developing web applications using modern JavaScript frameworks like React and Node.js.",
    requirements: "Computer Science degree, 2+ years experience in full-stack development, knowledge of React, Node.js."
  },
  {
    id: "j3",
    title: "Administrative Assistant",
    company: "Global NGO",
    location: "Kazanchis, Addis Ababa",
    type: "Contract",
    salary: "15,000 ETB per month",
    posted: "2 days ago",
    description: "Providing administrative support to the country director and management team.",
    requirements: "Excellent organization skills, proficient in Microsoft Office, minimum 1 year experience."
  },
  {
    id: "j4",
    title: "Chef",
    company: "Luxury Hotel Addis",
    location: "Bole, Addis Ababa",
    type: "Full-time",
    salary: "20,000 - 28,000 ETB per month",
    posted: "3 days ago",
    description: "Preparing high-quality meals and managing kitchen operations for our 5-star hotel.",
    requirements: "Culinary arts degree, minimum 5 years experience in luxury hospitality, knowledge of international cuisine."
  },
  {
    id: "j5",
    title: "Marketing Coordinator",
    company: "Ethiopian Beverage Company",
    location: "CMC, Addis Ababa",
    type: "Full-time",
    salary: "18,000 - 22,000 ETB per month",
    posted: "4 days ago",
    description: "Coordinating marketing campaigns and social media presence for beverage products.",
    requirements: "Marketing degree, 1-2 years experience, strong social media skills, creative mindset."
  },
  {
    id: "j6",
    title: "Driver",
    company: "Logistics Services",
    location: "Piassa, Addis Ababa",
    type: "Full-time",
    salary: "10,000 - 12,000 ETB per month",
    posted: "5 days ago",
    description: "Transporting goods across Addis Ababa and maintaining delivery vehicles.",
    requirements: "Valid driving license, minimum 3 years experience, knowledge of Addis Ababa roads."
  },
];

const JobCard = ({ job, onClick }: { job: any, onClick: () => void }) => {
  return (
    <Card 
      className="p-4 border hover:border-brand-green transition-colors cursor-pointer mb-4"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <div className="text-gray-600">{job.company}</div>
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Posted {job.posted}</span>
            </div>
          </div>
        </div>
        <div className="text-brand-green font-medium">{job.salary}</div>
      </div>
    </Card>
  );
};

const JobDetailModal = ({ job, onClose }: { job: any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <div className="text-lg text-gray-600">{job.company}</div>
            </div>
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Posted {job.posted}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-xl font-semibold text-brand-green mb-1">Salary</div>
            <div>{job.salary}</div>
          </div>
          
          <div className="mb-6">
            <div className="text-xl font-semibold mb-2">Job Description</div>
            <p className="mb-4">{job.description}</p>
          </div>
          
          <div className="mb-6">
            <div className="text-xl font-semibold mb-2">Requirements</div>
            <p>{job.requirements}</p>
          </div>
          
          <div className="mb-6">
            <div className="text-xl font-semibold mb-2">Application Process</div>
            <p>
              Interested candidates should send their CV and cover letter to 
              <span className="text-brand-green"> careers@{job.company.toLowerCase().replace(/ /g, '')}.com</span> 
              with the subject line "{job.title} - Application".
            </p>
            <p className="mt-2">
              Application deadline: 14 days from posting date.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button className="flex-1">Apply Now</Button>
            <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  return (
    <div className="flex-grow bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white py-2 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <ol className="flex items-center space-x-1">
              <li><Link to="/" className="hover:text-brand-green">Home</Link></li>
              <li className="flex items-center space-x-1">
                <span>/</span>
                <span className="text-gray-900">Jobs</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Jobs</h1>
          <p className="text-gray-600 mb-0">
            Find job opportunities across various sectors in Ethiopia. Browse listings, apply for positions, and advance your career.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search job title or company"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Types</SelectItem>
                  <SelectItem value="full-time">Full-Time</SelectItem>
                  <SelectItem value="part-time">Part-Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="addis">Addis Ababa</SelectItem>
                  <SelectItem value="adama">Adama</SelectItem>
                  <SelectItem value="hawassa">Hawassa</SelectItem>
                  <SelectItem value="bahirdar">Bahir Dar</SelectItem>
                  <SelectItem value="mekelle">Mekelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Search</Button>
          </div>
          
          <div className="mt-4 flex items-center">
            <Button variant="ghost" className="text-sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-1" />
              More Filters
              <ChevronDown className={`h-4 w-4 ml-1 transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Experience</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Education</SelectItem>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Salary Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Salary</SelectItem>
                  <SelectItem value="10k-20k">10,000 - 20,000 ETB</SelectItem>
                  <SelectItem value="20k-30k">20,000 - 30,000 ETB</SelectItem>
                  <SelectItem value="30k-50k">30,000 - 50,000 ETB</SelectItem>
                  <SelectItem value="50k+">50,000+ ETB</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Job Listings */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                {JOBS.length} Jobs Found
              </h2>
            </div>
            
            {JOBS.map(job => (
              <JobCard 
                key={job.id} 
                job={job}
                onClick={() => setSelectedJob(job)}
              />
            ))}
            
            {/* Pagination */}
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      
      {selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
};

export default Jobs;
