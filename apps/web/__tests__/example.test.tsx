import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}

describe('Example Test Suite', () => {
  it('renders a greeting with the provided name', () => {
    render(<Greeting name='World' />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Hello, World!')
  })

  it('renders different names correctly', () => {
    render(<Greeting name='Jest' />)

    expect(screen.getByText('Hello, Jest!')).toBeInTheDocument()
  })
})
