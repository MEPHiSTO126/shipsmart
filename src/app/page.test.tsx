import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('renders start editing message', () => {
    render(<Home />);
    expect(
      screen.getByText(/To get started, edit the page.tsx file./i),
    ).toBeInTheDocument();
  });

  it('MSW successfully mocks a request to /api/shipments', async () => {
    const response = await fetch('/api/shipments');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toEqual(
      expect.objectContaining({
        trackingNumber: 'SLT-204891',
        status: 'in_transit',
        customerName: 'Ada Okafor',
      }),
    );
  });
});
