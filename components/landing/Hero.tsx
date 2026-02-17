import Link from "next/link";
import { IconBrandTelegram, IconBrandTwitter, IconRss } from "@tabler/icons-react";

export default function Hero() {
  return (
    <div className="pt-24 pb-12 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-[42px] font-bold text-white mb-6">
          Download YTS YIFY movies: HD smallest size
        </h1>
        
        <div className="max-w-3xl mx-auto text-[14px] text-[#919191] leading-relaxed mb-6">
          <p className="mb-2">
            Welcome to the official YTS website (<span className="text-white font-bold">YTS.BZ</span>). Here you can browse and download YTS YIFY movies
          </p>
          <p className="mb-2">
            in excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. <span className="line-through">YTS.MX</span> Movies Torrents.
          </p>
          <p className="text-white font-bold mb-4">
            IMPORTANT - YTS.BZ is the only new official domain for YIFY Movies (<span className="text-accent underline">YTS.MX is off</span>)
          </p>
          
          <div className="flex items-center justify-center gap-4 text-accent text-[12px] font-bold">
            <Link href="#" className="flex items-center gap-1 hover:underline">
              <IconBrandTelegram size={14} />
              @YTSMX_UPDATES
            </Link>
            <span className="text-[#2f2f2f]">|</span>
            <Link href="#" className="flex items-center gap-1 hover:underline">
              <IconBrandTwitter size={14} />
              Follow @YTSYIFY for upcoming featured movies!
            </Link>
            <span className="text-[#2f2f2f]">|</span>
            <Link href="#" className="flex items-center gap-1 hover:underline text-[#ffc107]">
               @ytsyify
            </Link>
          </div>
          
          <p className="mt-4 text-[13px]">
            <span className="font-bold">Pro Tip:</span> Bookmark <span className="text-white font-bold underline">YTS.BZ</span> and <span className="text-white font-bold underline">YTS.GG</span> now as alternative domains &rarr; Backup entrance to the site.
          </p>
        </div>

        <div className="border-t border-[#2f2f2f] pt-8 mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-[18px]">
            <span className="text-accent">★</span>
            Popular YTS Downloads
          </div>
          <Link href="#" className="flex items-center gap-1 text-accent font-bold text-[13px] hover:underline">
            <IconRss size={16} fill="currentColor" />
            more featured...
          </Link>
        </div>
      </div>
    </div>
  );
}
