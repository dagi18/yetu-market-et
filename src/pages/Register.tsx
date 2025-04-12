import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useAuth } from "@/contexts/AuthContext";
import Header from '@/components/Header';

export default function Register() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string; email: string; is_admin: boolean } | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    setError(null);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    // Validate phone number format for Ethiopia (+251)
    const phoneRegex = /^\+251[0-9]{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid Ethiopian phone number starting with +251');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create auth user with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: formData.fullName,
            phone_number: formData.phone,
            location: formData.location
          }
        }
      });

      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error('User creation failed');
      }

      // Step 2: Create user profile in public.users table (without password)
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: formData.email,
          full_name: formData.fullName,
          phone_number: formData.phone,
          location: formData.location,
          is_verified: false,
          created_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });

      // Clear form data
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        location: ''
      });

      // Navigate to verification pending page with email
      navigate('/verification-pending', { state: { email: formData.email } });
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to generate a strong password
  const generateStrongPassword = () => {
    const length = 12;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = uppercase + lowercase + numbers + symbols;
    
    let password = '';
    // Ensure at least one of each type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest randomly
    for (let i = 0; i < length - 4; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setFormData(prev => ({
      ...prev,
      password,
      confirmPassword: password
    }));
    checkPasswordStrength(password);
  };

  // Function to check password strength
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[a-z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^A-Za-z0-9]/)) strength += 20;
    setPasswordStrength(strength);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('full_name, email, is_admin')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setProfile(data);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        user={profile ? {
          id: user?.id || '',
          email: profile.email,
          full_name: profile.full_name,
          is_admin: profile.is_admin
        } : null} 
        onSignOut={signOut}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Join YetuMarket to start buying and selling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+251"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Enter your location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                    className="pr-24"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                    <button
                      type="button"
                      onClick={generateStrongPassword}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Generate strong password"
                    >
                      <RefreshCw className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress 
                    value={passwordStrength} 
                    className={`h-1 ${
                      passwordStrength <= 20 ? 'bg-red-200' : 
                      passwordStrength <= 60 ? 'bg-yellow-200' : 
                      'bg-green-200'
                    }`}
                  >
                    <div
                      className={`h-full transition-all ${
                        passwordStrength <= 20 ? 'bg-red-500' : 
                        passwordStrength <= 60 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </Progress>
                  <p className={`text-xs ${
                    passwordStrength <= 20 ? 'text-red-500' : 
                    passwordStrength <= 60 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {passwordStrength === 0 && "No password"}
                    {passwordStrength === 20 && "Weak password"}
                    {passwordStrength === 40 && "Fair password"}
                    {passwordStrength === 60 && "Good password"}
                    {passwordStrength === 80 && "Strong password"}
                    {passwordStrength === 100 && "Very strong password"}
                  </p>
                  <div className="text-xs space-y-1 mt-2">
                    <p className="font-medium text-gray-700">Password requirements:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-500">
                      <li className={formData.password.length >= 8 ? "text-green-600" : ""}>
                        At least 8 characters long
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? "text-green-600" : ""}>
                        At least one uppercase letter
                      </li>
                      <li className={/[a-z]/.test(formData.password) ? "text-green-600" : ""}>
                        At least one lowercase letter
                      </li>
                      <li className={/[0-9]/.test(formData.password) ? "text-green-600" : ""}>
                        At least one number
                      </li>
                      <li className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-600" : ""}>
                        At least one special character
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-green hover:underline">
                Login here
              </Link>
            </div>
            <div className="text-center text-xs text-gray-500">
              By registering, you agree to YetuMarket's{' '}
              <Link to="/terms" className="text-brand-green hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-brand-green hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 