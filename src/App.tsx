import './App.css'
import {
  Cartesian3,
  Cartographic,
  CesiumWidget,
  ProviderViewModel,
  Math as CesiumMath,
  Viewer,
  HeadingPitchRange,
  Entity,
  Color,
} from 'cesium'
import '@cesium/widgets/Source/widgets.css'
import { useEffect, useRef } from 'react'
import positionIcon from '@/assets/position.svg'

function App() {
  const cesiumContainer = useRef<HTMLDivElement | null>(null)
  const viewer = useRef<Viewer | null>(null)
  useEffect(() => {
    if (cesiumContainer.current) {
      viewer.current = new Viewer(cesiumContainer.current, {
        timeline: false, // 时间控件
        animation: false, // 动画控件
        navigationHelpButton: false, // 帮助按钮
        geocoder: false, // 搜索按钮
        homeButton: false, // 首页按钮
        fullscreenButton: false, // 全屏按钮
        baseLayerPicker: false, // 图层选择按钮
        sceneModePicker: false, // 投影方式按钮
        // cesium 标识无法通过 api 去除，可以通过 css 去除。 cesium-viewer-bottom
      })

      // 经纬度 转 笛卡尔坐标
      const cartesian = Cartesian3.fromDegrees(111, 42, 330000)

      const point = {
        position: cartesian,
        id: 'abc',
        point: {
          pixelSize: 20,
          color: Color.fromBytes(255, 0, 0, 255),
        },
      }
      viewer.current?.entities.add(point)

      viewer.current?.entities.add({
        id: 'position_icon',
        position: Cartesian3.fromDegrees(111, 22, 10),
        billboard: {
          image: positionIcon,
          color: Color.fromBytes(255, 0, 0, 255),
          sizeInMeters: true,
        },
      })
      const icon = viewer.current?.entities.add({
        position: Cartesian3.fromDegrees(111, 22, 10),
        billboard: {
          image: positionIcon,
          color: Color.fromBytes(255, 0, 0, 255),
          sizeInMeters: true,
        },
      })
      viewer.current?.entities.add({
        id: 'position_icon_label',
        position: Cartesian3.fromDegrees(111, 22, 130),
        label: {
          text: '这是一段描述',
          fillColor: Color.fromBytes(255, 0, 0, 255),
        },
      })
      const entity = viewer.current?.entities.add({
        polyline: {
          positions: Cartesian3.fromDegreesArray([111, 22, 111, 23, 112, 24]),
          width: 5,
          material: Color.YELLOW,
        },
      })

      viewer.current?.zoomTo(entity)
      // viewer.current?.zoomTo(pointEntity)
      // console.log(pointEntity)
      // viewer.current?.camera.lookAt(
      //   cartesian,
      //   new HeadingPitchRange(0, -90, 30),
      // )

      // viewer.current?.camera.setView({
      //   destination: cartesian,
      //   orientation: {
      //     heading: 0,
      //     pitch: -90,
      //     roll: 0,
      //   },
      // })

      // viewer.current?.camera.flyTo({
      //   destination: cartesian,
      //   orientation: {
      //     heading: 0,
      //     pitch: -70,
      //     roll: 0,
      //   },
      //   // duration: 2,
      // })

      // console.log(cartesian)

      // // 笛卡尔坐标转弧度坐标
      // const cartographic = Cartographic.fromCartesian(cartesian)
      // console.log(cartographic)

      // // 弧度转角度
      // const lon = (180 / Math.PI) * cartographic.longitude
      // const lat = (180 / Math.PI) * cartographic.latitude
      // // 也可以使用系统 api
      // const lon2 = CesiumMath.toDegrees(cartographic.longitude)
      // const lat2 = CesiumMath.toDegrees(cartographic.latitude)

      // console.log(lon, lat, lon2, lat2)
    }
  }, [])
  return <div ref={cesiumContainer} id="cesiumContainer"></div>
}

export default App
