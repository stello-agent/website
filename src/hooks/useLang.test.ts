import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { LangProvider } from '../context/LangContext'
import { useLang } from './useLang'

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(LangProvider, null, children)

test('默认语言为 en', () => {
  const { result } = renderHook(() => useLang(), { wrapper })
  expect(result.current.lang).toBe('zh')
})

test('toggle 切换为 zh', () => {
  const { result } = renderHook(() => useLang(), { wrapper })
  act(() => result.current.toggle())
  expect(result.current.lang).toBe('en')
})

test('t() 根据语言返回对应字符串', () => {
  const { result } = renderHook(() => useLang(), { wrapper })
  expect(result.current.t('hello', '你好')).toBe('你好')
  act(() => result.current.toggle())
  expect(result.current.t('hello', '你好')).toBe('hello')
})
