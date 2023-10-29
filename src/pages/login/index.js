// import styled from "styled-components";

// const Login = () => {
//      // Lấy đối tượng form và các trường dữ liệu
//      const form = document.getElementById('login-form');

//      // Lắng nghe sự kiện submit của form đăng nhập
//      form.addEventListener('submit', async (e) => {
//        e.preventDefault(); // Ngăn chặn hành động mặc định của form
 
//        const formData = new FormData(form);
//        const UserName = formData.get('UserName');
//        const Pass = formData.get('Pass');
 
//        // Gửi yêu cầu POST đến API đăng nhập
//        const response = await fetch('https://apple4car.onrender.com/dangnhap', {
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body: JSON.stringify({ "UserName": UserName, "Pass": Pass })
//        });
 
//        const data = await response.json(); // Chuyển phản hồi thành dữ liệu JSON
 
//        if (data.success == true) {
//          const oneDay = 3 * 24 * 60 * 60 * 1000; // Số miligiây trong 1 ngày
//          document.cookie = `ss=${data.cookieValue};${oneDay};path=/`;
//          // Nếu dữ liệu trả về có IDUsers (điều này chỉ ra tài khoản đúng), chuyển hướng đến trang chủ
//          window.location.href = 'trangchu.html';
//        } else {
//          // Nếu không có dữ liệu hoặc tài khoản không đúng, hiển thị thông báo lỗi
//          alert(data.message);
//        }
//      });
//     return (
//         <Log>
//         <div class="container">
//         <div class="login-logo">
//           <h1>APPLE4CAR - Cho thuê Xe</h1>
//           <p>
//             Chào mừng bạn đến với dịch vụ thuê xe, nơi bạn có thể trải nghiệm sự tự do trong việc di chuyển và khám phá
//             thành phố một cách linh hoạt.
//           </p>
//         </div>
//         <div class="login-input">
//           <div class="login-logo">
//             <img src="image/logo.png" alt="" />
//           </div>
//           <h2>Đăng nhập</h2>
//           <form id="login-form">
//             <input type="text" name="UserName" placeholder="Email hoặc số điện thoại" required />
//             <input type="password" name="Pass" placeholder="Mật khẩu" required />
//             <div class="button">
//               <button type="submit" class="login-button-log">Đăng nhập</button>
//             </div>
//             <div class="login-khoangcach"></div>
//             <div class="button">
//               <a href="./index.html">Đăng ký</a>
//             </div>
//           </form>
//         </div>
//       </div>
//       </Log>
//     )
// }

// export default Login;
// const Log = styled.div`
// body {
//     font-family: Arial, sans-serif;
//     background-color: #f0f2f5;
//     margin: 0;
//     padding: 0;
//   }

//   .container {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//     width: auto;
//     margin: 0 0px;
//     line-height: 1.34;
//     font-size: 20px;
//   }

//   p {
//     font-family: monospace;
//     text-align: justify;
//     font-size: 20px;
//   }

//   .login-input {
//     width: 400px;
//     background-color: #fff;
//     border-radius: 5px;
//     padding: 20px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   }

//   .login-logo {
//     width: 400px;
//     display: flex;
//     flex-direction: column;
//     margin-right: 15vw;
//     align-items: center;
//   }

//   .login-logo img {
//     height: 80px;
//   }

//   .login-khoangcach {
//     border: solid 1px #e4e4e4;
//     margin: 20px auto;
//   }

//   h1 {
//     font-size: 50px;
//     margin-bottom: 20px;
//     text-align: center;
//   }

//   h2 {
//     font-size: 24px;
//     margin-bottom: 20px;
//     text-align: center;
//   }

//   input[type="text"],
//   /* Thay đổi từ input[type="email"] thành input[type="text"] */
//   input[type="password"] {
//     width: 95%;
//     padding: 10px;
//     margin-bottom: 20px;
//     border: 1px solid #ccc;
//     border-radius: 3px;
//   }

//   .login-button-log {
//     background-color: #166ee0;
//   }

//   .login-button-rei {
//     background-color: #3aa525;
//   }

//   button[type="submit"] {
//     width: 100%;
//     padding: 10px;
//     color: #fff;
//     border: none;
//     border-radius: 8px;
//     cursor: pointer;
//     font-size: 16px;
//   }

//   button:hover {
//     opacity: 0.9;
//   }

//   input:invalid {
//     border: 1px solid red;
//   }

//   input[type="text"]:invalid,
//   /* Thay đổi từ input[type="email"]:invalid thành input[type="text"]:invalid */
//   input[type="password"]:invalid {
//     border: 1px solid #ccc;
//   }
// `
import styled from "styled-components";
import { useState } from "react";

const Login = () => {
  // Sử dụng useState để quản lý trạng thái của form
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Gửi yêu cầu POST đến API đăng nhập
    const response = await fetch('https://apple4car.onrender.com/dangnhap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "UserName": userName, "Pass": password })
    });

    const data = await response.json(); // Chuyển phản hồi thành dữ liệu JSON

    if (data.success === true) {
      const oneDay = 3 * 24 * 60 * 60 * 1000; // Số miligiây trong 1 ngày
      document.cookie = `ss=${data.cookieValue};${oneDay};path=/`;
      // Nếu dữ liệu trả về có IDUsers (điều này chỉ ra tài khoản đúng), chuyển hướng đến trang chủ
      window.location.href = 'http://localhost:3000/qlaccount';
    } else {
      // Nếu không có dữ liệu hoặc tài khoản không đúng, hiển thị thông báo lỗi
      alert(data.message);
    }
  };

  return (
    <Log>
      <div className="container">
        <div className="login-logo">
          <h1>APPLE4CAR - Cho thuê Xe</h1>
          <p>
            Chào mừng bạn đến với dịch vụ thuê xe, nơi bạn có thể trải nghiệm sự tự do trong việc di chuyển và khám phá
            thành phố một cách linh hoạt.
          </p>
        </div>
        <div className="login-input">
          <div className="login-logo">
            <img src="image/logo.png" alt="" />
          </div>
          <h2>Đăng nhập</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="UserName"
              placeholder="Email hoặc số điện thoại"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              name="Pass"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="button">
              <button type="submit" className="login-button-log">
                Đăng nhập
              </button>
            </div>
           
            
          </form>
        </div>
      </div>
    </Log>
  );
};

export default Login;

const Log = styled.div`
body {
        font-family: Arial, sans-serif;
        background-color: #f0f2f5;
        margin: 0;
        padding: 0;
      }
    
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: auto;
        margin: 0 0px;
        line-height: 1.34;
        font-size: 20px;
      }
    
      p {
        font-family: monospace;
        text-align: justify;
        font-size: 20px;
      }
    
      .login-input {
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
    
      .login-logo {
        width: 400px;
        display: flex;
        flex-direction: column;
        margin-right: 15vw;
        align-items: center;
      }
    
      .login-logo img {
        height: 80px;
      }
    
      .login-khoangcach {
        border: solid 1px #e4e4e4;
        margin: 20px auto;
      }
    
      h1 {
        font-size: 50px;
        margin-bottom: 20px;
        text-align: center;
      }
    
      h2 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
      }
    
      input[type="text"],
      /* Thay đổi từ input[type="email"] thành input[type="text"] */
      input[type="password"] {
        width: 95%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
    
      .login-button-log {
        background-color: #166ee0;
      }
    
      .login-button-rei {
        background-color: #3aa525;
      }
    
      button[type="submit"] {
        width: 100%;
        padding: 10px;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
      }
    
      button:hover {
        opacity: 0.9;
      }
    
      input:invalid {
        border: 1px solid red;
      }
    
      input[type="text"]:invalid,
      /* Thay đổi từ input[type="email"]:invalid thành input[type="text"]:invalid */
      input[type="password"]:invalid {
        border: 1px solid #ccc;
      }
`;