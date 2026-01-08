"use client"

interface Device {
  name: string
  user: string
  os: string
  version: string
  lastSeen: string
}

interface DeviceGapTableProps {
  devices: Device[]
}

export function DeviceGapTable({ devices }: DeviceGapTableProps) {
  return (
    <div className="rounded-lg border border-secondary bg-card p-4">
      <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-primary">Affected Devices</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-secondary">
              <th className="pb-2 text-left font-semibold text-primary">Device</th>
              <th className="pb-2 text-left font-semibold text-primary">User</th>
              <th className="pb-2 text-left font-semibold text-primary">OS</th>
              <th className="pb-2 text-left font-semibold text-primary">Version</th>
              <th className="pb-2 text-left font-semibold text-primary">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, idx) => (
              <tr key={idx} className="border-b border-secondary/50 last:border-0">
                <td className="py-2 text-primary">{device.name}</td>
                <td className="py-2 text-muted-foreground">{device.user}</td>
                <td className="py-2 text-muted-foreground">{device.os}</td>
                <td className="py-2 text-muted-foreground">{device.version}</td>
                <td className="py-2 text-muted-foreground">{device.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
