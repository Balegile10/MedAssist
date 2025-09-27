import { useSettings } from "../components/SettingsContext";

export default function ThemeWrapper({ children }) {
  const { darkMode } = useSettings();
  return (
    <div className={darkMode ? "dark" : ""}>
      {children}
    </div>
  );
}
