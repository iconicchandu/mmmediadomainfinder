import { useState, useMemo } from 'react'
import { Download, X, CheckCircle2, XCircle } from 'lucide-react'

interface DomainResultsProps {
  results: {
    keyword: string
    tld: string
    totalGenerated: number
    available: number
    domains: string[] | Array<{ domain: string; available: boolean }>
  }
  requestedCount: number
}

export default function DomainResults({ results, requestedCount }: DomainResultsProps) {
  const [deletedDomains, setDeletedDomains] = useState<Set<string>>(new Set())
  const [activeExt, setActiveExt] = useState<string>('all')

  // Normalize domains to always have domain and available properties
  const normalizedDomains = results.domains.map(domain => {
    if (typeof domain === 'string') {
      return { domain, available: true };
    }
    return domain as { domain: string; available: boolean };
  });

  // Limit domains to the requested count
  const limitedDomains = normalizedDomains.slice(0, requestedCount)

  // Filter out deleted domains
  const allVisibleDomains = limitedDomains.filter(d => !deletedDomains.has(d.domain))

  // Extract unique TLDs from domains (after the last dot)
  const uniqueExtensions = useMemo(() => {
    const exts = new Set<string>()
    allVisibleDomains.forEach(d => {
      const parts = d.domain.split('.')
      if (parts.length >= 2) exts.add(parts[parts.length - 1])
    })
    return Array.from(exts).sort()
  }, [allVisibleDomains])

  // Only show extension tabs if more than one TLD
  const showTabs = uniqueExtensions.length > 1

  // Filter domains by active extension
  const visibleDomains = useMemo(() => {
    if (activeExt === 'all') return allVisibleDomains
    return allVisibleDomains.filter(d => {
      const parts = d.domain.split('.')
      return parts[parts.length - 1] === activeExt
    })
  }, [allVisibleDomains, activeExt])

  // Get only available domains for bulk check (from current tab)
  const availableDomains = visibleDomains.filter(d => d.available)
  const allAvailableDomains = allVisibleDomains.filter(d => d.available)

  const handleDeleteDomain = (domain: string) => {
    setDeletedDomains(prev => new Set(prev).add(domain))
  }

  const handleBulkCheckAndBuy = () => {
    if (availableDomains.length === 0) return;
    const domainsParam = availableDomains.map(d => encodeURIComponent(d.domain)).join(',');
    const url = `https://www.namecheap.com/domains/registration/results/?domain=${domainsParam}&type=beast`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const handleExportCSV = () => {
    if (visibleDomains.length === 0) return;
    const csvHeader = 'Domain,Available\n';
    const csvRows = visibleDomains.map(d => `${d.domain},${d.available ? 'Yes' : 'No'}`).join('\n');
    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `domains_${results.keyword}_${results.tld}_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const getExtCount = (ext: string) => {
    if (ext === 'all') return allVisibleDomains.length
    return allVisibleDomains.filter(d => {
      const parts = d.domain.split('.')
      return parts[parts.length - 1] === ext
    }).length
  }

  return (
    <div className="mt-8">
      <div className="bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-3xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">
            Results
          </h2>
          {allVisibleDomains.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="px-5 py-2.5 text-sm bg-white/40 backdrop-blur-md border border-white/50 text-gray-800 font-bold rounded-xl hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="px-4 py-2 bg-white/40 border border-white/50 rounded-full backdrop-blur-md flex items-center gap-2 shadow-sm">
            <span className="text-gray-600 font-medium tracking-wide">Keyword:</span>
            <span className="text-gray-900 font-bold">{results.keyword}</span>
          </div>
          <div className="px-4 py-2 bg-white/40 border border-white/50 rounded-full backdrop-blur-md flex items-center gap-2 shadow-sm">
            <span className="text-gray-600 font-medium tracking-wide">Extension:</span>
            <span className="text-gray-900 font-bold">
              {results.tld.split(', ').map(t => `.${t}`).join(', ')}
            </span>
          </div>
          <div className="px-4 py-2 bg-white/40 border border-white/50 rounded-full backdrop-blur-md flex items-center gap-2 shadow-sm">
            <span className="text-gray-600 font-medium tracking-wide">Generated:</span>
            <span className="text-gray-900 font-bold">{Math.min(requestedCount, limitedDomains.length)}</span>
          </div>
          <div className="px-4 py-2 bg-green-400/30 border border-green-400/50 rounded-full backdrop-blur-md flex items-center gap-2 shadow-sm">
            <span className="text-green-800 font-medium tracking-wide">Available:</span>
            <span className="text-green-900 font-black">{allAvailableDomains.length}</span>
          </div>
        </div>

        {/* Extension filter tabs */}
        {showTabs && (
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveExt('all')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all duration-200 ${
                activeExt === 'all'
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white/40 text-gray-700 border-white/50 hover:bg-white/60'
              }`}
            >
              All <span className="ml-1 opacity-70">({getExtCount('all')})</span>
            </button>
            {uniqueExtensions.map(ext => (
              <button
                key={ext}
                onClick={() => setActiveExt(ext)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all duration-200 ${
                  activeExt === ext
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white/40 text-gray-700 border-white/50 hover:bg-white/60'
                }`}
              >
                .{ext} <span className="ml-1 opacity-70">({getExtCount(ext)})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {visibleDomains.length === 0 ? (
        <div className="bg-white/20 backdrop-blur-xl border border-white/40 shadow-lg rounded-3xl p-8 text-center">
          <p className="text-gray-700 text-base font-medium">
            No domains found. Try a different keyword or extension.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {visibleDomains.map((domainData, index) => (
              <div
                key={domainData.domain}
                className={`group relative overflow-hidden rounded-xl p-2 px-3 transition-all duration-300 transform hover:-translate-y-1 grid grid-cols-[auto_1fr_auto] items-center gap-2 ${domainData.available
                  ? 'bg-white/30 hover:bg-white/40 border border-white/50 shadow-sm hover:shadow-lg backdrop-blur-lg'
                  : 'bg-red-400/10 border border-red-400/20 backdrop-blur-md opacity-60 hover:opacity-100'
                  }`}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                {/* Left: Status Icon */}
                <div className="flex items-center justify-center">
                  {domainData.available ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>

                {/* Center: Domain Name */}
                <div className="flex items-center justify-center overflow-hidden">
                  <span className={`text-[15px] font-bold tracking-tight truncate text-center ${domainData.available ? 'text-gray-800' : 'text-gray-500 line-through'
                    }`}>
                    {domainData.domain}
                  </span>
                </div>

                {/* Right: Permanent Delete Button */}
                <button
                  onClick={() => handleDeleteDomain(domainData.domain)}
                  className="p-1 rounded-full text-red-500/60 hover:text-red-600 hover:bg-red-500/10 flex items-center justify-center transition-all duration-300"
                  title="Delete domain"
                  aria-label={`Delete ${domainData.domain}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-500/5 pointer-events-none" />
            <button
              onClick={handleBulkCheckAndBuy}
              className="relative mx-auto px-10 py-4 text-base bg-gradient-to-r from-gray-900 to-gray-800 text-white font-black tracking-wide rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 backdrop-blur-sm"
            >
              Get {availableDomains.length} domains
            </button>
            <p className="relative text-sm text-gray-700 mt-4 font-medium">
              Instantly opens Namecheap Beast Mode with your available domains
            </p>
          </div>
        </>
      )}
    </div>
  )
}
