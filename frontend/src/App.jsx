import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext"; // ✅ correct import
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import Scholarships from "./pages/Scholarships";
import Loans from "./pages/Loans";
import LoanDetails from "./pages/LoanDetails";
import Explore from "./pages/Explore";
import VirtualAssistant from "./pages/VirtualAssistant";
import UserProfile from "./pages/UserProfile";
import ExploreRecommendations from "./pages/ExploreRecommendations";
import QuestionListPage from "./pages/QuestionListPage";
import AskQuestionPage from "./pages/AskQuestionPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import EMICalculatorPage from "./pages/EMICalculatorPage";

function App() {
  return (
    <UserContextProvider> {/* ✅ correct */}
      <Router>
        <Navbar />
        <VirtualAssistant/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add other routes here */}
          <Route path="/scholarships" element={<Scholarships />} />
           <Route path="/scholarships/:id" element={<ScholarshipDetails />}/>
         <Route path="/loans" element={<Loans/>} />
         <Route path="/loans/:id" element={<LoanDetails/>} />
         <Route path="/explore" element={<Explore/>} />
         {/* <Route path="/chat" element={<VirtualAssistant/>} /> */}
         <Route path="/user" element={<UserProfile/>} />
         <Route path="/explore-recommendations" element={<ExploreRecommendations />} />

         <Route path="/questions" element={<QuestionListPage />} />
<Route path="/ask" element={<AskQuestionPage />} />
<Route path="/questions/:id" element={<QuestionDetailPage />} />
<Route path="/emi" element={<EMICalculatorPage/>} />

        </Routes>
        <Footer />
      </Router>
    </UserContextProvider>
  );
}

export default App;
