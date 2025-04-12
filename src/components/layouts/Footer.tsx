import { BsFacebook, BsGithub, BsTwitterX } from 'react-icons/bs'

export const Footer = () => {
  return (
    <footer className="bg-gray-700 pb-8 pt-4 text-white md:pb-14 md:pt-20">
      <div className="m-auto w-full max-w-7xl px-4">
        <ul className="hidden gap-3 text-sm md:flex">
          <li>
            <BsTwitterX size={24} />
          </li>
          <li>
            <BsFacebook size={24} />
          </li>
          <li>
            <a
              className="transition-opacity hover:opacity-80"
              href="https://github.com/siakas/op-wellgarth"
              rel="noopener noreferrer"
              target="_blank"
            >
              <BsGithub size={24} />
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
