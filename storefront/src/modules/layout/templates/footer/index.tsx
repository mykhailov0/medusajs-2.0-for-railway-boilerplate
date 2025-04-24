import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Contact */}
        <div>
          <Link href="/">
            <a className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="ODESADISC Logo" width={40} height={40} />
              <span className="text-xl font-bold">ODESADISC</span>
            </a>
          </Link>
          <p className="mt-4">050 333-77-44</p>
          <p className="text-sm">Оформити замовлення 9:00 - 21:00</p>
        </div>

        {/* Genres */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Жанри</h3>
          <ul className="space-y-2">
            <li><Link href="/genres/classic-rock"><a>Classic Rock</a></Link></li>
            <li><Link href="/genres/jazz-blues"><a>Jazz &amp; Blues</a></Link></li>
            <li><Link href="/genres/pop-music"><a>Pop Music</a></Link></li>
            <li><Link href="/genres/electronic"><a>Electronic</a></Link></li>
            <li><Link href="/genres/hiphop-rap"><a>Hip-Hop &amp; Rap</a></Link></li>
            <li><Link href="/genres/movie-soundtracks"><a>Movie Soundtracks</a></Link></li>
            <li><Link href="/genres"><a>Більше</a></Link></li>
          </ul>
        </div>

        {/* For Clients */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Клієнтам</h3>
          <ul className="space-y-2">
            <li><Link href="/about"><a>Про нас</a></Link></li>
            <li><Link href="/terms"><a>Публічні оферти</a></Link></li>
            <li><Link href="/delivery"><a>Оплата і доставка</a></Link></li>
            <li><Link href="/sales"><a>Акції</a></Link></li>
            <li><Link href="/care"><a>Догляд</a></Link></li>
            <li><Link href="/account"><a>Особистий кабінет</a></Link></li>
            <li><Link href="/faq"><a>FAQ</a></Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex items-start md:justify-center">
          <div className="flex space-x-4">
            <a href="https://youtube.com" aria-label="YouTube">
              <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a href="https://spotify.com" aria-label="Spotify">
              <Image src="/icons/spotify.svg" alt="Spotify" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 flex items-center justify-between text-sm">
        <span>© Інтернет-магазин ODESADISC (Vinyl - CD) {new Date().getFullYear()}</span>
        <div className="flex space-x-4 items-center">
          <Image src="/icons/apple-pay.svg" alt="Apple Pay" width={32} height={20} />
          <Image src="/icons/google-pay.svg" alt="Google Pay" width={32} height={20} />
          <Image src="/icons/visa.svg" alt="Visa" width={32} height={20} />
          <Image src="/icons/mastercard.svg" alt="Mastercard" width={32} height={20} />
        </div>
      </div>
    </footer>
  );
}
