// Floating WhatsApp chat button
const WHATSAPP_URL = "https://wa.me/639954902152";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with JavidVerse on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium transition-transform duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(37,211,102,0.4)]"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M16.004 3C8.836 3 3 8.829 3 15.989c0 2.859.748 5.653 2.17 8.11L3.023 29l5.109-2.099a13.02 13.02 0 0 0 7.872 2.697h.007c7.162 0 12.989-5.829 12.989-12.99C28.999 8.829 23.167 3 16.004 3zm7.52 18.266c-.315.887-1.826 1.692-2.55 1.795-.65.096-1.468.137-2.369-.147-.548-.171-1.253-.408-2.155-.749-3.783-1.429-6.254-4.767-6.444-4.988-.19-.221-1.54-2.049-1.54-3.908s.976-2.77 1.32-3.15c.345-.38.751-.475 1.001-.475.25 0 .5.002.719.013.23.011.539-.087.844.647.315.759 1.071 2.624 1.166 2.814.095.19.158.413.032.668-.127.254-.19.41-.38.63-.19.221-.4.493-.571.66-.19.19-.388.397-.166.779.221.38.985 1.623 2.113 2.631 1.452 1.297 2.675 1.7 3.055 1.892.38.19.603.159.826-.095.222-.254.953-1.11 1.207-1.491.254-.38.507-.317.855-.19.349.127 2.217 1.046 2.597 1.236.38.19.634.285.727.443.095.158.095.911-.22 1.798z" />
      </svg>
    </a>
  );
}
