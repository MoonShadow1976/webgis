
function Action(json) {
    AMap.plugin('AMap.GeoJSON', () => {
      new AMap.GeoJSON({
        geoJSON: json,
        // 一级 插旗子
        getPolygon: (area, lnglats) => {
          console.log('面', area, lnglats)
          const Pol = onCreatePolygon(lnglats)
          return Pol // 一定要返回实例 不能删
        },
        getMarker: function (geojson, lnglats) {
          console.log("点", lnglats);
        },
        getPolyline: function (geojson, lnglats) {
          console.log("线", lnglats);
        }
      })
      map.setFitView(null, false, [120, 2, 2, 2], 14)
    })
  }
  function onCreatePolygon(lnglats) {
    const styleRow = {
      strokeColor: '#00E1FF',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: '#003666',
      fillOpacity: 0.5
    }
    const POLY = new AMap.Polyline({
      path: lnglats,
      bubble: true,
      cursor: 'pointer',
      map: map,
      ...styleRow
    })
    POLY.on('mouseover', () => {
      POLY.setOptions({
        strokeColor: '#0092bc',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#00427d',
        fillOpacity: 0.6
      })
    })
    POLY.on('mouseout', () => POLY.setOptions(styleRow))
    return POLY
  }
  //调用函数
  function showFileJson(url) {
        // 使用 fetch API 加载 JSON 文件
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const jsonString = JSON.stringify(data);
            const jsonObj = JSON.parse(jsonString);
            console.log(jsonObj);
            // 在这里可以对 jsonString 进行任何需要的操作
            Action(jsonObj);
          })
          .catch((error) => {
            console.error(
              "There was a problem with your fetch operation:",
              error
            );
          });
      }
