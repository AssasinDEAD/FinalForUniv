declare module 'react-native-image-picker' {
  export type Asset = {
    uri: string;
    type: string;
    fileName: string;
  };

  export interface ImagePickerResponse {
    assets?: Asset[];
    errorCode?: string;
    errorMessage?: string;
  }

  export interface ImagePickerOptions {
    mediaType?: 'photo' | 'video';
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
    includeBase64?: boolean;
    includeExtra?: boolean;
  }

  export function launchImageLibrary(
    options: ImagePickerOptions,
    callback: (response: ImagePickerResponse) => void
  ): void;

  export function launchCamera(
    options: ImagePickerOptions,
    callback: (response: ImagePickerResponse) => void
  ): void;
}
