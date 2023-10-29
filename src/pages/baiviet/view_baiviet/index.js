import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BsSearch } from "react-icons/bs";

const ViewBaiViet = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    LayBai();
  }, []);

  const LayBai = () =>{
      fetch("https://apple4car.onrender.com/laybaiviet")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }
  //popup
  const [show, setShow] = useState(false);
  //add data

  const [editing, setEditing] = useState("");

  const [id, setId] = useState("");
  const [maBai, setMaBai] = useState("");
  const [tenNguoiDang, setTenNguoiDang] = useState("");
  const [tenBai, setTenBai] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [hinhAnh, setHinhAnh] = useState();
  const [bienSo, setBienSo] = useState("");
  const [giaThue, setGiaThue] = useState("");
  const [diaDiemCoXe, setDiaDiemCoXe] = useState("");
  const [maUser, setMaUser] = useState("");
  const [trangThai, setTrangThai] = useState(true);
  const [IsEdit, setIsEdit] = useState(false);
  const [isDuyet, setIsDuyet] = useState(false);

  const handleDuyet = () => {
    // if (IsEdit) {
    //   handleUpdate();
    // } else {
    //   // handleAddData();
    // }
    fetch(`https://apple4car.onrender.com/duyetbai/${maBai}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"TrangThai": true} ),
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
        LayBai();

      });
  };

  const [title, setTitle] = useState([
    "STT",
    "Mã bài",
    "Mã người đăng",
    "Tên bài đăng",
    "Nội dung",
    "Trạng thái",
    "Hành động"
  ]);

  
  // hàm xem

  const HandleView = (MaBai) => {
    fetch(`https://apple4car.onrender.com/lay1baiviet/${MaBai}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải thông tin người dùng");
        }
        return response.json();
      })
      .then((data) => {
        setMaBai(data.MaBai);
        setTenNguoiDang(data.HoTen);
        setTenBai(data.TenBaiDang);
        setNoiDung(data.NoiDung);
        setHinhAnh(data.HinhAnh);
        setBienSo(data.BienSo);
        setGiaThue(data.GiaThue);
        setDiaDiemCoXe(data.DiaDiemCoXe);
        setMaUser(data.IDUsers);
         if ((data.TrangThai) === true) {
            setIsDuyet(false)
        }
        else {
            setIsDuyet(true)

        }
        
      })
      
      .catch((error) => {
        console.error(error);
      });
  };
  
  // hàm xóa
  const handleDelete = (MaBai) => {
    fetch(`https://apple4car.onrender.com/xoabaiviet/${MaBai}`, {
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
        LayBai();

      });

    const newBaiViet = data.filter((BaiViet) => BaiViet.MaBai !== MaBai);
    setData(newBaiViet);
  };

  // // ham lưu tru giá tri ô tìm kiếm
  // const [searchValue, setSearchValue] = useState("");
  // // chức năng tìm kiếm
  // const filteredData = data.filter((cars) => {
  //   const searchRegex = new RegExp(searchValue, "i");
  //   return (
  //     searchRegex.test(cars.MaXe) ||
  //     searchRegex.test(cars.TenXe) ||
  //     searchRegex.test(cars.MaLoaiXe) ||
  //     searchRegex.test(cars.BienSo) ||
  //     searchRegex.test(cars.GhiChu) ||
  //     searchRegex.test(cars.Anh)
  //   );
  // });

  //nút thoát
  const handleExitAndShow = () => {

    setShow(!show);
    // setHideEditImage(true);
  };
  //xóa thông tin trường
  // const handleExit = () => {
  //   setMaUser("");
  //   setTenUser("");
  //   setTaiKhoan("");
  //   setQuyen("");
  //   setEditing("");
  // };

  // làm mới trường nhập

  //xem trước ảnh
  // const handlePreviewAvatar = (e) => {
  //   const file = e.target.files[0];
  //   const fileUrl = URL.createObjectURL(file);
  //   setHinhAnh(fileUrl);
  // };

  // ham lưu tru giá tri ô tìm kiếm
  const [searchValue, setSearchValue] = useState("");
  const [tenCot, setTenCot] = useState("MaBai");

  // chức năng tìm kiếm
  useEffect(() => {
    fetch(`https://apple4car.onrender.com/timkiem/BaiDang/${tenCot}/${searchValue}`)
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
          <option value="MaBai">Mã Bài</option>
          <option value="IDUsers">Mã người đăng</option>
          <option value="TenBaiDang">Tên bài đăng</option>
    
        </select>
      
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
              <td data-lable="Mã bài viết" key={u.MaBai}>
                {u.MaBai}
              </td>
              <td data-lable="Tên người đăng" key={u.IDUsers}>
                {u.IDUsers}
              </td>
              <td data-lable="Tên bài đăng" key={u.TenBaiDang}>
                {u.TenBaiDang}
              </td>
              <td data-lable="Nội dung" key={u.NoiDung}>
                {u.NoiDung}
              </td>
              
            
              <td data-lable="Nội dung" key={u.TrangThai}>

                {u.TrangThai ? "Đã duyệt" : "Chưa duyệt"}
              </td>

              <td data-lable="Xem">
                {" "}
                <AiOutlineEye
                  onClick={() => {
                    setIsEdit(true);
                    HandleView(u.MaBai);
                    setShow(!show);
                  }}
                  style={{ color: "#ffab00", marginRight: "10" }}
                  className="iconEdit"
                />{" "}
                <MdDelete
                  onClick={() => handleDelete(u.MaBai)}
                  style={{ color: "#fc424a" }}
                  className="iconDelete"
                />{" "}
              </td>

              <td></td>
            </tr>
            ))): (
              <p>Không tìm thấy bài viết</p>
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
            <label> Mã bài đăng: </label>
            <input
              id="inputMaBai"
              disabled={true}
              value={maBai}
              type="text"
              name="maUser"
             
            />
          </div>
          <div className="addItemInput">
            <label>Tên người đăng: </label>
            <input
              id="inputTenNguoiDang"
              disabled={true}
              value={tenNguoiDang}
              type="text"
              name="TenNguoiDang"
            />
          </div>
          <div className="addItemInput">
            <label>Tên bài đăng: </label>
            <input
              id="inputMaBai"
              disabled={true}
              value={tenBai}
              type="text"
              name="TenBai"
            />
          </div>

          <div className="addItemInput">
            <label>Nội dung: </label>
            <input
              id="inputNoiDung"
              disabled={true}
              value={noiDung}
              type="text"
              name="NoiDung"
            />
          </div>
          <div className="inputAvt">
            <div
              className="addItemInput"
              style={{ justifyContent: "space-between" }}
            >
              <label>Hình ảnh:</label>

              <div className="iteamInputImage" style={{ width: "100" }}>
                
                { (
                  <div className="imputImage">
                    {hinhAnh && (
                      <img
                        src={hinhAnh}
                        alt="Preview Avatar"
                        width="20%"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="addItemInput">
            <label>Biển số: </label>
            <input
              id="inputBienSo"
              disabled={true}
              value={bienSo}
              type="text"
              name="BienSo"
            />
          </div>
          <div className="addItemInput">
            <label>Gía thuê: </label>
            <input
              id="inputGiaThue"
              disabled={true}
              value={giaThue}
              type="text"
              name="GiaThue"
            />
          </div>
          <div className="addItemInput">
            <label>Địa điểm có xe: </label>
            <input
              id="inputDiaDiem"
              disabled={true}
              value={diaDiemCoXe}
              type="text"
              name="DiaDiemCoXe"
            />
          </div>
          <div className="addItemInput">
            <label>Mã người dùng: </label>
            <input
              id="inputIDUser"
              disabled={true}
              value={maUser}
              type="text"
              name="MaUser"
            />
          </div>

          <div className="buttonPopup">
            <button className="addButtonAdd cancel" onClick={handleExitAndShow}>
              Thoát
            </button>

            {isDuyet && (
        <button className="addButtonAdd add" onClick={handleDuyet}>
          Duyệt
        </button>
      )}
          </div>
        </div>
      )}
    </ViewC>
  );
};
export default ViewBaiViet;
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
    height: 100vh;
    width: 100vw;
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
