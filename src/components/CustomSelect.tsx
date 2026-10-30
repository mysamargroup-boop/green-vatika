import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option',
  className = '',
  ariaLabel,
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3 rounded-xl gap-1.5',
    md: 'text-xs sm:text-sm py-2.5 px-4 rounded-2xl gap-2',
    lg: 'text-sm sm:text-base py-3 px-5 rounded-2xl gap-2.5',
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold text-foreground mb-1.5 tracking-wide">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || label || placeholder}
        className={`w-full flex items-center justify-between font-bold bg-card hover:bg-secondary/70 text-foreground border border-border/80 hover:border-primary/50 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer ${sizeClasses[size]}`}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <span className="text-primary shrink-0">{selectedOption.icon}</span>
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {/* Floating Modern Botanical Dropdown Popover */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 mt-1.5 w-full min-w-[210px] bg-card/98 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-primary/10 max-h-64 overflow-y-auto [scrollbar-width:thin] focus:outline-none"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors text-left cursor-pointer ${
                  isSelected
                    ? 'bg-primary/15 text-primary font-bold'
                    : 'text-foreground/90 hover:bg-secondary/80 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {option.icon && (
                    <span className={`shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                      {option.icon}
                    </span>
                  )}
                  <span className="truncate">{option.label}</span>
                  {option.badge && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-wide">
                      {option.badge}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
