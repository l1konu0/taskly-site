import { motion } from 'framer-motion'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c] text-white">
      <motion.h1 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{duration:0.6}}
        className="text-4xl font-bold text-center"
      >
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
    description:
      "Refonte d'une landing moderne (Figma → React). Responsive et A/B testing prévu.",
  },
  {
    id: "nextjs-api",
    title: "Mini API Next.js + Stripe",
    category: "Dev",
    pay: 900,
    location: "Hybrid",
    time: "1 semaine",
    rating: 4.9,
    description:
      "Endpoint sécurisé (Next.js Route Handlers) et intégration paiement (Stripe Checkout).",
  },
  {
    id: "ugc-tiktok",
    title: "Pack UGC TikTok pour e-commerce",
    category: "Marketing",
    pay: 420,
    location: "Remote",
    time: "2-3 jours",
    rating: 4.7,
    description:
      "Script + tournage + montage vertical 10-20s. 5 variations, hooks psychologiques.",
  },
  {
    id: "cs-automation",
    title: "Support client automatisé (IA)",
    category: "Support",
    pay: 520,
    location: "Remote",
    time: "4 jours",
    rating: 4.6,
    description:
      "Mise en place d’un chatbot avec base de connaissances + tags et reporting.",
  },
  {
    id: "ops-shopify",
    title: "Onboarding boutique Shopify",
    category: "Autre",
    pay: 300,
    location: "On-site",
    time: "2 jours",
    rating: 4.5,
    description:
      "Paramétrage thème, fiches produits, transporteurs, taxes et pixels.",
  },
];

// -----------------------------
// Helpers
// -----------------------------
const currency = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const badgeColor: Record<Mission["category"], string> = {
  Design: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
  Dev: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  Marketing: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Support: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Autre: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
};

// -----------------------------
// FAQ items
// -----------------------------
const FAQ_ITEMS = [
  {
    q: "Comment fonctionne le paiement direct ?",
    a: "Le paiement est sécurisé via escrow. Les fonds sont bloqués dès l'acceptation et libérés à la livraison.",
  },
  {
    q: "Puis-je travailler en remote ?",
    a: "Oui. Chaque mission précise le mode: Remote, Hybride ou Sur site.",
  },
  {
    q: "Comment refuser une mission ?",
    a: "Cliquez sur Refuser depuis la carte ou la fiche détaillée. L'algorithme ajuste ensuite vos futures recommandations.",
  },
  {
    q: "Y a-t-il des frais pour les freelances ?",
    a: "Aucun frais d'inscription. Une petite commission est déduite uniquement en cas de mission payée.",
  },
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
    <div id="top" className="min-h-screen w-full bg-[#0a0f1c] text-white">
      {/* HEADER */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6" />
          <span className="text-lg font-semibold tracking-tight">Taskly</span>
        </div>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#missions" className="hover:opacity-100 opacity-80">Missions</a>
          <a href="#faq" className="hover:opacity-100 opacity-80">FAQ</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-6 md:pb-16 md:pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold md:text-5xl"
        >
          Trouvez votre mission.{" "}
          <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Soyez payé directement.
          </span>
        </motion.h1>
        <p className="mt-4 max-w-xl text-white/80">
          Plateforme instantanée pour freelances et talents: missions claires, paiement simple.
        </p>

        {/* Recherche */}
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0e1526] px-4 py-3">
          <Search className="h-5 w-5 opacity-70" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une mission..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/50"
          />
        </div>
      </section>

      {/* LISTE DES MISSIONS */}
      <section id="missions" className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="text-xl font-semibold md:text-2xl mb-4">Missions en vedette</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <article className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <h3 className="text-lg font-semibold">{m.title}</h3>
                <p className="text-sm text-white/70">{m.description}</p>
                <div className="mt-2 flex justify-between text-sm text-white/80">
                  <span><MapPin className="inline h-4 w-4 mr-1" />{m.location}</span>
                  <span><Star className="inline h-4 w-4 mr-1" />{m.rating}</span>
                  <span className="font-semibold">{currency(m.pay)}</span>
                </div>
                <button
                  onClick={() => setSelected(m)}
                  className="mt-3 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0a0f1c]"
                >
                  Voir / Postuler
                </button>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MODAL MISSION */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="relative z-10 max-w-lg w-full rounded-3xl border border-white/10 bg-[#0e1526] p-6"
            >
              <h3 className="text-xl font-semibold">{selected.title}</h3>
              <p className="mt-2 text-sm text-white/70">{selected.description}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setToast(`✅ Candidature envoyée pour « ${selected.title} »`)}
                  className="flex-1 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0a0f1c]"
                >
                  <CheckCircle2 className="inline h-4 w-4 mr-1" /> Postuler
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm"
                >
                  <XCircle className="inline h-4 w-4 mr-1" /> Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="text-xl font-semibold md:text-2xl mb-4">FAQ</h2>
        <div className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/5">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur"
            onAnimationComplete={() => setTimeout(() => setToast(null), 2000)}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------
// FAQ Component
// -----------------------------
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-5 py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2 text-sm font-medium md:text-base">
          <HelpCircle className="h-5 w-5 opacity-80" />
          {q}
        </div>
        <ArrowRight className={`h-5 w-5 transition ${open ? "rotate-90" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pt-2 text-sm text-white/70"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

      </motion.h1>
    </div>
  )
}
