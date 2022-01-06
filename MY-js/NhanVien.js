// Khai báo lớp NhanVien
function NhanVien(taiKhoan, ten, email, pass, ngay, luong, chucVu, gio) {
    // thuộc tính
    this.taiKhoan = taiKhoan;
    this.tenNV = ten;
    this.email = email;
    this.matKhau = pass;
    this.ngay = ngay;
    this.luong = luong;
    this.chucVu = chucVu;
    this.gioLam = gio;

    this.tongLuong = function (){
        switch (this.chucVu){
            case 'Sếp': this.tongLuong = this.luong * 3;
                break;
            case 'Trưởng phòng': this.tongLuong = this.luong * 2;
                break;
            case 'Nhân viên': this.tongLuong = this.luong;
                break;
            default: this.tongLuong = 0;
        }
    }

    this.xepLoai = function (){
        if (0 < this.gioLam && this.gioLam < 160) {
            return this.xepLoai = "Trung bình";
        } else if (this.gioLam >= 160 && this.gioLam < 176) {
            return this.xepLoai = "Khá";
        } else if (this.gioLam >= 176 && this.gioLam < 192) {
            return this.xepLoai = "Giỏi";
        } else if (this.gioLam >= 192) {
            return this.xepLoai = "Xuất sắc";
        } else {
            return this.xepLoai = "Không xếp loại";
        }
    }
}