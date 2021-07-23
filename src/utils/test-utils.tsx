import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

import { TagProvider } from '@/context/TagContext';

type CustomRenderProps = {} & Omit<RenderOptions, 'queries'>

const customRender = (
  ui: ReactElement, 
  { ...renderOptions }: CustomRenderProps = {}
) =>
  render(
    <TagProvider>
      {ui}
    </TagProvider>,
    renderOptions
  )

export * from '@testing-library/react'
export { customRender as render }