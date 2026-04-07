import re
import os

file_path = r'e:\Git_Project\SmartCampus\SmartCampus\src\components\Ometh Widmal\AddLectureHalls\AddLectureHalls.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update states
content = re.sub(
    r"const \[isDarkTheme, setIsDarkTheme\] = useState\(true\);",
    r"const [theme, setTheme] = useState('emerald');\n  const isDarkTheme = theme !== 'light';",
    content
)

content = re.sub(
    r"// Toggle theme function\s+const toggleTheme = \(\) => \{\s+setIsDarkTheme\(!isDarkTheme\);\s+\};",
    r"""// Set theme function
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };""",
    content
)

# 2. Update themeClasses
theme_classes_old = r"""  // Dynamic theme classes based on isDarkTheme
  const themeClasses = {
    container: isDarkTheme \? 'bg-\[#020b08\]' : 'bg-gray-50',
    sidebar: isDarkTheme \? 'bg-\[#041915\]/80 border-emerald-500/20' : 'bg-white/80 border-emerald-200 shadow-lg',
    sidebarText: isDarkTheme \? 'text-emerald-300/60' : 'text-emerald-700/60',
    card: isDarkTheme \? 'bg-\[#041915\]/60 border-emerald-500/20' : 'bg-white/80 border-emerald-200 shadow-md',
    cardHover: isDarkTheme \? 'hover:border-emerald-500/40' : 'hover:border-emerald-300',
    text: isDarkTheme \? 'text-white' : 'text-gray-800',
    textSecondary: isDarkTheme \? 'text-emerald-300/50' : 'text-emerald-600/70',
    border: isDarkTheme \? 'border-emerald-500/20' : 'border-emerald-200',
    input: isDarkTheme \? 'bg-black/30 border-emerald-500/30 text-white' : 'bg-gray-100 border-emerald-300 text-gray-800',
    buttonPrimary: isDarkTheme \? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500' : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600',
    buttonSecondary: isDarkTheme \? 'border-emerald-500/30 text-emerald-300/70 hover:bg-emerald-500/10' : 'border-emerald-300 text-emerald-600 hover:bg-emerald-50',
    tableHeader: isDarkTheme \? 'border-emerald-500/20 bg-emerald-900/20' : 'border-emerald-200 bg-emerald-50',
    tableRow: isDarkTheme \? 'border-emerald-500/10 hover:bg-emerald-500/5' : 'border-emerald-100 hover:bg-emerald-50/50',
    badgeAvailable: isDarkTheme \? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
    badgeBooked: isDarkTheme \? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
    badgeMaintenance: isDarkTheme \? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-700',
  };"""

theme_classes_new = r"""  // Dynamic theme classes
  const getThemeClasses = (currentTheme) => {
    switch (currentTheme) {
      case 'light':
        return {
          container: 'bg-gray-50',
          sidebar: 'bg-white/80 border-emerald-200 shadow-lg',
          sidebarText: 'text-emerald-700/60',
          card: 'bg-white/80 border-emerald-200 shadow-md',
          cardHover: 'hover:border-emerald-300',
          text: 'text-gray-800',
          textSecondary: 'text-emerald-600/70',
          border: 'border-emerald-200',
          input: 'bg-white border-emerald-300 text-gray-800 focus:ring-emerald-500',
          buttonPrimary: 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white',
          buttonSecondary: 'border-emerald-300 text-emerald-600 hover:bg-emerald-50',
          tableHeader: 'border-emerald-200 bg-emerald-50 text-emerald-700',
          tableRow: 'border-emerald-100 hover:bg-emerald-50/50',
          badgeAvailable: 'bg-emerald-100 text-emerald-700',
          badgeBooked: 'bg-amber-100 text-amber-700',
          badgeMaintenance: 'bg-rose-100 text-rose-700',
          accent: 'emerald',
          accentColor: 'text-emerald-600',
          accentBg: 'bg-emerald-500/20',
          accentBorder: 'border-emerald-500/30'
        };
      case 'ocean':
        return {
          container: 'bg-[#020617]',
          sidebar: 'bg-[#0f172a]/80 border-blue-500/20 shadow-lg shadow-blue-900/20',
          sidebarText: 'text-blue-300/60',
          card: 'bg-[#0f172a]/60 border-blue-500/20',
          cardHover: 'hover:border-blue-500/40',
          text: 'text-white',
          textSecondary: 'text-blue-300/50',
          border: 'border-blue-500/20',
          input: 'bg-black/30 border-blue-500/30 text-white focus:ring-blue-500',
          buttonPrimary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white',
          buttonSecondary: 'border-blue-500/30 text-blue-300/70 hover:bg-blue-500/10',
          tableHeader: 'border-blue-500/20 bg-blue-900/20 text-blue-300',
          tableRow: 'border-blue-500/10 hover:bg-blue-500/5',
          badgeAvailable: 'bg-blue-500/20 text-blue-400',
          badgeBooked: 'bg-amber-500/20 text-amber-400',
          badgeMaintenance: 'bg-rose-500/20 text-rose-400',
          accent: 'blue',
          accentColor: 'text-blue-400',
          accentBg: 'bg-blue-500/20',
          accentBorder: 'border-blue-500/30'
        };
      case 'sunset':
        return {
          container: 'bg-[#1a0b02]',
          sidebar: 'bg-[#2a1304]/80 border-orange-500/20 shadow-lg shadow-orange-900/20',
          sidebarText: 'text-orange-300/60',
          card: 'bg-[#2a1304]/60 border-orange-500/20',
          cardHover: 'hover:border-orange-500/40',
          text: 'text-white',
          textSecondary: 'text-orange-300/50',
          border: 'border-orange-500/20',
          input: 'bg-black/30 border-orange-500/30 text-white focus:ring-orange-500',
          buttonPrimary: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white',
          buttonSecondary: 'border-orange-500/30 text-orange-300/70 hover:bg-orange-500/10',
          tableHeader: 'border-orange-500/20 bg-orange-900/20 text-orange-300',
          tableRow: 'border-orange-500/10 hover:bg-orange-500/5',
          badgeAvailable: 'bg-orange-500/20 text-orange-400',
          badgeBooked: 'bg-amber-500/20 text-amber-400',
          badgeMaintenance: 'bg-rose-500/20 text-rose-400',
          accent: 'orange',
          accentColor: 'text-orange-400',
          accentBg: 'bg-orange-500/20',
          accentBorder: 'border-orange-500/30'
        };
      case 'purple':
        return {
          container: 'bg-[#0f0728]',
          sidebar: 'bg-[#1c0f3d]/80 border-purple-500/20 shadow-lg shadow-purple-900/20',
          sidebarText: 'text-purple-300/60',
          card: 'bg-[#1c0f3d]/60 border-purple-500/20',
          cardHover: 'hover:border-purple-500/40',
          text: 'text-white',
          textSecondary: 'text-purple-300/50',
          border: 'border-purple-500/20',
          input: 'bg-black/30 border-purple-500/30 text-white focus:ring-purple-500',
          buttonPrimary: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white',
          buttonSecondary: 'border-purple-500/30 text-purple-300/70 hover:bg-purple-500/10',
          tableHeader: 'border-purple-500/20 bg-purple-900/20 text-purple-300',
          tableRow: 'border-purple-500/10 hover:bg-purple-500/5',
          badgeAvailable: 'bg-purple-500/20 text-purple-400',
          badgeBooked: 'bg-amber-500/20 text-amber-400',
          badgeMaintenance: 'bg-rose-500/20 text-rose-400',
          accent: 'purple',
          accentColor: 'text-purple-400',
          accentBg: 'bg-purple-500/20',
          accentBorder: 'border-purple-500/30'
        };
      case 'emerald':
      default:
        return {
          container: 'bg-[#020b08]',
          sidebar: 'bg-[#041915]/80 border-emerald-500/20 shadow-lg shadow-emerald-900/20',
          sidebarText: 'text-emerald-300/60',
          card: 'bg-[#041915]/60 border-emerald-500/20',
          cardHover: 'hover:border-emerald-500/40',
          text: 'text-white',
          textSecondary: 'text-emerald-300/50',
          border: 'border-emerald-500/20',
          input: 'bg-black/30 border-emerald-500/30 text-white focus:ring-emerald-500',
          buttonPrimary: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white',
          buttonSecondary: 'border-emerald-500/30 text-emerald-300/70 hover:bg-emerald-500/10',
          tableHeader: 'border-emerald-500/20 bg-emerald-900/20 text-emerald-300',
          tableRow: 'border-emerald-500/10 hover:bg-emerald-500/5',
          badgeAvailable: 'bg-emerald-500/20 text-emerald-400',
          badgeBooked: 'bg-amber-500/20 text-amber-400',
          badgeMaintenance: 'bg-rose-500/20 text-rose-400',
          accent: 'emerald',
          accentColor: 'text-emerald-400',
          accentBg: 'bg-emerald-500/20',
          accentBorder: 'border-emerald-500/30'
        };
    }
  };

  const themeClasses = getThemeClasses(theme);"""

content = re.sub(theme_classes_old, theme_classes_new, content)

# Theme Selector replacement
theme_selector_old = r"""              {/* Theme Toggle Button */}
              <button
                onClick=\{toggleTheme\}
                className=\{`p-3 rounded-2xl transition-all duration-300 backdrop-blur-md \$\{themeClasses\.card\} \$\{themeClasses\.cardHover\}`\}
                aria-label="Toggle theme"
              >
                \{isDarkTheme \? \(
                  <Sun size=\{20\} className="text-amber-400" />
                \) : \(
                  <Moon size=\{20\} className="text-emerald-600" />
                \)\}
              </button>"""

theme_selector_new = r"""              {/* Theme Selector UI */}
              <div className={`flex items-center gap-2 p-2 rounded-2xl backdrop-blur-md ${themeClasses.card} ${themeClasses.cardHover}`}>
                <button
                  onClick={() => changeTheme('light')}
                  className={`p-2 rounded-xl transition-all duration-300 ${theme === 'light' ? 'bg-amber-100 text-amber-500 shadow-sm' : 'text-gray-400 hover:bg-slate-100 hover:text-amber-400'}`}
                  title="Light Mode"
                >
                  <Sun size={18} />
                </button>
                <div className={`w-px h-6 ${isDarkTheme ? 'bg-white/10' : 'bg-gray-200'}`}></div>
                <button
                  onClick={() => changeTheme('emerald')}
                  className={`p-2 rounded-xl transition-all duration-300 ${theme === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm' : 'text-gray-500 hover:bg-emerald-500/10 hover:text-emerald-400'}`}
                  title="Emerald Dark"
                >
                  <Moon size={18} />
                </button>
                <button
                  onClick={() => changeTheme('ocean')}
                  className={`p-2 rounded-xl transition-all duration-300 ${theme === 'ocean' ? 'bg-blue-500/20 text-blue-400 shadow-sm' : 'text-gray-500 hover:bg-blue-500/10 hover:text-blue-400'}`}
                  title="Ocean Dark"
                >
                  <Wind size={18} />
                </button>
                <button
                  onClick={() => changeTheme('sunset')}
                  className={`p-2 rounded-xl transition-all duration-300 ${theme === 'sunset' ? 'bg-orange-500/20 text-orange-400 shadow-sm' : 'text-gray-500 hover:bg-orange-500/10 hover:text-orange-400'}`}
                  title="Sunset Dark"
                >
                  <Zap size={18} />
                </button>
                <button
                  onClick={() => changeTheme('purple')}
                  className={`p-2 rounded-xl transition-all duration-300 ${theme === 'purple' ? 'bg-purple-500/20 text-purple-400 shadow-sm' : 'text-gray-500 hover:bg-purple-500/10 hover:text-purple-400'}`}
                  title="Amethyst Dark"
                >
                  <Sparkles size={18} />
                </button>
              </div>"""

content = re.sub(theme_selector_old, theme_selector_new, content)

# Helper function
accent_func = r"""
  // Helper for dynamic accent colors to avoid Tailwind purging issues
  const getDynamicColorClasses = (baseStr) => {
    if (theme === 'emerald') return baseStr; // original
    if (theme === 'light') return baseStr.replace(/emerald/g, 'emerald'); // light keeps emerald as primary
    if (theme === 'ocean') return baseStr.replace(/emerald/g, 'blue').replace(/green/g, 'indigo');
    if (theme === 'sunset') return baseStr.replace(/emerald/g, 'orange').replace(/green/g, 'red');
    if (theme === 'purple') return baseStr.replace(/emerald/g, 'purple').replace(/green/g, 'fuchsia');
    return baseStr;
  };
"""
content = re.sub(
    r"const getThemeClasses = \(currentTheme\) => \{",
    accent_func + "\n  const getThemeClasses = (currentTheme) => {",
    content
)

# Apply dynamic classes
content = content.replace(
    'bg-gradient-to-r from-emerald-400 to-green-400',
    '${getDynamicColorClasses("bg-gradient-to-r from-emerald-400 to-green-400")}'
)

content = content.replace(
    'className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"',
    'className={`text-2xl font-bold bg-clip-text text-transparent ${getDynamicColorClasses("bg-gradient-to-r from-emerald-400 to-green-400")} `}'
)
content = content.replace(
    'border-b border-emerald-500/20',
    'border-b ${themeClasses.border}'
)
content = content.replace(
    'text-sm text-emerald-300/60 mt-2',
    'text-sm ${themeClasses.textSecondary} mt-2'
)

# Sidebar
content = content.replace(
    "'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-400/50 hover:shadow-xl hover:scale-105'",
    'getDynamicColorClasses("bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-400/50 hover:shadow-xl hover:scale-105")'
)
content = content.replace(
    "`bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10 border ${themeClasses.border}`",
    "`${themeClasses.accentBg} ${themeClasses.accentColor} shadow-lg shadow-black/10 border ${themeClasses.border}`"
)
content = content.replace(
    "`${themeClasses.sidebarText} hover:bg-emerald-500/10 hover:text-emerald-300`",
    "`${themeClasses.sidebarText} hover:${themeClasses.accentBg} hover:${themeClasses.accentColor}`"
)

# Score
content = content.replace(
    'text-4xl font-bold text-emerald-400 mt-1',
    'text-4xl font-bold ${themeClasses.accentColor} mt-1'
)
content = content.replace(
    'text-xs text-emerald-400/70',
    'text-xs ${themeClasses.accentColor} opacity-70'
)

# Main container elements
content = content.replace(
    'className="text-emerald-400"',
    'className={themeClasses.accentColor}'
)
content = content.replace(
    'className={`text-${kpi.color}-400`}',
    'className={kpi.color === "emerald" ? themeClasses.accentColor : `text-${kpi.color}-400`}'
)
content = content.replace(
    '<BarChart3 className="text-emerald-400" size={20} />',
    '<BarChart3 className={themeClasses.accentColor} size={20} />'
)
content = content.replace(
    '<Clock size={14} className="text-emerald-400" />',
    '<Clock size={14} className={themeClasses.accentColor} />'
)
content = content.replace(
    '<RefreshCw size={16} className="text-emerald-400" />',
    '<RefreshCw size={16} className={themeClasses.accentColor} />'
)

# Progress bars
content = content.replace(
    'className="text-emerald-400 font-mono"',
    'className={`${themeClasses.accentColor} font-mono`}'
)
content = content.replace(
    'className="h-2 bg-emerald-500/20 rounded-full overflow-hidden"',
    'className={`h-2 ${themeClasses.accentBg} rounded-full overflow-hidden`}'
)
content = content.replace(
    'className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-1000 ease-out"',
    'className={`h-full ${getDynamicColorClasses("bg-gradient-to-r from-emerald-500 to-green-400")} rounded-full transition-all duration-1000 ease-out`}'
)

content = re.sub(
    r'<circle cx="50" cy="50" r="45" fill="none" stroke="#22c55e20" strokeWidth="8" />',
    r'<circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className={`${themeClasses.accentColor} opacity-20`} strokeWidth="8" />',
    content
)
content = re.sub(
    r'<circle\s+cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="8"',
    r'<circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className={themeClasses.accentColor} strokeWidth="8"',
    content
)

# More styling replacements
content = content.replace(
    '`mt-4 p-3 bg-emerald-500/10 rounded-xl border ${themeClasses.border}`',
    '`mt-4 p-3 ${themeClasses.accentBg} rounded-xl border ${themeClasses.border}`'
)
content = content.replace(
    '<Calendar className="text-emerald-400" size={18} />',
    '<Calendar className={themeClasses.accentColor} size={18} />'
)
content = content.replace(
    'gap-2 text-xs text-emerald-400/60',
    'gap-2 text-xs ${themeClasses.accentColor} opacity-60'
)
content = content.replace(
    'w-2 h-2 bg-emerald-500 rounded-full animate-pulse',
    'w-2 h-2 ${themeClasses.accentBg} rounded-full animate-pulse'
)

content = content.replace(
    'bg-gradient-to-br from-emerald-900/40 via-emerald-800/20 to-black',
    '${getDynamicColorClasses("bg-gradient-to-br from-emerald-900/40 via-emerald-800/20 to-black")}'
)
content = content.replace(
    'border border-emerald-500/30 shadow-xl shadow-emerald-500/10',
    'border ${themeClasses.accentBorder} shadow-xl shadow-black/20'
)
content = content.replace(
    'w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse',
    'w-32 h-32 ${themeClasses.accentBg} rounded-full blur-3xl animate-pulse'
)
content = content.replace(
    'bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30',
    '${themeClasses.accentBg} flex items-center justify-center border ${themeClasses.accentBorder}'
)
content = content.replace(
    '<Brain className="text-emerald-400"',
    '<Brain className={themeClasses.accentColor}'
)

content = content.replace(
    'text-sm text-emerald-400 font-mono',
    'text-sm ${themeClasses.accentColor} font-mono'
)
content = content.replace(
    '"bg-emerald-500 h-full rounded-full transition-all duration-500"',
    '`${getDynamicColorClasses("bg-emerald-500")} h-full rounded-full transition-all duration-500`'
)

# AI Assistant Text
content = content.replace(
    'text-emerald-300/50 text-xs',
    '${themeClasses.textSecondary} text-xs'
)
content = content.replace(
    'text-emerald-300/80 text-sm',
    '${themeClasses.textSecondary} opacity-80 text-sm'
)

# Form Checkboxes
content = content.replace(
    'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
    '${themeClasses.accentBg} ${themeClasses.border} ${themeClasses.accentColor}'
)

# Button focus rings
content = content.replace(
    'focus:ring-emerald-500',
    'focus:ring-current'
)

# Hover bg fixes
content = content.replace(
    'hover:bg-emerald-500/10',
    'hover:${themeClasses.accentBg}'
)
content = content.replace(
    'hover:bg-emerald-500/20',
    'hover:bg-black/10'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
