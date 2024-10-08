const {select, input, checkbox} = require("@inquirer/prompts");

const fs = require("fs").promises

let mensagem = ("Bem-vindo ao App de Metas - NLW Pocket JS");

let metas;

const CarregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8");
        metas = JSON.parse(dados);
    }

    catch(error) {
        console.log("\tError nas metas‼");
        metas = [];
    }
}

const SalvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
}
 
const CadastrarMetas = async () => {
    const meta = await input({
        message: "\tInforme a meta: "
    })

    if(meta.length == 0) {
        mensagem = "\tA meta não pode ser vazia‼"
        return // CadastrarMetas();
    }

    metas.push({
        value: meta,
        checked: false
    })

    mensagem = "\tMeta cadastrada com sucesso‼ ヽ(°ᴥ°)ﾉ"
}

const ListarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "\tNão existem metas‼";
        return
    }

    const respostas = await checkbox({
        message: "\tUse as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false;
    })

    if(respostas.length == 0) {
        mensagem = "\tNenhuma meta selecionada‼"
        return // ListarMetas();
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })

        meta.checked = true;
    })

    mensagem = ("\tMeta(s) concluída(s)‼ ヽ(°ᴥ°)ﾉ");
}

const MetasRealizadas = async () => {
    if(metas.length == 0) {
        mensagem = "\tNão existem metas‼";
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked;
    })

    if(realizadas.length == 0) {
        mensagem = ("\tNão existem metas realizadas‼ (·•᷄‎ࡇ•᷅ )");
        return;
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const MetasAbertas = async () => {
    if(metas.length == 0) {
        mensagem = "\tNão existem metas‼";
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != !false;
    })

    if(abertas.length == 0) {
        mensagem = "\tNão existem metas abertas‼ (·•᷄‎ࡇ•᷅ )";
        return;
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const DeletarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "\tNão existem metas‼";
        return
    }

    const MetasDesmarcadas = metas.map((meta) => {
        return {
            value: meta.value, 
            checked: false
        }
    })

    const Items_A_Deletar = await checkbox({
        message: "\tSelecione item para deletar",
        choices: [...MetasDesmarcadas],
        instructions: false
    })

    if(Items_A_Deletar.length == 0) {
        mensagem = ("\tNenhum item para deletar‼");
        return;
    }

    Items_A_Deletar.forEach((Item) => {
        metas = metas.filter((meta) => {
            return meta.value != Item;
        })
    })

    mensagem = ("\tMeta(s) deletada(s) com sucesso‼ ヽ(°ᴥ°)ﾉ");
}

const MostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem);
        console.log("");
        mensagem = "";
    }   
}

const start = async () => {
    await CarregarMetas();

    while(true) {
        MostrarMensagem();
        await SalvarMetas();

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar meta",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar meta",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "cadastrar":
                await CadastrarMetas();
                break;

            case "listar": 
                await ListarMetas();
                break;

            case "realizadas": 
                await MetasRealizadas();
                break;

            case "abertas": 
                await MetasAbertas();
                break;

            case "deletar": 
                await DeletarMetas();
                break;

            case "sair":
                console.log("\tAteciosamente, até a próxima‼");
                return;
        }
    }
}

start() 