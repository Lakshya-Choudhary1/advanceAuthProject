import FloatingShape from "./components/FloatingShape.jsx";
import { Navigate, Route,Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import DashboardPage from "./pages/DashboardPage.jsx"
import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ResetPassword from "./pages/ResetPassword.jsx"
import { useAuthStore } from "./store/auth.store.js";
import { useEffect } from "react";
//redirect authenticated user to homePage
const RedirectAuthenticatedUser= ({children}) => {
  const {isAuthenticated,user} = useAuthStore();
  if(isAuthenticated && user.isVerified) return <Navigate to='/' replace/>
  return children
}

const ProtectedRoute = ({children}) =>{
  const {isAuthenticated,user} = useAuthStore();
  if(!isAuthenticated ) return <Navigate to="/login" replace/>
  return children
}

const App = () =>{
  const {checkAuth,isCheckingAuth} = useAuthStore();
  useEffect(()=>{
     checkAuth() ;
  },[checkAuth])

  
 if(isCheckingAuth) return <LoadingSpinner />


  return<>
    <div className="h-screen bg-linear-to-br  from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
        
        <FloatingShape 
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />

        <FloatingShape 
          color="bg-emerald-500"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />

        <FloatingShape 
          color="bg-green-500"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />

        <Routes>

          <Route path="/" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />

          <Route path="/signup" element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
            }/>

          <Route path="/login" element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
            }/>

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser >
              <ResetPassword />
            </RedirectAuthenticatedUser>
            } />
          
          <Route path="/verify-email" element={<EmailVerification />} />
        </Routes>
    </div>
  </>
}

export default App;