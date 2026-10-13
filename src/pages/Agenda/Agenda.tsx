import { Book, Calendar, CircleCheckBig } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import CalendarGrid from "./CalendarGrid";

export default function Agenda() {

  return (
      <>
        <div className="flex min-h-screen w-full">

          <main className="flex min-w-0 flex-1 flex-col gap-6 p-6">
            <section className="w-full">
              <h2 className="text-(--purple) text-[0.6875rem] font-bold tracking-[.13em] uppercase mb-[0.5rem]" >QUINTA-FEIRA, 12 DE JUNHO</h2>
              <h1 className="font-handwriting text-[2.5rem] font-semibold leading-none mb-[0.5rem]">Olá, Usuário.</h1>
              <p className="m-0 text-[var(--muted)] text-[13px] mb-[1.625rem]">Aqui está o panorama da semana.</p>

              <div className="panorama grid grid-cols-3 gap-[1rem] mb-[18px]">
                <div className="w- place-items-center place-content-center bg-(--paper) flex flex-row p-4 border border-[var(--line)] rounded-[12px_12px_12px_4px] shadow-[2px 3px 0 rgba(60,50,38,.04)]">
                  <span className="flex bg-(--purple-soft) p-4 mr-[0.25rem] rounded-[0.625rem]"><CircleCheckBig className="text-(--purple)"/></span>
                  <div>
                    <h4 className="font-semibold text-[0.68rem]"><span className="text-[1.4rem] font-bold">5</span> tarefas pendentes</h4>
                    <p className="m-0 text-[var(--muted)] text-[13px]">2 para esta semana</p>
                  </div>
                </div>
                <div className="w- place-items-center place-content-center bg-(--paper) flex flex-row p-4 border border-[var(--line)] rounded-[12px_12px_12px_4px] shadow-[2px 3px 0 rgba(60,50,38,.04)]">
                  <span className="flex bg-(--coral-soft) p-4 mr-[0.25rem] rounded-[0.625rem]"><Calendar className="text-(--coral)"/></span>
                  <div>
                    <h4 className="font-semibold text-[0.68rem]"><span className="text-[1.4rem] font-bold">1</span> tarefas em atraso</h4>
                    <p className="m-0 text-[var(--muted)] text-[13px]">Precisam de sua atenção</p>
                  </div>
                </div>
                <div className="w- place-items-center place-content-center bg-(--paper) flex flex-row p-4 border border-[var(--line)] rounded-[12px_12px_12px_4px] shadow-[2px 3px 0 rgba(60,50,38,.04)]">
                  <span className="flex bg-(--green-soft) p-4 mr-[0.25rem] rounded-[0.625rem]"><Book className="text-(--green)"/></span>
                  <div>
                    <h4 className="font-semibold text-[0.68rem]"><span className="text-[1.4rem] font-bold">7</span> atividades concluídas</h4>
                    <p className="m-0 text-[var(--muted)] text-[13px]">Você está em dia</p>
                  </div>
                </div>
              </div>
            </section>
            <CalendarGrid />
          </main>
        </div>
      </>
  );
}
