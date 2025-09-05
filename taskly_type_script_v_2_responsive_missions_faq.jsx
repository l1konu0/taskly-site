import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, CheckCircle2, XCircle, Rocket, Search, ArrowRight, HelpCircle, Coins, Clock, MapPin, Star } from "lucide-react";

// -----------------------------
// Types
// -----------------------------

type Mission = {
  id: string;
  title: string;
  category: "Design" | "Dev" | "Marketing" | "Support" | "Autre";
  pay: number; // in EUR
  location: "Remote" | "Hybrid" | "On-site";
  time: string; // e.g., "3-5 jours"
  rating: number; // 0-5
  description: string;
};

// -----------------------------
// Seed data (5 missions types)
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
      "Refonte d'une landing moderne (Figma → React). Composants réutilisables, responsive et A/B testing prévu.",
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
      "Mise en place d'un endpoint sécurisé (Next.js Route Handlers) et intégration paiement (Stripe Checkout).",
  },
  {
    id: "ugc-tiktok",
    title: "Pack UGC TikTok pour e‑commerce",
    category: "Marketing",
    pay: 420,
    location: "Remote",
    time: "2-3 jours",
    rating: 4.7,
    description:
      "Script + tournage + montage vertical 10-20s. 5 variations, hooks psychologiques et CTA orientés ROAS.",
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
      "Mise en place d'un flux d'auto‑réponse avec base de connaissances + tags et reporting hebdo.",
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
      "Paramétrage thème, fiches produits, transporteurs, taxes et pixels. Livraison d'un guide d'utilisation.",
  },
];

// -----------------------------
// Small helpers
// -----------------------------

const currency = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const badgeColor: Record<Mission["category"], string> = {
  Design: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
  Dev: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  Marketing: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Support: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Autre: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
};

// -----------------------------
// Main App Component
// -----------------------------

export default function TasklyApp() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Mission | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MISSIONS;
    return MISSIONS.filter((m) => [m.title, m.category, m.description].join(" ").toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen w-full bg-[#0a0f1c] text-white">
      {/* Gradient tech background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute top-24 -right-16 h-72 w-72 rounded-full bg-cyan-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6" />
          <span className="text-lg font-semibold tracking-tight">Taskly</span>
        </div>
        <nav className="hidden gap-6 text-sm md:flex">
          <a className="opacity-80 transition hover:opacity-100" href="#missions">Missions</a>
          <a className="opacity-80 transition hover:opacity-100" href="#faq">Aide / FAQ</a>
        </nav>
        <a
          href="#missions"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur transition hover:bg-white/10"
        >
          Trouver votre mission <ArrowRight className="h-4 w-4" />
        </a>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-6 md:pb-16 md:pt-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold leading-tight md:text-5xl"
            >
              Trouvez votre mission. <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Soyez payé directement.</span>
            </motion.h1>
            <p className="mt-4 max-w-xl text-white/80">
              Plateforme instantanée pour freelances et talents: des missions claires, un paiement simple, et un workflow sans friction.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#missions" className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0f1c] transition hover:opacity-90">
                Explorer les missions
              </a>
              <a href="#faq" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm backdrop-blur transition hover:bg-white/10">
                Besoin d'aide ?
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-xs text-white/60">
              <div className="flex items-center gap-2"><Coins className="h-4 w-4" /> Paiement sécurisé</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Matching en quelques minutes</div>
              <div className="flex items-center gap-2"><ShieldIcon className="h-4 w-4" /> Escrow / anti‑arnaque</div>
            </div>
          </div>

          {/* Search / preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur md:p-6"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0e1526] px-4 py-3">
              <Search className="h-5 w-5 opacity-70" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une mission (ex: Next.js, UGC, Shopify)"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/50"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {filtered.slice(0, 4).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className="group rounded-2xl border border-white/10 bg-[#0e1526] p-4 text-left transition hover:border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 text-[10px] ${badgeColor[m.category]}`}>
                      <Briefcase className="h-3 w-3" /> {m.category}
                    </span>
                    <span className="text-xs text-white/70">{m.time}</span>
                  </div>
                  <div className="mt-2 line-clamp-1 font-semibold">{m.title}</div>
                  <div className="mt-1 flex items-center justify-between text-xs text-white/70">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {m.location}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {m.rating}</span>
                  </div>
                  <div className="mt-2 text-sm font-medium">{currency(m.pay)}</div>
                </button>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-white/60">Cliquez pour voir les détails et interagir</p>
          </motion.div>
        </div>
      </section>

      {/* MISSIONS LIST */}
      <section id="missions" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-xl font-semibold md:text-2xl">Missions en vedette</h2>
          <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/70">{filtered.length} trouvée(s)</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <article className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-white/20">
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 text-[10px] ${badgeColor[m.category]}`}>
                      <Briefcase className="h-3 w-3" /> {m.category}
                    </span>
                    <span className="text-xs text-white/70">{m.time}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{m.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">{m.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-white/80">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {m.location}</span>
                    <span className="flex items-center gap-1"><Star className="h-4 w-4" /> {m.rating}</span>
                  </div>
                  <div className="font-semibold">{currency(m.pay)}</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button onClick={() => setSelected(m)} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0a0f1c] transition hover:opacity-90">
                    Voir / Postuler
                  </button>
                  <button onClick={() => handleRefuse(m, setToast)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur transition hover:bg-white/10">
                    Refuser
                  </button>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-xl font-semibold md:text-2xl">Aide / FAQ</h2>
        <div className="mt-4 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/5">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      <Footer />

      {/* Drawer / Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-4 md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0e1526] p-6 text-white shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 text-[10px] ${badgeColor[selected.category]}`}>
                    <Briefcase className="h-3 w-3" /> {selected.category}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">{selected.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{selected.description}</p>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/80 md:grid-cols-4">
                <InfoPill icon={<Coins className="h-4 w-4" />} label="Budget" value={currency(selected.pay)} />
                <InfoPill icon={<Clock className="h-4 w-4" />} label="Durée" value={selected.time} />
                <InfoPill icon={<MapPin className="h-4 w-4" />} label="Lieu" value={selected.location} />
                <InfoPill icon={<Star className="h-4 w-4" />} label="Note client" value={`${selected.rating}`} />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleApply(selected, setToast)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0f1c] transition hover:opacity-90"
                >
                  <CheckCircle2 className="h-4 w-4" /> Postuler maintenant
                </button>
                <button
                  onClick={() => handleRefuse(selected, setToast)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm backdrop-blur transition hover:bg-white/10"
                >
                  <XCircle className="h-4 w-4" /> Refuser
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur"
            onAnimationComplete={() => setTimeout(() => setToast(null), 1900)}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------
// Components
// -----------------------------

function InfoPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
      {icon}
      <div>
        <div className="text-[10px] uppercase tracking-wide text-white/60">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-5 py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
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

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/5 px-6 py-10 text-sm text-white/70">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white">
            <Rocket className="h-5 w-5" /> <span className="font-semibold">Taskly</span>
          </div>
          <p className="mt-2 max-w-sm">Marketplace de missions instantanées. Simplicité, sécurité, efficacité.</p>
        </div>
        <div className="space-y-2">
          <div className="text-white">Navigation</div>
          <a className="block opacity-80 hover:opacity-100" href="#missions">Missions</a>
          <a className="block opacity-80 hover:opacity-100" href="#faq">Aide / FAQ</a>
        </div>
        <div className="space-y-2">
          <div className="text-white">Contact</div>
          <p>support@taskly.app</p>
          <p className="text-xs">© {new Date().getFullYear()} Taskly. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
      <path d="M9 11l2 2 4-4" />
    </svg>
  );
}

// -----------------------------
// Actions
// -----------------------------

function handleApply(m: Mission, setToast: (t: string) => void) {
  setToast(`✅ Candidature envoyée pour « ${m.title} ». Vous serez notifié du paiement.`);
}

function handleRefuse(m: Mission, setToast: (t: string) => void) {
  setToast(`🚫 Mission « ${m.title} » refusée. Nous ajusterons vos recommandations.`);
}

// -----------------------------
// FAQ content (modifiable)
// -----------------------------

const FAQ_ITEMS = [
  {
    q: "Comment fonctionne le paiement direct ?",
    a: "Le paiement est sécurisé via escrow. Les fonds sont bloqués dès l'acceptation et libérés à la livraison.",
  },
  {
    q: "Puis‑je travailler en remote ?",
    a: "Oui. Chaque mission précise le mode: Remote, Hybride ou Sur site.",
  },
  {
    q: "Comment refuser une mission ?",
    a: "Cliquez sur Refuser depuis la carte ou la fiche détaillée. L'algorithme ajuste ensuite vos futures recommandations.",
  },
  {
    q: "Y a‑t‑il des frais pour les freelances ?",
    a: "Aucun frais d'inscription. Une petite commission est déduite uniquement en cas de mission payée.",
  },
];
