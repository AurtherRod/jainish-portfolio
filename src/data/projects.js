import { ANIMATION_DELAYS } from '../constants';

export const projectsData = [{
  id: 1,
  title: "Racecade (Blockchain Game)",
  description: "Spearheaded the development of a 2D blockchain racing game, building a dynamic inventory system for player-owned assets (NFTs). Implemented a procedural level generation algorithm in C# to ensure infinite replayability and a unique gameplay experience every session.",
  image: "/Images/RaceCade.jpg",
  company: "Coincade Studio",
  technologies: ["Unity", "C#", "Blockchain APIs", "Procedural Generation", "NFT Integration"],
  delay: ANIMATION_DELAYS.NONE,
  achievements: ["Procedural level generation", "NFT inventory system", "Infinite replayability"]
},
{
  id: 2,
  title: "Industrial Training Sims",
  description: "Engineered high-fidelity industrial simulations in Unity, integrating physical Logitech hardware for a realistic training experience. Developed custom vehicle physics and real-time data streaming for instructor monitoring and trainee feedback.",
  image: "/Images/T45.png",
  company: "Tecknotrove",
  technologies: ["Unity 3D", "C#", "Vehicle Physics", "Hardware Integration", "Real-time Systems"],
  delay: ANIMATION_DELAYS.SHORT,
  achievements: ["G29/G27 hardware integration", "Custom vehicle physics", "Real-time monitoring"]
},
{
  id: 3,
  title: "Hypercasual Mobile Games",
  description: "Played a key role in developing 3+ games (e.g., 'Runner Pusher 3D') that collectively amassed over 300,000+ downloads. My contributions included prototyping core 3D gameplay mechanics and implementing features that directly boosted user retention.",
  image: "/Images/hyper-casual.png",
  company: "AAC Studio",
  technologies: ["Unity", "C#", "Editor Scripting", "3D Mechanics", "Mobile Optimization"],
  delay: ANIMATION_DELAYS.MEDIUM,
  achievements: ["300K+ downloads", "3+ published games", "High user retention"]
},
{
  id: 4,
  title: "Trustopay",
  description: "Architected and developed a secure, full-stack payment processing platform handling 1000+ transactions per day with 99.9% uptime. Engineered robust backend APIs using Node.js, integrated major payment gateways, and built an interactive transaction management dashboard with React.",
  image: "/Images/Trustopay.png",
  company: "Trustopay Innovations PVT LTD",
  technologies: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Payment APIs", "React"],
  delay: ANIMATION_DELAYS.LONG,
  github: "https://github.com/AurtherRod/trustopay-backend",
  liveUrl: "https://trustopay.in",
  achievements: ["1000+ daily transactions", "99.9% uptime", "Secure payment processing"]
},
{
  id: 5,
  title: "Class And Class",
  description: "Developed a comprehensive, full-stack class management system supporting 500+ educational institutions. Built scalable Node.js microservices architecture with MongoDB for centralized data management and real-time attendance tracking.",
  image: "/Images/ClassAndClass.jpg",
  company: "Find And Analyze Pvt Ltd",
  technologies: ["Node.js", "Express.js", "MongoDB", "Microservices", "REST APIs", "React"],
  delay: ANIMATION_DELAYS.XLONG,
  github: "https://github.com/AurtherRod/class-management-system",
  liveUrl: "https://classandclass.com",
  achievements: ["500+ institutions supported", "Real-time data sync", "Scalable architecture"]
},


];