import { cn } from "@/lib/utils"

interface TableSkeletonProps {
  columns: number
  rows?: number
  hasActions?: boolean
  className?: string
}

export function TableSkeleton({ columns, rows = 5, hasActions = false, className }: TableSkeletonProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="py-3 px-4 text-left">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </th>
              ))}
              {hasActions && (
                <th className="py-3 px-4 text-right">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20 ml-auto"></div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="py-4 px-4">
                    <div
                      className={cn("h-4 bg-gray-200 rounded animate-pulse", Math.random() > 0.5 ? "w-full" : "w-2/3")}
                      style={{
                        animationDelay: `${(rowIndex * columns + colIndex) * 0.05}s`,
                      }}
                    ></div>
                  </td>
                ))}
                {hasActions && (
                  <td className="py-2 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <div
                        className="h-8 w-16 bg-gray-200 rounded animate-pulse"
                        style={{ animationDelay: `${rowIndex * 0.05}s` }}
                      ></div>
                      <div
                        className="h-8 w-16 bg-gray-200 rounded animate-pulse"
                        style={{ animationDelay: `${rowIndex * 0.05 + 0.1}s` }}
                      ></div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
