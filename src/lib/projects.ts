import fireImage from "@/assets/project-forest-fire.jpg";
import examImage from "@/assets/project-exam-monitoring.jpg";
import resumeImage from "@/assets/project-resume-analyzer.jpg";

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  purpose: string;
  image: string;
  imageAlt: string;
  applications: string[];
  technologies: { name: string; role: string }[];
  features: string[];
};

export const projects: Project[] = [
  {
    slug: "forest-fire-early-detection",
    number: "01",
    title: "AI-Powered Forest Fire Early Detection System",
    shortTitle: "Forest Fire Early Detection",
    eyebrow: "Computer vision · IoT · Predictive alerts",
    summary:
      "A connected detection system designed to identify early signs of fire by combining camera intelligence with live environmental sensor readings.",
    purpose:
      "The project explores how computer vision and low-cost field sensors can work together to shorten the time between a possible ignition and a meaningful response. It brings visual detection, environmental context, location data and incident tracking into one monitoring flow.",
    image: fireImage,
    imageAlt: "AI-enabled environmental sensor station monitoring smoke in a forest",
    applications: [
      "Forest and wildlife reserve monitoring",
      "Remote high-risk area surveillance",
      "Emergency response coordination",
      "Historical fire-pattern analysis",
    ],
    technologies: [
      { name: "Python", role: "AI, machine learning and data processing" },
      { name: "OpenCV", role: "Real-time flame and smoke detection" },
      { name: "Machine Learning", role: "Fire-risk prediction" },
      { name: "ESP32", role: "Connected sensor data collection" },
      { name: "Flame, MQ-2 & DHT11", role: "Flame, gas, temperature and humidity sensing" },
      { name: "MySQL & PHP", role: "Incident storage and dashboard communication" },
      { name: "HTML, CSS & JavaScript", role: "Live monitoring interface" },
      { name: "Figma", role: "Interface and experience design" },
    ],
    features: [
      "Real-time flame and smoke detection",
      "Temperature, humidity and smoke monitoring",
      "AI-based fire-risk prediction",
      "Live analytics and camera monitoring",
      "Automated alerts with confidence levels",
      "Fire location using latitude and longitude",
      "Emergency resource and response management",
      "Historical and weekly fire-frequency analysis",
      "Login and authentication flow",
    ],
  },
  {
    slug: "ai-exam-monitoring",
    number: "02",
    title: "AI-Powered Exam Monitoring System",
    shortTitle: "AI Exam Monitoring",
    eyebrow: "Computer vision · Responsible monitoring",
    summary:
      "A real-time monitoring concept that uses computer vision to identify suspicious activity and help reviewers focus on events that need attention.",
    purpose:
      "The system studies how visual signals can support exam integrity without replacing human judgement. It detects people, objects and unusual events, then creates a clear record for an authorised reviewer to assess.",
    image: examImage,
    imageAlt: "Computer vision system monitoring an examination room",
    applications: [
      "Remote and hybrid examinations",
      "Computer-lab assessment monitoring",
      "Review of flagged exam events",
      "Evidence-assisted academic integrity workflows",
    ],
    technologies: [
      { name: "Python", role: "Core processing and detection logic" },
      { name: "OpenCV", role: "Video and image processing" },
      { name: "YOLO", role: "People and object detection" },
      { name: "Computer Vision", role: "Student activity monitoring" },
      { name: "Machine & Deep Learning", role: "Suspicious-activity detection" },
      { name: "NumPy", role: "Image and data processing" },
      { name: "HTML, CSS & JavaScript", role: "Monitoring interface" },
    ],
    features: [
      "Real-time webcam-based monitoring",
      "AI-based suspicious-activity detection",
      "Face detection and recognition workflow",
      "Detection of unauthorised devices",
      "Multiple-person detection",
      "Automatic suspicious-event alerts",
      "Exam violation and event logging",
      "Monitoring dashboard",
      "Evidence snapshot capture",
    ],
  },
  {
    slug: "resume-skill-gap-analyzer",
    number: "03",
    title: "Resume Analyzer & Skill Gap Identifier",
    shortTitle: "Resume & Skill Gap Analyzer",
    eyebrow: "NLP · Role matching · Learning pathways",
    summary:
      "An NLP-based tool that reads a resume, identifies its skills and compares them with a target role to reveal focused next steps for learning.",
    purpose:
      "The project turns an unstructured resume into useful signals. It extracts skills, measures relevance to a chosen role and makes missing capabilities visible, helping a learner move from a broad ambition to a more intentional development plan.",
    image: resumeImage,
    imageAlt: "Resume analysis interface mapping skills to suitable job roles",
    applications: [
      "Student career planning",
      "Role-specific resume improvement",
      "Skill development roadmaps",
      "Candidate and job relevance analysis",
    ],
    technologies: [
      { name: "Python", role: "NLP and processing workflow" },
      { name: "Natural Language Processing", role: "Resume text analysis" },
      { name: "Machine Learning", role: "Skill and job matching" },
      { name: "PDF & Text Extraction", role: "Resume content ingestion" },
      { name: "TF-IDF", role: "Keyword and skill relevance" },
      { name: "SQL / MySQL", role: "Job and skill information storage" },
      { name: "HTML, CSS & JavaScript", role: "Analysis dashboard" },
    ],
    features: [
      "Resume upload and text extraction",
      "Automatic skill extraction",
      "NLP-based resume analysis",
      "Job-role matching",
      "Skill-match percentage",
      "Identification of missing skills",
      "Targeted skill recommendations",
      "Resume analytics dashboard",
      "Job suitability analysis",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}