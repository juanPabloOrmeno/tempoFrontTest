import React, { useState } from 'react';
import type { FilterState } from '../types/transaction';
import '../styles/FilterPanel.css';

interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
  onApplyFilters?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, onApplyFilters }) => {
  const [filters, setFilters] = useState<FilterState>({
    merchantName: '',
    dateRange: 'Last 30 Days',
    status: 'All Transactions',
  });

  const handleMerchantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, merchantName: e.target.value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const newFilters = { ...filters, dateRange: e.currentTarget.textContent || 'Last 30 Days' };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, status: e.target.value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label className="filter-label">MERCHANT NAME</label>
        <input
          type="text"
          className="filter-input"
          placeholder="Search by merchant..."
          value={filters.merchantName}
          onChange={handleMerchantChange}
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">DATE RANGE</label>
        <button className="filter-date-btn">
          📅 {filters.dateRange}
        </button>
      </div>

      <div className="filter-group">
        <label className="filter-label">STATUS</label>
        <select
          className="filter-select"
          value={filters.status}
          onChange={handleStatusChange}
        >
          <option>All Transactions</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>

      <button
        className="apply-filters-btn"
        onClick={onApplyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;
