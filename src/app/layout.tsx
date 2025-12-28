import '@/app/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from '@/auth/AuthContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="h-screen w-screen overflow-hidden " suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
