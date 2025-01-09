import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'California Court Directory - Find Your Local Courthouse',
  description: 'Complete directory of California courthouses. Search and find detailed information about all superior courts, county courts, and courthouses across California.',
  keywords: 'California courts, Courthouse Directory, Pay Traffic Ticket Online, Fight Traffic Ticket, Appear in Court',
  openGraph: {
    title: 'California Court Directory - Find Your Local Courthouse',
    description: 'Complete directory of California courthouses. Search and find detailed information about all superior courts, county courts, and courthouses across California.',
    type: 'website',
    locale: 'en_US',
    siteName: 'CaliforniaCarLaw',
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
