import Link from 'next/link'
import { siteConfig } from '@@/site.config'

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 p-6">
      <div>
        <Link href="/" className="text-2xl font-bold uppercase">
          {siteConfig.siteMeta.title}
        </Link>
      </div>
      <nav>
        <ul className="mr-4 flex gap-6">
          <li className="text-lg">
            <Link href="/">トップ</Link>
          </li>
          <li className="text-lg">お気に入り</li>
          <li className="text-lg">未訪問</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
