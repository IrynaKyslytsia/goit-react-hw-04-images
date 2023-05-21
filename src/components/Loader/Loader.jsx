import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css'

const Loader = () => {
    return (
        <Oval
  height={100}
  width={100}
  color="#3f51b5"
  wrapperStyle={{}}
  wrapperClass={css.loader}
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#3f51b5"
  strokeWidth={4}
  strokeWidthSecondary={4}
/>
    )
};

export default Loader;