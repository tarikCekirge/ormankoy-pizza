import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className='py-3 px-4'>
      <LinkButton to="/menu">&larr; Menüyü Görüntüle</LinkButton>

      <p className='font-semibold mt-7'>Sepetiniz henüz boş. Birkaç pizza eklemeye başlayın :)</p>
    </div>
  );

}

export default EmptyCart;
