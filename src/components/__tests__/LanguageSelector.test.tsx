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
});
