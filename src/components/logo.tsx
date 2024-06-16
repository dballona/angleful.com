import Link from 'next/link';
import Image from 'next/image';

export default async function Logo({
  className,
  width,
  height,
  style
}: {
  className?: string,
  width: number,
  height: number,
  style?: React.CSSProperties
}) {
  return (
    <Link
      href="/"
      className={className}
    >
      <Image src="/assets/logo.svg" width={width} height={height} style={style} alt="Logo" />
    </Link>
  );
}
