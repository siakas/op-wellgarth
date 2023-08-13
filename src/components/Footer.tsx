const Footer = () => {
  return (
    <footer className="bg-gray-700 pb-8 pt-4 text-white md:pb-14 md:pt-20">
      <div className="m-auto w-full max-w-7xl px-4">
        <ul className="hidden gap-7 text-sm md:flex">
          <li>
            <a href="#" className="text-white hover:underline">
              運営会社
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              ニュース
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              特定商取引法に基づく表記
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              利用規約
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              プライバシーポリシー
            </a>
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-400">
          Copyright © Kyoto Finder. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
