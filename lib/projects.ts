export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  domain: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  accent: string;
};

export type ProjectGroup = {
  category: string;
  projects: Project[];
};

const accents = [
  "from-amber-200/80 via-yellow-100/60 to-transparent",
  "from-purple-200/50 via-violet-100/40 to-transparent",
  "from-orange-200/70 via-amber-100/50 to-transparent",
  "from-yellow-200/80 via-amber-100/40 to-transparent",
  "from-violet-200/50 via-purple-100/30 to-transparent",
  "from-amber-300/60 via-orange-100/40 to-transparent",
];

let accentIndex = 0;

function nextAccent() {
  const accent = accents[accentIndex % accents.length];
  accentIndex += 1;
  return accent;
}

function gh(repo: string): ProjectLink {
  return { label: "GitHub", href: `https://github.com/YashwanthReddyS/${repo}` };
}

function project(
  title: string,
  domain: string,
  description: string,
  stack: string[],
  links: ProjectLink[],
): Project {
  return { title, domain, description, stack, links, accent: nextAccent() };
}

export const featuredProjects: Project[] = [
  project(
    "ICTPI Official Website",
    "Full Stack Web Application",
    "Official web platform with responsive UI, content management, and production-ready full-stack architecture.",
    ["React", "Node.js", "Full Stack"],
    [{ label: "Live Demo", href: "#" }],
  ),
  project(
    "ELVA Learning Platform",
    "Android Application",
    "Mobile learning platform published on Google Play with structured courses and interactive learning flows.",
    ["React Native", "Android", "Mobile"],
    [{ label: "Google Play", href: "#" }],
  ),
  project(
    "Enandi",
    "Android Application",
    "Android application focused on accessible mobile experiences with polished UI and reliable performance.",
    ["Android", "Kotlin", "Mobile"],
    [{ label: "Google Play", href: "#" }],
  ),
  project(
    "Vehicle Entry Tracking System",
    "Cloud + Full Stack",
    "Cloud-connected vehicle entry tracking with real-time logging, dashboards, and secure backend APIs.",
    ["Cloud", "Node.js", "MongoDB", "REST APIs"],
    [gh("vehicle-entry-system")],
  ),
  project(
    "Candidate Examination Portal",
    "Admin Dashboard",
    "Exam management portal for scheduling tests, managing candidates, and monitoring results.",
    ["React", "Node.js", "Admin Dashboard"],
    [gh("exam-management-system")],
  ),
  project(
    "Digital ID Card Generator",
    "React Native",
    "Mobile app for generating and managing digital ID cards with customizable templates.",
    ["React Native", "JavaScript", "Mobile"],
    [gh("id-card-generator")],
  ),
  project(
    "AI Network Failure Detection",
    "Machine Learning",
    "ML pipeline to detect and classify network failures using trained models and analytics.",
    ["Python", "Machine Learning", "Networking"],
    [gh("network-failure-ai")],
  ),
  project(
    "Social Media Analytics",
    "Big Data (Cassandra)",
    "Large-scale social media analytics platform using Cassandra for high-throughput data storage.",
    ["Cassandra", "Big Data", "Analytics"],
    [gh("social-media-analytics")],
  ),
  project(
    "Hadoop Data Processing",
    "Big Data",
    "Distributed data processing workflows with Hadoop MapReduce for batch analytics.",
    ["Hadoop", "MapReduce", "Big Data"],
    [gh("hadoop-mapreduce")],
  ),
  project(
    "Competitive Programming Dashboard",
    "Web Application",
    "Dashboard for tracking CP progress, contests, and performance metrics across platforms.",
    ["React", "Web App", "Data Visualization"],
    [gh("cp-dashboard")],
  ),
  project(
    "Expense Tracker",
    "MERN",
    "Full-stack expense tracking app with categories, reports, and user authentication.",
    ["MongoDB", "Express", "React", "Node.js"],
    [gh("expense-tracker")],
  ),
  project(
    "Chat Application",
    "MERN + Socket.IO",
    "Real-time chat application with rooms, messaging, and live updates via WebSockets.",
    ["Socket.IO", "MERN", "Real-Time"],
    [gh("chat-app")],
  ),
  project(
    "E-Commerce Platform",
    "MERN",
    "Online store with product catalog, cart, checkout flows, and admin management.",
    ["MERN", "REST APIs", "E-Commerce"],
    [gh("ecommerce-platform")],
  ),
  project(
    "SQL Analytics Dashboard",
    "Data Analytics",
    "Interactive SQL analytics dashboard for querying, visualizing, and exploring datasets.",
    ["SQL", "React", "Data Analytics"],
    [gh("sql-dashboard")],
  ),
];

export const additionalProjectGroups: ProjectGroup[] = [
  {
    category: "System Programming",
    projects: [
      project(
        "Mini Linux Shell",
        "System Programming",
        "UNIX shell supporting pipes, redirection, background jobs, signals, and process management using fork(), exec(), wait(), and pipes.",
        ["C", "POSIX", "Shell"],
        [gh("linux-shell")],
      ),
      project(
        "Custom Memory Allocator",
        "System Programming",
        "Simplified malloc() and free() using linked lists and memory pools with fragmentation reduction.",
        ["C", "Memory Management"],
        [gh("custom-malloc")],
      ),
      project(
        "Multithreaded File Server",
        "System Programming",
        "Concurrent TCP file server for multiple clients using POSIX threads, mutexes, and semaphores.",
        ["C", "POSIX Threads", "TCP"],
        [gh("file-server")],
      ),
      project(
        "Process Scheduler Simulator",
        "System Programming",
        "Simulates FCFS, SJF, Priority, Round Robin, and Multilevel Queue with CPU utilization visualization.",
        ["C", "OS Concepts", "Scheduling"],
        [gh("process-scheduler")],
      ),
      project(
        "Mini Operating System Simulator",
        "System Programming",
        "Simulates process creation, paging, memory allocation, deadlock detection, and scheduling.",
        ["C", "OS Simulation"],
        [gh("os-simulator")],
      ),
    ],
  },
  {
    category: "Distributed Systems",
    projects: [
      project(
        "Distributed Key-Value Store",
        "Distributed Systems",
        "Redis-like distributed key-value database with replication and consistent hashing.",
        ["Distributed Systems", "Replication"],
        [gh("distributed-kv-store")],
      ),
      project(
        "Distributed File Storage",
        "Distributed Systems",
        "Chunk replication, fault tolerance, and leader election for reliable file storage.",
        ["Fault Tolerance", "Distributed Storage"],
        [gh("distributed-storage")],
      ),
      project(
        "URL Shortener",
        "Distributed Systems",
        "Scalable URL shortening service with analytics and caching layers.",
        ["Scalability", "Caching", "Backend"],
        [gh("url-shortener")],
      ),
    ],
  },
  {
    category: "Cloud Computing",
    projects: [
      project(
        "Serverless Image Processing",
        "Cloud Computing",
        "AWS Lambda image compression pipeline triggered by S3 uploads.",
        ["AWS Lambda", "S3", "Serverless"],
        [gh("serverless-image-processing")],
      ),
      project(
        "Cloud File Sharing Platform",
        "Cloud Computing",
        "Secure cloud storage with presigned URLs and role-based access control.",
        ["Cloud Storage", "RBAC", "Security"],
        [gh("cloud-file-sharing")],
      ),
    ],
  },
  {
    category: "DevOps",
    projects: [
      project(
        "CI/CD Pipeline",
        "DevOps",
        "Automated build, testing, Docker image creation, and deployment with GitHub Actions.",
        ["GitHub Actions", "Docker", "CI/CD"],
        [gh("cicd-pipeline")],
      ),
      project(
        "Kubernetes Deployment",
        "DevOps",
        "Containerized applications deployed on Kubernetes with autoscaling.",
        ["Kubernetes", "Docker", "Autoscaling"],
        [gh("kubernetes-demo")],
      ),
    ],
  },
  {
    category: "AI / Machine Learning",
    projects: [
      project(
        "Resume ATS Analyzer",
        "AI / Machine Learning",
        "AI-powered resume scoring with keyword extraction and ATS compatibility analysis.",
        ["NLP", "Python", "AI"],
        [gh("ats-resume-checker")],
      ),
      project(
        "Face Recognition Attendance",
        "AI / Machine Learning",
        "OpenCV-based attendance system with real-time face recognition.",
        ["OpenCV", "Computer Vision"],
        [gh("face-attendance")],
      ),
      project(
        "ChatGPT-like RAG Chatbot",
        "AI / Machine Learning",
        "Retrieval-Augmented Generation chatbot using vector embeddings and LLMs.",
        ["RAG", "LLMs", "Embeddings"],
        [gh("rag-chatbot")],
      ),
    ],
  },
  {
    category: "Data Engineering",
    projects: [
      project(
        "ETL Pipeline",
        "Data Engineering",
        "End-to-end ETL pipeline with Kafka, Spark, PostgreSQL, and Airflow.",
        ["Kafka", "Spark", "Airflow"],
        [gh("etl-pipeline")],
      ),
      project(
        "Real-Time Streaming Analytics",
        "Data Engineering",
        "Streaming data processing using Apache Kafka and Spark Streaming.",
        ["Kafka", "Spark Streaming"],
        [gh("stream-processing")],
      ),
    ],
  },
  {
    category: "Cybersecurity",
    projects: [
      project(
        "Vulnerability Scanner",
        "Cybersecurity",
        "Automated network scanning and CVE reporting with detailed HTML reports.",
        ["Security", "Network Scanning"],
        [gh("vulnerability-scanner")],
      ),
      project(
        "Password Manager",
        "Cybersecurity",
        "Encrypted password vault using AES-256 with secure authentication.",
        ["AES-256", "Cryptography"],
        [gh("password-manager")],
      ),
    ],
  },
  {
    category: "Networking",
    projects: [
      project(
        "Packet Sniffer",
        "Networking",
        "Packet analyzer similar to Wireshark built with raw sockets.",
        ["Raw Sockets", "Networking"],
        [gh("packet-sniffer")],
      ),
      project(
        "Network Monitoring Dashboard",
        "Networking",
        "Real-time bandwidth and latency monitoring with alerting and visualization.",
        ["Monitoring", "Networking"],
        [gh("network-monitor")],
      ),
    ],
  },
  {
    category: "Database Systems",
    projects: [
      project(
        "Mini SQL Engine",
        "Database Systems",
        "Lightweight SQL database with CRUD, indexing, and query parsing.",
        ["SQL", "Indexing", "Database"],
        [gh("mini-sql-engine")],
      ),
      project(
        "Database Backup Manager",
        "Database Systems",
        "Automated backup scheduling, compression, and cloud synchronization.",
        ["Backups", "Cloud Sync"],
        [gh("db-backup-manager")],
      ),
    ],
  },
];
