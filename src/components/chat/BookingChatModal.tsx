import React, { useState, useEffect, useRef } from 'react';
import { marketplaceStore } from '@/services/marketplaceStore';
import { Booking, ChatMessage, UserRole } from '@/types/marketplace';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bus, MessageSquare, Phone, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingChatModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  senderRole: 'customer' | 'owner';
}

export function BookingChatModal({ booking, isOpen, onClose, senderRole }: BookingChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const senderName = senderRole === 'customer' ? booking.customerName : 'Bus Owner Support';

  useEffect(() => {
    if (!isOpen) return;

    const load = () => {
      setMessages(marketplaceStore.getChatMessages(booking.id));
    };
    load();
    const unsub = marketplaceStore.subscribe(load);
    return unsub;
  }, [booking.id, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    marketplaceStore.sendMessage({
      bookingId: booking.id,
      senderRole,
      senderName,
      text: inputText.trim(),
    });

    setInputText('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 rounded-2xl overflow-hidden flex flex-col h-[560px]">
        {/* Chat Header */}
        <div className="p-4 bg-muted/40 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border">
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {senderRole === 'customer' ? 'OP' : 'CU'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-sm font-bold text-foreground">
                  {senderRole === 'customer' ? 'Fleet Operator Support' : booking.customerName}
                </DialogTitle>
                <Badge variant="outline" className="text-[10px] bg-card">
                  {booking.bookingNumber}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Bus className="w-3.5 h-3.5 text-primary" /> {booking.busName}
              </p>
            </div>
          </div>

          <a
            href={`tel:${booking.customerPhone}`}
            className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            title="Call Directly"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/10">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto stroke-1 opacity-40" />
              <p className="text-sm font-medium">No messages yet</p>
              <p className="text-xs max-w-xs mx-auto">
                Discuss pickup timings, luggage requirements, and driver contacts here.
              </p>
            </div>
          ) : (
            messages.map((m) => {
              const isMe = m.senderRole === senderRole;
              return (
                <div
                  key={m.id}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    isMe ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <span className="text-[10px] text-muted-foreground px-1 mb-1">
                    {m.senderName}
                  </span>
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-xs leading-relaxed shadow-xs",
                      isMe
                        ? "bg-primary text-primary-foreground rounded-br-xs"
                        : "bg-card border text-foreground rounded-bl-xs"
                    )}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-muted-foreground/60 px-1 mt-0.5">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t bg-card flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-10 text-xs rounded-xl"
          />
          <Button type="submit" size="icon" className="h-10 w-10 rounded-xl shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
