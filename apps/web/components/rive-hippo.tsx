'use client'

import { useRive } from '@rive-app/react-canvas'

interface RiveHippoProps {
  className?: string
}

export default function RiveHippo({ className }: RiveHippoProps) {
  const { rive, RiveComponent } = useRive({
    src: '/assets/hippo.riv',
    stateMachines: 'State Machine 1',
    autoplay: false
  })

  return (
    <div className={className}>
      <RiveComponent
        onMouseEnter={() => rive?.play()}
        onMouseLeave={() => rive?.pause()}
      />
    </div>
  )
}
