import { DropDownList } from "../../components/DropDownList/DropDownList"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

interface DiaAgenda {
  dataString: string;
  numeroDia: string;
  nomeDiaSemana: string;
}

interface MesAgenda {
  nomeLongo: string;
  numeroMes: string;
  dias: DiaAgenda[];
}

interface AnoAgenda {
  ano: number;
  meses: MesAgenda[];
}

interface CelulaDia {
  dataString: string;
  numeroDia: number;
  doMesAtual: boolean;
}


function gerarEstruturaAgenda(anoInicio: number, anoFim: number): AnoAgenda[] {
  const agendaCompleta: AnoAgenda[] = [];

  //Formatadores---------------------------------------------

  const formatadorMesLongo = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    month: "long",
  });
  const formatadorMesDigito = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    month: "2-digit",
  });
  const formatadorDiaDigito = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
  });
  const formatadorDiaSemana = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
  });

  for (let ano = anoInicio; ano <= anoFim; ano++) {
    const mesesDoAno: MesAgenda[] = [];

    //Meses---------------------------------------------------

    for (let mes = 0; mes < 12; mes++) {
      const dataRefMes = new Date(Date.UTC(ano, mes, 15));
      const nomeLongo = formatadorMesLongo.format(dataRefMes);
      const numeroMes = formatadorMesDigito.format(dataRefMes);

      const diasDoMes: DiaAgenda[] = [];

      const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();

      for (let dia = 1; dia <= totalDiasNoMes; dia++) {
        const dataObjeto = new Date(ano, mes, dia, 12);

        const strAno = ano;
        const strMes = String(mes + 1).padStart(2, "0");
        const strDia = String(dia).padStart(2, "0");

        diasDoMes.push({
          dataString: `${strAno}-${strMes}-${strDia}`,
          numeroDia: formatadorDiaDigito.format(dataObjeto),
          nomeDiaSemana: formatadorDiaSemana.format(dataObjeto),
        });
      }

      mesesDoAno.push({
        nomeLongo,
        numeroMes,
        dias: diasDoMes,
      });
    }
    agendaCompleta.push({
      ano,
      meses: mesesDoAno,
    });
  }

  return agendaCompleta;
}
/*-----------------------------------------------------------*/
/*RENDERIZAÇÃO DO GRID DO CALENDÁRIO*/


function gerarGrade(ano: number, mes: number): CelulaDia[][] {
  const offset = new Date(ano, mes, 1).getDay();
  const celulas: CelulaDia[] = [];

  for(let i = 0; i < 42; i++){
    const d = new Date(ano, mes, 1 - offset + i, 12)
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const dia = String(d.getDate()).padStart(2, "0")

    celulas.push({
      dataString: `${d.getFullYear()}-${m}-${dia}`,
      numeroDia: d.getDate(),
      doMesAtual: d.getMonth() === mes
    })
  }

  const semanas: CelulaDia[][] = []
  for(let i = 0; i < 42; i += 7) semanas.push(celulas.slice(i, i + 7));
  return semanas
}
/*-----------------------------------------------------------*/

export default function CalendarGrid() {
  const hoje = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
    }).format(new Date());
  const anoAtual = Number(hoje.slice(6, 10));
  const mesAtualIndex = Number(hoje.slice(3, 5)) - 1;

  const minhaAgenda = useMemo(
    () => gerarEstruturaAgenda(anoAtual, anoAtual + 1),
    [anoAtual],
  );

  const anoAgenda = minhaAgenda.find((a) => a.ano === anoAtual)!
  const [mesSelecionado, setMesSelecionado] = useState(mesAtualIndex)

  const opcoesMeses = useMemo(() => 
      anoAgenda.meses.map((m, i) => ({
      value: i,
      label: capitalizar(m.nomeLongo)
   })),
    [anoAgenda],
  );

  const mesExibido = anoAgenda.meses[mesSelecionado];

  const semanas = useMemo(
    () => gerarGrade(anoAtual, mesSelecionado),
    [anoAtual, mesSelecionado]
  );

  const hojeISO = `${hoje.slice(6, 10)}-${hoje.slice(3, 5)}-${hoje.slice(0, 2)}`;

  return (
    <div className="p-[0.75rem] bg-(--paper) border border-[var(--line)] rounded-[0.75rem] shadow-[2px_3px_0_rgba(60,50,38,.04)]">
      <div className="flex flex-col">
        <div className="flex flex-col mb-4">
          <h3 className="text-(--purple) text-[0.6875rem] font-bold tracking-[.13em] uppercase mb-[0.5rem]">
            MINHA AGENDA
          </h3>
          <div className="flex items-center gap-2">
            <h3 className="font-handwriting text-[2rem] font-semibold leading-none mb-[0.5rem]">
              {capitalizar(mesExibido.nomeLongo)}
            </h3>
            <span className="m-0 text-[var(--muted)] text-[13px]">
              {anoAtual}
            </span>
          </div>
        </div>
        <div className="controles flex gap-3 mb-4">
          <DropDownList options={opcoesMeses} value={mesSelecionado} onChange={setMesSelecionado} />
          <button className="p-2 border border-(--line) rounded-lg"
            type="button" aria-label="Mês anterior" onClick={() => setMesSelecionado((m) => Math.max(0, m - 1))}>
            <ChevronLeft />
          </button>
          <button className="p-2 border border-(--line) rounded-lg"
            type="button" aria-label="Próximo mês" onClick={() => setMesSelecionado((m) => Math.min(11, m + 1))}>
            <ChevronRight />
          </button>
        </div>
        <div className="flex items-center">
          <div className="bg-[red] w-1 h-1 rounded-full mr-1"></div>
            <p className="m-0 text-[var(--muted)] text-[13px] mr-3">Prova</p>
          <div className="bg-[red] w-1 h-1 rounded-full mr-1"></div>
            <p className="m-0 text-[var(--muted)] text-[13px] mr-3">Trabalhos</p>
          <div className="bg-[red] w-1 h-1 rounded-full mr-1"></div>
            <p className="m-0 text-[var(--muted)] text-[13px] mr-3">Tarefas</p>
          <div className="bg-[red] w-1 h-1 rounded-full mr-1"></div>
            <p className="m-0 text-[var(--muted)] text-[13px]">Dias Especias</p>
        </div>
      </div>
      <div className="menu-mes">
        <table className="mt-5 w-full">
          <thead>
            <tr>
              <th className="m-0 text-[var(--muted)] text-[13px] mr-3">DOM</th>
              <th className="m-0 text-[var(--muted)] text-[13px] mr-3">SEG</th>
              <th className="m-0 text-[var(--muted)] text-[13px] mr-3">TER</th>
              <th className="m-0 text-[var(--muted)] text-[13px] mr-3">QUA</th>
              <th className="m-0 text-[var(--muted)] text-[13px] mr-3">QUI</th>
              <th className="m-0 text-[var(--muted)] text-[13px] mr-3">SEX</th>
              <th className="m-0 text-[var(--muted)] text-[13px] mr-3">SAB</th>
            </tr>
          </thead>
          <tbody>
            {semanas.map((semana, i) => (
              <tr key={i}>
                {semana.map((d) => (
                  <td
                    key={d.dataString}
                    className={[
                      "p-2 text-center text-sm",
                      d.doMesAtual ? "text-slate-800" : "text-(--muted) opacity-50",
                      d.dataString === hojeISO ? "font-bold text-(--purple)" : "",
                    ].join(" ")}>
                      {d.numeroDia}
                    </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
