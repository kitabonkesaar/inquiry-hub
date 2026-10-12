import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AvailabilityCalendarProps {
  blockedDates?: string[]; // YYYY-MM-DD
  onSelectRange?: (start: string, end: string) => void;
}

export function AvailabilityCalendar({ blockedDates = [], onSelectRange }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isBlocked = (day: number) => {
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return blockedDates.includes(formatted);
  };

  const isPast = (day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground text-base">
            {monthNames[month]} {year}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Weekday Header */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-xs">
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const blocked = isBlocked(day);
          const past = isPast(day);

          return (
            <div
              key={day}
              className={cn(
                "h-9 rounded-lg flex flex-col items-center justify-center font-medium transition-all relative border",
                past
                  ? "bg-muted/30 text-muted-foreground/40 border-transparent cursor-not-allowed"
                  : blocked
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50 cursor-not-allowed"
                  : "bg-background hover:bg-primary/10 text-foreground border-border hover:border-primary/50 cursor-pointer"
              )}
            >
              <span>{day}</span>
              {blocked && (
                <span className="w-1 h-1 rounded-full bg-rose-500 absolute bottom-1" />
              )}
              {!blocked && !past && (
                <span className="w-1 h-1 rounded-full bg-emerald-500/60 absolute bottom-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Calendar Status Legend */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Available for Rental</span>
        </div>
        <div className="flex items-center gap-1.5">
          <XCircle className="w-3.5 h-3.5 text-rose-500" />
          <span>Chartered / Reserved</span>
        </div>
      </div>
    </div>
  );
}
