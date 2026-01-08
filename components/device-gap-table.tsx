interface Device {
  deviceId: string
  user: string
  department: string
  osVersion: string
  lastSeen: string
  riskLevel: "High" | "Critical"
}

interface DeviceGapTableProps {
  devices: Device[]
}

export function DeviceGapTable({ devices }: DeviceGapTableProps) {
  return (
    <div className="rounded-lg border border-secondary bg-card p-4">
      <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-primary">Affected Devices</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-secondary">
              <th className="pb-2 text-left font-medium text-muted-foreground">Device ID</th>
              <th className="pb-2 text-left font-medium text-muted-foreground">User</th>
              <th className="pb-2 text-left font-medium text-muted-foreground">Department</th>
              <th className="pb-2 text-left font-medium text-muted-foreground">OS Version</th>
              <th className="pb-2 text-left font-medium text-muted-foreground">Last Seen</th>
              <th className="pb-2 text-left font-medium text-muted-foreground">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.deviceId} className="border-b border-secondary/50">
                <td className="py-2 text-primary">{device.deviceId}</td>
                <td className="py-2 text-primary">{device.user}</td>
                <td className="py-2 text-primary">{device.department}</td>
                <td className="py-2 text-primary">{device.osVersion}</td>
                <td className="py-2 text-primary">{device.lastSeen}</td>
                <td className="py-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      device.riskLevel === "Critical" ? "bg-red-50 text-destructive" : "bg-amber-50 text-accent"
                    }`}
                  >
                    {device.riskLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
