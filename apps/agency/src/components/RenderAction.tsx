import { CallToAction } from '@mnsart/utils';
import Link from 'next/link';

export const RenderAction = ({ label, href }: CallToAction) => {
  return <Link href={href}>{label}</Link>;
};
