import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import LanguageSelector from '../LanguageSelector';
import * as LanguageContext from '@/contexts/LanguageContext';

// Mock the hook
const useLanguageSpy = vi.spyOn(LanguageContext, 'useLanguage');

describe('LanguageSelector', () => {
  it('renders correctly and toggles language', () => {
    const setLanguageMock = vi.fn();
    const tMock = (key: string) => {
      if (key === 'language.vietnamese') return 'Tiếng Việt';
      if (key === 'language.english') return 'English';
      if (key === 'settings.language') return 'Ngôn ngữ';
      return key;
    };

    useLanguageSpy.mockReturnValue({
      language: 'vi',
      setLanguage: setLanguageMock,
      t: tMock,
    });

    render(<LanguageSelector />);

    // Check if Vietnamese flag/abbr is displayed (based on component logic)
    expect(screen.getByText('🇻🇳')).toBeInTheDocument();
    expect(screen.getByText('VI')).toBeInTheDocument();

    // Click to toggle
    fireEvent.click(screen.getByRole('button'));

    // Check if setLanguage was called with 'en'
    expect(setLanguageMock).toHaveBeenCalledWith('en');
  });

  it('renders correctly for English and toggles back to Vietnamese', () => {
    const setLanguageMock = vi.fn();
    const tMock = (key: string) => {
      if (key === 'language.vietnamese') return 'Tiếng Việt';
      if (key === 'language.english') return 'English';
      if (key === 'settings.language') return 'Ngôn ngữ';
      return key;
    };

    useLanguageSpy.mockReturnValue({
      language: 'en',
      setLanguage: setLanguageMock,
      t: tMock,
    });

    render(<LanguageSelector />);

    // Check if US flag/abbr is displayed
    expect(screen.getByText('🇺🇸')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();

    // Check title attribute
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Ngôn ngữ');

    // Click to toggle
    fireEvent.click(screen.getByRole('button'));

    // Check if setLanguage was called with 'vi'
    expect(setLanguageMock).toHaveBeenCalledWith('vi');
  });

  it('falls back to default language (Vietnamese) when current language is invalid', () => {
    const setLanguageMock = vi.fn();
    const tMock = (key: string) => key;

    useLanguageSpy.mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      language: 'invalid_code' as any, // Unknown language code
      setLanguage: setLanguageMock,
      t: tMock,
    });

    render(<LanguageSelector />);

    // Should render default (Vietnamese)
    expect(screen.getByText('🇻🇳')).toBeInTheDocument();
    expect(screen.getByText('VI')).toBeInTheDocument();

    // Interaction should reset/correct to 'vi' based on toggle logic
    // Logic: language === 'vi' ? 'en' : 'vi'. 'invalid' !== 'vi', so returns 'vi'.
    fireEvent.click(screen.getByRole('button'));
    expect(setLanguageMock).toHaveBeenCalledWith('vi');
  });
});
