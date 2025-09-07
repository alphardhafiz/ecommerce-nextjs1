declare module "react-flickity-component" {
  import * as React from "react";

  export interface FlickityOptions {
    accessibility?: boolean;
    autoPlay?: boolean | number;
    cellAlign?: string;
    cellSelector?: string;
    contain?: boolean;
    draggable?: boolean;
    freeScroll?: boolean;
    friction?: number;
    initialIndex?: number;
    lazyLoad?: boolean | number;
    percentPosition?: boolean;
    prevNextButtons?: boolean;
    pageDots?: boolean;
    resize?: boolean;
    rightToLeft?: boolean;
    setGallerySize?: boolean;
    watchCSS?: boolean;
    wrapAround?: boolean;
    [key: string]: any;
  }

  export interface FlickityProps {
    className?: string;
    elementType?: string;
    options?: FlickityOptions;
    disableImagesLoaded?: boolean;
    reloadOnUpdate?: boolean;
    static?: boolean;
    children?: React.ReactNode;
  }

  export default class Flickity extends React.Component<FlickityProps> {}
}