import React, { useState } from 'react';
import { BusLayout } from '@/types/marketplace';
import { Badge } from '@/components/ui/badge';
import { Bed, Armchair, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SeatLayoutVisualizerProps {
  layout: BusLayout;
  seatingCapacity: number;
}

export function SeatLayoutVisualizer({ layout, seatingCapacity }: SeatLayoutVisualizerProps) {
  const [selectedDeck, setSelectedDeck] = useState<'lower' | 'upper'>('lower');
  const isSleeper = layout.includes('Sleeper');

  // Generate mock seat grid based on layout
  const rows = Math.ceil(seatingCapacity / (isSleeper ? 4 : 5));

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground text-base">Cabin & Berth Layout</span>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs">
              {layout}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Total Capacity: {seatingCapacity} Passengers • Certified Safety Standards
          </p>
        </div>

        {isSleeper && (
          <div className="flex items-center bg-muted/60 p-1 rounded-lg border">
            <button
              type="button"
              onClick={() => setSelectedDeck('lower')}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                selectedDeck === 'lower'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Lower Deck (Berths)
            </button>
            <button
              type="button"
              onClick={() => setSelectedDeck('upper')}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                selectedDeck === 'upper'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Upper Deck (Panoramic)
            </button>
          </div>
        )}
      </div>

      {/* Bus Shell Container */}
      <div className="relative bg-muted/20 border-2 border-dashed border-border rounded-xl p-4 overflow-x-auto">
        {/* Front Driver Cabin Indicator */}
        <div className="flex items-center justify-between bg-muted/40 rounded-lg px-4 py-2 mb-4 text-xs font-medium text-muted-foreground border">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Driver Cabin & GPS Navigation Console</span>
          </div>
          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-mono text-[11px]">
            Front Entrance [Door]
          </span>
        </div>

        {/* Layout Visual Grid */}
        <div className="min-w-[420px] max-w-lg mx-auto py-2">
          {layout === '2x2 Sleeper' ? (
            <div className="space-y-3">
              {Array.from({ length: Math.min(8, rows) }).map((_, rIdx) => (
                <div key={rIdx} className="flex items-center justify-between gap-4">
                  {/* Left Berths (2 berths) */}
                  <div className="flex gap-2">
                    <BerthBox number={`${selectedDeck === 'lower' ? 'L' : 'U'}${rIdx * 4 + 1}`} />
                    <BerthBox number={`${selectedDeck === 'lower' ? 'L' : 'U'}${rIdx * 4 + 2}`} />
                  </div>

                  {/* Aisle */}
                  <div className="text-[10px] text-muted-foreground/60 tracking-wider font-mono">
                    AISLE
                  </div>

                  {/* Right Berths (2 berths) */}
                  <div className="flex gap-2">
                    <BerthBox number={`${selectedDeck === 'lower' ? 'L' : 'U'}${rIdx * 4 + 3}`} />
                    <BerthBox number={`${selectedDeck === 'lower' ? 'L' : 'U'}${rIdx * 4 + 4}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : layout === '2x1 Sleeper' ? (
            <div className="space-y-3">
              {Array.from({ length: Math.min(7, rows) }).map((_, rIdx) => (
                <div key={rIdx} className="flex items-center justify-between gap-4">
                  {/* Left Single Berth */}
                  <BerthBox number={`L${rIdx * 3 + 1}`} isSingle />

                  {/* Aisle */}
                  <div className="text-[10px] text-muted-foreground/60 tracking-wider font-mono">
                    WIDE AISLE
                  </div>

                  {/* Right Double Berths */}
                  <div className="flex gap-2">
                    <BerthBox number={`L${rIdx * 3 + 2}`} />
                    <BerthBox number={`L${rIdx * 3 + 3}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : layout === '3x2 Seater' ? (
            <div className="space-y-2.5">
              {Array.from({ length: Math.min(9, rows) }).map((_, rIdx) => (
                <div key={rIdx} className="flex items-center justify-between gap-4">
                  {/* Left 3 Seats */}
                  <div className="flex gap-1.5">
                    <SeatBox number={`S${rIdx * 5 + 1}`} />
                    <SeatBox number={`S${rIdx * 5 + 2}`} />
                    <SeatBox number={`S${rIdx * 5 + 3}`} />
                  </div>

                  {/* Aisle */}
                  <div className="text-[10px] text-muted-foreground/60 font-mono">WALKWAY</div>

                  {/* Right 2 Seats */}
                  <div className="flex gap-1.5">
                    <SeatBox number={`S${rIdx * 5 + 4}`} />
                    <SeatBox number={`S${rIdx * 5 + 5}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* 2x2 Seater / Luxury */
            <div className="space-y-2.5">
              {Array.from({ length: Math.min(9, rows) }).map((_, rIdx) => (
                <div key={rIdx} className="flex items-center justify-between gap-4">
                  {/* Left 2 Seats */}
                  <div className="flex gap-2">
                    <SeatBox number={`A${rIdx * 4 + 1}`} isLuxury={layout.includes('Maharaja')} />
                    <SeatBox number={`A${rIdx * 4 + 2}`} isLuxury={layout.includes('Maharaja')} />
                  </div>

                  {/* Aisle */}
                  <div className="text-[10px] text-muted-foreground/60 font-mono">AISLE</div>

                  {/* Right 2 Seats */}
                  <div className="flex gap-2">
                    <SeatBox number={`B${rIdx * 4 + 3}`} isLuxury={layout.includes('Maharaja')} />
                    <SeatBox number={`B${rIdx * 4 + 4}`} isLuxury={layout.includes('Maharaja')} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rear Emergency Exit & Restroom / Luggage */}
        <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Rear Luggage Boot & Emergency Escape Hatch
          </span>
          {layout.includes('Maharaja') && (
            <span className="flex items-center gap-1 text-primary font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Onboard Lavatory Located at Rear
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded border bg-card flex items-center justify-center">
            {isSleeper ? <Bed className="w-2.5 h-2.5 text-primary" /> : <Armchair className="w-2.5 h-2.5 text-primary" />}
          </div>
          <span>Included in Charter</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded border bg-primary/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <span>Extra Legroom / Panoramic Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded border bg-muted flex items-center justify-center">
            <span className="text-[9px] font-bold">220V</span>
          </div>
          <span>Fast Charging Available At Each Seat</span>
        </div>
      </div>
    </div>
  );
}

function BerthBox({ number, isSingle = false }: { number: string; isSingle?: boolean }) {
  return (
    <div
      className={cn(
        "h-12 border rounded-lg flex flex-col items-center justify-center bg-card shadow-xs hover:border-primary/60 transition-colors",
        isSingle ? "w-24" : "w-20"
      )}
    >
      <div className="flex items-center gap-1 text-[11px] font-semibold text-foreground">
        <Bed className="w-3.5 h-3.5 text-primary" />
        <span>{number}</span>
      </div>
      <span className="text-[9px] text-muted-foreground">Full Berth</span>
    </div>
  );
}

function SeatBox({ number, isLuxury = false }: { number: string; isLuxury?: boolean }) {
  return (
    <div
      className={cn(
        "h-10 w-12 border rounded-lg flex flex-col items-center justify-center bg-card shadow-xs hover:border-primary/60 transition-colors",
        isLuxury && "border-amber-300 dark:border-amber-700/60 bg-amber-500/5"
      )}
    >
      <div className="flex items-center gap-1 text-[10px] font-semibold text-foreground">
        <Armchair className={cn("w-3 h-3", isLuxury ? "text-amber-500" : "text-primary")} />
        <span>{number}</span>
      </div>
      <span className="text-[8px] text-muted-foreground">{isLuxury ? 'Recliner' : 'Push-back'}</span>
    </div>
  );
}
