import { Link } from '@/components/elements/Link'
import Image from 'next/image'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-10">
        <div>
          <a className="group" href="#">
            <Image
              alt=""
              className="block aspect-gold w-full rounded object-cover transition-opacity group-hover:opacity-90"
              height={400}
              src="/assets/img/noimage.png"
              width={600}
            />
            <ul className="flex gap-2 pt-2 text-xs text-gray-500">
              <li>四条烏丸</li>
              <li>ラーメン</li>
            </ul>
            <p className="pt-1.5 text-base font-semibold text-gray-700 group-hover:underline md:text-lg md:leading-snug">
              ぎおん天ぷら 天周
            </p>
          </a>
        </div>
        <div>
          <a className="group" href="#">
            <Image
              alt=""
              className="block aspect-gold w-full rounded object-cover transition-opacity group-hover:opacity-90"
              height={400}
              src="/assets/img/noimage.png"
              width={600}
            />
            <ul className="flex gap-2 pt-2 text-xs text-gray-500">
              <li>四条烏丸</li>
              <li>ラーメン</li>
            </ul>
            <p className="pt-1.5 text-base font-semibold text-gray-700 group-hover:underline md:text-lg md:leading-snug">
              ぎおん天ぷら 天周
            </p>
          </a>
        </div>
        <div>
          <a className="group" href="#">
            <Image
              alt=""
              className="block aspect-gold w-full rounded object-cover transition-opacity group-hover:opacity-90"
              height={400}
              src="/assets/img/noimage.png"
              width={600}
            />
            <ul className="flex gap-2 pt-2 text-xs text-gray-500">
              <li>四条烏丸</li>
              <li>ラーメン</li>
            </ul>
            <p className="pt-1.5 text-base font-semibold text-gray-700 group-hover:underline md:text-lg md:leading-snug">
              ぎおん天ぷら 天周
            </p>
          </a>
        </div>
        <div>
          <a className="group" href="#">
            <Image
              alt=""
              className="block aspect-gold w-full rounded object-cover transition-opacity group-hover:opacity-90"
              height={400}
              src="/assets/img/noimage.png"
              width={600}
            />
            <ul className="flex gap-2 pt-2 text-xs text-gray-500">
              <li>四条烏丸</li>
              <li>ラーメン</li>
            </ul>
            <p className="pt-1.5 text-base font-semibold text-gray-700 group-hover:underline md:text-lg md:leading-snug">
              ぎおん天ぷら 天周
            </p>
          </a>
        </div>
      </div>

      {/* ページャー */}
      <div className="py-10">
        <ul
          className="flex items-center justify-center gap-2
        pt-10"
        >
          <li>
            <Link.Page href="#">
              <MdKeyboardDoubleArrowLeft size={24} />
            </Link.Page>
          </li>
          <li>
            <Link.Page href="#">
              <MdKeyboardArrowLeft size={24} />
            </Link.Page>
          </li>
          <li>
            <Link.Page href="#">1</Link.Page>
          </li>
          <li>
            <Link.Page href="#">2</Link.Page>
          </li>
          <li>
            <Link.Page href="#" isActive={true}>
              3
            </Link.Page>
          </li>
          <li>
            <Link.Page href="#">
              <MdKeyboardArrowRight size={24} />
            </Link.Page>
          </li>
          <li>
            <Link.Page href="#">
              <MdKeyboardDoubleArrowRight size={24} />
            </Link.Page>
          </li>
        </ul>
      </div>
    </>
  )
}
