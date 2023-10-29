import Header from '../../../components/header/index';
import HeaderBaiviet from '../../baiviet/header_baiviet';
import SlideBaiViet from '../../baiviet/slide_baiviet';


function BaiVietHome() {
  return (
    <div className="CarHome">
     
     <Header />,
     <HeaderBaiviet />,
     <SlideBaiViet />,
   
    </div>
  );
}

export default BaiVietHome;
