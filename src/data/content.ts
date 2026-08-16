import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Server,
  Database,
  Wrench,
  GraduationCap,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from 'lucide-react';

export const profile = {
  name: 'Rahul Koli',
  title: 'Full-Stack Developer',
  stack: 'PERN + Next.js',
  location: 'Dehradun, Uttarakhand, India',
  email: 'rahulkohli7078@gmail.com',
  phone: '+91-7078101720',
  summary:
    'Full-Stack Developer skilled in the PERN stack and Next.js, with hands-on experience shipping production features across 3 internships. Promoted to Team Lead at Nexzem Technologies, guiding sprint planning and code quality for a 6-member intern batch while building a multi-tenant POS platform serving 8+ retail business verticals.',
  shortSummary:
    'Shipping production-grade web apps on the PERN stack and Next.js — from REST APIs to multi-tenant SaaS platforms.',
  heroImage: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  aboutImage: 'https://images.pexels.com/photos/5473299/pexels-photo-5473299.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'GitHub', href: 'https://github.com/Rahulkoli10', icon: Github },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rahul-koli-a74566243',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/raahul10.9/',
    icon: Instagram,
  },
  { label: 'Email', href: 'mailto:rahulkohli7078@gmail.com', icon: Mail },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const metrics = [
  { value: '3', label: 'Internships', sub: 'Production experience' },
  { value: '70+', label: 'REST APIs', sub: 'Shipped end-to-end' },
  { value: '8+', label: 'Business Verticals', sub: 'Multi-tenant POS' },
  { value: '6', label: 'Member Team', sub: 'Led as Team Lead' },
];

export const skillGroups: {
  title: string;
  icon: LucideIcon;
  skills: string[];
  span?: string;
}[] = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Shadcn/UI'],
    span: 'md:col-span-2',
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express.js'],
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    skills: ['Git/GitHub', 'Redis', 'Postman', 'Railway', 'Docker', 'CI/CD'],
    span: 'md:col-span-2',
  },
  {
    title: 'Currently Learning',
    icon: GraduationCap,
    skills: ['Python', 'FastAPI', 'Kafka'],
    span: 'md:col-span-2',
  },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Nexzem Technologies',
    period: 'Apr 2026 – Jul 2026',
    location: 'Dehradun (On-site)',
    bullets: [
      'Built a multi-tenant POS platform end-to-end on a live production codebase, supporting 8+ business verticals and 50+ active retail outlets.',
      'Developed 70+ RESTful APIs and implemented role-based access control across 4 user roles, cutting unauthorized-access incidents by 30%.',
      'Promoted to Team Lead after 2 months; guided sprint planning and code reviews for a 6-member team.',
      'Collaborated on database design and production deployments, improving release frequency by 20%.',
    ],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Novanectar Services Pvt. Ltd.',
    period: 'Jan 2026 – Apr 2026',
    location: 'Dehradun (On-site)',
    bullets: [
      'Delivered full-stack modules for a SaaS billing platform (BissBill) supporting 100+ subscribers: Google OAuth, subscription workflows, dashboards, payment tracking, role-based admin panels — cut manual billing errors by 40%.',
      'Built an editorial CMS boosting publishing throughput by 35%.',
      'Developed an ISMS intern-tracking system used by 50+ interns.',
    ],
  },
  {
    role: 'Frontend Intern',
    company: 'Aiking Solutions Pvt. Ltd.',
    period: 'Jul 2025 – Oct 2025',
    location: 'Remote',
    bullets: [
      'Built 10+ responsive, reusable UI components for JobFormAutomator using Next.js and Tailwind CSS, improving page load performance by 30% and usability scores by 25%.',
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  highlights: string[];
  github: string;
  accent: 'violet' | 'teal' | 'rose' | 'orange';
  image: string;
  year: string;
};

export const projects: Project[] = [
  {
    name: 'LBOS',
    tagline: 'Multi-Business Billing & POS Platform',
    description:
      'A scalable SaaS platform for managing billing, inventory, products, and outlet operations across multiple business types including grocery, retail, wholesale, pharmacy, cosmetics, stationery, and hardware stores.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis'],
    highlights: [
      'Multi-business and outlet management',
      'Product, variant and bundle management',
      'Inventory and stock tracking',
      'Scalable REST API architecture',
    ],
    github: '#',
    accent: 'orange',
    image: 'https://images.pexels.com/photos/8475161/pexels-photo-8475161.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: '2026',
  },
  {
    name: 'Himalayan Yatra Travels',
    tagline: 'Cab Booking Platform',
    description:
      'An SEO-optimized cab booking site for hill-region travelers. Customers can browse routes, get instant quotes, and book via WhatsApp inquiry — driving significant organic traffic growth in a competitive niche.',
    tags: ['Next.js', 'Tailwind CSS'],
    highlights: ['45% organic traffic growth', 'WhatsApp-based inquiry system', 'SEO-optimized architecture'],
    github: 'https://himalayan-yatra-lake.vercel.app',
    accent: 'teal',
    image: 'https://images.pexels.com/photos/32261658/pexels-photo-32261658.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: '2025',
  },
  {
    name: 'Paws & Hope',
    tagline: 'NGO & Animal Welfare Platform',
    description:
      'A full-stack NGO website built to showcase animal welfare initiatives, support outreach, and provide a polished public-facing experience. The platform uses a modern frontend with a Python backend for dynamic content and API-driven functionality.',
    tags: ['React', 'Python', 'REST API', 'PostgreSQL'],
    highlights: [
      'Responsive public-facing NGO website',
      'Python-powered backend and REST APIs',
      'Dynamic content and data management',
      'Production deployment on Vercel',
    ],
    github: 'https://paws-and-hope-amber.vercel.app/',
    accent: 'rose',
    image: 'https://images.pexels.com/photos/4587995/pexels-photo-4587995.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: '2026',
  },
  {
    name: 'ISMS',
    tagline: 'Intern Monitoring & Productivity Platform',
    description:
      'A web-based intern monitoring platform for tracking attendance, login/logout activity, assigned tasks, work activity, and idle time through a centralized dashboard.',
    tags: ['React', 'Python', 'Flask', 'PostgreSQL', 'REST API'],
    highlights: [
      'Intern login/logout and attendance tracking',
      'Task assignment and activity monitoring',
      'Idle-time and productivity tracking',
      'Employee and intern-head dashboards',
    ],
    github: 'https://github.com/Rahulkoli10/isms-frontend',
    accent: 'orange',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: '2025',
  },
  {
    name: 'QRScan',
    tagline: 'Restaurant QR Menu Platform',
    description:
      'A multi-vendor SaaS platform for digital QR menus with full CRUD and QR code generation. Vendors get OTP-based auth and a management dashboard; customers get mobile-first menu views with instant load times.',
    tags: ['Next.js', 'Node.js', 'Express.js', 'MongoDB'],
    highlights: ['OTP-based vendor authentication', 'Mobile-first customer views', '40% faster page loads'],
    github: 'https://github.com/Rahulkoli10/QrCode',
    accent: 'violet',
    image: 'https://images.pexels.com/photos/5779819/pexels-photo-5779819.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    year: '2025',
  },
];

export const education = {
  degree: 'B.Sc. Information Technology',
  school: 'Modern Institute of Technology',
  location: 'Dhalwala, Rishikesh',
  period: '2021 – 2024',
};
