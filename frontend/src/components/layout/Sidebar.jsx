export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center gap-2 px-4 py-4 border-b">
        <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
          V
        </div>
        <div>
          <div className="font-semibold text-sm">Vault</div>
          <div className="text-xs text-gray-500">Tinkal Kumar</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-sm">
        <div>
          <div className="text-xs font-semibold text-gray-400 mb-2">MAIN</div>
          <div className="space-y-1">
            <div className="sidebar-link sidebar-link-active">
              <span>Dashboard</span>
            </div>
            <div className="sidebar-link">
              <span>Nexus</span>
            </div>
            <div className="sidebar-link">
              <span>Intake</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-400 mb-2">
            SERVICES
          </div>
          <div className="space-y-1">
            <div className="sidebar-link">
              <span>Pre-active</span>
            </div>
            <div className="sidebar-link">
              <span>Active</span>
            </div>
            <div className="sidebar-link">
              <span>Blocked</span>
            </div>
            <div className="sidebar-link">
              <span>Closed</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-400 mb-2">
            INVOICES
          </div>
          <div className="space-y-1">
            <div className="sidebar-link sidebar-link-active">
              <span>Proforma Invoices</span>
            </div>
            <div className="sidebar-link">
              <span>Final Invoices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
