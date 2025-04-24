import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#C9C9CE] px-8 py-12 text-[#34373F]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Contact */}
        <div>
          <Link href="/">
            <a>
              <Image src="/logo.svg" alt="ODESADISC Logo" width={40} height={40} />
            </a>
          </Link>
          <p className="mt-4 text-xl font-light text-black">(050) 333-77-44</p>
          <p className="text-xs font-normal leading-3">Оформити замовлення 9:00 - 21:00</p>
        </div>

        {/* Genres */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-black">Жанри</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/genres/classic-rock">
                <a className="text-sm font-normal leading-relaxed">Classic Rock</a>
              </Link>
            </li>
            <li>
              <Link href="/genres/jazz-blues">
                <a className="text-sm font-normal leading-relaxed">Jazz &amp; Blues</a>
              </Link>
            </li>
            <li>
              <Link href="/genres/pop-music">
                <a className="text-sm font-normal leading-relaxed">Pop Music</a>
              </Link>
            </li>
            <li>
              <Link href="/genres/electronic">
                <a className="text-sm font-normal leading-relaxed">Electronic</a>
              </Link>
            </li>
            <li>
              <Link href="/genres/hiphop-rap">
                <a className="text-sm font-normal leading-relaxed">Hip-Hop &amp; Rap</a>
              </Link>
            </li>
            <li>
              <Link href="/genres/movie-soundtracks">
                <a className="text-sm font-normal leading-relaxed">Movie Soundtracks</a>
              </Link>
            </li>
            <li>
              <Link href="/genres">
                <a className="text-sm font-normal leading-relaxed">Більше</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* For Clients */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-black">Клієнтам</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about">
                <a className="text-sm font-normal leading-relaxed">Про нас</a>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <a className="text-sm font-normal leading-relaxed">Публічні оферти</a>
              </Link>
            </li>
            <li>
              <Link href="/delivery">
                <a className="text-sm font-normal leading-relaxed">Оплата і доставка</a>
              </Link>
            </li>
            <li>
              <Link href="/sales">
                <a className="text-sm font-normal leading-relaxed">Акції</a>
              </Link>
            </li>
            <li>
              <Link href="/care">
                <a className="text-sm font-normal leading-relaxed">Догляд</a>
              </Link>
            </li>
            <li>
              <Link href="/account">
                <a className="text-sm font-normal leading-relaxed">Особистий кабінет</a>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <a className="text-sm font-normal leading-relaxed">FAQ</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex items-start md:justify-center">
          <div className="flex space-x-4">
            <a href="https://instagram.com" aria-label="Instagram">
              <Image src="/icons/insta.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a href="https://fb.com" aria-label="Facebook">
              <Image src="/icons/fb.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a href="https://spotify.com" aria-label="Spotify">
              <Image src="/icons/Spotify.svg" alt="Spotify" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-[#34373F] pt-4 flex items-center justify-between text-xs">
        <span className="text-[#34373F]">© Інтернет-магазин ODESADISC (Vinyl - CD) {new Date().getFullYear()}</span>
        <div className="flex space-x-4 items-center">
          <Image src="/icons/apay.svg" alt="Apple Pay" width={32} height={20} />
          <Image src="/icons/gpay.svg" alt="Google Pay" width={32} height={20} />
          <Image src="/icons/visa.svg" alt="Visa" width={32} height={20} />
          <Image src="/icons/mc.svg" alt="Mastercard" width={32} height={20} />
        </div>
      </div>
    </footer>
  );
}