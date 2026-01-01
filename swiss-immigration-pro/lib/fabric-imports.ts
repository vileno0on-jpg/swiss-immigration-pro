// Fabric.js v7 import helper
// This ensures compatibility with different Fabric.js versions

import { Canvas, IText, Rect, Circle, Triangle, Image as FabricImage, Object as FabricObject } from 'fabric'

export type FabricCanvas = Canvas
export type FabricObject = FabricObject
export type FabricIText = IText
export type FabricRect = Rect
export type FabricCircle = Circle
export type FabricTriangle = Triangle
export type FabricImage = FabricImage

export {
  Canvas,
  IText,
  Rect,
  Circle,
  Triangle,
  FabricImage as Image,
  Object,
}





