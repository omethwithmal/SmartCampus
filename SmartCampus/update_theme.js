const fs = require('fs');
const file_path = 'e:\\Git_Project\\SmartCampus\\SmartCampus\\src\\components\\Ometh Widmal\\AddLectureHalls\\AddLectureHalls.jsx';

let content = fs.readFileSync(file_path, 'utf8');

// 1. Update states
content = content.replace(
    "const [isDarkTheme, setIsDarkTheme] = useState(true);",
    "const [theme, setTheme] = useState('emerald');\n  const isDarkTheme = theme !== 'light';"
);

content = content.replace(
    "  // Toggle theme function\n  const toggleTheme = () => {\n    setIsDarkTheme(!isDarkTheme);\n  };",
    `  // Set theme function\n  const changeTheme = (newTheme) => {\n    setTheme(newTheme);\n  };`
);

// 2. Update themeClasses
const theme_classes_old = `  // Dynamic theme classes based on isDarkTheme
  const themeClasses = {
    container: isDarkTheme ? 'bg-[#020b08]' : 'bg-gray-50',
    sidebar: isDarkTheme ? 'bg-[#041915]/80 border-emerald-500/20' : 'bg-white/80 border-emerald-200 shadow-lg',
    sidebarText: isDarkTheme ? 'text-emerald-300/60' : 'text-emerald-700/60',
    card: isDarkTheme ? 'bg-[#041915]/60 border-emerald-500/20' : 'bg-white/80 border-emerald-200 shadow-md',
    cardHover: isDarkTheme ? 'hover:border-emerald-500/40' : 'hover:border-emerald-300',
    text: isDarkTheme ? 'text-white' : 'text-gray-800',
    textSecondary: isDarkTheme ? 'text-emerald-300/50' : 'text-emerald-600/70',
    border: isDarkTheme ? 'border-emerald-500/20' : 'border-emerald-200',
    input: isDarkTheme ? 'bg-black/30 border-emerald-500/30 text-white' : 'bg-gray-100 border-emerald-300 text-gray-800',
    buttonPrimary: isDarkTheme ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500' : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600',
    buttonSecondary: isDarkTheme ? 'border-emerald-500/30 text-emerald-300/70 hover:bg-emerald-500/10' : 'border-emerald-300 text-emerald-600 hover:bg-emerald-50',
    tableHeader: isDarkTheme ? 'border-emerald-500/20 bg-emerald-900/20' : 'border-emerald-200 bg-emerald-50',
    tableRow: isDarkTheme ? 'border-emerald-500/10 hover:bg-emerald-500/5' : 'border-emerald-100 hover:bg-emerald-50/50',
    badgeAvailable: isDarkTheme ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
    badgeBooked: isDarkTheme ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
    badgeMaintenance: isDarkTheme ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-700',
  };`;

const theme_classes_new = `  // Dynamic theme classes
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
          input: 'bg-white border-emerald-300 text-gray-800',
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
          input: 'bg-black/30 border-blue-500/30 text-white',
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
          input: 'bg-black/30 border-orange-500/30 text-white',
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
          input: 'bg-black/30 border-purple-500/30 text-white',
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
          input: 'bg-black/30 border-emerald-500/30 text-white',
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

  const themeClasses = getThemeClasses(theme);`;

content = content.replace(theme_classes_old, theme_classes_new);

const theme_selector_old = `              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={\`p-3 rounded-2xl transition-all duration-300 backdrop-blur-md \${themeClasses.card} \${themeClasses.cardHover}\`}
                aria-label="Toggle theme"
              >
                {isDarkTheme ? (
                  <Sun size={20} className="text-amber-400" />
                ) : (
                  <Moon size={20} className="text-emerald-600" />
                )}
              </button>`;

const theme_selector_new = `              {/* Theme Selector UI */}
              <div className={\`flex items-center gap-2 p-2 rounded-2xl backdrop-blur-md \${themeClasses.card} \${themeClasses.cardHover}\`}>
                <button
                  onClick={() => changeTheme('light')}
                  className={\`p-2 rounded-xl transition-all duration-300 \${theme === 'light' ? 'bg-amber-100 text-amber-500 shadow-sm' : 'text-gray-400 hover:bg-slate-100 hover:text-amber-400'}\`}
                  title="Light Mode"
                >
                  <Sun size={18} />
                </button>
                <div className={\`w-px h-6 \${isDarkTheme ? 'bg-white/10' : 'bg-gray-200'}\`}></div>
                <button
                  onClick={() => changeTheme('emerald')}
                  className={\`p-2 rounded-xl transition-all duration-300 \${theme === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm' : 'text-gray-500 hover:bg-emerald-500/10 hover:text-emerald-400'}\`}
                  title="Emerald Dark"
                >
                  <Moon size={18} />
                </button>
                <button
                  onClick={() => changeTheme('ocean')}
                  className={\`p-2 rounded-xl transition-all duration-300 \${theme === 'ocean' ? 'bg-blue-500/20 text-blue-400 shadow-sm' : 'text-gray-500 hover:bg-blue-500/10 hover:text-blue-400'}\`}
                  title="Ocean Dark"
                >
                  <Wind size={18} />
                </button>
                <button
                  onClick={() => changeTheme('sunset')}
                  className={\`p-2 rounded-xl transition-all duration-300 \${theme === 'sunset' ? 'bg-orange-500/20 text-orange-400 shadow-sm' : 'text-gray-500 hover:bg-orange-500/10 hover:text-orange-400'}\`}
                  title="Sunset Dark"
                >
                  <Zap size={18} />
                </button>
                <button
                  onClick={() => changeTheme('purple')}
                  className={\`p-2 rounded-xl transition-all duration-300 \${theme === 'purple' ? 'bg-purple-500/20 text-purple-400 shadow-sm' : 'text-gray-500 hover:bg-purple-500/10 hover:text-purple-400'}\`}
                  title="Amethyst Dark"
                >
                  <Sparkles size={18} />
                </button>
              </div>`;

content = content.replace(theme_selector_old, theme_selector_new);

const accent_func = `
  // Helper for dynamic accent colors to avoid Tailwind purging issues
  const getDynamicColorClasses = (baseStr) => {
    if (theme === 'emerald') return baseStr; // original
    if (theme === 'light') return baseStr.replace(/emerald/g, 'emerald'); // light keeps emerald as primary
    if (theme === 'ocean') return baseStr.replace(/emerald/g, 'blue').replace(/green/g, 'indigo');
    if (theme === 'sunset') return baseStr.replace(/emerald/g, 'orange').replace(/green/g, 'red');
    if (theme === 'purple') return baseStr.replace(/emerald/g, 'purple').replace(/green/g, 'fuchsia');
    return baseStr;
  };
`;

content = content.replace(
    "const getThemeClasses = (currentTheme) => {",
    accent_func + "\n  const getThemeClasses = (currentTheme) => {"
);

// We replace a few major hardcoded emerald styling instances with their thematic counterparts
content = content.replace('bg-gradient-to-r from-emerald-400 to-green-400', '${getDynamicColorClasses("bg-gradient-to-r from-emerald-400 to-green-400")}');
content = content.replace('bg-gradient-to-r from-emerald-400 to-green-400', '${getDynamicColorClasses("bg-gradient-to-r from-emerald-400 to-green-400")}');

content = content.replaceAll(
    'className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"',
    'className={`text-2xl font-bold bg-clip-text text-transparent ${getDynamicColorClasses("bg-gradient-to-r from-emerald-400 to-green-400")} `}'
);

content = content.replaceAll('text-emerald-400', '${themeClasses.accentColor}');
content = content.replaceAll('text-emerald-400/70', '${themeClasses.accentColor} opacity-70');
content = content.replaceAll('text-emerald-400/60', '${themeClasses.accentColor} opacity-60');
content = content.replaceAll('text-emerald-400/80', '${themeClasses.accentColor} opacity-80');
content = content.replaceAll('text-emerald-300/60', '${themeClasses.textSecondary}');
content = content.replaceAll('text-emerald-300/50', '${themeClasses.textSecondary}');
content = content.replaceAll('text-emerald-300/80', '${themeClasses.textSecondary} opacity-80');

content = content.replaceAll('bg-emerald-500/20', '${themeClasses.accentBg}');
content = content.replaceAll('bg-emerald-500/10', '${themeClasses.accentBg} opacity-50');
content = content.replaceAll('border-emerald-500/30', '${themeClasses.accentBorder}');
content = content.replaceAll('border-emerald-500/20', '${themeClasses.border}');

content = content.replaceAll('hover:bg-emerald-500/20', 'hover:${themeClasses.accentBg}');
content = content.replaceAll('hover:bg-emerald-500/10', 'hover:${themeClasses.accentBg} opacity-80');

// Fix strings that got broken
content = content.replaceAll('className="${themeClasses.accentColor}"', 'className={themeClasses.accentColor}');
content = content.replaceAll('className={`${themeClasses.accentColor}`}', 'className={themeClasses.accentColor}');

fs.writeFileSync(file_path, content);
