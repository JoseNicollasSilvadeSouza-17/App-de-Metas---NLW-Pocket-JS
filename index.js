const {select, input, checkbox} = require("@inquirer/prompts");

let meta = {
    value: "Tomar 2L de água por dia",
    checked: false
}

let metas = [meta]

const CadastrarMeta = async () => {
    const meta = await input({
        message: "\tInforme a meta: "
    })

    if(meta.length == 0) {
        console.log("\tmeta não pode ser vazia‼");
        return CadastrarMeta();
    }

    metas.push({
        value: meta,
        checked: false
    })
}

const ListarMeta = async () => {
    const respostas = await checkbox({
        message: "\tUse as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0) {
        console.log("\tNenhuma meta selecionada‼");
        return ListarMeta();
    }

    metas.forEach((m) => {
        m.checked = false;
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })

        meta.checked = true;
    })

    console.log("Meta(s) concluída(s)‼");
}

const start = async () => {

    while(true) {
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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "cadastrar":
                await CadastrarMeta();
                console.log(metas);
                break;

            case "listar": 
                await ListarMeta();
                break;

            case "sair":
                console.log("\tAteciosamente, até a próxima‼")
                return;
        }
    }
}

start() 