import React, { useState, useEffect } from 'react';
import { marketplaceStore } from '@/services/marketplaceStore';
import { AppNotification, UserRole } from '@/types/marketplace';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  CheckCircle2,
  Clock,
  MessageSquare,
  ShieldAlert,
  CreditCard,
  Sparkles,
  Smartphone,
  Mail,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
}

export function NotificationDrawer({ isOpen, onClose, activeRole }: NotificationDrawerProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [filterChannel, setFilterChannel] = useState<'all' | 'sms' | 'email' | 'push' | 'in_app'>('all');

  useEffect(() => {
    const load = () => {
      setNotifications(marketplaceStore.getNotifications(activeRole));
    };
    load();
    const unsub = marketplaceStore.subscribe(load);
    return unsub;
  }, [activeRole]);

  const handleMarkAllRead = () => {
    marketplaceStore.markNotificationsAsRead(activeRole);
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filterChannel === 'all') return true;
    return n.channel === filterChannel;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'booking':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'kyc':
        return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case 'announcement':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-primary" />;
    }
  };

  const getChannelBadge = (channel: AppNotification['channel']) => {
    switch (channel) {
      case 'sms':
        return (
          <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
            <Smartphone className="w-3 h-3" /> SMS Dispatched
          </span>
        );
      case 'email':
        return (
          <span className="flex items-center gap-1 text-[10px] text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded font-mono">
            <Mail className="w-3 h-3" /> Email Sent
          </span>
        );
      case 'push':
        return (
          <span className="flex items-center gap-1 text-[10px] text-purple-600 bg-purple-500/10 px-1.5 py-0.5 rounded font-mono">
            <Send className="w-3 h-3" /> Push Alert
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
            In-App
          </span>
        );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md w-full p-0 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <SheetTitle className="text-base font-bold">Activity & Notifications</SheetTitle>
                <SheetDescription className="text-xs">
                  {unreadCount > 0 ? `${unreadCount} unread alerts` : 'All alerts caught up'}
                </SheetDescription>
              </div>
            </div>

            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllRead}
                className="text-xs h-7 px-2 text-primary"
              >
                Mark read
              </Button>
            )}
          </div>

          {/* Channel Filters */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1 text-xs">
            {(['all', 'in_app', 'sms', 'email', 'push'] as const).map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setFilterChannel(ch)}
                className={cn(
                  "px-2.5 py-1 rounded-lg font-medium capitalize transition-all whitespace-nowrap",
                  filterChannel === ch
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground"
                )}
              >
                {ch === 'all' ? 'All Channels' : ch.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y p-2 space-y-1">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-12 px-4 text-muted-foreground space-y-2">
              <Bell className="w-8 h-8 mx-auto stroke-1 opacity-40" />
              <p className="text-sm font-medium">No notifications in this channel</p>
              <p className="text-xs">New bookings, KYC alerts, and trip updates will appear here.</p>
            </div>
          ) : (
            filteredNotifs.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-3.5 rounded-xl transition-all space-y-1.5",
                  !item.read ? "bg-primary/5 border border-primary/15" : "hover:bg-muted/40"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-background border">{getIcon(item.type)}</div>
                    <span className="font-semibold text-xs text-foreground">{item.title}</span>
                  </div>
                  {getChannelBadge(item.channel)}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed pl-7">{item.message}</p>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground/70 pl-7 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •{' '}
                    {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                  {!item.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
