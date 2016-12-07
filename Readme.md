# aslant

A powerful charting and visualization for influxdb

## docker

### docker build

docker build -t aslant .

### docker run

docker run -d -p 5018:5018 -e NODE_ENV=production -e MONGO=mongodb://127.0.0.1/aslant -e REDIS=redis://127.0.0.1/ -e INFLUX=http://127.0.0.1:8086/aslant aslant

## License

MIT
