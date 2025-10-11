'use client';
import { useParams } from 'next/navigation';

export default function SubcategoryPage() {
  const { slug } = useParams(); // gets the dynamic category ID or slug

  return (
    <div>
      <h1>Subcategories for: {slug}</h1>
    </div>
  );
}
