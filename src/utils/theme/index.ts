import { ThemeColorsType, ThemeColorName } from '@/constants';
import { Theme } from '@bole-core/theme';

export class ThemeManager {
  private static ThemeInstance: Theme<ThemeColorName>;

  public static getThemeInstance() {
    if (!this.ThemeInstance) {
      this.ThemeInstance = new Theme();
    }
    return this.ThemeInstance;
  }

  static init(themeColors: ThemeColorsType) {
    this.getThemeInstance().init(themeColors);
  }

  static setThemeColors(themeColors: ThemeColorsType) {
    this.getThemeInstance().setThemeColors(themeColors);
  }

  static getThemeColors() {
    return this.getThemeInstance().getThemeColors();
  }

  static getThemeMap() {
    return this.getThemeInstance().getThemeMap();
  }

  static getStorageThemeName(): keyof ThemeColorsType {
    return this.getThemeInstance().getStorageThemeName() ?? 'default';
  }

  static setTheme(themeName: keyof ThemeColorsType) {
    this.getThemeInstance().setTheme(themeName);
  }
}
