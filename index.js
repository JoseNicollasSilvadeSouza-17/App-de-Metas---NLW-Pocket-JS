function start() {
    let cont = 0;

    while(cont < 11) {
        console.log(cont);
        cont++;

        switch(cont) {
            case 1:
                console.log("\t" + cont + 1);
                break;
            case 2: 
                console.log("\t" + cont - 1);
                break;
            case 3:
                return;
        }
    }
}

start()