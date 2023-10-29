import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { BsFillCarFrontFill } from "react-icons/bs";
import { AiFillBook } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleQlnguoidung = () => {
    navigate("/qlaccount");
  };
  const handleQlxe = () => {
    navigate("/qlcar");
  };
  const handleQlbaiviet = () => {
    navigate("/qlbaiviet");
  };

  return (
    <Navigation>
      <div className="nav-head">
        <div className="nav-logo">
          <div className="head-logo">
            <img
              style={{ width: 100 }}
              src={require("../../assets/img/211.png")}
            />
          </div>
        </div>
        <ul className="list-item">
          <div className="nav-item">
            <a className="handleHeader" onClick={handleQlnguoidung}>
              <span className="icon">
                <BiUser className="iconSearch account" />
              </span>
              Tài khoản
            </a>
          </div>
          <div className="nav-item">
            <a className="handleHeader" onClick={handleQlxe}>
              <span className=" icon">
                <BsFillCarFrontFill className="iconSearch car" />
              </span>
              Xe
            </a>
          </div>
          <div className="nav-item">
            <a className="handleHeader" onClick={handleQlbaiviet}>
              <span className=" icon">
                <AiFillBook className="iconSearch status" />
              </span>

              <span className="title">Kiểm duyệt bài viết</span>
            </a>
          </div>
        </ul>
      </div>
    </Navigation>
  );
}

export default Header;

const Navigation = styled.div`
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 250px;
  padding: 0;
  background-color: #191c24;
  border-right: 1px solid #212b36;
  transition: margin 0.25s ease-out;
  max-height: 100vh;
  z-index: 99999;

  .head-logo {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 40px;
  }
  .nav-item {
    font-weight: 500;
    font-size: 18px;
    line-height: 1.8;

    padding: 8px 18px;
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }
  a {
    color: #6c7293;
    text-decoration: none;
    transition: color 0.25s ease-in-out;
    width: 100%;
    position: relative;
    display: flex;
  }
  a:hover {
    color: inherit;
  }
  .iconSearch {
    cursor: pointer;
  }
  .icon {
    width: 30px;
    height: 30px;
    background: rgba(108, 114, 147, 0.2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5em;
  }
  .account {
    color: #8f5fe8;
  }
  .car {
    color: #ffab00;
  }
  .status {
    color: #fc424a;
  }
  .title {
    display: inline-block;
  }
  .list-item {
    padding: 0;
    width: 100%;
  }
  .handleHeader {
    cursor: pointer;
  }

  .nav-item.active {
    background-color: #0f1015;
    position: relative;
  }
`;
