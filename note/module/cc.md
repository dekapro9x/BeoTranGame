Document:
https://docs.cocos.com/creator/api/en/

# 1.Module cc https://docs.cocos.com/creator/api/en/modules/cc.html

1. Chức năng: Chứa tất cả các lớp lõi, hàm, thuộc tính và hằng số được định nghĩa trong không gian tên này.

# Properties thường dùng:

1.
2.
3.

# Methods thường dùng:

# 1. repeatForever(action)

Tạo một acton lặp lại mãi mãi, vì nó chạy mãi mãi, không thể thêm nó vào cc.sequence và cc.spawn.
Parameters :
action hành động muốn được thực thi
var repeat = cc.repeatForever(cc.rotateBy(1.0, 360));

# 2. sequence(actionOrActionArray)

Hàm tạo trợ giúp để tạo một mảng các hành động có thể tuần tự Hành động được tạo sẽ chạy các hành động một cách tuần tự, nối tiếp nhau.
Parameters :
actionOrActionArray chuỗi hành động liên tiếp muốn được thực thi lần lượt.
var seq = cc.sequence(act1, act2);
var seq = cc.sequence(actArray);

# 3. scaleTo(duration,sx,sy)

Hàm thu phóng tỷ lệ đối tượng Node thành hệ số thu phóng bằng cách sửa đổi thuộc tính tỷ lệ của nó
Parameters:
duration Number số giây hành động
sx Number tỷ lệ kéo dãn in X
sy Number tỷ lệ kéo dãn theo trục Y, nếu null thì lấy = sx

# 4. rotateTo(duration , dstAngle )

Xoay đối tượng Node đến một góc nhất định bằng cách sửa đổi thuộc tính góc của nó.
Hướng sẽ được quyết định bởi góc ngắn nhất.
Parameters:
duration Number số giây hành động
dstAngle góc xoay (theo độ)

# 5. setScale(sx,sy)

Không gian 2 chiều chỉ tính theo x0y:
Parameters:
sx tỷ lệ kéo dãn ảnh theo trục x
sy tỷ lệ kéo dãn ảnh theo trục y. Nếu sy == null thì sy == sx

# cc.MoveBy()

Tạo ra hành động bằng cách thay đổi vị trí của đối tượng theo tâm Po.
cc.moveBy(2.5, cc.p(-getSizeWin.width / 2, getSizeWin.height)).easing(cc.easeSineOut())

# Mở rộng lớp con cc.classChilds:

1.
2.
3.
