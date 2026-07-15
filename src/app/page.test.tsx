import { render } from '@testing-library/react';
import { redirect } from 'next/navigation';
import Home from './page';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Home Page', () => {
  it('redirects to /shipments', () => {
    render(<Home />);
    expect(redirect).toHaveBeenCalledWith('/shipments');
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
