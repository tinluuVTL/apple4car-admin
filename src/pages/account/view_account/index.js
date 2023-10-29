import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import ReactSelect from 'react-select';

const ViewCar = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    layAcount()
  }, []);

    const layAcount = () => {
      fetch("https://apple4car.onrender.com/layuser")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
    }
  //popup
  const [show, setShow] = useState(false);
  //add data

  const [editing, setEditing] = useState("");

  const [id, setId] = useState("");
  const [maUser, setMaUser] = useState("");
  const [tenUser, setTenUser] = useState("");
  const [taiKhoan, setTaiKhoan] = useState("");
  const [quyen, setQuyen] = useState("");
  const [IsEdit, setIsEdit] = useState(false);

  const options = [
    { value: 'admin', label: 'Admin' },
    { value: 'nhanvien', label: 'Nhân viên' },
    { value: 'khachhang', label: 'Khách hàng' },
  ];
  const handle = () => {
    if (IsEdit) {
      handleUpdate();
    } else {
      handleAddData();
    }
  };

  //tiêu đề table
  const [title, setTitle] = useState([
    "STT",
    "Mã người dùng",
    "Họ tên",
    "Tài khoản",
    "Quyền",
    "Hành động"
  ]);

  //hàm thêm
  const handleAddData = async () => {
    const newData = { maUser, tenUser, taiKhoan };
    try {
      const response = await fetch("https://apple4car.onrender.com/dangky", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const result = await response.json();
      setData([...data, result]);
      setMaUser("");
      setTenUser("");
      setTaiKhoan("");
      
    } catch (error) {
      console.error(error);
    }
  };

  // hàm sửa

  const HandleEdit = (IDUsers) => {
    fetch(`https://apple4car.onrender.com/layuserid/${IDUsers}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải thông tin người dùng");
        }
        return response.json();
      })
      .then((data) => {
        setMaUser(data.IDUsers);
        setTenUser(data.HoTen);
        setTaiKhoan(data.UserName);
        setQuyen(data.Quyen);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = async () => {
    const newData = { maUser, tenUser, taiKhoan, quyen };
    try {
      const response = await fetch(`https://apple4car.onrender.com/suauser/${maUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const uploadResult = await response.json();
      // Xử lý kết quả từ API
      alert(uploadResult.message);
  
      
      setData([...data]);
  
      
      setMaUser("");
      setTenUser("");
      setTaiKhoan("");
      setQuyen("");
  
      
      layAcount();
    } catch (error) {
      console.error(error);
    }
  };
  // hàm xóa
  const handleDelete = (IDUsers) => {
    fetch(`https://apple4car.onrender.com/xoauser/${IDUsers}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success === true) {
          alert(response.message);
          // Thực hiện các hành động sau khi đăng nhập thành công
        } else {
          alert(response.message);
          // Thực hiện các hành động khi đăng nhập thất bại
        }
      });

    const newUser = data.filter((User) => User.IDUsers !== IDUsers);
    setData(newUser);
  };

  

  //nút thoát
  const handleExitAndShow = () => {
    handleExit();
    setShow(!show);
    // setHideEditImage(true);
  };
  //xóa thông tin trường
  const handleExit = () => {
    setMaUser("");
    setTenUser("");
    setTaiKhoan("");
    setQuyen("");
    setEditing("");
  };

 // ham lưu tru giá tri ô tìm kiếm
 const [searchValue, setSearchValue] = useState("");
 const [tenCot, setTenCot] = useState("IDUsers");

 // chức năng tìm kiếm
 useEffect(() => {
   fetch(`https://apple4car.onrender.com/timkiem/users/${tenCot}/${searchValue}`)
     .then((response) => response.json())
     .then((data) =>{
       if(!data.success){
         setData([])
       }
       setData(data);
       
     } 
     )
     
     .catch((error) => console.error(error));
 }, [searchValue, tenCot]);

 useEffect(() => {
   console.log("du lieu tim kiem" ,typeof(data))
 }, [data]);

 const handleComboBoxChange = (event) => {
   setTenCot(event.target.value);
 };

  return (
    <ViewC>
      <div className="navContainer">
        <div className="navSearch">
          <BsSearch className="iconSearch" />
          <input
            className="navInput"
            type="text"
            placeholder="Tìm kiếm..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <select value={tenCot} onChange={handleComboBoxChange}>
          <option value="IDUsers">Mã người dùng</option>
          <option value="UserName">Tài khoản</option>
    
        </select>
        <button className="navButtonAdd" onClick={() => {setShow(!show) ;setIsEdit(false);}}>
          Thêm người dùng
        </button>
      </div>

      <div className="viewContainer">
        <table className="tbl">
          <tr className="title-data">
            {title.map((t) => {
              return <th key={t}>{t}</th>;
            })}
          </tr>
          {data && data.length > 0 ? (data.map((u, index) => (
            <tr
              id="listViewData"
              className={`user-item-${index} ${
                index % 2 === 1 ? "even-row" : ""
              }`}
            >
              <td data-lable="STT" key={index}>
                {index + 1}
              </td>
              <td data-lable="Mã người dùng" key={u.IDUsers}>
                {u.IDUsers}
              </td>
              <td data-lable="Tên người dùng" key={u.HoTen}>
                {u.HoTen}
              </td>
              <td data-lable="Tài khoản" key={u.UserName}>
                {u.UserName}
              </td>
              <td data-lable="Quyền" key={u.Quyen}>
                {u.Quyen}
              </td>

              <td data-lable="Chỉnh sửa">
                {" "}
                <LiaUserEditSolid
                  onClick={() => {
                    setIsEdit(true);
                    HandleEdit(u.IDUsers);
                    setShow(!show);
                  }}
                  style={{ color: "#ffab00", marginRight: "10" }}
                  className="iconEdit"
                />{" "}
                <MdDelete
                  onClick={() => handleDelete(u.IDUsers)}
                  style={{ color: "#fc424a" }}
                  className="iconDelete"
                />{" "}
              </td>

              <td></td>
            </tr>
          ))): (
            <p>Không tìm thấy tài khoản</p>
          ) }
        </table>
      </div>

      {show && (
        <div className="addContainer">
          {editing ? (
            <h1 style={{ marginBottom: "50px", fontSize: "1.5em" }}>{}</h1>
          ) : (
            <h1
              style={{
                marginBottom: "50px",
                fontSize: "2.5em",
                fontWeight: "bold",
                color: "#8f5fe8",
              }}
            >
              Thông tin
            </h1>
          )}

          <div className="addItemInput">
            <label> Mã người dùng: </label>
            <input
              id="inputMaUsể"
              onChange={(e) => setMaUser(e.target.value)}
              value={maUser}
              type="text"
              name="maUser"
              placeholder="Nhập mã người dùng"
            />
          </div>

          <div className="addItemInput">
            <label>Họ tên người dùng: </label>
            <input
              onChange={(e) => setTenUser(e.target.value)}
              value={tenUser}
              type="text"
              name="TenUser"
              placeholder="Nhập họ tên người dùng"
            />
          </div>

          <div className="addItemInput">
            <label> Tên tài khoản: </label>
            <input
              onChange={(e) => setTaiKhoan(e.target.value)}
              value={taiKhoan}
              type="text"
              name="tenTaiKhoan"
              placeholder="Nhập tên tài khoản"
            />
          </div>

          <div className="addItemInput">
            <label> Quyền: </label>
            <ReactSelect
              className="cbQuyen"
              options={options}
              value={{ value: quyen, label: quyen }}
              onChange={(selectedOption) => setQuyen(selectedOption.value)}
      />
          </div>

          <div className="buttonPopup">
            <button className="addButtonAdd cancel" onClick={handleExitAndShow}>
              Thoát
            </button>

            <button className="addButtonAdd add" onClick={handle}>
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </ViewC>
  );
};
export default ViewCar;
const ViewC = styled.div`
  margin-left: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70vw;

  .viewContainer {
    padding: 0 2vw;
    border-radius: 20px;
    background-color: #191c24;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  img {
  }
  tr,
  th,
  td {
    text-align: center;
    padding: 15px;
  }
  tr,
  td {
  }
  .tbl {
  }
  td {
    border-top: 1px solid #2c2e33;
    vertical-align: middle;
    font-size: 0.875rem;
    line-height: 1.5;
    white-space: nowrap;
  }
  .navContainer {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin: 5px 60px;
    margin-bottom: 40px;
    background-color: #191c24;
    padding: 12px 0;
    border-radius: 20px;
  }
  .navSearch {
    margin-right: 5vw;
    display: flex;
    justify-content: flex-end;
  }
  .navButtonAdd {
    display: inline-block;
    font-size: 1em;
    font-weight: bold;
    width: 20vw;
    padding: 8px 10px;
    color: #fff;
    background-color: #0090e7;
    border-color: #0090e7;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    overflow: hidden;

    &:hover {
      color: #fff;
      background-color: #0078c1;
      border-color: #0070b4;
    }
  }
  .iconSearch {
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #000;
    transform: translateX(34px) translateY(10px);
  }
  .navContainer input{
    font-size: 18px;
    width: 20vw;
    border: 2px solid black;
    border-radius: 20px;
    padding-left: 40px;
    &:focus {
      padding-left: 40px;
      cursor: text;
    }
  }
  
  .navContainer select{
    font-size: 18px;
    width: 20vw;
    border: 2px solid black;
    border-radius: 20px;
    padding-left: 40px;
    &:focus {
      padding-left: 40px;
      cursor: text;
    }
  }

  .addContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 80vw;
    background-color: #ccc;
    z-index: 999999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    border: 2px solid #ccc;
    color: #000;
  }
  .addInput {
    display: flex;
    justify-content: center;
    margin: 5px 80px;
    flex-direction: column;
  }
  .addContainer input{
    font-size: 19px;
    width: 30vw;
    border: 1px solid #ccd9;
    border-radius: 10px;
    padding-left: 10px;
    cursor: text;
    margin-bottom: 20px;
  }
  .addContainer .cbQuyen{
    font-size: 19px;
    width: 30vw;
    border: 1px solid #ccd9;
    border-radius: 10px;
    padding-left: 10px;
    cursor: text;
    margin-bottom: 20px;
  }
  .addContainer select{
    font-size: 19px;
    width: 30vw;
    border: 1px solid #ccd9;
    border-radius: 10px;
    padding-left: 10px;
    cursor: text;
    margin-bottom: 20px;
  }
  .addContainer label {
    text-align: left !important;
    width: 5vw;
    font-weight: bold;
  }

  .addItemInput {
    display: flex;
    align-items: flex-start;

    flex-direction: row;
  }
  .addItemInput label {
    width: 20vw;
  }

  .addButtonAdd {
    font-size: 20px;
    font-weight: bold;
    padding: 10px 50px;
    background-color: #f05123;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    margin-right: 80px;
  }
  .add {
    background-color: #0090e7;
    border-color: #0090e7;
    &:hover {
      background-color: #0078c1;
      border-color: #0078c1;
    }
  }
  .cancel {
    background-color: #0d0d0d;
    border-color: #0d0d0d;
    &:hover {
      background-color: black;
      border-color: black;
    }
  }
  .addButtonAdd:last-of-type {
    margin-right: 0;
  }

  .inputAvt {
    display: flex;

    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .imputImage {
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid;
    margin-left: 5vw;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .iteamInputImage {
    width: 30vw;
    display: flex;
  }
  .iteamInputImage input {
    margintop: 8;
    right: 0;
    width: 93;
    left: 0;
    padding: 0;
  }
`;
