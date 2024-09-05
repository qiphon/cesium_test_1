import './App.css'
import { CesiumWidget, Viewer } from 'cesium'
import '@cesium/widgets/Source/widgets.css'
import { useEffect, useRef } from 'react'

function App() {
  const cesiumContainer = useRef<HTMLDivElement | null>(null)
  const viewer = useRef<Viewer | null>(null)
  useEffect(() => {
    if (cesiumContainer.current) {
      viewer.current = new Viewer(cesiumContainer.current, {})
    }
  }, [])
  return <div ref={cesiumContainer} id="cesiumContainer"></div>
}

export default App
