import React, { CSSProperties } from 'react'

interface IconProps {
  name: string
  size?: number
  color?: string
  className?: string
  style?: CSSProperties
}

export function Icon({ name, size = 16, color = 'currentColor', className, style }: IconProps) {
  const s = { width: size, height: size, display: 'inline-block', flexShrink: 0, ...style } as React.CSSProperties
  const stroke = { stroke: color, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }

  switch (name) {
    case 'mic':        return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
    case 'chat':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M4 5h16v11H8l-4 4V5Z"/></svg>
    case 'mail':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
    case 'share':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg>
    case 'code':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></svg>
    case 'chart':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M4 4v16h16"/><path d="M8 14v3M12 9v8M16 12v5"/></svg>
    case 'users':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 1 0 0-5M21 20c0-2.5-1.5-4.7-3.7-5.5"/></svg>
    case 'spark':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8"/></svg>
    case 'check':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="m5 12 5 5L20 7"/></svg>
    case 'arrow-right':return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    case 'play':       return <svg viewBox="0 0 24 24" style={s} className={className} fill={color}><path d="M8 5v14l11-7z"/></svg>
    case 'pause':      return <svg viewBox="0 0 24 24" style={s} className={className} fill={color}><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
    case 'globe':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/></svg>
    case 'bolt':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg>
    case 'shield':     return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M12 3 4 6v6c0 4.5 3.2 8.5 8 9 4.8-.5 8-4.5 8-9V6l-8-3Z"/></svg>
    case 'search':     return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
    case 'filter':     return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M4 5h16l-6 8v6l-4-2v-4L4 5Z"/></svg>
    case 'plus':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M12 5v14M5 12h14"/></svg>
    case 'bell':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2ZM10 20a2 2 0 0 0 4 0"/></svg>
    case 'settings':   return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>
    case 'trophy':     return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM5 5h3v3a3 3 0 1 1-3-3ZM19 5h-3v3a3 3 0 1 0 3-3ZM9 15h6l1 5H8l1-5Z"/></svg>
    case 'flame':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4-1 2 0 4 1 4 0-3 1-6 2-9Z"/></svg>
    case 'book':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M4 5a2 2 0 0 1 2-2h13v17H6a2 2 0 0 0-2 2V5ZM6 19h13"/></svg>
    case 'clock':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
    case 'calendar':   return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
    case 'dot':        return <svg viewBox="0 0 24 24" style={s} className={className} fill={color}><circle cx="12" cy="12" r="4"/></svg>
    case 'map-pin':    return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>
    case 'star':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="m12 3 2.8 6 6.2.8-4.6 4.3 1.2 6.4L12 17.5 6.4 20.5l1.2-6.4L3 9.8 9.2 9 12 3Z"/></svg>
    case 'lightning':  return <svg viewBox="0 0 24 24" style={s} className={className} fill={color}><path d="M13 2 4 14h6l-1 8 10-12h-6l1-8z"/></svg>
    case 'arrow-up-right':   return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M7 17 17 7M9 7h8v8"/></svg>
    case 'arrow-down-right': return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M7 7l10 10M17 9v8H9"/></svg>
    case 'menu':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    case 'x':          return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="m6 6 12 12M18 6 6 18"/></svg>
    case 'home':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="m3 11 9-8 9 8v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2v-9Z"/></svg>
    case 'grad-cap':   return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="m2 8 10-4 10 4-10 4L2 8Z"/><path d="M6 10v4c0 2 3 3 6 3s6-1 6-3v-4"/><path d="M22 8v5"/></svg>
    case 'clipboard':  return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="6" y="5" width="12" height="16" rx="2"/><path d="M9 3h6v4H9z"/><path d="M9 12h6M9 16h4"/></svg>
    case 'user':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>
    case 'eye':        return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
    case 'eye-off':    return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M3 3l18 18M10.6 6.2A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17.3 17.3 0 0 1-3.5 4.2M6.5 7.5A17.3 17.3 0 0 0 2 12s3.5 6 10 6c1.5 0 2.9-.3 4.1-.8M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>
    case 'list':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/></svg>
    case 'grid':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>
    case 'briefcase':  return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>
    case 'headset':    return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="2" y="14" width="5" height="6" rx="1.5"/><rect x="17" y="14" width="5" height="6" rx="1.5"/><path d="M20 20a4 4 0 0 1-4 4h-2"/></svg>
    case 'wallet':     return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M3 7a2 2 0 0 1 2-2h14v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M3 7h16M16 13h3"/></svg>
    case 'megaphone':  return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M3 10v4h4l7 4V6l-7 4H3ZM18 8c1 1.2 1.5 2.5 1.5 4s-.5 2.8-1.5 4"/></svg>
    case 'award':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="12" cy="9" r="6"/><path d="m8 14-2 7 6-3 6 3-2-7"/></svg>
    case 'activity':   return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>
    case 'robot':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M8 14v2M16 14v2"/><circle cx="9" cy="14" r="0.5" fill={color} stroke="none"/><circle cx="15" cy="14" r="0.5" fill={color} stroke="none"/></svg>
    case 'video':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="3" y="6" width="14" height="12" rx="2"/><path d="m17 10 4-2v8l-4-2"/></svg>
    case 'phone':      return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M4 5c0 9 6 15 15 15l2-3-4-2-2 2a13 13 0 0 1-5-5l2-2-2-4-3 2-3-3Z"/></svg>
    case 'play-circle':return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z" fill={color} stroke={color}/></svg>
    case 'lock':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
    case 'upload':     return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M12 16V4m0 0-4 4m4-4 4 4M4 20h16"/></svg>
    case 'download':   return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M12 4v12m0 0-4-4m4 4 4-4M4 20h16"/></svg>
    case 'info':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 8v.01"/></svg>
    case 'spreadsheet':return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 14h18M9 4v16M15 4v16"/></svg>
    case 'help':       return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17v.01"/></svg>
    case 'document':     return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v6h6M9 12h6M9 16h6"/></svg>
    case 'pin':          return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="M12 2v8l4 2-1 3H9l-1-3 4-2V2M8 20l4 2 4-2"/></svg>
    case 'chevron-up':   return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="m6 15 6-6 6 6"/></svg>
    case 'chevron-down': return <svg viewBox="0 0 24 24" style={s} className={className} {...stroke}><path d="m6 9 6 6 6-6"/></svg>
    default:           return null
  }
}
