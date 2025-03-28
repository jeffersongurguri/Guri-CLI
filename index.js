const { program } = require("commander");
const fs = require("fs");

const versao = "0.0.1";

function notas(file_path, hashtag = "") {
  const transcricao = fs.readFileSync(file_path, "utf8");
  const combinacoes = transcricao.match(
    new RegExp(`.*#${hashtag === "" ? "\\w*" : hashtag}.*\n`, "g")
  );
  const arr_combinacoes = combinacoes?.map((val, idx, arr) => val.trim("\n"));
  console.log(arr_combinacoes);
}

function frequencia(file_path) {
  const timestamp = "\\d{2,2}:\\d{2,2}:\\d{2,2}\\.\\d{3,3}";
  const exp = `${timestamp},${timestamp}\\n([^:]*)`;
  const transcricao = fs.readFileSync(file_path, "utf8");
  const regex = new RegExp(exp, "g");
  const combinacoes = transcricao.matchAll(regex);
  const arr_combinacoes = Array.from(combinacoes);
  const str_combinacoes = arr_combinacoes?.map((val, idx, arr) =>
    val[1].trim("\n")
  );
  const lista = new Set(str_combinacoes);
  const arr_lista = Array.from(lista);
  const final_lista = arr_lista.map((nome) => nome.toUpperCase());
  final_lista.sort((a, b) => a.localeCompare(b));
  console.log(final_lista);
}

program.name("guri").version(versao);

program.command("notas <transcricao> [topico]").action(notas);
program.command("frequencia <transcricao>").action(frequencia);

program.parse(process.argv);

// command('alunos <file>').description('Listar alunos na frequência').action((file)=>console.log('nome do arquivo:', file))
