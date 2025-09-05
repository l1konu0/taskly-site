import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, CheckCircle2, XCircle, Rocket, Search,
  ArrowRight, HelpCircle, Coins, Clock, MapPin, Star
} from "lucide-react";

// -----------------------------
// Types
// -----------------------------
type Mission = {
  id: string;
  title: string;
  category: "Design" | "Dev" | "Marketing" | "Support" | "Autre";
  pay: number;
  location: "Remote" | "Hybrid" | "On-site";
  time: string;
  rating: number;
  description: string;
};

// -----------------------------
// Missions exemple
// -----------------------------
const MISSIONS: Mission[] = [
  {
    id: "ux-landing",
    title: "UI/UX pour landing page fintech",
    category: "Design",
    pay: 650,
    location: "Remote",
    time: "3-5 jours",
    rating: 4.8,
    description: "Refonte d'une landing moderne (Figma → React). Responsive et A/B testing prévu.",
  },
  {
    id: "nextjs-api",
    title: "Mini API Next.js + Stripe",
    category: "Dev",
    pay: 900,
    location: "Hybrid",
    time: "1 semaine",
    rating: 4.9,
    description: "Endpoint sécurisé (Next.js Route Handlers) et intégration paiement (Stripe Checkout).",
  },
  {
    id: "ugc-tiktok",
    title: "Pack UGC TikTok pour e-commerce",
    category: "Marketing",
    pay: 420,
    location: "Remote",
    time: "2-3 jours",
    rating: 4.7,
    description: "Script + tournage + montage vertical 10-20s. 5 variations, hooks psychologiques.",
  },
  {
    id: "cs-automation",
    title: "Support client automatisé (IA)",
    category: "Support",
    pay: 520,
    location: "Remote",
    time: "4 jours",
    rating: 4.6,
    description: "Mise en place d’un chatbot avec base de connaissances + tags et reporting.",
  },
  {
    id: "ops-shopify",
    title: "Onboarding boutique Shopify",
    category: "Autre",
    pay: 300,
    location: "On-site",
    time: "2 jours",
    rating: 4.5,
    description: "Paramétrage thème, fiches produits, transporteurs, taxes et pixels.",
  },
];

// -----------------------------
// Helpers
// -----------------------------
const currency = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const FAQ_ITEMS = [
  { q: "Comment fonctionne le paiement direct ?", a: "Le paiement est sécurisé via escrow. Les fonds sont bloqués dès l'acceptation et libérés à la livraison." },
  { q: "Puis-je travailler en remote ?", a: "Oui. Chaque mission précise le mode: Remote, Hybride ou Sur site." },
  { q: "Comment refuser une mission ?", a: "Cliquez sur Refuser depuis la carte ou la fiche détaillée. L'algorithme ajuste ensuite vos futures recommandations." },
  { q: "Y a-t-il des frais pour les freelances ?", a: "Aucun frais d'inscription. Une petite commission est déduite uniquement en cas de mission payée." },
];

// -----------------------------
// App principale
// -----------------------------
export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Mission | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MISSIONS;
    return MISSIONS.filter((m) =>
      [m.title, m.category, m.description].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c] text-white">
      <motion.h1 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{duration:0.6}}
        className="text-4xl font-bold text-center"
      >
        🚀 Taskly V3 corrigé fonctionne !
      </motion.h1>
    </div>
  );
}
