const {select, input, checkbox} = require("@inquirer/prompts");

let meta = {
    value: "Tomar 2L de água por dia",
    checked: false
}

let metas = [meta]

const CadastrarMetas = async () => {
    const meta = await input({
        message: "\tInforme a meta: "
    })

    if(meta.length == 0) {
        console.log("\tmeta não pode ser vazia‼");
        return CadastrarMetas();
    }

    metas.push({
        value: meta,
        checked: false
    })
}

const ListarMetas = async () => {
    const respostas = await checkbox({
        message: "\tUse as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false;
    })

    if(respostas.length == 0) {
        console.log("\tNenhuma meta selecionada‼");
        return ListarMetas();
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })

        meta.checked = true;
    })

    console.log("Meta(s) concluída(s)‼");
}

const MetasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    })

    if(realizadas.length == 0) {
        console.log("\tNão existem metas realizadas‼ (·•᷄‎ࡇ•᷅ )");
        return;
    }

    await select({
        message: "Metas realizadas" + realizadas.length,
        choices: [...realizadas]
    })
}

const MetasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != !false;
    })

    if(abertas.length == 0) {
        console.log("\tNão existem metas abertas‼ (·•᷄‎ࡇ•᷅ )");
        return;
    }

    await select({
        message: "Metas abertas" + abertas.length,
        choices: [...abertas]
    })
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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
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
                console.log(metas);
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

            case "sair":
                console.log("\tAteciosamente, até a próxima‼")
                return;
        }
    }
}

start() 