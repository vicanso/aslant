# aslant

A powerful charting and visualization for influxdb

## docker

### docker build

docker build -t vicanso/aslant .

### docker run

docker run -d -p 5018:5018 -e NODE_ENV=production -e MONGO=mongodb://127.0.0.1/aslant -e REDIS=redis://127.0.0.1/ -e INFLUX=http://127.0.0.1:8086/aslant vicanso/aslant

### docker compose

docker-compose up -d .

## demo

Register
[![ScreenShot](http://7xod89.com1.z0.glb.clouddn.com/register.png)](http://7xod89.com1.z0.glb.clouddn.com/register.mp4)

Add Server
[![ScreenShot](http://7xod89.com1.z0.glb.clouddn.com/add-server.png)](http://7xod89.com1.z0.glb.clouddn.com/add-server.mp4)

Add Influx Derivative
[![ScreenShot](http://7xod89.com1.z0.glb.clouddn.com/add-influx-derivative.png)](http://7xod89.com1.z0.glb.clouddn.com/add-influx-derivative.mp4)

Add Influx Max Value
[![ScreenShot](http://7xod89.com1.z0.glb.clouddn.com/add-influx-max-value.png)](http://7xod89.com1.z0.glb.clouddn.com/add-influx-max-value.mp4)

Add Dashboard
[![ScreenShot](http://7xod89.com1.z0.glb.clouddn.com/add-dashboard.png)](http://7xod89.com1.z0.glb.clouddn.com/add-dashboard.mp4)

## License

MIT
