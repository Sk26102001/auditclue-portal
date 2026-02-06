// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { UserRole } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Shield, Building2, Users, Lock, Mail, ArrowRight, CheckCircle } from 'lucide-react';

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [selectedRole, setSelectedRole] = useState<UserRole>('client');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       await login(email, password, selectedRole);
      
//       // Navigate based on role
//       switch (selectedRole) {
//         case 'client':
//           navigate('/client');
//           break;
//         case 'employee':
//           navigate('/employee');
//           break;
//         case 'admin':
//         case 'super_admin':
//           navigate('/admin');
//           break;
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const features = [
//     'Secure document management',
//     'Real-time compliance tracking',
//     'Integrated invoicing & payments',
//     'UAE FTA portal ready',
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
//       <div className="flex min-h-screen">
//         {/* Left side - Branding */}
//         <div className="hidden w-1/2 bg-primary lg:flex lg:flex-col lg:justify-between p-12">
//           <div>
//             <div className="flex items-center">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sidebar-primary ">
//                 <Shield className=" h-7 w-7 text-sidebar-primary-foreground" />
//               </div>
//                      {/* LEFT LOGO */}
//            <div className="flex items-center justify-center  p-2  ">
//             <img
//               src="/logos.png" // uploaded logo
//               alt="Auditclue"
//               className="h-28 w-full object-contain mr-20 "
//             />
//           </div>
//               {/* <span className="text-2xl font-bold text-primary-foreground">Auditclue</span> */}
//             </div>
//           </div>
          
//           <div className="space-y-8">
//             <div>
//               <h1 className="text-4xl font-bold leading-tight text-primary-foreground">
//                 Professional Audit & Tax Practice Management
//               </h1>
//               <p className="mt-4 text-lg text-primary-foreground/80">
//                 Streamline your audit, VAT, and corporate tax workflows with our comprehensive practice management platform.
//               </p>
//             </div>
            
//             <ul className="space-y-4">
//               {features.map((feature, i) => (
//                 <li key={i} className="flex items-center gap-3 text-primary-foreground/90">
//                   <CheckCircle className="h-5 w-5 text-sidebar-primary" />
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <p className="text-sm text-primary-foreground/60">
//             © 2024 Auditclue. All rights reserved.
//           </p>
//         </div>

//         {/* Right side - Login form */}
//         <div className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2 lg:px-16">
//           <div className="w-full max-w-md">
//             {/* Mobile logo */}
//             <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
//                 <Shield className="h-6 w-6 text-primary-foreground" />
//               </div>
//               <span className="text-xl font-bold">Auditclue</span>
//             </div>

//             <Card className="border-0 shadow-soft">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl">Welcome back</CardTitle>
//                 <CardDescription>
//                   Sign in to access your portal
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)} className="mb-6">
//                   <TabsList className="grid w-full grid-cols-3">
//                     <TabsTrigger value="client" className="gap-2">
//                       <Building2 className="h-4 w-4" />
//                       <span className="hidden sm:inline">Client</span>
//                     </TabsTrigger>
//                     <TabsTrigger value="employee" className="gap-2">
//                       <Users className="h-4 w-4" />
//                       <span className="hidden sm:inline">Employee</span>
//                     </TabsTrigger>
//                     <TabsTrigger value="admin" className="gap-2">
//                       <Shield className="h-4 w-4" />
//                       <span className="hidden sm:inline">Admin</span>
//                     </TabsTrigger>
//                   </TabsList>
//                 </Tabs>

//                 <form onSubmit={handleLogin} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="name@company.ae"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <Label htmlFor="password">Password</Label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                       <Input
//                         id="password"
//                         type="password"
//                         placeholder="••••••••"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <label className="flex items-center gap-2 text-sm">
//                       <input type="checkbox" className="rounded border-border" />
//                       Remember me
//                     </label>
//                     <a href="#" className="text-sm font-medium text-primary hover:underline">
//                       Forgot password?
//                     </a>
//                   </div>

//                   <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
//                     {isLoading ? 'Signing in...' : 'Sign in'}
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </form>

//                 {/* <p className="mt-6 text-center text-sm text-muted-foreground">
//                   Demo: Enter any email/password to login as {selectedRole}
//                 </p> */}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { UserRole } from "@/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Shield,
//   Building2,
//   Users,
//   Lock,
//   Mail,
//   ArrowRight,
//   CheckCircle,
// } from "lucide-react";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [selectedRole, setSelectedRole] = useState<UserRole>("client");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       await login(email, password, selectedRole);

//       switch (selectedRole) {
//         case "client":
//           navigate("/client");
//           break;
//         case "employee":
//           navigate("/employee");
//           break;
//         case "admin":
//         case "super_admin":
//           navigate("/admin");
//           break;
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const features = [
//     "Secure document management",
//     "Real-time compliance tracking",
//     "Integrated invoicing & payments",
//     "UAE FTA portal ready",
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-background to-amber-50">
//       <div className="flex min-h-screen">
//         {/* LEFT BRAND PANEL */}
//         <div className="hidden w-1/2 bg-gradient-to-br from-orange-700 via-orange-600 to-amber-500 lg:flex lg:flex-col lg:justify-between p-12">
//           {/* LOGO IMAGE */}
//           {/* LEFT LOGO */}
//           <div className="flex items-center justify-center gap-3 p-2 rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-amber-400 shadow-lg w-16 h-16">
//             <img
//               src="/logos.png" // uploaded logo
//               alt="Auditclue"
//               className="h-12 w-12 object-contain"
//             />
//           </div>

//           {/* MOBILE LOGO */}
//           <div className="mb-8 flex items-center justify-center lg:hidden">
//             <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-amber-400 shadow-lg w-14 h-14 flex items-center justify-center">
//               <img
//                 src="/login.jpeg" // uploaded logo
//                 alt="Auditclue"
//                 className="h-10 w-10 object-contain"
//               />
//             </div>
//           </div>

//           <div className="space-y-8">
//             <div>
//               <h1 className="text-4xl font-bold leading-tight text-white">
//                 Professional Audit & Tax Practice Management
//               </h1>
//               <p className="mt-4 text-lg text-white/80">
//                 Streamline your audit, VAT, and corporate tax workflows with a
//                 modern, regulator-aligned platform.
//               </p>
//             </div>

//             <ul className="space-y-4">
//               {features.map((feature, i) => (
//                 <li key={i} className="flex items-center gap-3 text-white/90">
//                   <CheckCircle className="h-5 w-5 text-amber-300" />
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <p className="text-sm text-white/60">
//             © 2024 Auditclue. All rights reserved.
//           </p>
//         </div>

//         {/* RIGHT LOGIN FORM */}
//         <div className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2 lg:px-16">
//           <div className="w-full max-w-md">
//             {/* MOBILE LOGO IMAGE */}
//             <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
//               <img
//                 src="/images/logo.png" // <-- replace with your image path
//                 alt="Auditclue"
//                 className="h-10 w-10 object-contain"
//               />
//             </div>

//             <Card className="border border-orange-100 shadow-soft backdrop-blur">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl text-orange-700">
//                   Welcome back
//                 </CardTitle>
//                 <CardDescription>Sign in to access your portal</CardDescription>
//               </CardHeader>

//               <CardContent>
//                 <Tabs
//                   value={selectedRole}
//                   onValueChange={(v) => setSelectedRole(v as UserRole)}
//                   className="mb-6"
//                 >
//                   <TabsList className="grid w-full grid-cols-3 bg-orange-50">
//                     <TabsTrigger value="client" className="gap-2">
//                       <Building2 className="h-4 w-4" />
//                       Client
//                     </TabsTrigger>
//                     <TabsTrigger value="employee" className="gap-2">
//                       <Users className="h-4 w-4" />
//                       Employee
//                     </TabsTrigger>
//                     <TabsTrigger value="admin" className="gap-2">
//                       <Shield className="h-4 w-4" />
//                       Admin
//                     </TabsTrigger>
//                   </TabsList>
//                 </Tabs>

//                 <form onSubmit={handleLogin} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label>Email</Label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
//                       <Input
//                         type="email"
//                         placeholder="name@company.ae"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="pl-10 focus-visible:ring-orange-500"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Password</Label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
//                       <Input
//                         type="password"
//                         placeholder="••••••••"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="pl-10 focus-visible:ring-orange-500"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <Button
//                     type="submit"
//                     size="lg"
//                     disabled={isLoading}
//                     className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-700 hover:to-amber-600"
//                   >
//                     {isLoading ? "Signing in..." : "Sign in"}
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </form>

//                 {/* <p className="mt-6 text-center text-sm text-muted-foreground">
//                   Demo: Enter any email/password to login as {selectedRole}
//                 </p> */}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  Building2,
  Users,
  Lock,
  Mail,
  ArrowRight,
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, selectedRole);

      switch (selectedRole) {
        // case 'client':
        //   navigate('/client');
        //   break;
        // case 'employee':
        //   navigate('/employee');
        //   break;
        case 'admin':
        case 'super_admin':
          navigate('/admin');
          break;
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/50 px-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <Card className="relative border-0 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl">
          
          {/* Logo */}
          <div className="flex justify-center pt-8">
            <div className="flex items-center justify-center  px-6 py-4">
<img
  src="./logo2.png"
  alt="Logo"
  className="h-20 sm:h-24 w-auto object-contain"
/>

            </div>
          </div>

          <CardHeader className="text-center pt-1 pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-gray-500">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-8">
            {/* Role Tabs */}
            <Tabs
              value={selectedRole}
              onValueChange={(v) => setSelectedRole(v as UserRole)}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl">
                <TabsTrigger
                  value="client"
                  className="gap-2 rounded-lg data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  <Building2 className="h-4 w-4" />
                  Client
                </TabsTrigger>

                <TabsTrigger
                  value="employee"
                  className="gap-2 rounded-lg data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  <Users className="h-4 w-4" />
                  Employee
                </TabsTrigger>

                <TabsTrigger
                  value="admin"
                  className="gap-2 rounded-lg data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Label>Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-teal-500" />
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 focus-visible:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label>Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-teal-500" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 focus-visible:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="font-semibold text-teal-600 hover:text-teal-500"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full h-11 bg-blue-950 hover:from-teal-400 hover:to-blue-400 shadow-lg shadow-teal-100 transition-all"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* <p className="mt-6 text-center text-xs text-gray-500">
              Demo role:
              <span className="ml-1 font-semibold text-teal-600 uppercase">
                {selectedRole}
              </span>
            </p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}







