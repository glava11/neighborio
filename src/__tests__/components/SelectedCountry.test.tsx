import { render, screen } from '@testing-library/react';

import SelectedCountry from '@/components/SelectedCountry';

import { Country } from '@/app/interfaces';

const mockCountry: Country = {
  name: 'Austria',
  latlng: [48.2155, 16.3075],
  flag: 'https://flagcdn.com/at.svg',
  distance: 100,
  population: 10101010,
  topLevelDomain: '.at',
};

describe('SelectedCountry', () => {
  it('renders', () => {
    render(<SelectedCountry country={mockCountry} />);

    const heading = screen.getByText(/10,101,010/i);

    expect(heading).toBeInTheDocument();
  });
});
