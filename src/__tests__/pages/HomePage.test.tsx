import { act, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import HomePage from '@/app/page';

describe('Homepage', () => {
  beforeAll(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify({ status: 'success' }));
  });

  it('renders the Components', async () => {
    const mockResponse = new Response(JSON.stringify({ status: 'success' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    fetchMock.mockResolvedValue(mockResponse);

    render(<HomePage />);

    await waitFor(() => {
      const heading = screen.getAllByText(/neighborio/i);

      expect(heading).toHaveLength(2);
      expect(heading[0]).toBeInTheDocument();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  afterAll(() => {
    fetchMock.disableMocks();
    fetchMock.dontMock();
  });
});
