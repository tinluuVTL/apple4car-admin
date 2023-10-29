import Header from '../../../components/header/index';
import HeaderCar from '../../car/header_car/index';
import SlideCar from '../../car/slide_car/index';


function CarHome() {
  return (
    <div className="CarHome">
     
     <Header />,
     <HeaderCar />,
     <SlideCar />,
   
    </div>
  );
}

export default CarHome;
