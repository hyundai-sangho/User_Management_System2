const appRoot = require("app-root-path");
const pool = require(appRoot + "/dbConnection");

// 사용자 보기
exports.view = (요청, 응답) => {
  // Connect to DB
  pool.getConnection((에러, 연결) => {
    if (에러) throw 에러;
    console.log(`Connected as ID ${연결.threadId}`);

    // User the connection
    연결.query("SELECT * FROM user WHERE status='active'", (에러, 받은데이터) => {
      // 연결이 완료되면 해제하십시오
      연결.release();

      if (!에러) {
        let removedUser = 요청.query.removed;
        응답.render("home", { 받은데이터, removedUser });
      } else {
        console.log(`"에러 발생 => ${에러}`);
      }

      console.log("The data from user table: \n", 받은데이터);
    });
  });
};

// 사용자 찾기
exports.find = (요청, 응답) => {
  // Connect to DB
  pool.getConnection((에러, 연결) => {
    if (에러) throw 에러;
    console.log(`Connected as ID ${연결.threadId}`);

    let searchTerm = 요청.body.search;

    // User the connection
    연결.query("SELECT * FROM user WHERE name LIKE ?", ["%" + searchTerm + "%"], (에러, 받은데이터) => {
      // 연결이 완료되면 해제하십시오
      연결.release();

      if (!에러) {
        응답.render("home", { 받은데이터 });
      } else {
        console.log(`"에러 발생 => ${에러}`);
      }

      console.log("The data from user table: \n", 받은데이터);
    });
  });
};

// add-user 폼 보여주기
exports.form = (요청, 응답) => {
  응답.render("add-user");
};

// 신규 사용자 등록
exports.create = (요청, 응답) => {
  let { name, email, phone, comments } = 요청.body;

  // Connect to DB
  pool.getConnection((에러, 연결) => {
    if (에러) throw 에러;
    console.log(`Connected as ID ${연결.threadId}`);

    // let searchTerm = 요청.body.search;

    // User the connection
    연결.query("INSERT INTO user SET name = ?, email = ?, phone = ?, comments = ?", [name, email, phone, comments], (에러, 받은데이터) => {
      // 연결이 완료되면 해제하십시오
      연결.release();

      if (!에러) {
        응답.render("add-user", { alert: "사용자 등록 완료" });
      } else {
        console.log(`"에러 발생 => ${에러}`);
      }

      console.log("The data from user table: \n", 받은데이터);
    });
  });
};

// 사용자 정보 수정
exports.edit = (요청, 응답) => {
  let 아이디 = 요청.params.id;

  // Connect to DB
  pool.getConnection((에러, 연결) => {
    if (에러) throw 에러;
    console.log(`Connected as ID ${연결.threadId}`);

    // User the connection
    연결.query(`SELECT * FROM user WHERE id = ${아이디}`, (에러, 받은데이터) => {
      // 연결이 완료되면 해제하십시오
      연결.release();

      if (!에러) {
        응답.render("edit-user", { 받은데이터 });
      } else {
        console.log(`"에러 발생 => ${에러}`);
      }

      console.log("The data from user table: \n", 받은데이터);
    });
  });
};

// 사용자 정보 갱신
exports.update = (요청, 응답) => {
  const 아이디 = 요청.params.id;
  const { name, email, phone, comments } = 요청.body;

  // Connect to DB
  pool.getConnection((에러, 연결) => {
    if (에러) throw 에러;
    console.log(`Connected as ID ${연결.threadId}`);

    // User the connection
    연결.query("UPDATE user SET name = ?, email = ?, phone = ?, comments = ? WHERE id = ?", [name, email, phone, comments, 아이디], (에러, 받은데이터) => {
      // 연결이 완료되면 해제하십시오
      연결.release();

      if (!에러) {
        // Connect to DB
        pool.getConnection((에러, 연결) => {
          if (에러) throw 에러;
          console.log(`Connected as ID ${연결.threadId}`);

          // User the connection
          연결.query(`SELECT * FROM user WHERE id = ${아이디}`, (에러, 받은데이터) => {
            // 연결이 완료되면 해제하십시오
            연결.release();

            if (!에러) {
              응답.render("edit-user", { 받은데이터, alert: `${name} 사용자 정보 갱신 완료` });
            } else {
              console.log(`"에러 발생 => ${에러}`);
            }

            console.log("The data from user table: \n", 받은데이터);
          });
        });
      } else {
        console.log(`"에러 발생 => ${에러}`);
      }

      console.log("The data from user table: \n", 받은데이터);
    });
  });
};

// 사용자 삭제
exports.delete = (요청, 응답) => {
  const 아이디 = 요청.params.id;

  pool.getConnection((에러, 연결) => {
    if (에러) throw 에러;
    연결.query("UPDATE user SET status = ? WHERE id = ?", ["removed", 아이디], (에러, 받은데이터) => {
      연결.release();
      if (!에러) {
        let removedUser = encodeURIComponent("사용자 삭제 완료");
        응답.redirect("/?removed=" + removedUser);
      } else {
        console.log(`"에러 발생 => ${에러}`);
      }
      console.log("The data from user table: \n", 받은데이터);
    });
  });
};

// 사용자 세부 정보 보기
exports.viewAll = (요청, 응답) => {
  const 아이디 = 요청.params.id;

  pool.getConnection((에러, 연결) => {
    if (에러) throw 에러;
    console.log(`Connected as ID ${연결.threadId}`);

    // User the connection
    연결.query("SELECT * FROM user WHERE id = ?", [아이디], (에러, 받은데이터) => {
      // 연결이 완료되면 해제하십시오
      연결.release();

      if (!에러) {
        응답.render("view-user", { 받은데이터 });
      } else {
        console.log(`"에러 발생 => ${에러}`);
      }

      console.log("The data from user table: \n", 받은데이터);
    });
  });
};
