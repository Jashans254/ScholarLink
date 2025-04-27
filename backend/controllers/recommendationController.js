import Scholarship from "../models/Scholarship.js";
import Loan from "../models/Loan.js";
import User from "../models/User.js";

// === UTILITY FUNCTIONS ===

// Helper to map user.courseType to broader categories (used in loan matching)
const mapCourseTypeToLevel = (courseType) => {
    const map = {
      "Engineering": "Undergraduate",
      "Medical": "Undergraduate",
      "MBA": "Postgraduate",
      "M.Tech": "Postgraduate",
      "Law": "Professional",
      "Diploma": "Vocational",
      "B.Sc": "Undergraduate",
      "M.Sc": "Postgraduate",
    };
    return map[courseType] || courseType;
  };
  
  // Scholarship matching: Keyword-based + regex parsing
  const matchScholarship = (user, scholarship) => {
    const txt = (scholarship.eligibility || "").toLowerCase();
    const income = user.income || 0;
    let incomeMatch = false;
  
    // —— 1. Parse “below X lakh” or “below X” in hundreds of thousands
    const incRx = txt.match(/below\s*₹?([\d.]+)\s*(lakh|l)?/);
    if (incRx) {
      let limit = parseFloat(incRx[1]);
      if (/lakh|l/i.test(incRx[2])) limit *= 100_000;
      if (income <= limit) incomeMatch = true;
    }
  
    // —— 2. Category: explicit or reservation-based
    const cat = user.category.toLowerCase();
    const categoryMatch = txt.includes(cat)
      || (txt.includes("reservation") && cat !== "general");
  
    // —— 3. Gender
    const genderMatch = txt.includes(user.gender.toLowerCase());
  
    // —— 4. Degree/stream
    const deg = user.academicDetails?.degree.toLowerCase();
    const degreeMatch = deg && txt.includes(deg);
  
    // —— 5. Parent occupation (e.g. “ex-servicemen”)
    const parentMatch = txt.includes(user.parentOccupation.toLowerCase());
  
    // —— 6. State: explicit or “varies by state”
    const stateMatch = txt.includes(user.state.toLowerCase())
      || txt.includes("varies by state");
  
    // —— 7. 12th-marks: “80% or above” etc.
    let marksMatch = false;
    const pctRx = txt.match(/(\d+)%\s*(or above|and above|minimum)/);
    if (pctRx) {
      const required = parseInt(pctRx[1], 10);
      if (user.boardMarks?.twelfth >= required) marksMatch = true;
    }
  
    // —— Combine as OR (any one rule suffices)
    return (
      incomeMatch ||
      categoryMatch ||
      genderMatch ||
      degreeMatch ||
      parentMatch ||
      stateMatch ||
      marksMatch
    );
  };
  
  
// Loan matching: Structured rule-based match
const matchLoan = (user, loan) => {
  const eligibility = loan.eligibilityCriteria;

  const eligibleIncome =
    !eligibility.incomeLimit || user.income <= eligibility.incomeLimit;

  const eligibleCategory =
    !eligibility.category?.length ||
    eligibility.category.includes(user.category);

  const userCourseLevel = mapCourseTypeToLevel(user.courseType);
  const eligibleCourse =
    !eligibility.courseTypes?.length ||
    eligibility.courseTypes.includes(userCourseLevel);

  const eligibleState =
    !eligibility.state?.length || eligibility.state.includes(user.state);

  return eligibleIncome && eligibleCategory && eligibleCourse && eligibleState;
};

// === MAIN CONTROLLER ===

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const [allScholarships, allLoans] = await Promise.all([
      Scholarship.find(),
      Loan.find(),
    ]);

    const matchingScholarships = allScholarships
      .filter((s) => matchScholarship(user, s))
      .slice(0, 3);

    const matchingLoans = allLoans
      .filter((l) => matchLoan(user, l))
      .slice(0, 3);

    return res.status(200).json({
      scholarships: matchingScholarships,
      loans: matchingLoans,
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch recommendations" });
  }
};
