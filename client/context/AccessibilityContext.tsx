import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  colorBlindFriendly: boolean;
  dyslexiaFriendly: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  toggleSetting: (setting: keyof AccessibilitySettings) => void;
  applyAccessibilityClasses: () => string;
}

const defaultSettings: AccessibilitySettings = {
  largeText: false,
  highContrast: false,
  reduceMotion: false,
  screenReader: false,
  keyboardNavigation: true,
  focusIndicators: true,
  colorBlindFriendly: false,
  dyslexiaFriendly: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
  undefined,
);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("accessibility-settings");
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    // Save to localStorage whenever settings change
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    
    // Apply settings to document
    applySettingsToDocument();
  }, [settings]);

  const applySettingsToDocument = () => {
    const root = document.documentElement;
    
    // Remove all accessibility classes first
    root.classList.remove(
      "large-text",
      "high-contrast",
      "reduce-motion",
      "screen-reader",
      "keyboard-navigation",
      "focus-indicators",
      "color-blind-friendly",
      "dyslexia-friendly"
    );
    
    // Add active classes
    if (settings.largeText) root.classList.add("large-text");
    if (settings.highContrast) root.classList.add("high-contrast");
    if (settings.reduceMotion) root.classList.add("reduce-motion");
    if (settings.screenReader) root.classList.add("screen-reader");
    if (settings.keyboardNavigation) root.classList.add("keyboard-navigation");
    if (settings.focusIndicators) root.classList.add("focus-indicators");
    if (settings.colorBlindFriendly) root.classList.add("color-blind-friendly");
    if (settings.dyslexiaFriendly) root.classList.add("dyslexia-friendly");
  };

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleSetting = (setting: keyof AccessibilitySettings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const applyAccessibilityClasses = () => {
    const classes: string[] = [];
    
    if (settings.largeText) classes.push("large-text");
    if (settings.highContrast) classes.push("high-contrast");
    if (settings.reduceMotion) classes.push("reduce-motion");
    if (settings.screenReader) classes.push("screen-reader");
    if (settings.keyboardNavigation) classes.push("keyboard-navigation");
    if (settings.focusIndicators) classes.push("focus-indicators");
    if (settings.colorBlindFriendly) classes.push("color-blind-friendly");
    if (settings.dyslexiaFriendly) classes.push("dyslexia-friendly");
    
    return classes.join(" ");
  };

  const value: AccessibilityContextType = {
    settings,
    updateSettings,
    toggleSetting,
    applyAccessibilityClasses,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
