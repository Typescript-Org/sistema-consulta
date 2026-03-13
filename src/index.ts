import { Especialidade } from "./types/especialidade";
import { Paciente } from "./types/paciente";
import { Medico } from "./interfaces/medico";
import { Consulta } from "./interfaces/consulta";
import { StatusConsulta } from "./types/statusConsulta";

// Especialidades
const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
};

const ortopedia: Especialidade = {
  id: 2,
  nome: "Ortopedia",
  descricao: "Tratamento de ossos e articulações",
};

const pediatria: Especialidade = {
  id: 3,
  nome: "Pediatria",
};

// Médicos
const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};

const medico2: Medico = {
  id: 2,
  nome: "Dra. Ana Paula Costa",
  crm: "CRM54321",
  especialidade: ortopedia,
  ativo: true,
};

const medico3: Medico = {
  id: 3,
  nome: "Dr. João Mendes",
  crm: "CRM98765",
  especialidade: pediatria,
  ativo: true,
};

// Pacientes
const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
};

const paciente2: Paciente = {
  id: 2,
  nome: "Maria Silva",
  cpf: "987.654.321-00",
  email: "maria@email.com",
  telefone: "(11) 98765-4321",
};

const paciente3: Paciente = {
  id: 3,
  nome: "Pedro Santos",
  cpf: "456.789.123-00",
  email: "pedro@email.com",
};


function criarConsulta (
  id: number,
  medico: Medico,
  paciente: Paciente,
  data: Date,
  valor: number
): Consulta { return {
    id,
    medico,
    paciente,
    data,
    valor,
    status: "Agendada",
  };
}

function confirmarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "Confirmada",
  };
}

function cancelarConsulta(consulta: Consulta): Consulta | null {
  if (consulta.status === "Realizada") {
    return null;
  }
  return {
    ...consulta,
    status: "Cancelada",
  };
}

function exibirConsulta(consulta: Consulta): string {
  const valorFormatado = consulta.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return `
    Consulta #${consulta.id}
    Médico: ${consulta.medico.nome}
    Paciente: ${consulta.paciente.nome}
    Especialidade: ${consulta.medico.especialidade.nome}
    Data: ${consulta.data.toLocaleDateString("pt-BR")}
    Valor: ${valorFormatado}
    Status: ${consulta.status}
`;
}

// Função genérica para alterar status
function alterarStatusConsulta(
  consulta: Consulta,
  novoStatus: StatusConsulta
): Consulta | null {
  if (consulta.status === "Realizada" && novoStatus === "Cancelada") {
    console.log(
      `Não é possível cancelar a consulta #${consulta.id}: já foi realizada.`
    );
    return null;
  }
  return {
    ...consulta,
    status: novoStatus,
  };
}

// Criando 5 consultas com datas e valores variados
const consulta1 = criarConsulta(
  1,
  medico1,
  paciente1,
  new Date(2026, 2, 10),
  350
);

const consulta2 = criarConsulta(
  2,
  medico2,
  paciente2,
  new Date(2026, 3, 5),
  280
);

const consulta3 = criarConsulta(
  3,
  medico3,
  paciente3,
  new Date(2026, 1, 20),
  150
);

const consulta4 = criarConsulta(
  4,
  medico1,
  paciente2,
  new Date(2026, 4, 15),
  500
);

const consulta5 = criarConsulta(
  5,
  medico2,
  paciente3,
  new Date(2026, 5, 1),
  420
);

// Alterando status das consultas
const consulta1Confirmada = alterarStatusConsulta(consulta1, "Confirmada");
const consulta2Realizada = alterarStatusConsulta(consulta2, "Realizada");
const consulta3Cancelada = alterarStatusConsulta(consulta3, "Cancelada");
const consulta4Confirmada = alterarStatusConsulta(consulta4, "Confirmada");
// consulta5 permanece "Agendada"

// Exibindo todas as consultas
console.log("=== CONSULTA 1 - CONFIRMADA ===");
console.log(exibirConsulta(consulta1Confirmada!));

console.log("=== CONSULTA 2 - REALIZADA ===");
console.log(exibirConsulta(consulta2Realizada!));

console.log("=== CONSULTA 3 - CANCELADA ===");
console.log(exibirConsulta(consulta3Cancelada!));

console.log("=== CONSULTA 4 - CONFIRMADA ===");
console.log(exibirConsulta(consulta4Confirmada!));

console.log("=== CONSULTA 5 - AGENDADA ===");
console.log(exibirConsulta(consulta5));

// Testando cancelar uma consulta já realizada
console.log("=== TENTANDO CANCELAR CONSULTA JÁ REALIZADA ===");
const tentativaCancelamento = alterarStatusConsulta(consulta2Realizada!, "Cancelada");

// Lista de todas as consultas (com status atualizados)
const todasConsultas: Consulta[] = [
  consulta1Confirmada!,
  consulta2Realizada!,
  consulta3Cancelada!,
  consulta4Confirmada!,
  consulta5,
];

// Lista consultas por Status
function listarConsultasPorStatus(
  consultas: Consulta[],
  status: StatusConsulta
): Consulta[] {
  return consultas.filter((consulta) => consulta.status === status);
}

// Lista consultas futuras
function listarConsultasFuturas(consultas: Consulta[]): Consulta[] {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return consultas.filter((consulta) => consulta.data >= hoje);
}

// Demonstrando as funções de listagem
console.log("=== CONSULTAS CONFIRMADAS ===");
const confirmadas = listarConsultasPorStatus(todasConsultas, "Confirmada");
confirmadas.forEach((c) => console.log(exibirConsulta(c)));

console.log("=== CONSULTAS FUTURAS ===");
const futuras = listarConsultasFuturas(todasConsultas);
futuras.forEach((c) => console.log(exibirConsulta(c)));

// Calcular faturamento (soma dos valores das consultas realizadas)
function calcularFaturamento(consultas: Consulta[]): number {
  return consultas
    .filter((consulta) => consulta.status === "Realizada")
    .reduce((total, consulta) => total + consulta.valor, 0);
}

// Cancelar faturamento (muda status de "Realizada" para "Cancelada")
function cancelarFaturamento(consulta: Consulta): Consulta | null {
  if (consulta.status !== "Realizada") {
    console.log(
      `Não é possível cancelar o faturamento da consulta #${consulta.id}: status atual é "${consulta.status}".`
    );
    return null;
  }
  return {
    ...consulta,
    status: "Cancelada",
  };
}

// Demonstrando faturamento
console.log("=== FATURAMENTO TOTAL ===");
const faturamentoTotal = calcularFaturamento(todasConsultas);
console.log(`Faturamento total: R$ ${faturamentoTotal.toFixed(2)}`);

// Cancelando faturamento da consulta 2 (Realizada)
console.log("\n=== CANCELANDO FATURAMENTO DA CONSULTA 2 ===");
const consulta2Cancelada = cancelarFaturamento(consulta2Realizada!);
if (consulta2Cancelada) {
  todasConsultas[1] = consulta2Cancelada;
  console.log(exibirConsulta(consulta2Cancelada));
}

console.log("=== FATURAMENTO APÓS CANCELAMENTO ===");
const novoFaturamento = calcularFaturamento(todasConsultas);
console.log(`Faturamento atualizado: R$ ${novoFaturamento.toFixed(2)}`);