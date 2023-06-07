import { ColorRing } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <ColorRing
        visible={true}
        height="90"
        width="90"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#f8d703', '#2042bd', '#f8d703', '#06d0f3', '#20bd3d']}
      />
    </LoaderWrapper>
  );
};
