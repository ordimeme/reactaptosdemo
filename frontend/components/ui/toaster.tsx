import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className="bg-[var(--background)] text-[var(--textColor)] border-[var(--softBg)]"
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="text-[var(--textColor)]">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-[var(--softTextColor)]">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-[var(--textColor)] hover:text-[var(--softTextColor)]" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
