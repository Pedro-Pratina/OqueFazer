'use strict'

import { useMemo } from "react";

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
  ano:number;
  meses: MesAgenda[];
}

function gerarEstruturaAgenda(anoInicio: number, anoFim: number): AnoAgenda[] {
  const agendaCompleta: AnoAgenda[] = [];

  //Formatadores---------------------------------------------

  const formatadorMesLongo = new Intl.DateTimeFormat('pt-BR', {timeZone: 'America/Sao_Paulo', month: 'long'})
  const formatadorMesDigito = new Intl.DateTimeFormat('pt-BR', {timeZone: 'America/Sao_Paulo', month: '2-digit'})
  const formatadorDiaDigito = new Intl.DateTimeFormat('pt-BR', {timeZone: 'America/Sao_Paulo', month: '2-digit'})
  const formatadorDiaSemana = new Intl.DateTimeFormat('pt-BR', {timeZone: 'America/Sao_Paulo', month: 'long'})

  for(let ano = anoInicio; ano <= anoFim; ano++){
    const mesesDoAno: MesAgenda[] = [];

    //Meses---------------------------------------------------

    for(let mes = 0; mes < 12; mes++){
      const dataRefMes = new Date(Date.UTC(ano, mes, 15))
      const nomeLongo = formatadorMesLongo.format(dataRefMes)
      const numeroMes = formatadorMesDigito.format(dataRefMes)

      const diasDoMes: DiaAgenda[] = [];

      const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();

      for(let dia = 1; dia <= totalDiasNoMes; dia++){
        const dataObjeto = new Date(ano, mes, 12, 0, 0);

        const strAno = ano;
        const strMes = String(mes + 1).padStart(2, '0');
        const strDia = String(dia).padStart(2, '0');

        diasDoMes.push({
          dataString: `${strAno}-${strMes}-${strDia}`,
          numeroDia: formatadorDiaDigito.format(dataObjeto),
          nomeDiaSemana: formatadorDiaSemana.format(dataObjeto)
        });
      }

      mesesDoAno.push({
        nomeLongo,
        numeroMes,
        dias: diasDoMes

      });
    }
    agendaCompleta.push({
        ano,
        meses: mesesDoAno
      });
  }

  return agendaCompleta;
}

/*-----------------------------------------------------------*/


export default function CalendarGrid() {
  const dataAtual = ():string => {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    }).format(new Date())
  }
  const hoje = dataAtual();
  const anoAtual = Number(hoje.slice(6, 10))

  const minhaAgenda = useMemo(() => gerarEstruturaAgenda(anoAtual -1, anoAtual), [])
  const diaAtual = minhaAgenda[1].meses[Number(hoje.slice(3, 5))-1].dias[Number(hoje.slice(0, 2))-1]
  const mesAtual = minhaAgenda[1].meses[Number(hoje.slice(3, 5))-1]

  console.log(diaAtual)
  console.log(mesAtual)

  return (
    <div className="p-[0.75rem] bg-(--paper) border border-[var(--line)] rounded-[0.75rem] shadow-[2px_3px_0_rgba(60,50,38,.04)]">
      <div>
        <h3>MINHA AGENDA</h3>
        <h2>{mesAtual.nomeLongo} <span>{anoAtual}</span></h2>
        <p>Prova</p>
        <p>Trabalhos</p>
        <p>Tarefas</p>
        <p>Dias Especias</p>
      </div>
      <div className="menu-mes">

      </div>
    </div>
  );
}
