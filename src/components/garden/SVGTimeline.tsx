import { motion } from 'framer-motion';
import React, { useMemo } from 'react';

interface SVGTimelineProps {
  items: { pubDate: string | Date; slug: string; title?: string }[];
  activeSlug?: string;
}

export function SVGTimeline({ items, activeSlug }: SVGTimelineProps) {
  const processedData = useMemo(() => {
    const sorted = [...items].sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    const yearGroups: Record<string, { month: string; slug: string }[]> = {};
    sorted.forEach((item) => {
      const date = new Date(item.pubDate);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('default', { month: 'short' });
      if (!yearGroups[year]) yearGroups[year] = [];
      yearGroups[year].push({ month, slug: item.slug });
    });

    const k = 0.4;
    let currentY = 0;
    const spacing = 60;

    const timelineElements: any[] = [];
    const sortedYears = Object.keys(yearGroups).sort((a, b) => Number(b) - Number(a));

    sortedYears.forEach((year) => {
      const months = yearGroups[year];
      const monthMap: Record<string, string[]> = {};
      months.forEach((m) => {
        if (!monthMap[m.month]) monthMap[m.month] = [];
        monthMap[m.month].push(m.slug);
      });

      timelineElements.push({
        type: 'year',
        label: year,
        y: currentY,
      });

      currentY += spacing;

      const sortedMonths = Object.keys(monthMap).sort((a, b) => {
        const monthsOrder = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        return monthsOrder.indexOf(b) - monthsOrder.indexOf(a);
      });

      sortedMonths.forEach((month) => {
        const noteCount = monthMap[month].length;
        const monthSpacing = noteCount ** k * spacing;

        timelineElements.push({
          type: 'month',
          label: month,
          y: currentY,
          notes: monthMap[month],
        });

        currentY += monthSpacing;
      });
    });

    return { elements: timelineElements, totalHeight: currentY + 100 };
  }, [items]);

  return (
    <div className="fixed left-0 top-0 h-full w-48 hidden lg:flex flex-col py-20 pl-8 select-none z-10 overflow-y-auto scrollbar-hide">
      <svg
        width="150"
        height={processedData.totalHeight}
        className="overflow-visible"
        aria-label="Garden Timeline"
      >
        <title>Garden Timeline</title>
        <line
          x1="10"
          y1="0"
          x2="10"
          y2={processedData.totalHeight}
          className="stroke-foreground/20"
          strokeWidth="6"
        />
        <line
          x1="30"
          y1="0"
          x2="30"
          y2={processedData.totalHeight}
          className="stroke-border"
          strokeWidth="4"
        />

        {processedData.elements.map((el) => {
          const isActive = el.notes?.includes(activeSlug);
          const key = el.type + el.label + el.y;

          return (
            <g key={key}>
              {el.type === 'year' ? (
                <g className="group cursor-pointer">
                  <motion.circle
                    cx="10"
                    cy={el.y}
                    initial={{ r: 4 }}
                    whileHover={{ r: 8 }}
                    className="fill-primary/60 group-hover:fill-primary transition-colors"
                  />
                  <text
                    x="40"
                    y={el.y + 5}
                    className="text-xs font-bold fill-muted-foreground group-hover:fill-foreground font-mono uppercase tracking-tighter transition-colors"
                  >
                    {el.label}
                  </text>
                </g>
              ) : (
                <g className="group cursor-pointer">
                  <line
                    x1="10"
                    y1={el.y}
                    x2="30"
                    y2={el.y}
                    className={
                      isActive ? 'stroke-primary' : 'stroke-border group-hover:stroke-primary/50'
                    }
                    strokeWidth="2"
                  />
                  <text
                    x="40"
                    y={el.y + 3}
                    className={
                      isActive
                        ? 'text-[10px] fill-primary font-bold font-mono uppercase tracking-widest'
                        : 'text-[10px] fill-muted-foreground/50 group-hover:fill-muted-foreground font-mono uppercase tracking-widest transition-colors'
                    }
                  >
                    {el.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
