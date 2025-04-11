
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Fashion", slug: "fashion", itemCount: 124 },
    { id: 2, name: "Home & Garden", slug: "home-garden", itemCount: 87 },
    { id: 3, name: "Electronics", slug: "electronics", itemCount: 215 },
    { id: 4, name: "Vehicles", slug: "vehicles", itemCount: 56 },
    { id: 5, name: "Property", slug: "property", itemCount: 43 },
    { id: 6, name: "Jobs", slug: "jobs", itemCount: 98 },
    { id: 7, name: "Services", slug: "services", itemCount: 76 },
    { id: 8, name: "Others", slug: "others", itemCount: 32 },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });
  const [searchTerm, setSearchTerm] = useState("");
  
  const { toast } = useToast();
  
  const handleAddCategory = () => {
    // Here you would normally send a request to your backend
    const newCategoryWithId = { 
      ...newCategory, 
      id: Math.max(...categories.map(c => c.id)) + 1,
      itemCount: 0
    };
    
    setCategories([...categories, newCategoryWithId]);
    setNewCategory({ name: "", slug: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Category Added",
      description: `${newCategory.name} has been added successfully.`,
    });
  };
  
  const handleEditCategory = () => {
    // Here you would normally send a request to your backend
    const updatedCategories = categories.map(cat => 
      cat.id === currentCategory.id ? currentCategory : cat
    );
    
    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Category Updated",
      description: `${currentCategory.name} has been updated successfully.`,
    });
  };
  
  const handleDeleteCategory = () => {
    // Here you would normally send a request to your backend
    const filteredCategories = categories.filter(cat => 
      cat.id !== currentCategory.id
    );
    
    setCategories(filteredCategories);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Category Deleted",
      description: `${currentCategory.name} has been deleted successfully.`,
    });
  };
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <AdminNavbar />
      <AdminLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Categories Management</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.itemCount}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setCurrentCategory(category);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setCurrentCategory(category);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCategories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      No categories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Add Category Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Category Name</label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="e.g. Electronics"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                <Input
                  id="slug"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                  placeholder="e.g. electronics"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit Category Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            {currentCategory && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">Category Name</label>
                  <Input
                    id="edit-name"
                    value={currentCategory.name}
                    onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-slug" className="text-sm font-medium">Slug</label>
                  <Input
                    id="edit-slug"
                    value={currentCategory.slug}
                    onChange={(e) => setCurrentCategory({...currentCategory, slug: e.target.value})}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleEditCategory}>Update Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Delete Category Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
            </DialogHeader>
            {currentCategory && (
              <div className="py-4">
                <p>Are you sure you want to delete <strong>{currentCategory.name}</strong>?</p>
                <p className="text-gray-500 text-sm mt-2">
                  This action cannot be undone. This will permanently delete the category and remove it from all products.
                </p>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDeleteCategory}>Delete Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </>
  );
};

export default CategoriesManagement;
