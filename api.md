# 快速接入
1. 引入脚本
    ```
    <script src="../lib/weatherwind.js"></script>
    ````
1. 初始化组件
    ```javascript
    WeatherWind.config({
        particle: {
            canvas: particleLayer._canvas,
            lineWidth: 1.4
        },
        project: function(point) {
            var projectedPoint = mymap.project(new L.latLng(point[1], point[0]));
            var p = projectedPoint._subtract(mymap.getPixelOrigin());
            var result = mymap.layerPointToContainerPoint(p);
            var arr = [result.x, result.y];
        
            return arr;
        },
        invert: function(point) {
            var result = mymap.containerPointToLatLng({
                x: point[0],
                y: point[1]
            });
            return [result.lng, result.lat];
        }
    });
    ```
1. 加载数据并开始运行动画
    ```
    // 本示例使用 jquery 加载数据
    $.getJSON('test.json', function(data) {
        WeatherWind.setData(data);    // 设置数据
        WeatherWind.start();          // 开始运行动画
    });
    ```
1. 设置相关事件
    ```
    particleLayer.delegate({
        onDrawLayer: function onDrawLayer(info) {
            if (WeatherWind.isReady()) {
                WeatherWind.start();
            }
        }
    });
    window.onresize = function() {
        if (WeatherWind.isReady()) {
            WeatherWind.start();
        }
    }
    ```

## API
### 1. `WeatherWind.isReady`  
    用于查看是否设置数据，只有设置数据才可以开始动画
### 2. `WeatherWind.config`
    配置相关参数
### 3. `WeatherWind.start`
    开始动画
### 3. `WeatherWind.stop`
    结束动画
### 4. `WeatherWind.setData`
    设置数据   

## 配置各参数说明

参数名 | 说明
--- | ---
particle | 粒子各参数
particle.canvas | 用于画粒子的 canvas
particle.lineWidth | 粒子线粗细
particle.lineColor | 粒子线颜色
project | 经纬度转像素点，参数为：[纬度，经度] => [x, y]
invert | 像素点转经纬度，参数为：[x, y] => [纬度，经度]