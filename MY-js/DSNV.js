function DanhSachNhanVien() {
    // thuộc tính
    this.mangNV = [];

    // phương thức
    this.them = function (nv) {
        this.mangNV.push(nv);
    }

    this.timViTri = function (id) {
        var viTri = -1;
        this.mangNV.map(function (nv, index) {
            if (nv.taiKhoan === id) {
                viTri = index;
            }
        });
        return viTri;
    }

    this.xoa = function (id) {
        var viTri = this.timViTri(id);
        if (viTri != -1) {
            this.mangNV.splice(viTri, 1);
        } else {
            console.log('không tìm thấy nhân viên cần xóa');
        }
    }

    this.capNhat = function (nv) {
        var viTri = this.timViTri(nv.taiKhoan);
        if (viTri != -1) {
            this.mangNV[viTri] = nv;
        } else {
            console.log('không tìm thấy nhân viên để cập nhật');
        }
    }
}

DanhSachNhanVien.prototype.searchXepLoai = function (keyword) {
    var mangTK = [];
    var keywordLower = keyword.toLowerCase();
    this.mangNV.map(function (nv) {
        var xepLoaiNV = nv.xepLoai.toLowerCase();
        var indexName = xepLoaiNV.indexOf(keywordLower);
        if (indexName > -1) {
            mangTK.push(nv);
        }
    });
    return mangTK;
}