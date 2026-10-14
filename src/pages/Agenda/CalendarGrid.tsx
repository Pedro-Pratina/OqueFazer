'use strict'

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

      agendaCompleta.push({
        ano,
        meses: mesesDoAno
      });

    }
  }

  return agendaCompleta;
}

const minhaAgenda = gerarEstruturaAgenda(2020, 2026)

/*-----------------------------------------------------------*/


export default function CalendarGrid() {

  return (
    <div>
      <div>
        <h3>MINHA AGENDA</h3>
        <h2> <span></span></h2>
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
