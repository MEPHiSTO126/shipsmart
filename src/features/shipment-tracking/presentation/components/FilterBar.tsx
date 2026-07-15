'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { CurvedInput } from '@/components/ui/CurvedInput';
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      ref={dropdownRef}
      className={`relative ${className}`}
      whileHover={{ zIndex: 10 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-target"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
      >
        <span className="truncate">{options.find(o => o.value === value)?.label || placeholder || label}</span>
        <motion.svg
          className="ml-2 h-4 w-4 text-gray-500 flex-shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg py-1 z-50"
            style={{ borderColor: '#e5e7eb' }}
            role="listbox"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left transition-colors ${
                  value === option.value
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="option"
                aria-selected={value === option.value}
                whileHover={{ x: 4 }}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearchSubmit = (value: string) => {
    setSearch(value);
  };

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 }}
        >
          <CurvedInput
            value={filters.search || ''}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            placeholder="Search tracking # or customer..."
            bend={0}
            height={48}
            width="100%"
            showButton={false}
            showIcon={true}
            theme="light"
            fontSize={14}
            borderWidth={1.5}
            backgroundColor="#ffffff"
            textColor="#1f2937"
            placeholderColor="#9ca3af"
            borderColor="#d1d5db"
            cornerRadius={18}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-2 w-full justify-start px-4 py-2.5 bg-white border rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-target"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Filters
            {hasActiveFilters && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
              >
                Active
              </motion.span>
            )}
          </motion.button>
          {hasActiveFilters && (
            <motion.button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-target"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Clear all
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 rounded-lg border bg-gray-50 p-4"
              style={{ borderColor: '#e5e7eb' }}
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 lg:flex-row lg:items-center"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 }}
        className="flex-1 min-w-[280px]"
      >
        <CurvedInput
          value={filters.search || ''}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          placeholder="Search tracking # or customer..."
          bend={8}
          height={52}
          width="100%"
          showButton={false}
          showIcon={true}
          theme="light"
          fontSize={15}
          borderWidth={1.5}
          backgroundColor="#ffffff"
          textColor="#1f2937"
          placeholderColor="#9ca3af"
          borderColor="#d1d5db"
          cornerRadius={18}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-3 lg:ml-auto"
      >
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
            <motion.button
              onClick={clearFilters}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 cursor-target"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}