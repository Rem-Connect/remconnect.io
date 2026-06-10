import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children and applies variant + size token classes', () => {
    render(
      <Button variant="primary" size="sm">
        Save
      </Button>,
    )
    const btn = screen.getByRole('button', { name: 'Save' })
    expect(btn).toHaveClass('bg-rc-ink', 'text-rc-paper')
  })

  it('merges caller className and forwards native props', async () => {
    const onClick = vi.fn()
    render(
      <Button className="w-full" onClick={onClick} aria-label="submit">
        Go
      </Button>,
    )
    const btn = screen.getByRole('button', { name: 'submit' })
    expect(btn).toHaveClass('w-full')
    await userEvent.click(btn)
    expect(onClick).toHaveBeenCalledOnce()
  })
})
