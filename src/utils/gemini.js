import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../../config/config.js";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateDoctorBio({
  name,
  specialization,
  experience,
  education_detail,
}) {
  const prompt = `Write a professional biography for Dr. ${name}, a highly experienced medical professional 
  specializing in ${specialization}. Dr. ${name} has over ${experience} years of experience and 
  their education is ${education_detail}. They are known for their expertise in 
  ${specialization} and are highly regarded by their patients. Dr. ${name} is dedicated to providing 
  excellent healthcare services.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export { generateDoctorBio };
