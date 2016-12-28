# aslant

A powerful charting and visualization for influxdb

## About aslant

### Graphing and visualization application for influxdb

在我工作的这些年，一直觉得自己做的系统有点欠缺，不好评估系统性能的优劣，系统稳定性之类，而在客户端各是做得不完善。自己也试过开发一些做统计的系统，希望通过统计数据来反应系统的状态，最终还是现实跟理想差不太大，放弃了。后来接触到`influxdb`，终于有柳暗花明又一村的感觉，把现有的系统各种性能指标、业务指标都接入到`influxdb`中，运行了一段时间，终于有自己掌握整个系统的性能与监控。每次系统出问题只能由客户反馈，自己一无所知的情景从此消失!@#@

有朋友问过我，有influxdata的`chronograf`，而且还有做得更好的`grafana`，为什么要自己吃力去写一个不完美的`aslant`？

对于这个问题，首先我一开始使用`influxdb`的时候，我觉得自己不太会写`influx-ql`，因此自己想偷懒的写了node.js的module来生成[influx-ql](https://github.com/vicanso/influx-ql)。后来在使用[node-influx](https://github.com/node-influx/node-influx)的时候，又觉得纠结于它的query查询，于是自己就着手写了[influxdb-nodejs](https://github.com/vicanso/influxdb-nodejs)。写着写着，觉得到了这个时候，都已经这样乱搞了，那么要不直接也写一个图形展示的吧，于是[aslant](https://github.com/vicanso/aslant)就这样诞生了。

好吧，其实上面说的理由都仅是理由，最真实的原因是平时休息闲着的时候总要做点什么有意义的事吧，就算最终没意义也好过啥都没做！

## docker

### docker build

docker build -t vicanso/aslant .

### docker run

docker run -d -p 5018:5018 -e NODE_ENV=production -e MONGO=mongodb://127.0.0.1/aslant -e REDIS=redis://127.0.0.1/ -e INFLUX=http://127.0.0.1:8086/aslant aslant

## License

MIT
