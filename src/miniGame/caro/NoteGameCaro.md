# Bước 1: Xác định kích thước màn hình = cc.winSize;

=> Nhận thấy kích thước màn hình chuẩn sẽ là 960 * 640;
=> Các khối cơ bản có kích thước phù hợp để lấp đầy màn hình sẽ là 40*40;
=> Tạo khối lấp đầy màn hình sẽ là mảng 2 chiều gồm 345 ô.

# Bước 2: Tạo ra các khối có kích thước 80*80 để lấp đầy màn hình ;

Xác định các khối kích thước 80*80 sẽ có tâm là 40*40;

# Bước 3: Dùng vòng /40 tạo ra mảng 2 chiều xác định tâm các ô cơ bản :

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
Xác định điểm trung tâm, giới hạn tọa độ bàn cờ.
Vì màn hình có kích thước giới hạn nên số ô trống có giới hạn.
Tỷ lệ ô trống con là 80*80=> Tâm = 40*40.
Với tỷ lệ này mảng 2 chiều vẽ được 1 màn hình có số lượng ô trống là 23(Ox) * 15(Oy) = 345 ô.
Chia nhỏ các trường hợp ta sẽ có các bước để xác định chiến thắng:
Bước 1: Xác định tâm điểm là điểm được gắn cờ mới nhất.
Bước 2: Xác định giới hạn bản đồ, áp dụng bài toán 1 tâm 8 hướng với size win = 4.
Bước 3: Xác định dãy cờ hiệu trên trục Ox, Oy, 2 đường tréo theo công thức tổng quát.
# Truc Ox:
+ Xác định vùng tự do từ 5 => 19.
Vùng giới hạn: 
+ Mép trái từ 0 => 4
+ Mép phải từ 19 => 24
# Truc Oy:
+ Xác định vùng tự do từ 5 => 15.
Vùng giới hạn: 
+ Mép trên từ 0 => 4
+ Mép phải từ 15 => 11
# Đường tréo:

Kiểm tra trường hợp chặn 2 đầu và chặn 1 đầu trùng cờ tạo 5 điểm.
Bước 4: Phân tích dãy cờ và xác định trùng nhau hay không => Xử lý mảng.
Bước 5: Hoàn thiện.
VD:
Xét trên Ox:
Case1 : 4 phần tử giống nhau - không chặn đầu.
Tính từ ô cờ x-3 => x => x+3.
Tính từ ô cờ y-3 => y => y+3;
Case2 : 5 phần tử giống nhau - có chặn đầu.
Tương tự trên trục Oy.
Xét trên đường tréo trái và phải.

# Bước 8: Mở rộng bài toán trên trục Ox, Oy và trên đường tréo đi qua tâm điểm là điểm được click.

# Bước 9: Ghép nhạc + Xác định người chiến thắng.

# Bước 10: Hoàn thiện game Caro.
