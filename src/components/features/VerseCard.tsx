import { toBanglaDigits } from "../../helper/EnToBnDigit";
import type { VerseData } from "../../types/bible.types";
import Card from "../ui/Card";

interface Props {
  verse: VerseData;
  loading?: boolean;
}

export default function VerseCard({ verse, loading }: Props) {
  if (loading) {
    return (
      <Card className="animate-pulse p-6">
        <div className="space-y-4">
          <div className="h-4 bg-zinc-800 rounded w-1/3 mb-6"></div>
          <div className="h-5 bg-zinc-800 rounded w-full"></div>
          <div className="h-5 bg-zinc-800 rounded w-5/6"></div>
          <div className="h-4 bg-zinc-800 rounded w-3/4 pt-4 border-t border-zinc-800/20"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 space-y-5 group/card relative overflow-hidden">
      {/* Verse Content */}
      <div className="space-y-5">
        {/* English Section */}
        <p className="text-lg font-medium leading-relaxed text-zinc-100 group-hover/card:text-white transition-colors duration-300">
          {verse.text_en}
        </p>
        {/* Footer: En Reference */}
        <div className="flex justify-end -mt-1">
          <p className="text-[11px] font-bold text-yellow-500 uppercase tracking-widest opacity-100">
            — {verse.book_en} {verse.chapter} : {verse.verse}
          </p>
        </div>

        {/* Bengali Section */}
        <div className="pt-5 border-t border-zinc-800/30">
          <p className="text-base font-medium leading-relaxed text-zinc-300 group-hover/card:text-zinc-200 transition-colors duration-300 italic">
            {verse.text_bn}
          </p>
        </div>

        {/* Footer: Bn Reference */}
        <div className="flex justify-end -mt-1">
          <p className="text-[11px] font-bold text-yellow-500 uppercase tracking-widest opacity-100">
            — {verse.book_bn} {toBanglaDigits(verse.chapter)} :{" "}
            {toBanglaDigits(verse.verse)}
          </p>
        </div>
      </div>
    </Card>
  );
}
