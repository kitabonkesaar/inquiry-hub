import { Filter, X } from 'lucide-react';
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
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-accent hover:underline flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-6">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-foreground mb-2 capitalize">
              {key === 'category' ? 'AC Type' : key}
            </label>
            <div className="space-y-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(key, option.value)}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-lg text-sm transition-all",
                    filters[key] === option.value
                      ? "bg-accent text-accent-foreground font-medium"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
