import { fireEvent, render, screen } from '@testing-library/react';

import SearchInput from '@/components/SearchInput';

describe('SearchInput', () => {
  it('renders', async () => {
    const mockOnSelectedCountry = jest.fn();

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([
        { name: 'Austria', latlng: [48.2155, 16.3075] },
        { name: 'Germany', latlng: [51.1657, 10.4515] },
        { name: 'Switzerland', latlng: [46.8182, 8.2275] },
      ]),
    });

    render(<SearchInput onSelectedCountry={mockOnSelectedCountry} />);

    const searchInput = screen.getByPlaceholderText('Search for countries ...');
    fireEvent.change(searchInput, { target: { value: 'aus' } });

    await screen.findByText('Austria');

    const countryResult = screen.getByText('Austria');
    fireEvent.click(countryResult);

    const heading = screen.getByText(/search for countries/i);

    expect(heading).toBeInTheDocument();
    expect(mockOnSelectedCountry).toHaveBeenCalled();
  });
});
