'use client';

import { BIZ_DOMAINS } from '@/lib/constants/bizDomains';

interface BizDomainSelectProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function BizDomainSelect({
  value,
  onChange,
  label = 'Business Domain',
  placeholder = 'Select a business domain...',
  required = false,
  disabled = false,
}: BizDomainSelectProps) {
  // Group domains by category
  const coreDomains = BIZ_DOMAINS.filter((d) => d.category === 'core');
  const supportDomains = BIZ_DOMAINS.filter((d) => d.category === 'support');
  const commonDomains = BIZ_DOMAINS.filter((d) => d.category === 'common');

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || undefined)}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>

        {/* Core Servicing Domains */}
        {coreDomains.length > 0 && (
          <optgroup label="Core Servicing Domains">
            {coreDomains.map((domain) => (
              <option key={domain.name} value={domain.name}>
                {domain.icon} {domain.displayName}
              </option>
            ))}
          </optgroup>
        )}

        {/* Support Domain Capabilities */}
        {supportDomains.length > 0 && (
          <optgroup label="Support Domain Capabilities">
            {supportDomains.map((domain) => (
              <option key={domain.name} value={domain.name}>
                {domain.icon} {domain.displayName}
              </option>
            ))}
          </optgroup>
        )}

        {/* General Domain Capabilities */}
        {commonDomains.length > 0 && (
          <optgroup label="General Domain Capabilities">
            {commonDomains.map((domain) => (
              <option key={domain.name} value={domain.name}>
                {domain.icon} {domain.displayName}
              </option>
            ))}
          </optgroup>
        )}
      </select>

      {/* Help text with domain description */}
      {value && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900">
            {BIZ_DOMAINS.find((d) => d.name === value)?.description}
          </p>
        </div>
      )}
    </div>
  );
}

