// Global
var dsnv = new DanhSachNhanVien();
getLocalStorage();
var validation = new Validation();

function getELE(id) {
    return document.getElementById(id);
}

function themNhanVien() {
    // Hàm lấy thông tin nhân viên từ form
    var taiKhoan = getELE('tknv').value;
    var ten = getELE('name').value;
    var email = getELE('email').value;
    var pass = getELE('password').value;
    var ngay = getELE('datepicker').value;
    var luong = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gio = getELE('gioLam').value;

    var isValid = true;

    // taiKhoan: kiểm tra rỗng, kiểm tra trùng
    isValid &= validation.checkEmpty(taiKhoan, 'tbTKNV', 'Tài khoản nhân viên không được để trống') && validation.checkID(taiKhoan, 'tbTKNV', 'Tài khoản nhân viên không được trùng', dsnv.mangNV);

    // tenNV: kiểm tra rỗng, kiểm tra theo format tên
    isValid &= validation.checkEmpty(ten, 'tbTen', 'Tên nhân viên không được để trống') && validation.checkName(ten, 'tbTen', 'Tên nhân viên không hợp lệ');

    // email: kiểm tra rỗng, kiểm tra theo format email
    isValid &= validation.checkEmpty(email, 'tbEmail', 'Email nhân viên không được để trống') && validation.checkEmail(email, 'tbEmail', 'Email nhân viên không hợp lệ');

    // pass: kiểm tra rỗng, kiểm tra theo format pass
    isValid &= validation.checkEmpty(pass, 'tbMatKhau', 'Mật khẩu không được để trống') && validation.checkPass(pass, 'tbMatKhau', 'Mật khẩu nhân viên không hợp lệ');

    // Date: kiểm tra rỗng
    isValid &= validation.checkEmpty(ngay, 'tbNgay', 'Ngày làm không được để trống') && validation.checkDate(ngay, "tbNgay", "Vui lòng nhập đúng theo định dạng dd/mm/yyyy");

    // Lương: kiểm tra rỗng, kiểm tra theo format lương
    isValid &= validation.checkEmpty(luong, 'tbLuongCB', 'Lương không được để trống') && validation.checkMoney(luong, 'tbLuongCB', 'Lương từ 1.000.000 - 20.000.000 vnd');

    // Chức vụ: kiểm tra người dùng có chọn các lựa chọn hay không?
    isValid &= validation.checkSelect('chucvu', 'tbChucVu', 'Hãy chọn chức vụ')

    // Giờ làm: kiểm tra rỗng, kiểm tra theo format giờ làm
    isValid &= validation.checkEmpty(gio, 'tbGiolam', 'Giờ làm không được để trống') && validation.checkHour(gio, 'tbGiolam', 'Giờ làm từ 80 - 200 tiếng');

    if (isValid) {
        // tạo thể hiện của nhân viên
        var nv = new NhanVien(taiKhoan, ten, email, pass, ngay, Number(luong), chucVu, Number(gio));
        nv.tongLuong();
        nv.xepLoai();

        dsnv.them(nv);
        hienThiTable(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    }
}

function hienThiTable(mang) {
    var content = '';
    mang.map(function (nv) {
        var tr = `<tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngay}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xóa</button>
                <button class="btn btn-info" onclick="xemNV('${nv.taiKhoan}')">Xem</button>
            </td>
        </tr>`;
        content += tr;
    });
    getELE('tableDanhSach').innerHTML = content;
}

function setLocalStorage(mang) {
    localStorage.setItem('DSNV', JSON.stringify(mang));
}

function getLocalStorage() {
    if (localStorage.getItem('DSNV') != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem('DSNV'));
        hienThiTable(dsnv.mangNV);
    }
}

function xoaNV(id) {
    dsnv.xoa(id);
    setLocalStorage(dsnv.mangNV);
    hienThiTable(dsnv.mangNV);
}

function xemNV(id) {
    var viTri = dsnv.timViTri(id);
    if (viTri != -1) {
        var nv = dsnv.mangNV[viTri];
        getELE('tknv').value = nv.taiKhoan;
        getELE('tknv').disabled = true;
        getELE('name').value = nv.tenNV;
        getELE('email').value = nv.email;
        getELE('password').value = nv.matKhau;
        getELE('datepicker').value = nv.ngay;
        getELE('luongCB').value = nv.luong;
        getELE('chucvu').value = nv.chucVu;
        getELE('gioLam').value = nv.gioLam;
    } else {
        console.log('Không tìm thấy nhân viên cần xem');
    }
}

function capNhatNV() {
    var taiKhoan = getELE('tknv').value;
    var ten = getELE('name').value;
    var email = getELE('email').value;
    var pass = getELE('password').value;
    var ngay = getELE('datepicker').value;
    var luong = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gio = getELE('gioLam').value;

    var isValid = true;

    // tenNV: kiểm tra rỗng, kiểm tra theo format tên
    isValid &= validation.checkEmpty(ten, 'tbTen', 'Tên nhân viên không được để trống') && validation.checkName(ten, 'tbTen', 'Tên nhân viên không hợp lệ');

    // email: kiểm tra rỗng, kiểm tra theo format email
    isValid &= validation.checkEmpty(email, 'tbEmail', 'Email nhân viên không được để trống') && validation.checkEmail(email, 'tbEmail', 'Email nhân viên không hợp lệ');

    // pass: kiểm tra rỗng, kiểm tra theo format pass
    isValid &= validation.checkEmpty(pass, 'tbMatKhau', 'Mật khẩu không được để trống') && validation.checkPass(pass, 'tbMatKhau', 'Mật khẩu nhân viên không hợp lệ');

    // Date: kiểm tra rỗng
    isValid &= validation.checkEmpty(ngay, 'tbNgay', 'Ngày làm không được để trống') && validation.checkDate(ngay, "tbNgay", "Vui lòng nhập đúng theo định dạng dd/mm/yyyy");

    // Lương: kiểm tra rỗng, kiểm tra theo format lương
    isValid &= validation.checkEmpty(luong, 'tbLuongCB', 'Lương không được để trống') && validation.checkMoney(luong, 'tbLuongCB', 'Lương từ 1.000.000 - 20.000.000 vnd');

    // Chức vụ: kiểm tra người dùng có chọn các lựa chọn hay không?
    isValid &= validation.checkSelect('chucvu', 'tbChucVu', 'Hãy chọn chức vụ')

    // Giờ làm: kiểm tra rỗng, kiểm tra theo format giờ làm
    isValid &= validation.checkEmpty(gio, 'tbGiolam', 'Giờ làm không được để trống') && validation.checkHour(gio, 'tbGiolam', 'Giờ làm từ 80 - 200 tiếng');

    if (isValid) {
        // tạo thể hiện của nhân viên
        var nv = new NhanVien(taiKhoan, ten, email, pass, ngay, Number(luong), chucVu, Number(gio));
        nv.tongLuong();
        nv.xepLoai();
    
        dsnv.capNhat(nv);
        setLocalStorage(dsnv.mangNV);
        hienThiTable(dsnv.mangNV);
    }
}

function resetForm() {
    getELE('formQLNV').reset();
    getELE('tknv').disabled = false;
}