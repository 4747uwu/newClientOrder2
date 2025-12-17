import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader, Activity, Heart, Stethoscope, Shield, CheckCircle, ChevronRight } from 'lucide-react';
import ColorBends from '../creative/maxColor';
import ShinyText from '../creative/shinnyText';


// Animated text slider component
const TextSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      title: "Advanced Radiology Solutions",
      subtitle: "Empowering healthcare with cutting-edge diagnostic tools",
      icon: Activity
    },
    {
      title: "Secure Patient Data Management",
      subtitle: "HIPAA compliant and ISO certified platform",
      icon: Shield
    },
    {
      title: "Real-time Collaboration",
      subtitle: "Seamless workflow for medical professionals",
      icon: Heart
    },
    {
      title: "AI-Powered Diagnostics",
      subtitle: "Enhancing accuracy with intelligent technology",
      icon: Stethoscope
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ${
            index === activeSlide 
              ? 'opacity-100 transform translate-x-0' 
              : 'opacity-0 transform -translate-x-4 absolute'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
              <slide.icon className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {slide.title}
              </h3>
              <p className="text-white/90 text-sm drop-shadow">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="flex space-x-2 pt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeSlide 
                ? 'w-8 bg-white' 
                : 'w-1.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Security badge component
const SecurityBadge = () => {
  return (
    <div className="flex items-center justify-center space-x-2 text-xs text-gray-800">
      <Shield className="h-3 w-3 text-gray-700" />
      <span className="font-medium text-gray-900">256-bit Encrypted</span>
      <CheckCircle className="h-3 w-3 text-gray-700" />
    </div>
  );
};

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, error, isAuthenticated, getDashboardRoute, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated()) {
      const dashboardRoute = getDashboardRoute();
      const from = location.state?.from || dashboardRoute;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state, getDashboardRoute]);

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [formData, setError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, password } = formData;

      if (!email.trim() || !password.trim()) {
        throw new Error('Please provide both email and password');
      }

      const { user, redirectTo } = await login(email.trim(), password);

      console.log('✅ Login successful:', {
        role: user.role,
        email: user.email,
        redirectTo
      });

      const from = location.state?.from || redirectTo || getDashboardRoute();
      navigate(from, { replace: true });

    } catch (err) {
      console.error('❌ Login failed:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-black">
      
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <ColorBends
          colors={["#000000", "#0b0b0b", "#1f2937", "#374151", "#6b7280", "#ffffff"]}
          rotation={140}
          speed={0.3}
          scale={1.5}
          frequency={1.4}
          warpStrength={1.17}
          mouseInfluence={0.8}
          parallax={0.7}
          noise={0.08}
          transparent
        />
      </div>

      {/* OVERLAY for better text readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10"></div>
{/* LEFT SIDE - Logo and Text Slider */}
<div className="relative z-20 hidden lg:flex lg:w-1/2 flex-col justify-between p-12">
  {/* Logo at top left corner */}
  <div className="absolute top-8 left-8">
    <img 
      src="/logo3.png" 
      alt="Xcentic PACS Logo" 
      className="h-24 w-auto drop-shadow-2xl mb-2"
    />
    <div className="ml-26 mt-[-24px]">
      <ShinyText 
        text="Empowering Technologist Professionally" 
        disabled={false} 
        speed={3} 
        className='text-sm' 
      />
    </div>
  </div>

  {/* Animated text slides in the middle */}
  <div className="flex-1 flex items-center">
    <div className="w-full max-w-xl">
      <TextSlider />
    </div>
  </div>

  {/* Footer info */}
  <div className="space-y-4">
    <div className="flex items-center space-x-6 text-sm text-white/90">
      <div className="flex items-center space-x-2">
        <Shield className="h-4 w-4" />
        <span>HIPAA Compliant</span>
      </div>
      <div className="w-px h-4 bg-white/20"></div>
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4" />
        <span>ISO Certified</span>
      </div>
    </div>
    <p className="text-xs text-white/60">XCENTIC X CODINGWODING</p>
  </div>
</div>

      {/* RIGHT SIDE - Login Form */}
      <div className="relative z-20 w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          
          {/* Mobile logo (visible only on small screens) */}
          

          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              Welcome Back
            </h2>
            <p className="text-sm text-white/90 drop-shadow">
              Sign in to access your dashboard
            </p>
          </div>

          {/* LOGIN FORM */}
          <div className="bg-white/95 backdrop-blur-xl p-8 shadow-2xl rounded-2xl border border-gray-200">
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@hospital.com"
                    className="block w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all bg-white text-gray-900"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="block w-full pl-11 pr-12 py-3 text-sm border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all bg-white text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white transition-all ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gray-900 to-gray-600 hover:from-gray-800 hover:to-gray-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-white" />
                    Secure Sign In
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <SecurityBadge />
              <div className="text-center">
                <button className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Forgot Password?
                </button>
              </div>
              <p className="text-xs text-center text-gray-500">
                Automatic role-based routing enabled
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;