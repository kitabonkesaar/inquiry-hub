import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterContentProps {
  filterOptions: Record<string, { value: string; label: string }[]>;
  filters: Record<string, string>;
  handleFilterChange: (key: string, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  className?: string;
}

export function FilterContent({
  filterOptions,
  filters,
  handleFilterChange,
  clearFilters,
  hasActiveFilters,
  className
}: FilterContentProps) {
  return (
    <div className={cn("space-y-5 text-xs", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary shrink-0" />
          <span className="font-bold text-sm tracking-tight text-foreground">Filters</span>
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          )}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[11px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        )}
      </div>

      {/* Filter Categories as Minimalist Inline Chips */}
      <div className="space-y-4">
        {Object.entries(filterOptions).map(([key, options]) => {
          const groupTitle = key === 'category' ? 'AC / Climate' : key === 'type' ? 'Vehicle Type' : key;
          return (
            <div key={key} className="space-y-2">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                {groupTitle}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {options.map((option) => {
                  const isSelected = filters[key] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFilterChange(key, option.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 inline-flex items-center gap-1 select-none",
                        isSelected
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
