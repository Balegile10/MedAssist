"use client";
import HeroSection from '../components/HeroSection';
import { useSettings } from '../components/SettingsContext';

export default function HomePage() {
  const { language, darkMode } = useSettings();
  return (
    <main className={darkMode ? 'dark' : ''}>
      <HeroSection />
    </main>
  );
}
