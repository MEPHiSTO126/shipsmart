'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { useURLFilters } from '@/features/shipment-tracking/presentation/hooks/useURLFilters';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { ShipmentPriority } from '@/constants/shipment-priority';
import { SHIPMENT_STATUS_LABELS } from '@/constants/shipment-status';
import { SHIPMENT_PRIORITY_LABELS } from '@/constants/shipment-priority';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
  placeholder,
  className = '',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder || label;

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
          value
            ? 'border-orange-500/50 bg-orange-500/10 text-orange-300'
            : 'border-stone-800 bg-[#1c1917] text-stone-300 hover:border-stone-700 hover:text-white'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-stone-500 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-lg border border-stone-800 bg-[#292524] py-1 shadow-xl shadow-black/40"
            role="listbox"
            aria-label={label}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                  value === option.value
                    ? 'bg-orange-500/10 font-medium text-orange-300'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
                role="option"
                aria-selected={value === option.value}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative min-w-[280px] flex-1">
      <svg
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -transtone-y-1/2 text-stone-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
        />
      </svg>
      <Input
        type="search"
        aria-label="Search by tracking number or customer"
        placeholder="Search tracking # or customer..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-9 pl-9"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 flex h-6 w-6 -transtone-y-1/2 items-center justify-center rounded-md text-stone-500 transition-colors hover:bg-stone-800 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function FilterBar({ destinations }: { destinations: string[] }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    filters,
    sort,
    hasActiveFilters,
    setSearch,
    setStatus,
    setPriority,
    setDestination,
    setSort,
    clearFilters,
  } = useURLFilters();

  const statusOptions = Object.entries(SHIPMENT_STATUS_LABELS).map(
    ([value, label]) => ({ value, label })
  );

  const priorityOptions = Object.entries(SHIPMENT_PRIORITY_LABELS).map(
    ([value, label]) => ({ value, label })
  );

  const destinationOptions = destinations.map((d) => ({ value: d, label: d }));

  const sortOptions = [
    { value: 'estimatedDelivery-asc', label: 'Delivery date (earliest first)' },
    { value: 'estimatedDelivery-desc', label: 'Delivery date (latest first)' },
    { value: 'lastUpdated-asc', label: 'Last updated (oldest first)' },
    { value: 'lastUpdated-desc', label: 'Last updated (newest first)' },
  ];

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        <SearchField value={filters.search || ''} onChange={setSearch} />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            className="flex w-full items-center justify-start gap-2 rounded-lg border border-stone-800 bg-[#1c1917] px-3 py-2 text-sm font-medium text-stone-200 transition-colors hover:border-stone-700"
          >
            <svg className="h-4 w-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="ml-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-xs font-medium text-orange-300">
                Active
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="shrink-0 rounded-lg px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-3 rounded-xl border border-stone-800 bg-[#1c1917] p-4"
            >
              <FilterDropdown
                label="Status"
                value={filters.status || ''}
                options={[{ value: '', label: 'All statuses' }, ...statusOptions]}
                onChange={(v) => setStatus(v as ShipmentStatus | '')}
                placeholder="All statuses"
              />
              <FilterDropdown
                label="Priority"
                value={filters.priority || ''}
                options={[{ value: '', label: 'All priorities' }, ...priorityOptions]}
                onChange={(v) => setPriority(v as ShipmentPriority | '')}
                placeholder="All priorities"
              />
              <FilterDropdown
                label="Destination"
                value={filters.destination || ''}
                options={[{ value: '', label: 'All destinations' }, ...destinationOptions]}
                onChange={setDestination}
                placeholder="All destinations"
              />
              <FilterDropdown
                label="Sort by"
                value={`${sort.field}-${sort.order}`}
                options={sortOptions}
                onChange={(val) => {
                  const [field, order] = val.split('-');
                  setSort(
                    field as 'estimatedDelivery' | 'lastUpdated',
                    order as 'asc' | 'desc'
                  );
                }}
                placeholder="Sort by"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-3 lg:flex-row lg:items-center"
    >
      <SearchField value={filters.search || ''} onChange={setSearch} />

      <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
        <FilterDropdown
          label="Status"
          value={filters.status || ''}
          options={[{ value: '', label: 'Status' }, ...statusOptions]}
          onChange={(v) => setStatus(v as ShipmentStatus | '')}
          placeholder="Status"
          className="min-w-[140px]"
        />
        <FilterDropdown
          label="Priority"
          value={filters.priority || ''}
          options={[{ value: '', label: 'Priority' }, ...priorityOptions]}
          onChange={(v) => setPriority(v as ShipmentPriority | '')}
          placeholder="Priority"
          className="min-w-[140px]"
        />
        <FilterDropdown
          label="Destination"
          value={filters.destination || ''}
          options={[{ value: '', label: 'Destination' }, ...destinationOptions]}
          onChange={setDestination}
          placeholder="Destination"
          className="min-w-[140px]"
        />
        <FilterDropdown
          label="Sort by"
          value={`${sort.field}-${sort.order}`}
          options={sortOptions}
          onChange={(val) => {
            const [field, order] = val.split('-');
            setSort(
              field as 'estimatedDelivery' | 'lastUpdated',
              order as 'asc' | 'desc'
            );
          }}
          placeholder="Sort by"
          className="min-w-[160px]"
        />
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-stone-400 transition-colors hover:bg-stone-800 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>
    </motion.div>
  );
}
