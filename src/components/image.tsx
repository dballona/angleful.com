'use client';

import NextImage from 'next/image';

type ImageBaseProps = {
  src: string;
  aspectRatio?: number;
  alt: string;
};

type ImageWithWidthProps = ImageBaseProps & {
  width: number;
  height?: never;
};

type ImageWithHeightProps = ImageBaseProps & {
  height: number;
  width?: never;
};

type ImageProps = ImageWithWidthProps | ImageWithHeightProps;

export default function Image({
  src,
  aspectRatio = 16 / 9,
  alt = '',
  width,
  height,
}: ImageProps) {
  if (width && !height) {
    height = width / aspectRatio;
  }

  if (height && !width) {
    width = height * aspectRatio;
  }

  return (
    <div
      style={{
        maxWidth: '100%',
        width,
        height,
        position: 'relative',
      }}
    >
      <NextImage
        src={src}
        fill
        alt={alt}
        style={{ objectFit: 'cover', borderRadius: '.25rem' }}
      />
    </div>
  );
}
