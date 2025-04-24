import Link from 'next/link';
import Image from 'next/image';
// social icons via next/image from public/icons

export default function Footer() {
  return (
    <footer className="bg-[#C9C9CE] px-8 pt-12 pb-0 text-[#34373F]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Contact */}
        <div>
          <Link href="/">
            <a>
              <Image src="/logo-black.svg" alt="ODESADISC Logo" width={168} height={68} />
            </a>
          </Link>
          <p className="mt-4 text-xl font-light text-black">(050) 333-77-44</p>
          <p className="text-xs font-normal leading-3">Оформити замовлення 9:00 - 21:00</p>
        </div>

        {/* Genres */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-black">Жанри</h3>
          <ul className="space-y-2">
            {[
              ['Classic Rock', '/genres/classic-rock'],
              ['Jazz & Blues', '/genres/jazz-blues'],
              ['Pop Music', '/genres/pop-music'],
              ['Electronic', '/genres/electronic'],
              ['Hip-Hop & Rap', '/genres/hiphop-rap'],
              ['Movie Soundtracks', '/genres/movie-soundtracks'],
              ['Більше', '/genres'],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href}>
                  <a className="text-sm font-normal leading-relaxed hover:text-[#DD6719]">
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For Clients */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-black">Клієнтам</h3>
          <ul className="space-y-2">
            {[
              ['Про нас', '/about'],
              ['Публічні оферти', '/terms'],
              ['Оплата і доставка', '/delivery'],
              ['Акції', '/sales'],
              ['Догляд', '/care'],
              ['Особистий кабінет', '/account'],
              ['FAQ', '/faq'],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href}>
                  <a className="text-sm font-normal leading-relaxed hover:text-[#DD6719]">
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex items-start md:justify-center">
          <div className="flex space-x-4">
            <a href="https://instagram.com" aria-label="Instagram">
              <Image src="/icons/insta.svg" alt="Instagram" width={24} height={24} className="hover:text-[#DD6719]" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <Image src="/icons/fb.svg" alt="Facebook" width={24} height={24} className="hover:text-[#DD6719]" />
            </a>
            <a href="https://spotify.com" aria-label="Spotify">
              <Image src="/icons/Spotify.svg" alt="Spotify" width={24} height={24} className="hover:text-[#DD6719]" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-8 h-12 flex items-center justify-between text-xs">
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
