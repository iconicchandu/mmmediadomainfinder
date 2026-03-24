import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, Loader2, ChevronDown, Plus, Trash2 } from 'lucide-react'

interface DomainSearchProps {
  onSearch: (keyword: string, selections: Array<{tld: string; count: number}>) => void
  disabled: boolean
}

// All supported TLDs with categories
const TLD_DATA = [
  { tld: 'com', category: 'popular' },
  { tld: 'xyz', category: 'modern' },
  { tld: 'shop', category: 'business' },
  { tld: 'online', category: 'modern' },
  { tld: 'org', category: 'popular' },
  { tld: 'net', category: 'popular' },
  { tld: 'io', category: 'popular' },
  { tld: 'co', category: 'popular' },
  { tld: 'info', category: 'professional' },
  { tld: 'biz', category: 'business' },
  { tld: 'top', category: 'modern' },
  { tld: 'live', category: 'modern' },
  { tld: 'world', category: 'modern' },
  { tld: 'global', category: 'modern' },
  { tld: 'tech', category: 'tech' },
  { tld: 'app', category: 'tech' },
  { tld: 'dev', category: 'tech' },
  { tld: 'site', category: 'modern' },
  { tld: 'website', category: 'modern' },
  { tld: 'store', category: 'business' },
  { tld: 'cloud', category: 'tech' },
  { tld: 'ai', category: 'tech' },
  { tld: 'pro', category: 'professional' },
  { tld: 'expert', category: 'professional' },
  { tld: 'solutions', category: 'business' },
  { tld: 'services', category: 'business' },
  { tld: 'group', category: 'business' },
  { tld: 'company', category: 'business' },
  { tld: 'ventures', category: 'business' },
  { tld: 'me', category: 'popular' },
  { tld: 'tv', category: 'modern' },
  { tld: 'cc', category: 'popular' },
  { tld: 'name', category: 'popular' },
  { tld: 'email', category: 'professional' },
  { tld: 'blog', category: 'modern' },
  { tld: 'news', category: 'modern' }
]

export default function DomainSearch({ onSearch, disabled }: DomainSearchProps) {
  const [searchMode, setSearchMode] = useState<'basic' | 'advanced'>('basic')
  const [keyword, setKeyword] = useState('')
  
  // Basic search state
  const [tld, setTld] = useState('com')
  const [count, setCount] = useState<number | ''>('')
  
  // Advanced search state
  const [selections, setSelections] = useState<Array<{ id: number; tld: string; count: number | '' }>>([
    { id: Date.now(), tld: 'xyz', count: '' }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredTLDs = useMemo(() => {
    let filtered = TLD_DATA
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(item => item.tld.toLowerCase().includes(term))
    }
    return filtered
  }, [searchTerm])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyword.trim() || disabled) return
    
    if (searchMode === 'basic') {
      if (count === '' || (typeof count === 'number' && (count < 1 || count > 1000))) return
      const countValue = typeof count === 'number' ? count : parseInt(String(count))
      onSearch(keyword.trim(), [{ tld, count: countValue }])
    } else {
      const validSelections = selections.filter(s => s.tld && s.count !== '' && Number(s.count) >= 1 && Number(s.count) <= 1000)
      if (validSelections.length === 0) return
      
      const formattedSelections = validSelections.map(s => ({
        tld: s.tld,
        count: typeof s.count === 'number' ? s.count : parseInt(String(s.count))
      }))
      onSearch(keyword.trim(), formattedSelections)
    }
  }

  const addSelectionRow = () => {
    setSelections([...selections, { id: Date.now(), tld: 'xyz', count: '' }])
  }

  const removeSelectionRow = (id: number) => {
    if (selections.length > 1) {
      setSelections(selections.filter(s => s.id !== id))
    }
  }

  const updateSelection = (id: number, field: 'tld' | 'count', value: any) => {
    setSelections(selections.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const isSearchDisabled = () => {
    if (disabled || !keyword.trim()) return true
    if (searchMode === 'basic') {
      return count === '' || (typeof count === 'number' && count < 1)
    } else {
      return !selections.some(s => s.tld && s.count !== '' && Number(s.count) >= 1)
    }
  }

  const renderDropdown = (currentTld: string, id: string | number, onSelect: (newTld: string) => void) => (
    <div className={`relative ${openDropdownId === id ? 'z-[100]' : 'z-10'}`}>
      <button
        type="button"
        onClick={() => {
          if (openDropdownId === id) setOpenDropdownId(null)
          else setOpenDropdownId(id)
          setSearchTerm('')
        }}
        disabled={disabled}
        className="w-full flex items-center justify-between px-4 py-3 text-sm bg-white/40 backdrop-blur-md border border-white/50 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-white/60 focus:border-white/60 outline-none transition-all duration-300 shadow-sm hover:bg-white/50 hover:shadow-md h-[46px]"
      >
        <span>.{currentTld}</span>
        <ChevronDown className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${openDropdownId === id ? 'rotate-180' : ''}`} />
      </button>

      {openDropdownId === id && (
         <div className="absolute z-[70] w-full mt-2 bg-white/95 backdrop-blur-xl border border-white/50 rounded-xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col min-w-[17rem] right-0 md:left-0 md:right-auto">
          <div className="p-2 border-b border-gray-200/50 bg-white/50">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search extensions..."
                className="w-full px-3 py-2 pr-8 text-xs bg-white/80 border border-gray-300/50 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-sm"
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <ul className="max-h-48 overflow-y-auto py-1">
            {filteredTLDs.length > 0 ? (
              filteredTLDs.map((item) => (
                <li
                  key={item.tld}
                  onClick={() => {
                    onSelect(item.tld)
                    setOpenDropdownId(null)
                    setSearchTerm('')
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-black/5 transition-colors ${currentTld === item.tld ? 'bg-blue-50/50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  .{item.tld}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500 text-center">No extensions found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto relative z-50 mb-8" ref={dropdownRef}>
      {/* Search Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/20 p-1.5 rounded-xl flex gap-1 justify-center backdrop-blur-lg border border-white/40 shadow-sm w-full md:w-auto">
          <button
            type="button"
            onClick={() => setSearchMode('basic')}
            className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex-1 md:flex-none ${searchMode === 'basic' ? 'bg-white/80 text-gray-900 shadow-md' : 'text-gray-600/90 hover:bg-white/30 hover:text-gray-800'}`}
          >
            Basic
          </button>
          <button
            type="button"
            onClick={() => setSearchMode('advanced')}
            className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex-1 md:flex-none ${searchMode === 'advanced' ? 'bg-white/80 text-gray-900 shadow-md' : 'text-gray-600/90 hover:bg-white/30 hover:text-gray-800'}`}
          >
            Advanced
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-3xl p-6 md:p-8">
        {searchMode === 'basic' ? (
          <div className="flex flex-col md:flex-row gap-4 md:gap-5">
            {/* Keyword Input */}
            <div className="flex-1">
              <label htmlFor="keyword" className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Keyword
              </label>
              <input
                type="text"
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., home warranty"
                className="w-full px-4 py-3 text-sm bg-white/40 backdrop-blur-md border border-white/50 rounded-xl text-gray-900 placeholder-gray-500 font-medium focus:ring-2 focus:ring-white/60 focus:border-white/60 outline-none transition-all duration-300 shadow-sm hover:bg-white/50 hover:shadow-md h-[46px]"
                disabled={disabled}
              />
            </div>

            {/* Extension Dropdown */}
            <div className="md:w-48 relative z-[55]">
              <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Extension
              </label>
              {renderDropdown(tld, 'basic', setTld)}
            </div>

            {/* Count */}
            <div className="md:w-40 relative z-0">
              <label htmlFor="count" className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Count
              </label>
              <input
                type="number"
                id="count"
                min="1"
                max="1000"
                value={count}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '') setCount('')
                  else setCount(Math.max(1, Math.min(1000, parseInt(value) || 1)))
                }}
                className="w-full px-4 py-3 text-sm bg-white/40 backdrop-blur-md border border-white/50 rounded-xl text-gray-900 placeholder-gray-500 font-medium focus:ring-2 focus:ring-white/60 focus:border-white/60 outline-none transition-all duration-300 shadow-sm hover:bg-white/50 hover:shadow-md h-[46px]"
                disabled={disabled}
                placeholder="How Many??"
              />
            </div>

            {/* Basic Search Button */}
            <div className="flex items-end relative z-0">
              <button
                type="submit"
                disabled={isSearchDisabled()}
                className="w-full md:w-auto px-8 py-3 text-sm bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:translate-y-0 backdrop-blur-sm h-[46px] flex justify-center items-center"
              >
                {disabled ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Searching...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 relative">
            {/* Advanced Keyword & Search Button - Single Row */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-sm relative z-0">
              <div className="flex-1">
                <label htmlFor="adv-keyword" className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                  Main Keyword
                </label>
                <input
                  type="text"
                  id="adv-keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g., home warranty"
                  className="w-full px-4 py-3 text-sm bg-white/50 backdrop-blur-md border border-white/60 rounded-xl text-gray-900 placeholder-gray-500 font-medium focus:ring-2 focus:ring-white/60 focus:border-white/60 outline-none transition-all duration-300 shadow-sm hover:bg-white/60 hover:shadow-md h-[46px]"
                  disabled={disabled}
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSearchDisabled()}
                  className="w-full sm:w-48 px-8 py-3 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:translate-y-0 backdrop-blur-sm h-[46px] flex justify-center items-center"
                >
                  {disabled ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Searching...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 tracking-wide">
                      <Search className="w-4 h-4" />
                      <span>SEARCH ALL</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Advanced Extensions Header */}
            <div className="flex items-center justify-between relative z-0">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                Target Extensions & Counts
              </label>
              <button
                type="button"
                onClick={addSelectionRow}
                disabled={disabled}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-900 bg-white/40 hover:bg-white/70 px-4 py-2 rounded-xl transition-all shadow-sm border border-white/50"
              >
                <Plus className="w-4 h-4" /> Add Extension
              </button>
            </div>

            {/* Advanced Rows — 4 cols grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {selections.map((sel) => (
                <div key={sel.id} className={`relative bg-white/20 rounded-2xl border border-white/40 backdrop-blur-md p-3 flex flex-col gap-2 ${openDropdownId === sel.id ? 'z-50' : 'z-10'}`}>
                  {/* Extension Dropdown */}
                  <div className="relative">
                    {renderDropdown(sel.tld, sel.id, (newTld) => updateSelection(sel.id, 'tld', newTld))}
                  </div>

                  {/* Count + Delete */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={sel.count}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '') updateSelection(sel.id, 'count', '')
                        else updateSelection(sel.id, 'count', Math.max(1, Math.min(1000, parseInt(value) || 1)))
                      }}
                      className="flex-1 min-w-0 px-3 py-2 text-sm bg-white/50 backdrop-blur-md border border-white/50 rounded-xl text-gray-900 placeholder-gray-500 font-medium focus:ring-2 focus:ring-white/60 outline-none transition-all shadow-sm hover:bg-white/60"
                      disabled={disabled}
                      placeholder="Count"
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectionRow(sel.id)}
                      disabled={disabled || selections.length === 1}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-400/20 bg-red-400/10 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-red-400/20 flex items-center justify-center shadow-sm"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </form>
    </div>
  )
}
