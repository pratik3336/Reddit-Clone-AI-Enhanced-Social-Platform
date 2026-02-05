import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  Settings,
  Moon,
  Sun,
  Eye,
  Type,
  Zap,
  RotateCcw,
  X,
  Accessibility,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const {
    settings,
    toggleSetting,
    updateSettings,
  } = useAccessibility();

  const activeSettingsCount = Object.values(settings).filter(Boolean).length;

  return (
    <>
      {/* Accessibility Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-12 w-12 rounded-full shadow-lg transition-all duration-300 ${
            isOpen
              ? "bg-reddit-orange hover:bg-red-600"
              : "bg-wireframe-text-primary hover:bg-wireframe-text-secondary"
          } text-white`}
          aria-label="Accessibility Settings"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Accessibility className="w-6 h-6" />
              {activeSettingsCount > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-reddit-orange text-white text-xs"
                >
                  {activeSettingsCount}
                </Badge>
              )}
            </div>
          )}
        </Button>
      </div>

      {/* Accessibility Panel */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 p-4 border border-wireframe-border bg-wireframe-surface-primary shadow-xl z-50 animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-wireframe-text-primary" />
              <h3 className="font-semibold text-wireframe-text-primary">
                Accessibility
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-wireframe-surface-hover rounded transition-colors"
                aria-label={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? (
                  <ChevronUp className="w-4 h-4 text-wireframe-text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-wireframe-text-muted" />
                )}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateSettings({
                  largeText: false,
                  highContrast: false,
                  reduceMotion: false,
                  screenReader: false,
                  keyboardNavigation: true,
                  focusIndicators: true,
                  colorBlindFriendly: false,
                  dyslexiaFriendly: false,
                })}
                className="text-xs h-7 px-2 hover:bg-wireframe-surface-hover"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <div className="space-y-4">
              {/* Dark Mode */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-wireframe-surface-secondary">
                <div className="flex items-center space-x-3">
                  {false ? (
                    <Moon className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-600" />
                  )}
                  <div>
                    <div className="font-medium text-wireframe-text-primary">
                      Dark Mode
                    </div>
                    <div className="text-xs text-wireframe-text-muted">
                      Reduce eye strain in low light
                    </div>
                  </div>
                </div>
                <Switch
                  checked={false}
                                      onCheckedChange={() => toggleSetting('largeText')}
                  aria-label="Toggle dark mode"
                />
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-wireframe-surface-secondary">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-wireframe-text-primary">
                      High Contrast
                    </div>
                    <div className="text-xs text-wireframe-text-muted">
                      Improve text readability
                    </div>
                  </div>
                </div>
                <Switch
                  checked={settings.highContrast}
                                      onCheckedChange={() => toggleSetting('highContrast')}
                  aria-label="Toggle high contrast"
                />
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-wireframe-surface-secondary">
                <div className="flex items-center space-x-3">
                  <Type className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-wireframe-text-primary">
                      Large Text
                    </div>
                    <div className="text-xs text-wireframe-text-muted">
                      Increase font size for better readability
                    </div>
                  </div>
                </div>
                <Switch
                  checked={settings.largeText}
                                      onCheckedChange={() => toggleSetting('largeText')}
                  aria-label="Toggle large text"
                />
              </div>

              {/* Reduce Motion */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-wireframe-surface-secondary">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-wireframe-text-primary">
                      Reduce Motion
                    </div>
                    <div className="text-xs text-wireframe-text-muted">
                      Minimize animations and transitions
                    </div>
                  </div>
                </div>
                <Switch
                  checked={settings.reduceMotion}
                                      onCheckedChange={() => toggleSetting('reduceMotion')}
                  aria-label="Toggle reduce motion"
                />
              </div>

              {/* Active Settings Summary */}
              {activeSettingsCount > 0 && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                    Active Accessibility Features
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {false && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-blue-100 text-blue-800"
                      >
                        Dark Mode
                      </Badge>
                    )}
                    {settings.highContrast && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-purple-100 text-purple-800"
                      >
                        High Contrast
                      </Badge>
                    )}
                    {settings.largeText && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 text-green-800"
                      >
                        Large Text
                      </Badge>
                    )}
                    {settings.reduceMotion && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-orange-100 text-orange-800"
                      >
                        Reduce Motion
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Information */}
              <div className="text-xs text-wireframe-text-muted leading-relaxed p-3 bg-wireframe-surface-secondary rounded-lg">
                <strong>Tip:</strong> These settings are automatically saved and
                will persist across sessions. Some features respect your system
                preferences by default.
              </div>
            </div>
          )}

          {/* Minimized View */}
          {isMinimized && activeSettingsCount > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-wireframe-text-muted">
                {activeSettingsCount} feature
                {activeSettingsCount !== 1 ? "s" : ""} active
              </div>
              <div className="flex space-x-1">
                {false && (
                  <Moon className="w-4 h-4 text-blue-600" />
                )}
                {settings.highContrast && (
                  <Eye className="w-4 h-4 text-purple-600" />
                )}
                {settings.largeText && (
                  <Type className="w-4 h-4 text-green-600" />
                )}
                {settings.reduceMotion && (
                  <Zap className="w-4 h-4 text-orange-600" />
                )}
              </div>
            </div>
          )}
        </Card>
      )}
    </>
  );
}
