
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: "Samsung Galaxy A52",
      productId: "prod-123",
      customer: "Abebe Kebede",
      customerId: "cust-567",
      rating: 5,
      comment: "Excellent phone with great features and battery life. The camera quality is amazing for this price range.",
      status: "approved",
      date: "2023-04-10T10:23:00Z"
    },
    {
      id: 2,
      product: "Vintage Leather Jacket",
      productId: "prod-456",
      customer: "Sara Tekle",
      customerId: "cust-891",
      rating: 4,
      comment: "Good quality leather and very stylish. One star less because it runs a bit large.",
      status: "approved",
      date: "2023-04-09T14:45:00Z"
    },
    {
      id: 3,
      product: "Office Chair",
      productId: "prod-789",
      customer: "Yonas Alemu",
      customerId: "cust-234",
      rating: 2,
      comment: "Not comfortable at all. Makes noise when you move and the armrests are poorly made.",
      status: "pending",
      date: "2023-04-08T09:12:00Z"
    },
    {
      id: 4,
      product: "Coffee Maker",
      productId: "prod-012",
      customer: "Tigist Haile",
      customerId: "cust-345",
      rating: 5,
      comment: "Best coffee maker I've ever owned. Makes perfect coffee every time and very easy to clean.",
      status: "approved",
      date: "2023-04-07T16:30:00Z"
    },
    {
      id: 5,
      product: "Desk Lamp",
      productId: "prod-345",
      customer: "Dawit Gebre",
      customerId: "cust-678",
      rating: 1,
      comment: "Terrible product! Stopped working after 2 days. Complete waste of money.",
      status: "rejected",
      date: "2023-04-06T11:05:00Z"
    }
  ]);
  
  const [viewingReview, setViewingReview] = useState(null);
  const [isReviewDetailsOpen, setIsReviewDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { toast } = useToast();
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const updateReviewStatus = (reviewId, newStatus) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId ? { ...review, status: newStatus } : review
    );
    
    setReviews(updatedReviews);
    
    if (viewingReview && viewingReview.id === reviewId) {
      setViewingReview({ ...viewingReview, status: newStatus });
    }
    
    const actionText = newStatus === "approved" ? "approved" : "rejected";
    
    toast({
      title: `Review ${actionText}`,
      description: `The review has been ${actionText} successfully.`,
    });
  };
  
  const getStatusBadge = (status) => {
    const statusColors = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={statusColors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 3l2.5 5 5.5.8-4 3.9.9 5.4-4.9-2.6L5 18.1l.9-5.4-4-3.9 5.5-.8L10 3z"
              clipRule="evenodd"
            />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-500">{rating}/5</span>
      </div>
    );
  };
  
  const filteredReviews = reviews.filter(review => {
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
    const matchesSearch = review.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesRating && matchesSearch;
  });
  
  return (
    <>
      <AdminNavbar />
      <AdminLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Reviews Management</h1>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{getInitials(review.customer)}</AvatarFallback>
                        </Avatar>
                        <span>{review.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{review.product}</TableCell>
                    <TableCell>{getRatingStars(review.rating)}</TableCell>
                    <TableCell>{getStatusBadge(review.status)}</TableCell>
                    <TableCell>{format(new Date(review.date), "PP")}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setViewingReview(review);
                            setIsReviewDetailsOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          {review.status !== "approved" && (
                            <DropdownMenuItem onClick={() => updateReviewStatus(review.id, "approved")}>
                              <CheckCircle className="mr-2 h-4 w-4" /> Approve
                            </DropdownMenuItem>
                          )}
                          {review.status !== "rejected" && (
                            <DropdownMenuItem onClick={() => updateReviewStatus(review.id, "rejected")}>
                              <XCircle className="mr-2 h-4 w-4" /> Reject
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReviews.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No reviews found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Review Details Dialog */}
        <Dialog open={isReviewDetailsOpen} onOpenChange={setIsReviewDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
            </DialogHeader>
            {viewingReview && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getInitials(viewingReview.customer)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{viewingReview.customer}</p>
                        <p className="text-sm text-gray-500">Customer ID: {viewingReview.customerId}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {format(new Date(viewingReview.date), "PPP")}
                    </p>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-500">Product</p>
                    <p>{viewingReview.product} (ID: {viewingReview.productId})</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Rating</p>
                  <div className="mt-1">{getRatingStars(viewingReview.rating)}</div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Review Comment</p>
                  <div className="mt-1 bg-gray-50 p-3 rounded-md">
                    <p>{viewingReview.comment}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(viewingReview.status)}</div>
                </div>
                
                {viewingReview.status === "pending" && (
                  <div className="flex justify-end space-x-3 pt-2">
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => updateReviewStatus(viewingReview.id, "rejected")}
                    >
                      <XCircle className="mr-2 h-4 w-4" /> Reject
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => updateReviewStatus(viewingReview.id, "approved")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" /> Approve
                    </Button>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </>
  );
};

export default ReviewsManagement;
