import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode, PointerEvent } from 'react'

export type pathT = {
  d: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  strokeLinecap?: 'inherit' | 'round' | 'butt' | 'square'
  strokeLinejoin?: 'inherit' | 'round' | 'miter' | 'bevel'
  fillRule?: 'nonzero' | 'evenodd' | 'inherit'
  clipRule?: 'nonzero' | 'evenodd' | 'inherit'
}

export type ButtonT = {
  variant?: 'primary' | 'secondary' | 'disabled'
  children?: DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGElement>
  text: string
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type IconSvgT = {
  styles?: { [key: string]: string | number }
  width: number
  height: number
  viewBoxSize?: string
  className?: string
  id?: string | undefined
  path?: pathT[]
  children?: ReactNode
  functionOnClick?: <T>(params: T) => void
  onPointerDown?: (event: PointerEvent<SVGSVGElement | SVGPathElement>) => void
  onClick?: () => void
}

export interface ICategory {
  id: number
  parent: number
  products: number[]
  title: string
  children: ICategory[]
  count_products: number
  level: number
}
