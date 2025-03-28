const { program } = require("commander");
const fs = require("fs");

const versao = "0.0.1";

function tag(file_path, hashtag = "", options) {
  const transcricao = fs.readFileSync(file_path, "utf8");
  const combinacoes = transcricao.match(
    new RegExp(`.*#${hashtag === "" ? "\\w*" : hashtag}.*\n`, "g")
  );
  const arr_combinacoes = combinacoes?.map((val, idx, arr) => val.trim("\n"));
  
  if (options.output) {
    fs.writeFileSync(options.output, arr_combinacoes.join('\n'))
  }
  
  arr_combinacoes.forEach(anotacao => console.log(anotacao))
}


function frequencia(file_path, options) {
  const exp = /(\D.*):\s/g;
  const transcricao = fs.readFileSync(file_path, "utf8");
  const regex = exp;
  const combinacoes = transcricao.matchAll(regex);
  const arr_combinacoes = Array.from(combinacoes);
  const str_combinacoes = arr_combinacoes?.map((val, idx, arr) =>
    val[1].trim("\n")
  );
  const lista = new Set(str_combinacoes);
  const arr_lista = Array.from(lista);
  const final_lista = arr_lista.map((nome) => nome.toUpperCase());
  final_lista.sort((a, b) => a.localeCompare(b));
  
  if (options.output) {
    fs.writeFileSync(options.output, final_lista.join('\n'))
  }

  final_lista.forEach(nome => console.log(nome))
}

program.name("guri").version(versao);

program
  .command("tag <transcricao> [hashtag]")
  .option('-o, --output <destino>','salva o resultado em arquivo')
  .action(tag);

program
  .command("frequencia <transcricao>")
  .option('-o, --output <destino>','salva o resultado em arquivo')
  .action(frequencia);

program.parse(process.argv);
