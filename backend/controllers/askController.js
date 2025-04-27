import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Important to load environment variables

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2';

export const askQuestion = async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      {
        inputs: {
          question: question,
          context: "Education Loans:\n\nSBI Student Loan Scheme\nLoan Amount: Up to ₹10 lakh for studies in India.\nInterest Rate: 8.65% - 10.15% per annum.\nRepayment Period: Up to 15 years after course completion.\nRequired Documents: Academic records, admission letter, collateral details (for loans above ₹7.5 lakh).\n\nVidya Lakshmi Portal Loans\nLoan Amount: Varies by bank.\nInterest Rate: 8.40% - 11.75% per annum.\nSpecial Features: Central government portal connecting multiple banks.\nRequired Documents: Course details, institution details, family income.\n\nHDFC Credila Education Loan\nLoan Amount: No upper limit specified.\nInterest Rate: Starting from 9.55% per annum.\nRepayment Period: Up to 15 years.\nRequired Documents: Academic history, course details, co-applicant information.\n\nBank of Baroda Education Loan\nLoan Amount: Up to ₹10 lakh for studies in India.\nInterest Rate: 8.70% - 9.70% per annum.\nSpecial Feature: 0.50% interest concession for girl students.\nRequired Documents: Academic records, admission proof, income details.\n\nCentral Sector Interest Subsidy Scheme\nBenefit: Full interest subsidy during moratorium period.\nEligibility: Family income below ₹4.5 lakh per annum.\nRequired Documents: Income certificate, loan approval letter, course details.\n\nScholarships:\n\nPM Scholarship\nProvider: Government of India.\nEligibility: Family income below ₹5 lakh.\nBenefits: Up to ₹50,000 INR.\nRequired Documents: Income proof, Aadhaar card.\nApplication: Online portal.\n\nState Government Scholarships\nProvider: Various State Governments.\nEligibility: Varies by state; based on economic and reservation categories.\nBenefits: Tuition fee waiver plus maintenance allowance.\nRequired Documents: Domicile certificate, category certificate, income certificate.\nApplication: Online portal.\n\nPragati Scholarship (AICTE)\nProvider: Government of India.\nEligibility: Girl students in AICTE-approved technical institutions.\nBenefits: ₹50,000 per annum or tuition fees (whichever is less).\nRequired Documents: Gender proof, AICTE institution confirmation, family income proof.\nApplication: Online portal.\n\nNational Means-cum-Merit Scholarship\nProvider: Government of India.\nEligibility: Meritorious students from economically weaker sections.\nBenefits: ₹12,000 per annum.\nRequired Documents: Income certificate, merit rankings, entrance exam scores.\nApplication: Online portal.\n\nINSPIRE Scholarship\nProvider: Government of India.\nEligibility: Students pursuing science degrees; top 1% in Class 12 board exams.\nBenefits: ₹80,000 per annum.\nRequired Documents: Class 12 marksheet, science stream confirmation, college admission details.\nApplication: Online portal.\n\nPrime Minister's Scholarship Scheme\nProvider: Government of India.\nEligibility: Wards of ex-servicemen or ex-Coast Guards.\nBenefits: ₹2,500 per month for boys, ₹3,000 per month for girls.\nRequired Documents: Parent’s service certificate, student ID, course details.\nApplication: Online portal.\n\nCentral Sector Scholarship Scheme\nProvider: Government of India.\nEligibility: Students scoring 80%+ in Class 12, family income below ₹8 lakh/year.\nBenefits: ₹12,000 per annum for degree courses.\nRequired Documents: Income certificate, Class 12 marksheet, admission proof.\nApplication: Online portal.\n\nPost-Matric Scholarship for SC Students\nProvider: Government of India.\nEligibility: SC category students, family income below ₹2.5 lakh/year.\nBenefits: Covers tuition fees, maintenance allowance, study tour charges.\nRequired Documents: Category certificate, income certificate, previous academic records.\nApplication: Online portal."
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`
        }
      }
    );

    const answer = response.data.answer;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get answer" });
  }
};
