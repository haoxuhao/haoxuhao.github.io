#encoding=utf-8
import cv2

def get_fixed_windows(image_size, wind_size, overlap_size):
    '''
    This function can generate overlapped windows given various image size
    params:
        image_size (w, h): the image width and height
        wind_size (w, h): the window width and height
        overlap (overlap_w, overlap_h): the overlap size contains x-axis and y-axis

    return:
        rects [(xmin, ymin, xmax, ymax)]: the windows in a list of rectangles
    '''
    rects = []

    assert overlap_size[0] < wind_size[0]
    assert overlap_size[1] < wind_size[1]

    im_w = wind_size[0] if image_size[0] < wind_size[0] else image_size[0]
    im_h = wind_size[1] if image_size[1] < wind_size[1] else image_size[1]

    stride_w = wind_size[0] - overlap_size[0]
    stride_h = wind_size[1] - overlap_size[1]

    for j in range(wind_size[1]-1, im_h + stride_h, stride_h):
        for i in range(wind_size[0]-1, im_w + stride_w, stride_w):
            right, down = i+1, j+1
            right = right if right < im_w else im_w
            down  =  down if down < im_h  else im_h

            left = right - wind_size[0]
            up   = down  - wind_size[1]
            if (left, up, right, down) not in rects:
                rects.append((left, up, right, down))      

    return rects


if __name__ == "__main__":
    img = cv2.imread("test.jpg")
    image_size = img.shape[1],img.shape[0]
    print(image_size)
    wind_size = (618, 416)
    overlap_size = (100, 80)
    colors = [(255,0,0), (0,255,0), (0,0,255)]

    rets = get_fixed_windows(image_size, wind_size, overlap_size)
    
    for i,rect in enumerate(rets):
        print(rect)
        img_draw = cv2.rectangle(img, (rect[0],rect[1]), (rect[2], rect[3]), colors[i%len(colors)], thickness=2)
        cv2.imwrite("res_%d.jpg"%i, img_draw)

    


