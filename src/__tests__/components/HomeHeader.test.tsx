import { render, screen } from '@testing-library/react';

import HomeHeader from '@/components/HomeHeader';

describe('HomeHeader', () => {
  it('renders', () => {
    render(<HomeHeader />);

    const heading = screen.getByText(/neighborio/i);

    expect(heading).toBeInTheDocument();
  });
});
