import { cn } from '@/lib/utils';

type GardenType = 'evergreen' | 'literature' | 'article' | 'all';

interface FilterBarProps {
  currentFilter: GardenType;
  onFilterChange: (type: GardenType) => void;
}

export function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  const filters: { label: string; value: GardenType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Articles', value: 'article' },
    { label: 'Evergreen', value: 'evergreen' },
    { label: 'Literature', value: 'literature' },
  ];

  return (
    <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            'rounded-full border px-3 py-1 text-sm transition-colors',
            currentFilter === filter.value
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-muted-foreground hover:border-primary/50'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
