import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div>
      <Link to="/menu">&larr; Menüyü Görüntüle</Link>

      <p>Sepetiniz henüz boş. Birkaç pizza eklemeye başlayın :)</p>
    </div>
  );

}

export default EmptyCart;
