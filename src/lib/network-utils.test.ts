import { describe, expect, it } from 'vitest'
import { clamp, fmtTime, metricStatus, mulberry32, pad2 } from './network-utils'

describe('metricStatus', () => {
  it('rates higher-is-better metrics (download/upload)', () => {
    expect(metricStatus('download', 30)).toBe('healthy')
    expect(metricStatus('download', 20)).toBe('warning')
    expect(metricStatus('download', 5)).toBe('critical')
  })

  it('rates lower-is-better metrics (ping/latency/jitter)', () => {
    expect(metricStatus('ping', 20)).toBe('healthy')
    expect(metricStatus('ping', 75)).toBe('warning')
    expect(metricStatus('ping', 200)).toBe('critical')
  })
})

describe('clamp', () => {
  it('bounds a value within the range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(99, 0, 10)).toBe(10)
  })
})

describe('pad2', () => {
  it('pads single digits to two characters', () => {
    expect(pad2(3)).toBe('03')
    expect(pad2(42)).toBe('42')
  })
})

describe('fmtTime', () => {
  it('formats milliseconds as HH:MM:SS', () => {
    expect(fmtTime(0)).toBe('00:00:00')
    expect(fmtTime(3_661_000)).toBe('01:01:01')
  })
})

describe('mulberry32', () => {
  it('is deterministic for a given seed', () => {
    const a = mulberry32(123)
    const b = mulberry32(123)
    expect(a()).toBe(b())
    expect(a()).toBe(b())
  })
})
