from math import *
from matplotlib.pyplot import *
from matplotlib.image import *

process = 0
image_id = 0
last_dist = 0

def set_process(p):
    global process
    process = p

def out_text(value):
    print("{{text:" + str(value) + "}}")

def out_graph(func, min, max):
    x = []
    y = []
    detail = 1000
    for i in range(detail):
        v = i / detail * (max - min) + min
        x.append(v)
        y.append(func(v))
    plot(x, y)

def out_image(name, x, y, width, height):
    hw = width / 2
    hh = height / 2
    imshow(imread("assets/" + name + ".png"), extent = (x - hw, x + hw, y - hh, y + hh))

def fire_the_cannons_func(angle = 45, velocity = 10, gravity = 9.8):
    global last_dist
    angle = radians(angle)
    vx = cos(angle) * velocity
    vy = sin(angle) * velocity
    g = -gravity
    max = -((2*vx*vy)/g)
    out_graph(lambda x : (g*(x**2))/(2*(vx**2)) + (vy*x)/vx, 0, max)
    out_image("end", max, 0, 1, 1)
    last_dist = max

def where_be_that_func():
    out_text("Distance travelled: " + str(last_dist))

def reveal_your_plunder_func():
    global image_id
    out_image("ship", 0, 0, 2, 1)
    axis("scaled")
    file = "storage/" + str(process) + "-" + str(image_id) + ".png"
    savefig(file)
    close()
    print("{{graph:" + file + "}}")
    image_id = image_id + 1

def does_i_hit_func(distance = 10):
    out_image("enemy", distance, 0, 2, 1)
    out_image("end", last_dist, 0, 1, 1)
    if last_dist > distance - 1.5 and last_dist < distance + 1.5:
        out_text("THAR SHE BLOWS")
    else:
        out_text("SHIVER ME TIMBERS, WE MISSED")