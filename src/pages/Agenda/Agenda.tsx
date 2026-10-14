"use client";

import { Book, Calendar, CircleCheckBig, ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import CalendarGrid from "./CalendarGrid";
import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";

type CarouselProps = {
  slides?: ReactNode[];
};

const defaultSlides: ReactNode[] = [
  <div className="w-full items-left bg-(--paper) flex gap-5 flex-row p-4 border border-[var(--line)] rounded-[12px_12px_12px_4px] shadow-[2px_3px_0_rgba(60,50,38,.04)]">
    <span className="flex bg-(--purple-soft) p-4 rounded-[0.625rem]">
      <CircleCheckBig className="text-(--purple)" />
    </span>
    <div>
      <h4 className="font-semibold text-[0.68rem]">
        <span className="text-[1.4rem] font-bold">5</span> tarefas pendentes
      </h4>
      <p className="m-0 text-[var(--muted)] text-[13px]">2 para esta semana</p>
    </div>
  </div>,
  <div className="w-full items-left bg-(--paper) flex flex-row p-4 border border-[var(--line)] rounded-[12px_12px_12px_4px] shadow-[2px_3px_0_rgba(60,50,38,.04)]">
    <span className="flex bg-(--coral-soft) p-4 mr-[0.25rem] rounded-[0.625rem]">
      <Calendar className="text-(--coral)" />
    </span>
    <div>
      <h4 className="font-semibold text-[0.68rem]">
        <span className="text-[1.4rem] font-bold">1</span> tarefas em atraso
      </h4>
      <p className="m-0 text-[var(--muted)] text-[13px]">
        Precisam de sua atenção
      </p>
    </div>
  </div>,
  <div className="w-full items-left bg-(--paper) flex flex-row p-4 border border-[var(--line)] rounded-[12px_12px_12px_4px] shadow-[2px_3px_0_rgba(60,50,38,.04)]">
    <span className="flex bg-(--green-soft) p-4 mr-[0.25rem] rounded-[0.625rem]">
      <Book className="text-(--green)" />
    </span>
    <div>
      <h4 className="font-semibold text-[0.68rem]">
        <span className="text-[1.4rem] font-bold">7</span> atividades concluídas
      </h4>
      <p className="m-0 text-[var(--muted)] text-[13px]">Você está em dia</p>
    </div>
  </div>,
];

export function Carousel({ slides = defaultSlides }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({width: 100, left: 0})

  const update = useCallback(() => {
    const el = scrollRef.current;
    if(!el) return;

    const {scrollLeft, scrollWidth, clientWidth} = el;
    setThumb({
      width: (clientWidth / scrollWidth) * 100,
      left: (scrollLeft / scrollWidth) * 100
    })
  }, [])

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if(!el) return;

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect();

  }, [update, slides]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if(!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 280) + 12;
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  const onThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if(!el || !track) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    const startX = e.clientX;
    const startScroll = el.scrollLeft;
    const ratio = el.scrollWidth / track.clientWidth

    const onMove = (ev: PointerEvent) => {
      el.scrollLeft = startScroll + (ev.clientX - startX) * ratio
    }

    const onUp = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  return (
    <div className="w-full">
    <div
      ref={scrollRef}
      onScroll={update}
      className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"      
    >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-[85%] sm:w-72 shrink-0 snap-start"
          >
            {slide}
          </div>
        ))}
    </div>
    <div className="flex items-center gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Anterior"
          className="grid size-6 shrink-0 place-items-center rounded-full text-(--muted) hover:bg-(--line)"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={trackRef}
          className="relative h-2 flex-1 rounded-full bg-(--line)"
        >
          <div
            onPointerDown={onThumbPointerDown}
            className="absolute top-0 h-full cursor-grab rounded-full bg-(--muted) active:cursor-grabbing touch-none"
            style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Próximo"
          className="grid size-6 shrink-0 place-items-center rounded-full text-(--muted) hover:bg-(--line)"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function Agenda() {
  return (
    <>
      <div className="flex min-h-screen w-full">
        <main className="flex min-w-0 flex-1 flex-col gap-6 p-6">
          <section className="w-full">
            <h2 className="text-(--purple) text-[0.6875rem] font-bold tracking-[.13em] uppercase mb-[0.5rem]">
              QUINTA-FEIRA, 12 DE JUNHO
            </h2>
            <h1 className="font-handwriting text-[2.5rem] font-semibold leading-none mb-[0.5rem]">
              Olá, Usuário.
            </h1>
            <p className="m-0 text-[var(--muted)] text-[13px] mb-[1.625rem]">
              Aqui está o panorama da semana.
            </p>

            <Carousel />
          </section>
          <CalendarGrid />
        </main>
      </div>
    </>
  );
}
