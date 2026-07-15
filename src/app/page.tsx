import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/shipments');
  return null;
}
