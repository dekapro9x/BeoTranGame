# Bước 1: Xác định kích thước màn hình = cc.winSize;

=> Nhận thấy kích thước màn hình chuẩn sẽ là 960 * 640;
=> Các khối cơ bản có kích thước phù hợp để lấp đầy màn hình sẽ là 40*40;

# Bước 2: Tạo ra các khối có kích thước 80\*80 ;

Xác định các khối kích thước 80*80 sẽ có tâm là 40*40;

# Bước 3: Dùng vòng lặp /40 tạo ra mảng 2 chiều xác định tâm các ô cơ bản :

arr2D[Ox][oy]
Cơ bản các ô vuông sẽ có tâm:
Trên Ox: O(0;0),A(40;40),B(80;40),C(120;40)...
Trên Oy: O(0;0),A1(40;40),A2(40;80),A3(40;120)...

# Bước 4: Tạo ra các khối ô vuông con gán tên xác định cho mỗi thằng con theo vị trí trên trục Ox và Oy.

=> Xác định thằng con theo tên riêng của nó:
nameChirldGameCaro.OVuong*Img + "Ox*" + indexOx + "_" + "Oy_" + indexOy;

Bước 5: Lấp đầy màn hình bằng ô vuông bằng cách sử dụng 2 vòng lặp lồng nhau tạo Map lấp đầy ô vuông con.
=> Đặt sự kiện lắng nghe trên Map to để xác định vị trí ấn chuột.
Sử dụng : getChildByName() để lấy thằng con được ấn vào.

# Bước 5: Thay thế ảnh gốc của thằng con khi lắng nghe dc sự kiện click vào nó.

Đặt cờ hiệu và xác định cờ nào sẽ được thay thế + trạng thái của ô vuông đã được click vào chưa.

# Bước 6: Xác định bài toán 8 hướng cho 1 phần tử nằm trên mặt phẳng 2D xOy.

# Bước 7: Xử lý mảng với các phần tử trùng nhau với các case:

Case1 : 4 phần tử giống nhau - không chặn đầu.
Case2 : 5 phần tử giống nhau - có chặn đầu.

# Bước 8: Mở rộng bài toán trên trục Ox, Oy và trên đường tréo đi qua tâm điểm là điểm được click.

# Bước 9: Ghép nhạc + Xác định người chiến thắng.

# Bước 10: Hoàn thiện game Caro.
