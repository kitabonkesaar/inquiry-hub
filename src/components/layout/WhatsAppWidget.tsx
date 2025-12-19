import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WhatsAppWidget() {
  const phoneNumber = "918249529220";
  const message = "Hi, I have a query regarding bus rental.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 lg:bottom-6 right-6 z-50 flex flex-col items-end gap-2 group"
      initial={{ scale: 0, opacity: 0 }}
      aria-label="Chat on WhatsApp"
    >
      <Button
        className="rounded-full w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all p-0 border-2 border-white/20"
      >
        <MessageCircle className="w-7 h-7" />
      </Button>
    </a>
  );
}