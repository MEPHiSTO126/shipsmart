'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  /** Duration in ms before auto-dismiss. 0 = never. Default 5000. */
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');

  const { addToast, removeToast } = ctx;

  return {
    success: (
      message: string,
      options?: Omit<ToastItem, 'id' | 'message' | 'variant'>,
    ) => addToast({ message, variant: 'success', ...options }),

    error: (
      message: string,
      options?: Omit<ToastItem, 'id' | 'message' | 'variant'>,
    ) => addToast({ message, variant: 'error', duration: 8000, ...options }),

    info: (
      message: string,
      options?: Omit<ToastItem, 'id' | 'message' | 'variant'>,
    ) => addToast({ message, variant: 'info', ...options }),

    warning: (
      message: string,
      options?: Omit<ToastItem, 'id' | 'message' | 'variant'>,
    ) => addToast({ message, variant: 'warning', ...options }),

    dismiss: removeToast,
  };
}

// ─── Individual Toast ─────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: 'bg-white border-l-4 border-green-500',
  error: 'bg-white border-l-4 border-red-500',
  info: 'bg-white border-l-4 border-blue-500',
  warning: 'bg-white border-l-4 border-amber-500',
};

const ICON_COLORS: Record<ToastVariant, string> = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-amber-500',
};

function ToastIcon({ variant }: { variant: ToastVariant }) {
  const cls = `h-5 w-5 flex-shrink-0 ${ICON_COLORS[variant]}`;

  if (variant === 'success') {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (variant === 'error') {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (variant === 'warning') {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  }
  // info
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

interface SingleToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

function SingleToast({ toast, onDismiss }: SingleToastProps) {
  const duration = toast.duration ?? 5000;
  const closeRef = useRef<HTMLButtonElement>(null);

  // Auto-dismiss
  useEffect(() => {
    if (duration === 0) return;
    const timer = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  return (
    <motion.div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      className={`flex w-full items-start gap-3 rounded-lg p-4 shadow-lg ring-1 ring-black/5 ${VARIANT_STYLES[toast.variant]}`}
    >
      <ToastIcon variant={toast.variant} />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">{toast.message}</p>
        {toast.action && (
          <button
            onClick={() => {
              toast.action!.onClick();
              onDismiss(toast.id);
            }}
            className="mt-1 text-sm font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        ref={closeRef}
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="flex-shrink-0 rounded p-0.5 text-gray-400 transition-colors hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // useSyncExternalStore with a getServerSnapshot of `false` tells React:
  // "on the server render nothing here, on the client render the portal".
  // This is the React-recommended way to avoid hydration mismatches for
  // client-only content — no typeof window/document checks needed.
  const isClient = useSyncExternalStore(
    () => () => {}, // no external store — subscribe is a no-op
    () => true,     // client snapshot: portal is ready
    () => false,    // server snapshot: don't render portal
  );

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>): string => {
    const id = crypto.randomUUID();
    setToasts((prev) => {
      // Keep max 5 toasts at once, drop oldest
      const next = [...prev, { ...toast, id }];
      return next.length > 5 ? next.slice(next.length - 5) : next;
    });
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Portal — deferred to client via useSyncExternalStore */}
      {isClient &&
        createPortal(
          <div
            aria-label="Notifications"
            className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {toasts.map((toast) => (
                <SingleToast
                  key={toast.id}
                  toast={toast}
                  onDismiss={removeToast}
                />
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
