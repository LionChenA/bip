import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FilterBar } from './FilterBar';

describe('FilterBar', () => {
  it('renders all filter options correctly', () => {
    const handleChange = vi.fn();
    render(<FilterBar currentFilter="all" onFilterChange={handleChange} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('Evergreen')).toBeInTheDocument();
    expect(screen.getByText('Literature')).toBeInTheDocument();
  });

  it('calls onFilterChange with correct value when clicked', () => {
    const handleChange = vi.fn();
    render(<FilterBar currentFilter="all" onFilterChange={handleChange} />);

    fireEvent.click(screen.getByText('Articles'));
    expect(handleChange).toHaveBeenCalledWith('article');
  });

  it('highlights the active filter button', () => {
    const handleChange = vi.fn();
    const { rerender } = render(<FilterBar currentFilter="all" onFilterChange={handleChange} />);

    const allButton = screen.getByText('All');
    expect(allButton).toHaveClass('bg-primary');

    rerender(<FilterBar currentFilter="article" onFilterChange={handleChange} />);
    const articleButton = screen.getByText('Articles');
    expect(articleButton).toHaveClass('bg-primary');
    expect(allButton).not.toHaveClass('bg-primary');
  });
});
