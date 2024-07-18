import { render, screen } from '@testing-library/react';

import CurrentLocation from '@/components/CurrentLocation';

import { Location } from '@/app/interfaces';

const mockLocation: Location = {
  countryName: 'Austria',
  countryCode: 'AT',
};

describe('CurrentLocation', () => {
  it('renders', () => {
    render(<CurrentLocation location={mockLocation} />);

    const heading = screen.getByText(/Austria/i);

    expect(heading).toBeInTheDocument();
  });
});
