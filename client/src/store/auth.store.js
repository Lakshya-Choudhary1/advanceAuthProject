import { create } from "zustand";
import axios from "axios";

const API_URL = "https://localhost:3000/api/auth"; 

// Create an axios instance for reuse
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const useAuthStore = create((set, get) => ({
  user: {name:'',isVerifed:false},
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  // SIGNUP
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/signup", { email, password, name });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  //login
  login: async(email,password)=>{
       set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/login", { email, password});
      set({
        user: res.data.user,
        isAuthenticated: true,
        error:null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  logout:async()=>{
    set({isLoading:true,error:null});
    try{
      await axios.get(`${API_URL}/logout`);

      set({user:null , isAuthenticated:false ,error:null , isLoading:false})
    }catch(err){
      set({error:"Error logging out",isLoading:false})
      throw err;
    }
  }
  ,
  // VERIFY EMAIL
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/verify-email", { code });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  // CHECK AUTH STATUS
  checkAuth: async () => {

    set({ error: null, isCheckingAuth: true });
    await new Promise((resolve)=> setTimeout(resolve,2000))
    try {
      const res = await axiosInstance.get("/check-auth");
      set({
        user: res.data.user, 
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Not authenticated",
        isAuthenticated: false,
        user: null,
        isCheckingAuth: false,
      });
    }
  },

  forgotPassword: async(email) =>{
      set({isLoading:true,error:null,message:null})
      try{
        const res = await axios.post(`${API_URL}/forgot-password`,{email});
        set({message: res.data.message , isLoading:false})
      }catch(err){
        set({isLoading:false,error:"Error sending reset password link"})
        throw err;
      }
  },

  resetPassword: async(password,token)=>{
    set({error: null,isLoading: true})
    try{
      const res = await axios.post(`${API_URL}/reset-password/${token}`,{password});
      set({message:res.data.message , isLoading:false})
    }catch(err){
      set({isLoading:false,error:"Error  reseting password "})
      throw err;
    }
  }
  
}));
