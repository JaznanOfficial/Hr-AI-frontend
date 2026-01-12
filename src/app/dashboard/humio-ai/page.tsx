"use client"

import { ChatInterface } from "@/components/master-agent/chat-interface"
import { PreviewPanel } from "@/components/master-agent/preview-panel"

export default function MasterAgentPage() {
  return (
    <div className="flex h-full flex-1 min-h-0 overflow-hidden rounded-xl border bg-background shadow-sm">
      {/* Chat Area - Takes available space */}
      <div className="flex h-full flex-1 min-w-0">
        <ChatInterface />
      </div>

      {/* Preview Area - Fixed width on desktop, hidden on mobile */}
      <div className="hidden min-h-0 w-[450px] xl:flex">
        <PreviewPanel />
      </div>
    </div>
  )
}
