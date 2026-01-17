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
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            'px-3 py-1 text-sm rounded-full transition-colors border',
            currentFilter === filter.value
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-muted-foreground border-border hover:border-primary/50'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
