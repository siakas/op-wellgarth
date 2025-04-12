import { siteConfig } from '@@/site.config'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 p-6">
      <div>
        <Link className="text-2xl font-bold uppercase" href="/">
          {siteConfig.siteMeta.title}
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/favorites">お気に入り</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
