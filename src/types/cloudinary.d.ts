interface CloudinaryContextProps {
  cloudName: string;
  style: any;
}

interface ImageProps extends JSX.IntrinsicElements.img {
  publicId: string;
  crop: string;
}

interface VideoProps extends JSX.IntrinsicElements.video {
  publicId: string;
}

interface TransformationProps {
  quality: string;
  width: string | number;
  height: string | number;
  crop: string;
}

declare module "cloudinary-react" {
  class CloudinaryComponent {
    constructor(props, context): CloudinaryComponent;

    getChildContext(): any;

    render(): any;

    getChildTransformations(children): any;

    getTransformations(): any;

    normalizeOptions(...options): any;

    getURL(extendedProps): any;

    typesFrom(configParams): any;
  }

  export const CloudinaryContext: React.FC<CloudinaryContextProps>;

  export const Image: React.FC<PropsWithChildren<ImageProps>>;

  export const Video: React.FC<PropsWithChildren<VideoProps>>;

  export const Transformation: React.FC<TransformationProps>;
}
