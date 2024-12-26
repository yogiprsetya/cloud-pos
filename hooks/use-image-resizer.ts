import Compress from 'compress.js';

type Props = {
  width: number;
  height: number;
};

const compressor = new Compress();

export const useImageResizer = ({ width, height }: Props) => {
  const resizeFile = async (file: File) => {
    const resizedImage = await compressor.compress(file, {
      size: 2, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: width, // the max width of the output image, defaults to 1920px
      maxHeight: height, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    });

    return resizedImage;
  };

  return { resizeFile };
};
