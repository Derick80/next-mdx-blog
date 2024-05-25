import Image from 'next/image'
import { buildImageUrl, setConfig } from 'cloudinary-build-url'
import { type TransformerOption } from '@cld-apis/types'
import { type CSSProperties } from 'react'
import clsx from 'clsx'


// w_100,q_auto,f_webp,e_blur:1000
setConfig({
    cloudName: 'dch-photo',
})

// https://github.com/kentcdodds/kentcdodds.com/blob/main/app/images.tsx
type ImageBuilder = {
    (transformations?: TransformerOption): string
    alt: string
    id: string
    className?: string
    style?: CSSProperties
}

function getImageBuilder (
    id: string,
    alt: string = '',
    { className, style }: { className?: string; style?: CSSProperties } = {},
): ImageBuilder {
    function imageBuilder (transformations?: TransformerOption) {
        return buildImageUrl(id, { transformations })
    }
    imageBuilder.alt = alt
    imageBuilder.id = id
    imageBuilder.className = className
    imageBuilder.style = style
    return imageBuilder
}



function BlogImage ({
    cloudinaryId,
    imgProps,
    transparentBackground,
}: {
    cloudinaryId: string
    imgProps: JSX.IntrinsicElements['img']
    transparentBackground?: boolean
}) {
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
            // @ts-expect-error classname is overridden by getImgProps
            className="w-full rounded-lg object-cover py-8"
            { ...getImgProps(getImageBuilder(cloudinaryId, ''), {
                widths: [350, 550, 700, 845, 1250, 1700, 2550],
                sizes: [
                    '(max-width:1023px) 80vw',
                    '(min-width:1024px) and (max-width:1620px) 50vw',
                    '850px',
                ],

                transformations: {
                    background: transparentBackground ? undefined : 'rgb:e6e9ee',
                },
            }) }
            width={imgProps.width || 845}
            height={ 475 }
            blurDataURL={getCloudinaryBlurUrl(cloudinaryId)}
            { ...imgProps }
        />
    )
}


function getImgProps (
    imageBuilder: ImageBuilder,
    {
        widths,
        sizes,
        transformations,
        className,
        style,
    }: {
        widths: Array<number>
        sizes: Array<string>
        transformations?: TransformerOption
        className?: string
        style?: CSSProperties
    },
) {
    const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)
    const aspectRatio = transformations?.resize?.aspectRatio
        ? transformations.resize.aspectRatio.replace(':', '/')
        : transformations?.resize?.height && transformations.resize.width
            ? `${transformations.resize.width}/${transformations.resize.height}`
            : imageBuilder.style?.aspectRatio

    return {
        style: {
            ...imageBuilder.style,
            aspectRatio,
            ...style,
        },
        className: clsx(imageBuilder.className, className),
        alt: imageBuilder.alt || '',
        src: imageBuilder({
            quality: 'auto',
            format: 'auto',
            ...transformations,
            resize: { width: averageSize, ...transformations?.resize },
        }),
        srcSet: widths
            .map(width =>
                [
                    imageBuilder({
                        quality: 'auto',
                        format: 'auto',
                        ...transformations,
                        resize: { width, ...transformations?.resize },
                    }),
                    `${width}w`,
                ].join(' '),
            )
            .join(', '),
        sizes: sizes.join(', '),
        crossOrigin: 'anonymous',
    } as const
}


const getCloudinaryBlurUrl = (imageUrl: string): string => {
    // Extract the base URL and path segments
    const baseUrl = imageUrl.split('/upload/')[0]
    const endUrl = imageUrl.split('/Japan_2023/')[1]

    // Insert transformation parameters before the first path segment
    const transformedPath = `w_100,q_auto,f_webp,e_blur:1000/Japan_2023/${endUrl}`;

    // Construct the transformed URL
    const transformedUrl = `${baseUrl}/upload/${transformedPath}`;

    return transformedUrl;
}



export { BlogImage, getImageBuilder, getImgProps, getCloudinaryBlurUrl }