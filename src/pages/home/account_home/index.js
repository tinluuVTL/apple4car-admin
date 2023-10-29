import Header from '../../../components/header/index';
import HeaderAccount from '../../../pages/account/header_account/index';
import SlideAccount from '../../../pages/account/slide_account/index';

function AccountHome() {
  return (
    <div className="AccountHome">
     
     <Header />,
     <HeaderAccount />,
     <SlideAccount />,
   
    </div>
  );
}

export default AccountHome;
