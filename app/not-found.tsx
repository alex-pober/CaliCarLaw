import Link from 'next/link'
 
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6366f1"
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Could not find requested resource</p>
        <Link 
          href="/"
          className="text-[#50ade4] hover:text-[#3d8ab8] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
